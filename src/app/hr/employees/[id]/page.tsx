"use client"

import { use } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  DollarSign,
  Award,
  Clock,
  FileText,
  Edit,
  Trash2,
  Download,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

// Mock employee data
const getEmployeeData = (id: string) => {
  const employees: Record<string, any> = {
    EMP001: {
      id: "EMP001",
      name: "สมชาย ใจดี",
      position: "Senior Developer",
      department: "IT",
      email: "somchai@company.com",
      phone: "081-234-5678",
      address: "123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
      status: "active",
      joinDate: "2022-01-15",
      birthDate: "1990-05-20",
      salary: "50,000",
      avatar: null,
      emergencyContact: {
        name: "สมหญิง ใจดี",
        relation: "คู่สมรส",
        phone: "081-111-2222",
      },
      education: "ปริญญาตรี วิทยาศาสตร์คอมพิวเตอร์",
      skills: ["React", "TypeScript", "Node.js", "Next.js", "TailwindCSS"],
      performance: "excellent",
    },
  }

  return (
    employees[id] || {
      id,
      name: "ไม่พบข้อมูล",
      position: "-",
      department: "-",
      email: "-",
      phone: "-",
      address: "-",
      status: "inactive",
      joinDate: "2024-01-01",
      birthDate: "1990-01-01",
      salary: "0",
      avatar: null,
      emergencyContact: {
        name: "-",
        relation: "-",
        phone: "-",
      },
      education: "-",
      skills: [],
      performance: "average",
    }
  )
}

// Mock leave history
const leaveHistory = [
  {
    id: 1,
    type: "ลาพักร้อน",
    startDate: "2024-01-10",
    endDate: "2024-01-12",
    days: 3,
    status: "approved",
    reason: "เที่ยวกับครอบครัว",
  },
  {
    id: 2,
    type: "ลาป่วย",
    startDate: "2024-02-05",
    endDate: "2024-02-05",
    days: 1,
    status: "approved",
    reason: "ไข้หวัด",
  },
  {
    id: 3,
    type: "ลากิจ",
    startDate: "2024-03-15",
    endDate: "2024-03-15",
    days: 1,
    status: "pending",
    reason: "ธุระส่วนตัว",
  },
]

// Mock attendance summary
const attendanceSummary = {
  thisMonth: {
    present: 18,
    late: 2,
    absent: 0,
    leave: 1,
  },
  lastMonth: {
    present: 20,
    late: 1,
    absent: 0,
    leave: 2,
  },
}

export default function EmployeeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const employee = getEmployeeData(id)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "leave":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const getLeaveStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild className="gap-2">
          <Link href="/hr/employees">
            <ArrowLeft className="w-4 h-4" />
            กลับไปรายชื่อพนักงาน
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            ดาวน์โหลดประวัติ
          </Button>
          <Button variant="outline" className="gap-2">
            <Edit className="w-4 h-4" />
            แก้ไขข้อมูล
          </Button>
          <Button variant="destructive" className="gap-2">
            <Trash2 className="w-4 h-4" />
            ลบข้อมูล
          </Button>
        </div>
      </div>

      {/* Employee Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Avatar className="w-32 h-32">
                <AvatarImage src={employee.avatar || undefined} />
                <AvatarFallback className="bg-blue-500 text-white text-4xl">
                  {employee.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {employee.name}
                  </h1>
                  <Badge className={getStatusColor(employee.status)}>
                    {employee.status === "active" ? "ทำงานอยู่" : "ลา"}
                  </Badge>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {employee.position}
                </p>
                <p className="text-sm text-gray-500">รหัส: {employee.id}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">แผนก</p>
                    <p className="text-sm font-medium">{employee.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">เริ่มงาน</p>
                    <p className="text-sm font-medium">
                      {new Date(employee.joinDate).toLocaleDateString("th-TH")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">อีเมล</p>
                    <p className="text-sm font-medium">{employee.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">เบอร์โทร</p>
                    <p className="text-sm font-medium">{employee.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="info">ข้อมูลส่วนตัว</TabsTrigger>
          <TabsTrigger value="leave">ประวัติการลา</TabsTrigger>
          <TabsTrigger value="attendance">การเข้างาน</TabsTrigger>
          <TabsTrigger value="performance">ผลงาน</TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="info" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลทั่วไป</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">วันเกิด</p>
                  <p className="text-base font-medium">
                    {new Date(employee.birthDate).toLocaleDateString("th-TH")}
                  </p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-gray-500">ที่อยู่</p>
                  <p className="text-base font-medium">{employee.address}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-gray-500">การศึกษา</p>
                  <p className="text-base font-medium">{employee.education}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ติดต่อฉุกเฉิน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">ชื่อ</p>
                  <p className="text-base font-medium">
                    {employee.emergencyContact.name}
                  </p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-gray-500">ความสัมพันธ์</p>
                  <p className="text-base font-medium">
                    {employee.emergencyContact.relation}
                  </p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-gray-500">เบอร์โทร</p>
                  <p className="text-base font-medium">
                    {employee.emergencyContact.phone}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>เงินเดือน & สวัสดิการ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">เงินเดือน</p>
                    <p className="text-2xl font-bold text-green-600">
                      ฿{employee.salary}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ทักษะ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {employee.skills.map((skill: string) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Leave History Tab */}
        <TabsContent value="leave" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ประวัติการลา</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaveHistory.map((leave) => (
                  <div
                    key={leave.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                  >
                    <div className="flex items-center gap-4">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium">{leave.type}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(leave.startDate).toLocaleDateString("th-TH")} -{" "}
                          {new Date(leave.endDate).toLocaleDateString("th-TH")} ({leave.days}{" "}
                          วัน)
                        </p>
                        <p className="text-sm text-gray-500">{leave.reason}</p>
                      </div>
                    </div>
                    <Badge className={getLeaveStatusColor(leave.status)}>
                      {leave.status === "approved"
                        ? "อนุมัติ"
                        : leave.status === "pending"
                        ? "รอพิจารณา"
                        : "ไม่อนุมัติ"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>เดือนนี้</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">เข้างาน</span>
                  <span className="text-lg font-bold text-green-600">
                    {attendanceSummary.thisMonth.present} วัน
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">สาย</span>
                  <span className="text-lg font-bold text-orange-600">
                    {attendanceSummary.thisMonth.late} วัน
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">ขาด</span>
                  <span className="text-lg font-bold text-red-600">
                    {attendanceSummary.thisMonth.absent} วัน
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">ลา</span>
                  <span className="text-lg font-bold text-blue-600">
                    {attendanceSummary.thisMonth.leave} วัน
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>เดือนที่แล้ว</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">เข้างาน</span>
                  <span className="text-lg font-bold text-green-600">
                    {attendanceSummary.lastMonth.present} วัน
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">สาย</span>
                  <span className="text-lg font-bold text-orange-600">
                    {attendanceSummary.lastMonth.late} วัน
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">ขาด</span>
                  <span className="text-lg font-bold text-red-600">
                    {attendanceSummary.lastMonth.absent} วัน
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">ลา</span>
                  <span className="text-lg font-bold text-blue-600">
                    {attendanceSummary.lastMonth.leave} วัน
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ประเมินผลการทำงาน</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-6 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <Award className="w-12 h-12 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">ผลการประเมินล่าสุด</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {employee.performance === "excellent"
                      ? "ดีเยี่ยม (90-100)"
                      : "ดี (80-89)"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    พนักงานมีผลงานและความรับผิดชอบดีมาก
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
