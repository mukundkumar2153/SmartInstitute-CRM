-- SmartInstitute CRM - MySQL Database Schema & Seed Script
-- Compatible with MySQL 8.0+

CREATE DATABASE IF NOT EXISTS smartinstitute_crm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE smartinstitute_crm;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  email VARCHAR(191) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(150) NOT NULL,
  role ENUM('admin', 'teacher', 'student') NOT NULL,
  role_title VARCHAR(100) NOT NULL,
  avatar_initials VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Students Table
CREATE TABLE IF NOT EXISTS students (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64),
  student_id VARCHAR(50) UNIQUE NOT NULL,
  roll_no VARCHAR(20) NOT NULL,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(191) NOT NULL,
  class VARCHAR(100) NOT NULL,
  parent_contact VARCHAR(50) NOT NULL,
  raw_contact VARCHAR(50),
  attendance_percent DECIMAL(5,2) DEFAULT 90.00,
  fee_status ENUM('Paid', 'Pending', 'Overdue') DEFAULT 'Paid',
  status ENUM('Active', 'Alumni') DEFAULT 'Active',
  admission_date DATE,
  avatar_color VARCHAR(50),
  marks INT DEFAULT 40,
  remarks VARCHAR(255) DEFAULT '—',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Teachers Table
CREATE TABLE IF NOT EXISTS teachers (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64),
  name VARCHAR(150) NOT NULL,
  department VARCHAR(100) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  classes JSON NOT NULL,
  students_count INT DEFAULT 60,
  experience_years INT DEFAULT 8,
  email VARCHAR(191) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Attendance Table
CREATE TABLE IF NOT EXISTS attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL,
  class VARCHAR(100) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  date VARCHAR(50) NOT NULL,
  lecture VARCHAR(100) NOT NULL,
  status ENUM('Present', 'Absent', 'Late') NOT NULL,
  remarks VARCHAR(255) DEFAULT '—',
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_att (student_id, date, lecture)
);

-- 5. Exam Marks Table
CREATE TABLE IF NOT EXISTS marks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL,
  class VARCHAR(100) NOT NULL,
  exam_name VARCHAR(100) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  marks_obtained DECIMAL(5,2) NOT NULL,
  max_marks DECIMAL(5,2) NOT NULL,
  grade VARCHAR(10) NOT NULL,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_marks (student_id, exam_name, subject)
);

-- 6. Fee Transactions Table
CREATE TABLE IF NOT EXISTS fee_transactions (
  id VARCHAR(64) PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL,
  student_name VARCHAR(150) NOT NULL,
  class VARCHAR(100) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL,
  mode ENUM('UPI', 'Net Banking', 'Cash', 'Cheque') NOT NULL,
  status VARCHAR(50) DEFAULT 'Completed',
  receipt_no VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Announcements Table
CREATE TABLE IF NOT EXISTS announcements (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  target_role VARCHAR(20) DEFAULT 'all',
  date VARCHAR(50) NOT NULL,
  author VARCHAR(100) NOT NULL
);

-- Seed Initial Users
INSERT INTO users (id, email, password, name, role, role_title, avatar_initials) VALUES
('usr-admin-1', 'admin@smartinstitute.com', 'password123', 'Admin User', 'admin', 'Super Admin', 'AD'),
('usr-prof-1', 'kulkarni.teacher@smartinstitute.edu', 'password123', 'Prof. Kulkarni', 'teacher', 'Class Teacher · FY IT', 'PK'),
('usr-stu-1', 'aarav.sharma@smartinstitute.edu', 'password123', 'Aarav Sharma', 'student', 'FY BSc IT · Roll 01', 'AS')
ON DUPLICATE KEY UPDATE name=VALUES(name);
