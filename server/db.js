const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'smartinstitute.db');
const db = new Database(dbPath);

// Enable foreign keys and WAL mode for high concurrency
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

function initDatabase() {
  console.log('[DB] Initializing database tables...');

  // 1. Users Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL, -- 'admin' | 'teacher' | 'student'
      role_title TEXT NOT NULL,
      avatar_initials TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Students Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      student_id TEXT UNIQUE NOT NULL,
      roll_no TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      class TEXT NOT NULL,
      parent_contact TEXT NOT NULL,
      raw_contact TEXT,
      attendance_percent REAL DEFAULT 90,
      fee_status TEXT DEFAULT 'Paid',
      status TEXT DEFAULT 'Active',
      admission_date TEXT,
      avatar_color TEXT,
      marks INTEGER DEFAULT 40,
      remarks TEXT DEFAULT '—'
    );
  `);

  // 3. Teachers Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS teachers (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      name TEXT NOT NULL,
      department TEXT NOT NULL,
      subject TEXT NOT NULL,
      classes TEXT NOT NULL,
      students_count INTEGER DEFAULT 60,
      experience_years INTEGER DEFAULT 8,
      email TEXT NOT NULL,
      phone TEXT NOT NULL
    );
  `);

  // 4. Attendance Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id TEXT NOT NULL,
      class TEXT NOT NULL,
      subject TEXT NOT NULL,
      date TEXT NOT NULL,
      lecture TEXT NOT NULL,
      status TEXT NOT NULL, -- 'Present' | 'Absent' | 'Late'
      remarks TEXT DEFAULT '—',
      recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(student_id, date, lecture)
    );
  `);

  // 5. Marks Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS marks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id TEXT NOT NULL,
      class TEXT NOT NULL,
      exam_name TEXT NOT NULL,
      subject TEXT NOT NULL,
      marks_obtained REAL NOT NULL,
      max_marks REAL NOT NULL,
      grade TEXT NOT NULL,
      recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(student_id, exam_name, subject)
    );
  `);

  // 6. Fees Transactions Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS fee_transactions (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      student_name TEXT NOT NULL,
      class TEXT NOT NULL,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      mode TEXT NOT NULL,
      status TEXT DEFAULT 'Completed',
      receipt_no TEXT NOT NULL
    );
  `);

  // 7. Announcements Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS announcements (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT NOT NULL,
      target_role TEXT DEFAULT 'all',
      date TEXT NOT NULL,
      author TEXT NOT NULL
    );
  `);

  // Seed default data if empty
  seedDatabase();
}

function seedDatabase() {
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  if (userCount > 0) {
    console.log('[DB] Database already contains records. Skipping seed.');
    return;
  }

  console.log('[DB] Seeding initial records matching Figma prototype...');

  // Seed Users
  const insertUser = db.prepare(`
    INSERT INTO users (id, email, password, name, role, role_title, avatar_initials)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  insertUser.run('usr-admin-1', 'admin@smartinstitute.com', 'password123', 'Admin User', 'admin', 'Super Admin', 'AD');
  insertUser.run('usr-prof-1', 'kulkarni.teacher@smartinstitute.edu', 'password123', 'Prof. Kulkarni', 'teacher', 'Class Teacher · FY IT', 'PK');
  insertUser.run('usr-stu-1', 'aarav.sharma@smartinstitute.edu', 'password123', 'Aarav Sharma', 'student', 'FY BSc IT · Roll 01', 'AS');
  insertUser.run('usr-stu-2', 'diya.patel@smartinstitute.edu', 'password123', 'Diya Patel', 'student', 'FY BSc IT · Roll 02', 'DP');

  // Seed Students
  const insertStudent = db.prepare(`
    INSERT INTO students (id, user_id, student_id, roll_no, name, email, class, parent_contact, raw_contact, attendance_percent, fee_status, status, admission_date, avatar_color, marks, remarks)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

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
    ['s-10', null, 'SIT26-010', '10', 'Tanvi Joshi', 'tanvi.joshi@smartinstitute.edu', 'FY BSc IT — A', '+91 93•••• 11209', '+91 93456 11209', 88, 'Paid', 'Active', '2026-06-27', 'bg-rose-600', 41, '—']
  ];

  initialStudents.forEach(row => insertStudent.run(...row));

  // Seed Teachers
  const insertTeacher = db.prepare(`
    INSERT INTO teachers (id, user_id, name, department, subject, classes, students_count, experience_years, email, phone)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertTeacher.run('t-1', 'usr-prof-1', 'Prof. Kulkarni', 'Computer Science', 'Data Structures', JSON.stringify(['FY BSc IT — A', 'TY BSc IT — A']), 112, 11, 'kulkarni.teacher@smartinstitute.edu', '+91 98220 11223');
  insertTeacher.run('t-2', null, 'Prof. Deshmukh', 'Mathematics', 'Applied Mathematics', JSON.stringify(['FY BSc IT — A', 'SY BSc IT — B']), 118, 9, 'deshmukh@smartinstitute.edu', '+91 98221 44556');
  insertTeacher.run('t-3', null, 'Prof. Iyer', 'Information Tech', 'Computer Networks', JSON.stringify(['FY BSc IT — A', 'TY AI & DS — A']), 112, 14, 'iyer@smartinstitute.edu', '+91 98222 77889');

  // Seed Attendance Records
  const insertAttendance = db.prepare(`
    INSERT OR REPLACE INTO attendance (student_id, class, subject, date, lecture, status, remarks)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  initialStudents.forEach(st => {
    let stStatus = 'Present';
    let remark = '—';
    if (st[2] === 'SIT26-003') { stStatus = 'Absent'; remark = 'Sick leave'; }
    if (st[2] === 'SIT26-005') { stStatus = 'Late'; remark = 'Arrived 10:20 AM'; }
    if (st[2] === 'SIT26-008') { stStatus = 'Absent'; remark = 'Informed in advance'; }
    insertAttendance.run(st[2], 'FY BSc IT — A', 'Data Structures', '15 Oct 2026', 'Lecture 3 · 10:00 AM', stStatus, remark);
  });

  // Seed Marks
  const insertMarks = db.prepare(`
    INSERT OR REPLACE INTO marks (student_id, class, exam_name, subject, marks_obtained, max_marks, grade)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  initialStudents.forEach(st => {
    const mark = st[14];
    const pct = (mark / 50) * 100;
    let gr = 'F';
    if (pct >= 95) gr = 'A+';
    else if (pct >= 85) gr = 'A';
    else if (pct >= 75) gr = 'B+';
    else if (pct >= 60) gr = 'B';
    else if (pct >= 45) gr = 'C';
    insertMarks.run(st[2], 'FY BSc IT — A', 'Unit Test 2', 'Computer Networks', mark, 50, gr);
  });

  // Seed Fee Transactions
  const insertFee = db.prepare(`
    INSERT INTO fee_transactions (id, student_id, student_name, class, amount, date, mode, status, receipt_no)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertFee.run('tx-1', 'SIT26-001', 'Aarav Sharma', 'FY BSc IT — A', 25000, '2026-10-15', 'UPI', 'Completed', 'REC-2026-1042');
  insertFee.run('tx-2', 'SIT26-002', 'Diya Patel', 'FY BSc IT — A', 12500, '2026-10-15', 'Net Banking', 'Completed', 'REC-2026-1043');
  insertFee.run('tx-3', 'SIT26-004', 'Ananya Iyer', 'FY BSc IT — A', 25000, '2026-10-14', 'UPI', 'Completed', 'REC-2026-1040');

  // Seed Announcements
  const insertAnn = db.prepare(`
    INSERT INTO announcements (id, title, content, category, target_role, date, author)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  insertAnn.run('ann-1', 'Diwali Vacation Notice', 'Institute will observe Diwali break from 28th October to 5th November.', 'Holiday', 'all', '15 Oct 2026', 'Admin Office');
  insertAnn.run('ann-2', 'Unit Test 2 Schedule Released', 'Computer Networks and DBMS Lab practicals will commence from 18th Oct.', 'Exams', 'all', '14 Oct 2026', 'Examination Cell');
  insertAnn.run('ann-3', 'Annual Sports Meet 2026', 'Registrations are now open for inter-department football, cricket and chess tournaments.', 'Event', 'student', '12 Oct 2026', 'Sports Committee');

  console.log('[DB] Seeding completed successfully!');
}

initDatabase();

module.exports = db;
