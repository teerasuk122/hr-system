# HR System Web Interface - AI Instructions

## Tech Stack (Already Installed):
- Next.js 14 + TypeScript + Tailwind CSS
- shadcn/ui (button, card, avatar, input, textarea, tabs, sheet, dialog, dropdown-menu, badge, tooltip)
- AI SDK (@anthropic-ai/sdk, ai)
- lucide-react icons

## Create These Files:

### 1. src/components/layout/Sidebar.tsx
```
- Sidebar navigation ด้านซ้าย (collapsible)
- Logo + ชื่อ "HR System"
- Menu items:
  - Dashboard (LayoutDashboard icon)
  - HR (Users icon) → submenu: Employees, Leave, Attendance
  - Accounting (Calculator icon)
  - Time Management (Clock icon)
- User profile dropdown ด้านล่าง
- Dark mode toggle
- Collapse/expand button
```

### 2. src/components/chat/ChatPanel.tsx
```
- เลือก AI ได้ 3 ตัว:
  - พี่มักซ์ 🖥️ (blue-500) - ผู้นำทีม
  - น้องพอร์ต 🎨 (pink-500) - UI/UX
  - เจมินี่ 💎 (purple-500) - Research
- Chat messages area with scroll
- Input box + Send button
- Floating button มุมขวาล่างเปิด/ปิด panel
- Avatar + ชื่อ AI ที่เลือก
```

### 3. src/components/layout/Header.tsx
```
- Search bar
- Notifications bell
- User avatar + dropdown
```

### 4. src/app/layout.tsx
```
- Layout หลัก: Sidebar + Main content
- Thai font support
- Dark mode provider
```

### 5. src/app/page.tsx (Dashboard)
```
- Welcome message: "สวัสดี, Admin"
- Stats cards (4 cards in grid):
  - พนักงานทั้งหมด: 45 คน (Users icon, blue)
  - ลารอนุมัติ: 3 รายการ (FileText icon, orange)
  - เข้างานวันนี้: 42 คน (CheckCircle icon, green)
  - งานค้าง: 12 งาน (AlertCircle icon, red)
- Recent activities list
- Quick action buttons
```

## Design Guidelines:
- Primary: Blue (#3B82F6)
- AI Colors: Max=blue, Port=pink, Gemini=purple
- Rounded-xl corners
- Soft shadows (shadow-sm, shadow-md)
- Smooth transitions (duration-200)
- Dark mode support
- Mobile responsive (collapsible sidebar on mobile)
- Thai language throughout

## Start:
สร้างทุกไฟล์ให้ครบ ออกแบบให้ professional, clean, modern
