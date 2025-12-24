"use client"

import { useState } from "react"
import {
  FileText,
  Search,
  Filter,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  User,
  AlertCircle,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock leave requests data
const leaveRequests = [
  {
    id: "LV-2024-001",
    employeeId: "EMP001",
    employeeName: "สมชาย ใจดี",
    department: "IT",
    type: "ลาพักร้อน",
    startDate: "2024-12-25",
    endDate: "2024-12-27",
    days: 3,
    reason: "เที่ยวกับครอบครัว",
    status: "pending",
    requestDate: "2024-12-20",
  },
  {
    id: "LV-2024-002",
    employeeId: "EMP002",
    employeeName: "สมหญิง รักงาน",
    department: "HR",
    type: "ลาป่วย",
    startDate: "2024-12-24",
    endDate: "2024-12-24",
    days: 1,
    reason: "ไข้หวัด",
    status: "approved",
    requestDate: "2024-12-23",
    approvedBy: "Admin",
    approvedDate: "2024-12-23",
  },
  {
    id: "LV-2024-003",
    employeeId: "EMP003",
    employeeName: "สมศักดิ์ มั่นคง",
    department: "Finance",
    type: "ลากิจ",
    startDate: "2024-12-26",
    endDate: "2024-12-26",
    days: 1,
    reason: "ธุระส่วนตัว",
    status: "pending",
    requestDate: "2024-12-22",
  },
  {
    id: "LV-2024-004",
    employeeId: "EMP004",
    employeeName: "สมใจ ดีงาม",
    department: "Marketing",
    type: "ลาพักร้อน",
    startDate: "2024-12-30",
    endDate: "2025-01-03",
    days: 5,
    reason: "เที่ยวต่างประเทศ",
    status: "rejected",
    requestDate: "2024-12-21",
    rejectedBy: "Admin",
    rejectedDate: "2024-12-22",
    rejectedReason: "ช่วงปีใหม่ต้องมีพนักงานประจำการ",
  },
]

const leaveTypes = ["All", "ลาพักร้อน", "ลาป่วย", "ลากิจ", "ลาคลอด"]
const statuses = ["All", "pending", "approved", "rejected"]

export default function LeavePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")

  // Filter leave requests
  const filteredRequests = leaveRequests.filter((req) => {
    const matchesSearch =
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "All" || req.type === selectedType
    const matchesStatus = selectedStatus === "All" || req.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  // Stats
  const stats = [
    {
      title: "รอพิจารณา",
      value: leaveRequests.filter((r) => r.status === "pending").length,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      title: "อนุมัติ",
      value: leaveRequests.filter((r) => r.status === "approved").length,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "ไม่อนุมัติ",
      value: leaveRequests.filter((r) => r.status === "rejected").length,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
    {
      title: "ทั้งหมด",
      value: leaveRequests.length,
      icon: FileText,
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
            <FileText className="w-8 h-8 text-blue-600" />
            จัดการการลา
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            คำขอลาทั้งหมด {filteredRequests.length} รายการ
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Plus className="w-4 h-4" />
              ยื่นคำขอลาใหม่
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>ยื่นคำขอลาใหม่</DialogTitle>
              <DialogDescription>
                กรอกข้อมูลการลาของคุณ
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="leave-type">ประเภทการลา</Label>
                <Select>
                  <SelectTrigger id="leave-type">
                    <SelectValue placeholder="เลือกประเภทการลา" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vacation">ลาพักร้อน</SelectItem>
                    <SelectItem value="sick">ลาป่วย</SelectItem>
                    <SelectItem value="personal">ลากิจ</SelectItem>
                    <SelectItem value="maternity">ลาคลอด</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">วันเริ่มต้น</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">วันสิ้นสุด</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">เหตุผล</Label>
                <Textarea
                  id="reason"
                  placeholder="กรุณาระบุเหตุผลการลา"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">ยกเลิก</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">ยื่นคำขอ</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
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

            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="ประเภทการลา" />
              </SelectTrigger>
              <SelectContent>
                {leaveTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
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
                      : status === "pending"
                      ? "รอพิจารณา"
                      : status === "approved"
                      ? "อนุมัติ"
                      : "ไม่อนุมัติ"}
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

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">ทั้งหมด</TabsTrigger>
          <TabsTrigger value="pending">รอพิจารณา</TabsTrigger>
          <TabsTrigger value="approved">อนุมัติ</TabsTrigger>
          <TabsTrigger value="rejected">ไม่อนุมัติ</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex items-start gap-4 flex-1">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-blue-500 text-white">
                        {request.employeeName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">
                          {request.employeeName}
                        </h3>
                        <Badge variant="outline">{request.employeeId}</Badge>
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusIcon(request.status)}
                          <span className="ml-1">
                            {request.status === "pending"
                              ? "รอพิจารณา"
                              : request.status === "approved"
                              ? "อนุมัติ"
                              : "ไม่อนุมัติ"}
                          </span>
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {request.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {request.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(request.startDate).toLocaleDateString("th-TH")} -{" "}
                          {new Date(request.endDate).toLocaleDateString("th-TH")} (
                          {request.days} วัน)
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-medium">เหตุผล:</span> {request.reason}
                      </p>
                      <p className="text-xs text-gray-400">
                        ยื่นคำขอเมื่อ:{" "}
                        {new Date(request.requestDate).toLocaleDateString("th-TH")}
                      </p>

                      {/* Additional info for approved/rejected */}
                      {request.status === "approved" && (
                        <p className="text-xs text-green-600 dark:text-green-400">
                          อนุมัติโดย {request.approvedBy} เมื่อ{" "}
                          {new Date(request.approvedDate!).toLocaleDateString("th-TH")}
                        </p>
                      )}
                      {request.status === "rejected" && (
                        <div className="text-xs">
                          <p className="text-red-600 dark:text-red-400">
                            ไม่อนุมัติโดย {request.rejectedBy} เมื่อ{" "}
                            {new Date(request.rejectedDate!).toLocaleDateString("th-TH")}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 mt-1">
                            เหตุผล: {request.rejectedReason}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Section - Actions */}
                  {request.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 gap-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        อนุมัติ
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="gap-1"
                      >
                        <XCircle className="w-4 h-4" />
                        ไม่อนุมัติ
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending">
          {/* Same as "all" but filtered for pending */}
          <p className="text-gray-500">กำลังพัฒนา...</p>
        </TabsContent>

        <TabsContent value="approved">
          {/* Same as "all" but filtered for approved */}
          <p className="text-gray-500">กำลังพัฒนา...</p>
        </TabsContent>

        <TabsContent value="rejected">
          {/* Same as "all" but filtered for rejected */}
          <p className="text-gray-500">กำลังพัฒนา...</p>
        </TabsContent>
      </Tabs>

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              ไม่พบคำขอลา
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              ลองเปลี่ยนเงื่อนไขการค้นหาหรือยื่นคำขอลาใหม่
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
