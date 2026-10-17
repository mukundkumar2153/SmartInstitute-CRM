const pool = require('./db_mysql');

async function seedMySQL() {
  console.log('[MySQL Seed] Starting full seed for MySQL database...');

  try {
    // 1. Seed Users
    const users = [
      ['usr-admin-1', 'admin@smartinstitute.com', 'password123', 'Admin User', 'admin', 'Super Admin', 'AD'],
      ['usr-prof-1', 'kulkarni.teacher@smartinstitute.edu', 'password123', 'Prof. Kulkarni', 'teacher', 'Class Teacher · FY IT', 'PK'],
      ['usr-stu-1', 'aarav.sharma@smartinstitute.edu', 'password123', 'Aarav Sharma', 'student', 'FY BSc IT · Roll 01', 'AS'],
      ['usr-stu-2', 'diya.patel@smartinstitute.edu', 'password123', 'Diya Patel', 'student', 'FY BSc IT · Roll 02', 'DP']
    ];

    for (const u of users) {
      await pool.query(`
        INSERT INTO users (id, email, password, name, role, role_title, avatar_initials)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE name = VALUES(name), role = VALUES(role), role_title = VALUES(role_title)
      `, u);
    }

    // 2. Seed Students
    const initialStudents = [
      ['s-1', 'usr-stu-1', 'SIT26-001', '01', 'Aarav Sharma', 'aarav.sharma@smartinstitute.edu', 'FY BSc IT — A', '+91 98•••• 21045', '+91 98234 21045', 94, 'Paid', 'Active', '2026-06-15', 'bg-indigo-600', 44, '—'],
      ['s-2', 'usr-stu-2', 'SIT26-002', '02', 'Diya Patel', 'diya.patel@smartinstitute.edu', 'FY BSc IT — A', '+91 97•••• 88312', '+91 97890 88312', 98, 'Paid', 'Active', '2026-06-16', 'bg-pink-600', 47, '—'],
      ['s-3', null, 'SIT26-003', '03', 'Rohan Mehta', 'rohan.mehta@smartinstitute.edu', 'FY BSc IT — A', '+91 90•••• 17740', '+91 90123 17740', 81, 'Pending', 'Active', '2026-06-18', 'bg-blue-600', 31, 'Sick leave'],
      ['s-4', null, 'SIT26-004', '04', 'Ananya Iyer', 'ananya.iyer@smartinstitute.edu', 'FY BSc IT — A', '+91 99•••• 40256', '+91 99345 40256', 92, 'Paid', 'Active', '2026-06-18', 'bg-emerald-600', 42, '—'],
      ['s-5', null, 'SIT26-005', '05', 'Kabir Singh', 'kabir.singh@smartinstitute.edu', 'FY BSc IT — A', '+91 98•••• 66019', '+91 98765 66019', 76, 'Overdue', 'Active', '2026-06-20', 'bg-amber-600', 38, 'Arrived 10:20 AM'],
      ['s-6', null, 'SIT26-006', '06', 'Saanvi Reddy', 'saanvi.reddy@smartinstitute.edu', 'FY BSc IT — A', '+91 96•••• 30871', '+91 96456 30871', 97, 'Paid', 'Active', '2026-06-21', 'bg-purple-600', 49, '—'],
      ['s-7', null, 'SIT26-007', '07', 'Vihaan Desai', 'vihaan.desai@smartinstitute.edu', 'FY BSc IT — A', '+91 95•••• 52208', '+91 95678 52208', 89, 'Paid', 'Active', '2026-06-22', 'bg-teal-600', 27, '—'],
      ['s-8', null, 'SIT26-008', '08', 'Isha Nair', 'isha.nair@smartinstitute.edu', 'FY BSc IT — A', '+91 94•••• 71163', '+91 94567 71163', 72, 'Pending', 'Active', '2026-06-25', 'bg-red-600', 18, 'Informed in advance'],
      ['s-9', null, 'SIT26-009', '09', 'Aditya Verma', 'aditya.verma@smartinstitute.edu', 'FY BSc IT — A', '+91 91•••• 84321', '+91 91234 84321', 95, 'Paid', 'Active', '2026-06-26', 'bg-cyan-600', 45, '—'],
      ['s-10', null, 'SIT26-010', '10', 'Tanvi Joshi', 'tanvi.joshi@smartinstitute.edu', 'FY BSc IT — A', '+91 93•••• 11209', '+91 93456 11209', 88, 'Paid', 'Active', '2026-06-27', 'bg-rose-600', 41, '—'],
      ['s-11', null, 'SIT25-089', '11', 'Pranav Kadam', 'pranav.kadam@smartinstitute.edu', 'SY BSc IT — B', '+91 98•••• 90123', '+91 98901 90123', 91, 'Paid', 'Active', '2025-07-10', 'bg-violet-600', 37, '—'],
      ['s-12', null, 'SIT24-045', '12', 'Sneha Chawla', 'sneha.chawla@smartinstitute.edu', 'TY AI & DS — A', '+91 97•••• 65432', '+91 97654 65432', 96, 'Paid', 'Active', '2024-07-05', 'bg-emerald-700', 48, '—'],
      ['s-13', null, 'SIT23-012', '44', 'Nikhil Rane', 'nikhil.rane@alumni.edu', 'TY BSc IT — A', '+91 90•••• 44321', '+91 90443 44321', 93, 'Paid', 'Alumni', '2023-06-10', 'bg-slate-600', 46, 'Graduated']
    ];

    for (const st of initialStudents) {
      await pool.query(`
        INSERT INTO students (id, user_id, student_id, roll_no, name, email, class, parent_contact, raw_contact, attendance_percent, fee_status, status, admission_date, avatar_color, marks, remarks)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE name = VALUES(name), class = VALUES(class), attendance_percent = VALUES(attendance_percent), fee_status = VALUES(fee_status), marks = VALUES(marks)
      `, st);
    }

    // 3. Seed Teachers
    const teachers = [
      ['t-1', 'usr-prof-1', 'Prof. Kulkarni', 'Computer Science', 'Data Structures', JSON.stringify(['FY BSc IT — A', 'TY BSc IT — A']), 112, 11, 'kulkarni.teacher@smartinstitute.edu', '+91 98220 11223'],
      ['t-2', null, 'Prof. Deshmukh', 'Mathematics', 'Applied Mathematics', JSON.stringify(['FY BSc IT — A', 'SY BSc IT — B']), 118, 9, 'deshmukh@smartinstitute.edu', '+91 98221 44556'],
      ['t-3', null, 'Prof. Iyer', 'Information Tech', 'Computer Networks', JSON.stringify(['FY BSc IT — A', 'TY AI & DS — A']), 112, 14, 'iyer@smartinstitute.edu', '+91 98222 77889']
    ];

    for (const tc of teachers) {
      await pool.query(`
        INSERT INTO teachers (id, user_id, name, department, subject, classes, students_count, experience_years, email, phone)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE name = VALUES(name), department = VALUES(department)
      `, tc);
    }

    // 4. Seed Attendance
    for (const st of initialStudents) {
      let stStatus = 'Present';
      let remark = '—';
      if (st[2] === 'SIT26-003') { stStatus = 'Absent'; remark = 'Sick leave'; }
      if (st[2] === 'SIT26-005') { stStatus = 'Late'; remark = 'Arrived 10:20 AM'; }
      if (st[2] === 'SIT26-008') { stStatus = 'Absent'; remark = 'Informed in advance'; }

      await pool.query(`
        INSERT INTO attendance (student_id, class, subject, date, lecture, status, remarks)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE status = VALUES(status), remarks = VALUES(remarks)
      `, [st[2], 'FY BSc IT — A', 'Data Structures', '15 Oct 2026', 'Lecture 3 · 10:00 AM', stStatus, remark]);
    }

    // 5. Seed Marks
    for (const st of initialStudents) {
      const mark = st[14];
      const pct = (mark / 50) * 100;
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
      `, [st[2], 'FY BSc IT — A', 'Unit Test 2', 'Computer Networks', mark, 50, gr]);
    }

    // 6. Seed Fees
    const fees = [
      ['tx-1', 'SIT26-001', 'Aarav Sharma', 'FY BSc IT — A', 25000, '2026-10-15', 'UPI', 'Completed', 'REC-2026-1042'],
      ['tx-2', 'SIT26-002', 'Diya Patel', 'FY BSc IT — A', 12500, '2026-10-15', 'Net Banking', 'Completed', 'REC-2026-1043'],
      ['tx-3', 'SIT26-004', 'Ananya Iyer', 'FY BSc IT — A', 25000, '2026-10-14', 'UPI', 'Completed', 'REC-2026-1040'],
      ['tx-4', 'SIT26-006', 'Saanvi Reddy', 'FY BSc IT — A', 25000, '2026-10-12', 'Cheque', 'Completed', 'REC-2026-1035']
    ];

    for (const f of fees) {
      await pool.query(`
        INSERT INTO fee_transactions (id, student_id, student_name, class, amount, date, mode, status, receipt_no)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE amount = VALUES(amount), status = VALUES(status)
      `, f);
    }

    // 7. Seed Announcements
    const announcements = [
      ['ann-1', 'Diwali Vacation Notice', 'Institute will observe Diwali break from 28th October to 5th November.', 'Holiday', 'all', '15 Oct 2026', 'Admin Office'],
      ['ann-2', 'Unit Test 2 Schedule Released', 'Computer Networks and DBMS Lab practicals will commence from 18th Oct.', 'Exams', 'all', '14 Oct 2026', 'Examination Cell'],
      ['ann-3', 'Annual Sports Meet 2026', 'Registrations are now open for inter-department football, cricket and chess tournaments.', 'Event', 'student', '12 Oct 2026', 'Sports Committee']
    ];

    for (const an of announcements) {
      await pool.query(`
        INSERT INTO announcements (id, title, content, category, target_role, date, author)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE title = VALUES(title), content = VALUES(content)
      `, an);
    }

    console.log('[MySQL Seed] Complete data successfully populated into MySQL!');
    process.exit(0);
  } catch (err) {
    console.error('[MySQL Seed Error]:', err);
    process.exit(1);
  }
}

seedMySQL();
