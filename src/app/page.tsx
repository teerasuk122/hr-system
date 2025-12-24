import {
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChatPanel } from "@/components/chat/ChatPanel";

// Stats data
const stats = [
  {
    title: "พนักงานทั้งหมด",
    value: "45",
    unit: "คน",
    change: "+2",
    changeType: "positive",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "ลารอนุมัติ",
    value: "3",
    unit: "รายการ",
    change: "รอดำเนินการ",
    changeType: "warning",
    icon: FileText,
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    title: "เข้างานวันนี้",
    value: "42",
    unit: "คน",
    change: "93%",
    changeType: "positive",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    title: "งานค้าง",
    value: "12",
    unit: "งาน",
    change: "-3",
    changeType: "positive",
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-900/20",
  },
];

// Recent activities
const activities = [
  {
    id: 1,
    user: "สมชาย ใจดี",
    action: "ยื่นขอลาพักร้อน",
    time: "5 นาทีที่แล้ว",
    type: "leave",
  },
  {
    id: 2,
    user: "สมหญิง รักงาน",
    action: "อนุมัติใบลา #LV-2024-045",
    time: "15 นาทีที่แล้ว",
    type: "approve",
  },
  {
    id: 3,
    user: "สมศักดิ์ มั่นคง",
    action: "เช็คอินเข้างาน",
    time: "1 ชั่วโมงที่แล้ว",
    type: "checkin",
  },
  {
    id: 4,
    user: "สมใจ ดีงาม",
    action: "สร้างโปรเจกต์ใหม่",
    time: "2 ชั่วโมงที่แล้ว",
    type: "project",
  },
  {
    id: 5,
    user: "สมปอง รักดี",
    action: "อัพเดทเอกสารพนักงาน",
    time: "3 ชั่วโมงที่แล้ว",
    type: "document",
  },
];

// Quick actions
const quickActions = [
  { label: "เพิ่มพนักงาน", icon: Users, href: "/hr/employees/new" },
  { label: "สร้างใบลา", icon: FileText, href: "/hr/leave/new" },
  { label: "ดูรายงาน", icon: TrendingUp, href: "/reports" },
  { label: "ตารางประชุม", icon: Calendar, href: "/time/meetings" },
];

export default function Dashboard() {
  // Get current date in Thai
  const today = new Date().toLocaleDateString("th-TH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            สวัสดี, Admin 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {today}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Clock className="w-3 h-3" />
            อัพเดทล่าสุด: เมื่อสักครู่
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
              <div className="mt-2 flex items-center gap-1 text-sm">
                {stat.changeType === "positive" && (
                  <span className="text-green-600 flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.change}
                  </span>
                )}
                {stat.changeType === "warning" && (
                  <span className="text-orange-600">{stat.change}</span>
                )}
                {stat.changeType === "negative" && (
                  <span className="text-red-600">{stat.change}</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>กิจกรรมล่าสุด</span>
              <Button variant="ghost" size="sm">
                ดูทั้งหมด
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-semibold">
                    {activity.user.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {activity.user}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
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

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>ทางลัด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  className="h-auto py-4 flex-col gap-2 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 dark:hover:bg-blue-900/20"
                >
                  <action.icon className="w-6 h-6" />
                  <span className="text-xs">{action.label}</span>
                </Button>
              ))}
            </div>

            {/* AI Assistant Preview */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-100 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm border-2 border-white dark:border-gray-900">
                    🖥️
                  </div>
                  <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-sm border-2 border-white dark:border-gray-900">
                    🎨
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm border-2 border-white dark:border-gray-900">
                    💎
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    AI Team พร้อมช่วยเหลือ
                  </p>
                  <p className="text-xs text-gray-500">3 AI ออนไลน์</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                กดปุ่มแชทมุมขวาล่างเพื่อเริ่มสนทนากับ AI
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Chat Panel */}
      <ChatPanel />
    </div>
  );
}
