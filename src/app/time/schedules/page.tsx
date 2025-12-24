"use client"

import { useState } from "react"
import {
  CalendarCheck,
  Calendar,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Download,
  UserCheck,
  UserX,
  Clock3,
  Sun,
  Moon,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Employee data
const employees = [
  {
    id: 1,
    name: "สมชาย ใจดี",
    position: "Developer",
    avatar: "ส",
  },
  {
    id: 2,
    name: "สมหญิง รักงาน",
    position: "Designer",
    avatar: "ส",
  },
  {
    id: 3,
    name: "สมศักดิ์ มั่นคง",
    position: "Manager",
    avatar: "ส",
  },
  {
    id: 4,
    name: "สมใจ ดีงาม",
    position: "Developer",
    avatar: "ส",
  },
  {
    id: 5,
    name: "สมปอง รักดี",
    position: "QA",
    avatar: "ส",
  },
]

// Schedule data for this week
const schedules: Record<number, Record<string, { shift: string; hours: number; checkIn: string; checkOut: string }>> = {
  1: {
    // สมชาย
    Mon: { shift: "morning", hours: 8.5, checkIn: "08:45", checkOut: "17:15" },
    Tue: { shift: "morning", hours: 9.0, checkIn: "08:30", checkOut: "17:30" },
    Wed: { shift: "morning", hours: 8.0, checkIn: "09:00", checkOut: "17:00" },
    Thu: { shift: "morning", hours: 8.5, checkIn: "08:45", checkOut: "17:15" },
    Fri: { shift: "morning", hours: 7.5, checkIn: "09:00", checkOut: "16:30" },
  },
  2: {
    // สมหญิง
    Mon: { shift: "morning", hours: 8.0, checkIn: "09:00", checkOut: "17:00" },
    Tue: { shift: "morning", hours: 8.0, checkIn: "09:00", checkOut: "17:00" },
    Wed: { shift: "morning", hours: 8.5, checkIn: "08:45", checkOut: "17:15" },
    Thu: { shift: "morning", hours: 8.0, checkIn: "09:00", checkOut: "17:00" },
    Fri: { shift: "morning", hours: 8.0, checkIn: "09:00", checkOut: "17:00" },
  },
  3: {
    // สมศักดิ์
    Mon: { shift: "morning", hours: 9.0, checkIn: "08:30", checkOut: "17:30" },
    Tue: { shift: "morning", hours: 8.5, checkIn: "08:45", checkOut: "17:15" },
    Wed: { shift: "morning", hours: 9.0, checkIn: "08:30", checkOut: "17:30" },
    Thu: { shift: "morning", hours: 8.5, checkIn: "08:45", checkOut: "17:15" },
    Fri: { shift: "morning", hours: 8.0, checkIn: "09:00", checkOut: "17:00" },
  },
  4: {
    // สมใจ
    Mon: { shift: "afternoon", hours: 8.0, checkIn: "13:00", checkOut: "21:00" },
    Tue: { shift: "afternoon", hours: 8.0, checkIn: "13:00", checkOut: "21:00" },
    Wed: { shift: "afternoon", hours: 8.0, checkIn: "13:00", checkOut: "21:00" },
    Thu: { shift: "afternoon", hours: 8.0, checkIn: "13:00", checkOut: "21:00" },
    Fri: { shift: "afternoon", hours: 8.0, checkIn: "13:00", checkOut: "21:00" },
  },
  5: {
    // สมปอง
    Mon: { shift: "morning", hours: 8.0, checkIn: "09:00", checkOut: "17:00" },
    Tue: { shift: "morning", hours: 8.0, checkIn: "09:00", checkOut: "17:00" },
    Wed: { shift: "off", hours: 0, checkIn: "-", checkOut: "-" },
    Thu: { shift: "morning", hours: 8.0, checkIn: "09:00", checkOut: "17:00" },
    Fri: { shift: "morning", hours: 8.0, checkIn: "09:00", checkOut: "17:00" },
  },
}

const weekDays = [
  { key: "Mon", label: "จันทร์", date: "23" },
  { key: "Tue", label: "อังคาร", date: "24" },
  { key: "Wed", label: "พุธ", date: "25" },
  { key: "Thu", label: "พฤหัสบดี", date: "26" },
  { key: "Fri", label: "ศุกร์", date: "27" },
]

const shiftConfig: Record<string, { label: string; color: string; icon: typeof Sun }> = {
  morning: {
    label: "เช้า",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    icon: Sun,
  },
  afternoon: {
    label: "บ่าย",
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    icon: Moon,
  },
  off: {
    label: "หยุด",
    color: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
    icon: UserX,
  },
}

export default function SchedulesPage() {
  const [currentWeek, setCurrentWeek] = useState("ธันวาคม 23-27, 2024")
  const [filterDepartment, setFilterDepartment] = useState("all")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <CalendarCheck className="w-8 h-8 text-green-600" />
            ตารางการทำงาน
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            จัดการและติดตามตารางทำงานของพนักงาน
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            ส่งออก
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            สร้างตาราง
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                <UserCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  42
                </p>
                <p className="text-sm text-gray-500">ทำงานวันนี้</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20">
                <Clock3 className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  8.5
                </p>
                <p className="text-sm text-gray-500">ชม.เฉลี่ย</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20">
                <Sun className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  35
                </p>
                <p className="text-sm text-gray-500">กะเช้า</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                <Moon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  7
                </p>
                <p className="text-sm text-gray-500">กะบ่าย</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Week Navigator */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="font-semibold text-gray-900 dark:text-white">
                {currentWeek}
              </span>
            </div>
            <Button variant="outline" size="icon">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Filter className="w-4 h-4 text-gray-500" />
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="แผนก" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทั้งหมด</SelectItem>
                <SelectItem value="dev">พัฒนา</SelectItem>
                <SelectItem value="design">ดีไซน์</SelectItem>
                <SelectItem value="qa">QA</SelectItem>
                <SelectItem value="management">บริหาร</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Table */}
      <Card>
        <CardHeader>
          <CardTitle>ตารางสัปดาห์นี้</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-4 font-semibold text-gray-900 dark:text-white min-w-[200px]">
                    พนักงาน
                  </th>
                  {weekDays.map((day) => (
                    <th
                      key={day.key}
                      className="text-center p-4 font-semibold text-gray-900 dark:text-white min-w-[140px]"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span>{day.label}</span>
                        <span className="text-xs text-gray-500 font-normal">
                          {day.date} ธ.ค.
                        </span>
                      </div>
                    </th>
                  ))}
                  <th className="text-center p-4 font-semibold text-gray-900 dark:text-white min-w-[100px]">
                    รวม
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => {
                  const employeeSchedule = schedules[employee.id]
                  const totalHours = Object.values(employeeSchedule).reduce(
                    (sum, day) => sum + day.hours,
                    0
                  )

                  return (
                    <tr
                      key={employee.id}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      {/* Employee Info */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-blue-500 text-white">
                              {employee.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {employee.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {employee.position}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Daily Schedule */}
                      {weekDays.map((day) => {
                        const daySchedule = employeeSchedule[day.key]
                        const shiftInfo = shiftConfig[daySchedule.shift]
                        const ShiftIcon = shiftInfo.icon

                        return (
                          <td key={day.key} className="p-2">
                            <div
                              className={`rounded-lg p-3 ${
                                daySchedule.shift === "off"
                                  ? "bg-gray-50 dark:bg-gray-800/30"
                                  : "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
                              }`}
                            >
                              <div className="flex items-center justify-center gap-1 mb-2">
                                <Badge className={shiftInfo.color}>
                                  <ShiftIcon className="w-3 h-3 mr-1" />
                                  {shiftInfo.label}
                                </Badge>
                              </div>
                              {daySchedule.shift !== "off" && (
                                <>
                                  <div className="text-center mb-1">
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                      {daySchedule.hours}
                                    </p>
                                    <p className="text-xs text-gray-500">ชม.</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                      {daySchedule.checkIn} - {daySchedule.checkOut}
                                    </p>
                                  </div>
                                </>
                              )}
                              {daySchedule.shift === "off" && (
                                <div className="text-center">
                                  <p className="text-xs text-gray-500">-</p>
                                </div>
                              )}
                            </div>
                          </td>
                        )
                      })}

                      {/* Total Hours */}
                      <td className="p-4">
                        <div className="text-center">
                          <p className="text-xl font-bold text-blue-600">
                            {totalHours}
                          </p>
                          <p className="text-xs text-gray-500">ชม.</p>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              สรุปชั่วโมงการทำงาน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employees.map((employee) => {
                const employeeSchedule = schedules[employee.id]
                const totalHours = Object.values(employeeSchedule).reduce(
                  (sum, day) => sum + day.hours,
                  0
                )
                const targetHours = 40
                const percentage = (totalHours / targetHours) * 100

                return (
                  <div key={employee.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-blue-500 text-white text-xs">
                            {employee.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {employee.name}
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {totalHours} / {targetHours} ชม.
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          totalHours >= targetHours
                            ? "bg-green-600"
                            : totalHours >= targetHours * 0.8
                            ? "bg-blue-600"
                            : "bg-orange-600"
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              กะการทำงาน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(shiftConfig)
                .filter(([key]) => key !== "off")
                .map(([key, config]) => {
                  const ShiftIcon = config.icon
                  const count = employees.filter((emp) => {
                    const schedule = schedules[emp.id]
                    return Object.values(schedule).some((day) => day.shift === key)
                  }).length

                  return (
                    <div key={key} className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${config.color}`}>
                        <ShiftIcon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">
                          กะ{config.label}
                        </p>
                        <p className="text-sm text-gray-500">
                          {key === "morning" ? "08:00 - 17:00" : "13:00 - 21:00"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {key === "morning" ? 35 : 7}
                        </p>
                        <p className="text-xs text-gray-500">คน</p>
                      </div>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
