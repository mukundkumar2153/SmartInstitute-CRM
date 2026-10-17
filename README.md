# SmartInstitute CRM — Complete Management Suite

> **"Run your institute smarter, not harder."**  
> Admissions, attendance, marks and fees — everything your institute needs, in one beautiful workspace.

A modern, responsive, high-performance web CRM for schools, colleges, and coaching institutes built to pixel-perfection based on the Figma design prototypes.

---

## ⚡ 1-Click Launch (Windows)

Simply double-click:
- **`run_project.bat`** (or **`start.bat`**): Automatically checks Node.js, starts the Database backend server, starts the Vite frontend, and opens the app in your browser!
- **`stop_project.bat`**: Stops all running servers cleanly with one click.

---

## 🚀 Live Demo & Development

The development server is running locally:
- **URL**: [http://localhost:5173/](http://localhost:5173/)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)

### Quick Access Accounts
- **Admin**: `admin@smartinstitute.com` / `password123` (Full administrative privileges)
- **Teacher**: `kulkarni.teacher@smartinstitute.edu` / `password123` (Mark attendance, enter marks)
- **Student**: `aarav.sharma@smartinstitute.edu` / `password123` (View reports & grades)

---

## 🎨 Implemented Screens & Features

### 1. Split Hero Authentication (Figma Screen 1)
- Deep gradient hero banner (`#2563EB` to `#6D28D9`) with ambient glow effects.
- 3 floating glassmorphism institute stats (`1,248 Students`, `94% Attendance`, `82% Avg. score`).
- Admin Portal card with email and password show/hide toggle.
- Role switcher (`Admin` / `Teacher` / `Student`), remember me, and forgot-password reset modal.

### 2. Admin Dashboard (Figma Screen 2)
- 4 primary KPI cards:
  - **Total Students**: `1,248` (+4.2%)
  - **Total Teachers**: `64` (+2)
  - **Today's Attendance**: `94.2%` (+1.8%)
  - **Fees Collected**: `₹18.6L` (-3.1%)
- **Weekly Attendance Bar Chart**: Interactive daily bars (Fri–Thu) with average across all classes and current-day highlighting.
- **Recent Activity Feed**: Real-time audit events with live time-ago indicators.
- **Class Overview**: Breakdown of classes (`FY BSc IT — A`, `SY BSc IT — B`, `TY AI & DS — A`) with student counts, colored attendance progress bars, and avg. marks.
- **Upcoming Exams**: Scheduled exams and test timings with calendar badges.

### 3. Students Directory (Figma Screen 3)
- Filter pills (`All · 1,248`, `Active · 1,201`, `Alumni · 47`).
- Comprehensive search by student name, roll number, or parent contact.
- Class and status filters, and multi-criteria sorting.
- High-fidelity table with initials avatar badges, student IDs (`SIT26-001`...), masked parent contacts, color-coded attendance progress bars, and fee badges.
- Full **Add Student**, **Edit Student**, and **Delete Student** workflows.
- Action dropdown menu to record fee payments and view profile.

### 4. Daily Attendance Marking (Figma Screen 4)
- Class, Subject, Date, and Lecture selectors.
- Header actions: **Mark all present** and **Save Attendance**.
- 4 real-time KPI cards: **Total** (`60`), **Present** (`52 · 86.7%`), **Absent** (`5 · 8.3%`), **Late** (`3 · 5%`).
- Segmented 3-button status toggle (`Present` / `Absent` / `Late`) per student with real-time recalculation of stat cards and filter tabs.
- Editable inline remarks per student (e.g. *"Sick leave"*, *"Arrived 10:20 AM"*).

### 5. Marks Entry & Analytics (Figma Screen 5)
- Class, Exam, Subject, and Max Marks selectors.
- Header actions: **Import CSV** and **Save Marks**.
- 4 live score metrics: **Class Average** (`38.4 / 50`), **Highest Score** (`49 · Saanvi R.`), **Lowest Score** (`18 · Isha N.`), **Pass Rate** (`91% · +4%`).
- Editable marks inputs with real-time percentage progress bars and grade pill badges (`A+`, `A`, `B+`, `B`, `C`, `F`).
- **Grade Distribution Chart**: Dynamic horizontal distribution bars with student counts.
- Comparative insight alert card.

### 6. Extra Integrated Modules
- **Fees & Ledger**: Outstanding dues tracker, fee collection breakdown, payment recording modal, and receipt generation.
- **Timetable**: Weekly lecture schedule matrix with period timings, faculty assignments, and room allocations.
- **System Settings**: Minimum attendance threshold slider, academic year selection, and automated parent communication toggles.
- **Export System**: Export dataset to CSV, Excel, or PDF Print.

---

## 🛠️ Tech Stack
- **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS v4
- **Icons**: Lucide React
- **Typography**: Plus Jakarta Sans & Inter
- **State Management**: Reactive React Context with `localStorage` persistence

---

## 💻 CLI Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
