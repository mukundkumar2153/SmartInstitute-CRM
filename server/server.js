const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const pool = require('./db_mysql');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});

/* =========================================================
   AUTH ROUTES
   ========================================================= */
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const [users] = await pool.query(
      'SELECT id, email, name, role, role_title, avatar_initials FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials. Please verify your email and password.' });
    }

    const user = users[0];

    // If student, attach student profile
    let studentProfile = null;
    if (user.role === 'student') {
      const [students] = await pool.query(
        'SELECT * FROM students WHERE user_id = ? OR email = ?',
        [user.id, user.email]
      );
      if (students.length > 0) studentProfile = students[0];
    }

    // If teacher, attach teacher profile
    let teacherProfile = null;
    if (user.role === 'teacher') {
      const [teachers] = await pool.query(
        'SELECT * FROM teachers WHERE user_id = ? OR email = ?',
        [user.id, user.email]
      );
      if (teachers.length > 0) {
        teacherProfile = teachers[0];
        if (typeof teacherProfile.classes === 'string') {
          try { teacherProfile.classes = JSON.parse(teacherProfile.classes); } catch(e) {}
        }
      }
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        roleTitle: user.role_title,
        avatarInitials: user.avatar_initials,
        studentProfile,
        teacherProfile
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
});

/* =========================================================
   STUDENTS CRUD (MySQL)
   ========================================================= */
app.get('/api/students', async (req, res) => {
  try {
    const [students] = await pool.query('SELECT * FROM students ORDER BY roll_no ASC');
    const formatted = students.map(s => ({
      id: s.id,
      studentId: s.student_id,
      rollNo: s.roll_no,
      name: s.name,
      email: s.email,
      class: s.class,
      parentContact: s.parent_contact,
      rawContact: s.raw_contact,
      attendancePercent: Number(s.attendance_percent) || 90,
      feeStatus: s.fee_status,
      status: s.status,
      admissionDate: s.admission_date ? s.admission_date.toISOString().split('T')[0] : '2026-06-15',
      avatarColor: s.avatar_color || 'bg-indigo-600',
      marks: s.marks || 40,
      remarks: s.remarks || '—'
    }));
    res.json(formatted);
  } catch (err) {
    console.error('Fetch students error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/students', async (req, res) => {
  const s = req.body;
  const id = `s-${Date.now()}`;
  const colors = ['bg-indigo-600', 'bg-blue-600', 'bg-emerald-600', 'bg-purple-600', 'bg-pink-600', 'bg-amber-600', 'bg-teal-600'];
  const avatarColor = colors[Math.floor(Math.random() * colors.length)];

  try {
    await pool.query(`
      INSERT INTO students (id, user_id, student_id, roll_no, name, email, class, parent_contact, raw_contact, attendance_percent, fee_status, status, admission_date, avatar_color, marks, remarks)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      id,
      null,
      s.studentId,
      s.rollNo,
      s.name,
      s.email || `${s.name.toLowerCase().replace(/\s+/g, '.')}@smartinstitute.edu`,
      s.class,
      s.parentContact,
      s.rawContact || s.parentContact,
      s.attendancePercent || 90,
      s.feeStatus || 'Paid',
      s.status || 'Active',
      s.admissionDate || new Date().toISOString().split('T')[0],
      avatarColor,
      s.marks || 40,
      s.remarks || '—'
    ]);
    res.status(201).json({ success: true, id });
  } catch (err) {
    console.error('Insert student error:', err);
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  const s = req.body;

  try {
    await pool.query(`
      UPDATE students SET
        name = COALESCE(?, name),
        class = COALESCE(?, class),
        roll_no = COALESCE(?, roll_no),
        parent_contact = COALESCE(?, parent_contact),
        raw_contact = COALESCE(?, raw_contact),
        attendance_percent = COALESCE(?, attendance_percent),
        fee_status = COALESCE(?, fee_status),
        status = COALESCE(?, status),
        marks = COALESCE(?, marks)
      WHERE id = ?
    `, [s.name, s.class, s.rollNo, s.parentContact, s.rawContact, s.attendancePercent, s.feeStatus, s.status, s.marks, id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM students WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================================================
   ATTENDANCE ROUTES (MySQL)
   ========================================================= */
app.get('/api/attendance', async (req, res) => {
  try {
    const [records] = await pool.query('SELECT * FROM attendance');
    const map = {};
    records.forEach(r => {
      map[r.student_id] = { status: r.status, remarks: r.remarks };
    });
    res.json(map);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/attendance', async (req, res) => {
  const { records, class: className, subject, date, lecture } = req.body;

  try {
    for (const item of records) {
      await pool.query(`
        INSERT INTO attendance (student_id, class, subject, date, lecture, status, remarks)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE status = VALUES(status), remarks = VALUES(remarks)
      `, [
        item.studentId,
        className || 'FY BSc IT — A',
        subject || 'Data Structures',
        date || '15 Oct 2026',
        lecture || 'Lecture 3 · 10:00 AM',
        item.status,
        item.remarks || '—'
      ]);
    }
    res.json({ success: true, count: records.length });
  } catch (err) {
    console.error('Save attendance error:', err);
    res.status(500).json({ error: err.message });
  }
});

/* =========================================================
   MARKS ROUTES (MySQL)
   ========================================================= */
app.get('/api/marks', async (req, res) => {
  try {
    const [marks] = await pool.query('SELECT student_id, marks_obtained FROM marks');
    const map = {};
    marks.forEach(m => {
      map[m.student_id] = Number(m.marks_obtained);
    });
    res.json(map);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/marks', async (req, res) => {
  const { marks, maxMarks = 50, examName = 'Unit Test 2', subject = 'Computer Networks', className = 'FY BSc IT — A' } = req.body;

  try {
    for (const [studentId, score] of Object.entries(marks)) {
      const pct = (score / maxMarks) * 100;
      let gr = 'F';
      if (pct >= 95) gr = 'A+';
      else if (pct >= 85) gr = 'A';
      else if (pct >= 75) gr = 'B+';
      else if (pct >= 60) gr = 'B';
      else if (pct >= 45) gr = 'C';

      await pool.query(`
        INSERT INTO marks (student_id, class, exam_name, subject, marks_obtained, max_marks, grade)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE marks_obtained = VALUES(marks_obtained), grade = VALUES(grade)
      `, [studentId, className, examName, subject, score, maxMarks, gr]);
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Save marks error:', err);
    res.status(500).json({ error: err.message });
  }
});

/* =========================================================
   FEES ROUTES (MySQL)
   ========================================================= */
app.get('/api/fees', async (req, res) => {
  try {
    const [transactions] = await pool.query('SELECT * FROM fee_transactions ORDER BY date DESC');
    const formatted = transactions.map(t => ({
      id: t.id,
      studentId: t.student_id,
      studentName: t.student_name,
      class: t.class,
      amount: Number(t.amount),
      date: t.date ? t.date.toISOString().split('T')[0] : '2026-10-15',
      mode: t.mode,
      status: t.status,
      receiptNo: t.receipt_no
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/fees', async (req, res) => {
  const t = req.body;
  const id = `tx-${Date.now()}`;
  const receiptNo = `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  try {
    await pool.query(`
      INSERT INTO fee_transactions (id, student_id, student_name, class, amount, date, mode, status, receipt_no)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [id, t.studentId, t.studentName, t.class, t.amount, t.date, t.mode, 'Completed', receiptNo]);

    await pool.query('UPDATE students SET fee_status = ? WHERE student_id = ?', ['Paid', t.studentId]);

    res.status(201).json({ success: true, receiptNo });
  } catch (err) {
    console.error('Record fee error:', err);
    res.status(500).json({ error: err.message });
  }
});

/* =========================================================
   STUDENT PERSONALIZED PORTAL DATA (MySQL)
   ========================================================= */
app.get('/api/student/dashboard/:studentId', async (req, res) => {
  const { studentId } = req.params;

  try {
    const [students] = await pool.query('SELECT * FROM students WHERE student_id = ? OR id = ?', [studentId, studentId]);

    if (students.length === 0) {
      return res.status(404).json({ error: 'Student record not found' });
    }

    const student = students[0];
    const [studentMarks] = await pool.query('SELECT * FROM marks WHERE student_id = ?', [student.student_id]);
    const [receipts] = await pool.query('SELECT * FROM fee_transactions WHERE student_id = ?', [student.student_id]);
    const [attendance] = await pool.query('SELECT * FROM attendance WHERE student_id = ?', [student.student_id]);

    res.json({
      student: {
        id: student.id,
        studentId: student.student_id,
        rollNo: student.roll_no,
        name: student.name,
        class: student.class,
        attendancePercent: Number(student.attendance_percent),
        feeStatus: student.fee_status,
        marks: student.marks
      },
      marks: studentMarks,
      receipts,
      attendance
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================================================
   ANNOUNCEMENTS (MySQL)
   ========================================================= */
app.get('/api/announcements', async (req, res) => {
  try {
    const [announcements] = await pool.query('SELECT * FROM announcements ORDER BY date DESC');
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`[SERVER] SmartInstitute MySQL Backend Server running at http://localhost:${PORT}`);
});
