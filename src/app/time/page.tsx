"use client"

import Link from "next/link"
import {
  Clock,
  Calendar,
  Users,
  CalendarDays,
  TrendingUp,
  ArrowUpRight,
  Video,
  CalendarCheck,
  Palmtree,
  Timer,
  UserCheck,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Stats data
const stats = [
  {
    title: "ประชุมวันนี้",
    value: "5",
    unit: "ห้อง",
    change: "+2",
    changeType: "positive",
    icon: Video,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    description: "มี 12 คนเข้าร่วม",
  },
  {
    title: "พนักงานทำงาน",
    value: "42",
    unit: "คน",
    change: "93%",
    changeType: "positive",
    icon: UserCheck,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    description: "จาก 45 คน",
  },
  {
    title: "ชั่วโมงทำงานเฉลี่ย",
    value: "8.5",
    unit: "ชม.",
    change: "+0.5",
    changeType: "positive",
    icon: Timer,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    description: "สัปดาห์นี้",
  },
  {
    title: "วันหยุดคงเหลือ",
    value: "156",
    unit: "วัน",
    change: "ทีมเฉลี่ย 3.5 วัน",
    changeType: "warning",
    icon: Palmtree,
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    description: "ทั้งบริษัท",
  },
]

// Today's meetings
const todayMeetings = [
  {
    id: 1,
    title: "Daily Standup",
    time: "09:00 - 09:30",
    room: "ห้องประชุม A",
    participants: 8,
    status: "in-progress",
    organizer: "สมชาย ใจดี",
  },
  {
    id: 2,
    title: "Client Presentation",
    time: "10:00 - 11:30",
    room: "ห้องประชุม B",
    participants: 5,
    status: "upcoming",
    organizer: "สมหญิง รักงาน",
  },
  {
    id: 3,
    title: "Team Planning",
    time: "14:00 - 15:30",
    room: "ห้องประชุม C",
    participants: 12,
    status: "upcoming",
    organizer: "สมศักดิ์ มั่นคง",
  },
  {
    id: 4,
    title: "Code Review",
    time: "16:00 - 17:00",
    room: "Online",
    participants: 6,
    status: "upcoming",
    organizer: "สมใจ ดีงาม",
  },
]

// Recent activities
const recentActivities = [
  {
    id: 1,
    user: "สมชาย ใจดี",
    action: "เช็คอินเข้างาน",
    time: "08:45",
    type: "checkin",
  },
  {
    id: 2,
    user: "สมหญิง รักงาน",
    action: "จองห้องประชุม A",
    time: "08:30",
    type: "meeting",
  },
  {
    id: 3,
    user: "สมศักดิ์ มั่นคง",
    action: "อัพเดทตารางงาน",
    time: "08:15",
    type: "schedule",
  },
  {
    id: 4,
    user: "สมใจ ดีงาม",
    action: "ขอลาพักร้อน 3 วัน",
    time: "08:00",
    type: "leave",
  },
]

// Quick actions
const quickActions = [
  {
    title: "รายการประชุม",
    description: "ดูและจัดการห้องประชุม",
    icon: Video,
    href: "/time/meetings",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "ตารางงาน",
    description: "จัดการตารางทำงาน",
    icon: CalendarCheck,
    href: "/time/schedules",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    title: "วันหยุด",
    description: "ดูและจัดการวันหยุด",
    icon: Palmtree,
    href: "/time/holidays",
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    title: "รายงานเวลา",
    description: "วิเคราะห์การใช้เวลา",
    icon: TrendingUp,
    href: "/time/reports",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
]

export default function TimeManagementPage() {
  // Get current date in Thai
  const today = new Date().toLocaleDateString("th-TH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-600" />
            จัดการเวลาและตารางงาน
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{today}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Clock className="w-3 h-3" />
            {new Date().toLocaleTimeString("th-TH", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </span>
                <span className="text-sm text-gray-500">{stat.unit}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">{stat.description}</span>
                <div className="flex items-center gap-1 text-xs">
                  {stat.changeType === "positive" && (
                    <span className="text-green-600 flex items-center gap-0.5">
                      <ArrowUpRight className="w-3 h-3" />
                      {stat.change}
                    </span>
                  )}
                  {stat.changeType === "warning" && (
                    <span className="text-orange-600">{stat.change}</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => (
          <Link key={action.title} href={action.href}>
            <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group h-full">
              <CardContent className="p-6">
                <div
                  className={`p-3 rounded-xl ${action.bgColor} w-fit mb-4 group-hover:scale-110 transition-transform`}
                >
                  <action.icon className={`w-6 h-6 ${action.color}`} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {action.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Meetings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Video className="w-5 h-5 text-blue-600" />
                ประชุมวันนี้
              </span>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/time/meetings">ดูทั้งหมด</Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      meeting.status === "in-progress"
                        ? "bg-green-100 dark:bg-green-900/30"
                        : "bg-blue-100 dark:bg-blue-900/30"
                    }`}
                  >
                    <Video
                      className={`w-6 h-6 ${
                        meeting.status === "in-progress"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {meeting.title}
                      </p>
                      <Badge
                        variant={
                          meeting.status === "in-progress" ? "default" : "outline"
                        }
                        className={
                          meeting.status === "in-progress"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : ""
                        }
                      >
                        {meeting.status === "in-progress"
                          ? "กำลังประชุม"
                          : "กำหนดการ"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{meeting.time}</span>
                      <span>•</span>
                      <span>{meeting.room}</span>
                      <span>•</span>
                      <Users className="w-3 h-3" />
                      <span>{meeting.participants} คน</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              กิจกรรมล่าสุด
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-semibold">
                    {activity.user.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {activity.user}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {activity.action}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Work Time Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-blue-600" />
              สรุปเวลาทำงานสัปดาห์นี้
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { day: "จันทร์", hours: 8.5, target: 8 },
                { day: "อังคาร", hours: 9.0, target: 8 },
                { day: "พุธ", hours: 8.0, target: 8 },
                { day: "พฤหัสบดี", hours: 8.5, target: 8 },
                { day: "ศุกร์", hours: 7.5, target: 8 },
              ].map((day, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {day.day}
                    </span>
                    <span className="text-sm font-medium">
                      {day.hours} / {day.target} ชม.
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        day.hours >= day.target
                          ? "bg-green-600"
                          : "bg-orange-600"
                      }`}
                      style={{
                        width: `${(day.hours / day.target) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900 dark:text-white">
                  รวมทั้งหมด
                </span>
                <span className="text-xl font-bold text-blue-600">
                  41.5 / 40 ชม.
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palmtree className="w-5 h-5 text-orange-600" />
              วันหยุดที่จะถึง
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "วันคริสต์มาส",
                  date: "25 ธ.ค. 2024",
                  type: "holiday",
                  daysLeft: 1,
                },
                {
                  name: "วันขึ้นปีใหม่",
                  date: "1 ม.ค. 2025",
                  type: "holiday",
                  daysLeft: 8,
                },
                {
                  name: "วันตรุษจีน",
                  date: "29 ม.ค. 2025",
                  type: "holiday",
                  daysLeft: 36,
                },
              ].map((holiday, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20"
                >
                  <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Palmtree className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {holiday.name}
                    </p>
                    <p className="text-xs text-gray-500">{holiday.date}</p>
                  </div>
                  <Badge variant="outline" className="text-orange-600">
                    {holiday.daysLeft} วัน
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/time/holidays">ดูวันหยุดทั้งหมด</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
