"use client"

import { useState } from "react"
import {
  Clock,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  TrendingUp,
  User,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Mock attendance data
const attendanceRecords = [
  {
    id: 1,
    employeeId: "EMP001",
    employeeName: "สมชาย ใจดี",
    department: "IT",
    date: "2024-12-24",
    checkIn: "08:45",
    checkOut: "17:30",
    status: "present",
    lateMinutes: 0,
    workHours: 8.75,
  },
  {
    id: 2,
    employeeId: "EMP002",
    employeeName: "สมหญิง รักงาน",
    department: "HR",
    date: "2024-12-24",
    checkIn: "09:15",
    checkOut: "18:00",
    status: "late",
    lateMinutes: 15,
    workHours: 8.75,
  },
  {
    id: 3,
    employeeId: "EMP003",
    employeeName: "สมศักดิ์ มั่นคง",
    department: "Finance",
    date: "2024-12-24",
    checkIn: "08:30",
    checkOut: "17:15",
    status: "present",
    lateMinutes: 0,
    workHours: 8.75,
  },
  {
    id: 4,
    employeeId: "EMP004",
    employeeName: "สมใจ ดีงาม",
    department: "Marketing",
    date: "2024-12-24",
    checkIn: "-",
    checkOut: "-",
    status: "absent",
    lateMinutes: 0,
    workHours: 0,
  },
  {
    id: 5,
    employeeId: "EMP005",
    employeeName: "สมปอง รักดี",
    department: "Sales",
    date: "2024-12-24",
    checkIn: "-",
    checkOut: "-",
    status: "leave",
    lateMinutes: 0,
    workHours: 0,
  },
  {
    id: 6,
    employeeId: "EMP006",
    employeeName: "สมศรี สวยงาม",
    department: "Product",
    date: "2024-12-24",
    checkIn: "08:50",
    checkOut: "17:45",
    status: "present",
    lateMinutes: 0,
    workHours: 8.9,
  },
]

const departments = ["All", "IT", "HR", "Finance", "Marketing", "Sales", "Product"]
const statuses = ["All", "present", "late", "absent", "leave"]

export default function AttendancePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  )

  // Filter attendance records
  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch =
      record.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment =
      selectedDepartment === "All" || record.department === selectedDepartment
    const matchesStatus = selectedStatus === "All" || record.status === selectedStatus
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return (
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            เข้างาน
          </Badge>
        )
      case "late":
        return (
          <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
            <AlertCircle className="w-3 h-3 mr-1" />
            สาย
          </Badge>
        )
      case "absent":
        return (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            <XCircle className="w-3 h-3 mr-1" />
            ขาด
          </Badge>
        )
      case "leave":
        return (
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            <Calendar className="w-3 h-3 mr-1" />
            ลา
          </Badge>
        )
      default:
        return <Badge>-</Badge>
    }
  }

  // Stats
  const stats = [
    {
      title: "เข้างาน",
      value: attendanceRecords.filter((r) => r.status === "present").length,
      total: attendanceRecords.length,
      percentage: Math.round(
        (attendanceRecords.filter((r) => r.status === "present").length /
          attendanceRecords.length) *
          100
      ),
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "สาย",
      value: attendanceRecords.filter((r) => r.status === "late").length,
      total: attendanceRecords.length,
      percentage: Math.round(
        (attendanceRecords.filter((r) => r.status === "late").length /
          attendanceRecords.length) *
          100
      ),
      icon: AlertCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      title: "ขาด",
      value: attendanceRecords.filter((r) => r.status === "absent").length,
      total: attendanceRecords.length,
      percentage: Math.round(
        (attendanceRecords.filter((r) => r.status === "absent").length /
          attendanceRecords.length) *
          100
      ),
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
    {
      title: "ลา",
      value: attendanceRecords.filter((r) => r.status === "leave").length,
      total: attendanceRecords.length,
      percentage: Math.round(
        (attendanceRecords.filter((r) => r.status === "leave").length /
          attendanceRecords.length) *
          100
      ),
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-600" />
            เวลาเข้างาน
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            ติดตามเวลาเข้างานของพนักงาน {filteredRecords.length} คน
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            ดาวน์โหลดรายงาน
          </Button>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-auto"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500">/ {stat.total}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3 h-3 text-gray-400" />
                    <p className={`text-sm font-medium ${stat.color}`}>
                      {stat.percentage}%
                    </p>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="ค้นหา (รหัส, ชื่อ, แผนก)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Department Filter */}
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="แผนก" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="สถานะ" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "All"
                      ? "ทุกสถานะ"
                      : status === "present"
                      ? "เข้างาน"
                      : status === "late"
                      ? "สาย"
                      : status === "absent"
                      ? "ขาด"
                      : "ลา"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              ตัวกรองเพิ่มเติม
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>บันทึกเวลาเข้างาน - {new Date(selectedDate).toLocaleDateString("th-TH")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>พนักงาน</TableHead>
                <TableHead>แผนก</TableHead>
                <TableHead>เข้างาน</TableHead>
                <TableHead>ออกงาน</TableHead>
                <TableHead>ชั่วโมงทำงาน</TableHead>
                <TableHead>สถานะ</TableHead>
                <TableHead>หมายเหตุ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-blue-500 text-white text-sm">
                          {record.employeeName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{record.employeeName}</p>
                        <p className="text-xs text-gray-500">{record.employeeId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>
                    <span
                      className={
                        record.status === "late"
                          ? "text-orange-600 font-medium"
                          : ""
                      }
                    >
                      {record.checkIn}
                    </span>
                  </TableCell>
                  <TableCell>{record.checkOut}</TableCell>
                  <TableCell>
                    <span className="font-medium">
                      {record.workHours > 0
                        ? `${record.workHours.toFixed(1)} ชม.`
                        : "-"}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell>
                    {record.status === "late" && (
                      <span className="text-xs text-orange-600">
                        สาย {record.lateMinutes} นาที
                      </span>
                    )}
                    {record.status === "absent" && (
                      <span className="text-xs text-red-600">ไม่มาทำงาน</span>
                    )}
                    {record.status === "leave" && (
                      <span className="text-xs text-blue-600">ลา</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredRecords.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              ไม่พบข้อมูลเวลาเข้างาน
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              ลองเปลี่ยนเงื่อนไขการค้นหาหรือเลือกวันที่อื่น
            </p>
          </CardContent>
        </Card>
      )}

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>สรุปภาพรวม</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <p className="text-sm text-blue-600 dark:text-blue-400">
                อัตราการเข้างาน
              </p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                {Math.round(
                  ((attendanceRecords.filter((r) => r.status === "present").length +
                    attendanceRecords.filter((r) => r.status === "late").length) /
                    attendanceRecords.length) *
                    100
                )}
                %
              </p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
              <p className="text-sm text-green-600 dark:text-green-400">
                เฉลี่ยชั่วโมงทำงาน
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                {(
                  attendanceRecords.reduce((sum, r) => sum + r.workHours, 0) /
                  attendanceRecords.filter((r) => r.workHours > 0).length
                ).toFixed(1)}{" "}
                ชม.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20">
              <p className="text-sm text-orange-600 dark:text-orange-400">
                เฉลี่ยความสาย
              </p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-1">
                {(
                  attendanceRecords.reduce((sum, r) => sum + r.lateMinutes, 0) /
                  attendanceRecords.filter((r) => r.status === "late").length || 0
                ).toFixed(0)}{" "}
                นาที
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
