"use client"

import { useState } from "react"
import {
  Wallet,
  Download,
  Send,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  MoreVertical,
  Eye,
  FileText,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock payroll data
const payrollData = [
  {
    id: "PAY-2024-001",
    employeeId: "EMP001",
    employeeName: "สมชาย ใจดี",
    position: "Senior Developer",
    department: "IT",
    baseSalary: 45000,
    bonus: 5000,
    overtime: 2000,
    deductions: 1500,
    netSalary: 50500,
    status: "paid",
    paymentDate: "2024-12-05",
    month: "ธันวาคม 2024",
  },
  {
    id: "PAY-2024-002",
    employeeId: "EMP002",
    employeeName: "สมหญิง รักงาน",
    position: "HR Manager",
    department: "HR",
    baseSalary: 50000,
    bonus: 8000,
    overtime: 0,
    deductions: 2000,
    netSalary: 56000,
    status: "paid",
    paymentDate: "2024-12-05",
    month: "ธันวาคม 2024",
  },
  {
    id: "PAY-2024-003",
    employeeId: "EMP003",
    employeeName: "สมศักดิ์ มั่นคง",
    position: "Accountant",
    department: "Finance",
    baseSalary: 38000,
    bonus: 3000,
    overtime: 1500,
    deductions: 1200,
    netSalary: 41300,
    status: "paid",
    paymentDate: "2024-12-05",
    month: "ธันวาคม 2024",
  },
  {
    id: "PAY-2024-004",
    employeeId: "EMP004",
    employeeName: "สมใจ ดีงาม",
    position: "Designer",
    department: "Marketing",
    baseSalary: 35000,
    bonus: 2500,
    overtime: 1000,
    deductions: 1000,
    netSalary: 37500,
    status: "paid",
    paymentDate: "2024-12-05",
    month: "ธันวาคม 2024",
  },
  {
    id: "PAY-2024-005",
    employeeId: "EMP005",
    employeeName: "สมปอง รักดี",
    position: "Sales Manager",
    department: "Sales",
    baseSalary: 48000,
    bonus: 12000,
    overtime: 0,
    deductions: 2500,
    netSalary: 57500,
    status: "pending",
    paymentDate: "2024-12-20",
    month: "ธันวาคม 2024",
  },
  {
    id: "PAY-2024-006",
    employeeId: "EMP006",
    employeeName: "สมศรี สวยงาม",
    position: "Product Manager",
    department: "Product",
    baseSalary: 52000,
    bonus: 6000,
    overtime: 0,
    deductions: 1800,
    netSalary: 56200,
    status: "pending",
    paymentDate: "2024-12-20",
    month: "ธันวาคม 2024",
  },
]

const months = [
  "ทั้งหมด",
  "ธันวาคม 2024",
  "พฤศจิกายน 2024",
  "ตุลาคม 2024",
  "กันยายน 2024",
]
const departments = ["ทั้งหมด", "IT", "HR", "Finance", "Marketing", "Sales", "Product"]
const statuses = ["ทั้งหมด", "paid", "pending", "processing"]

export default function PayrollPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("ธันวาคม 2024")
  const [selectedDepartment, setSelectedDepartment] = useState("ทั้งหมด")
  const [selectedStatus, setSelectedStatus] = useState("ทั้งหมด")

  // Filter payroll data
  const filteredPayroll = payrollData.filter((item) => {
    const matchesSearch =
      item.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesMonth = selectedMonth === "ทั้งหมด" || item.month === selectedMonth
    const matchesDepartment =
      selectedDepartment === "ทั้งหมด" || item.department === selectedDepartment
    const matchesStatus = selectedStatus === "ทั้งหมด" || item.status === selectedStatus
    return matchesSearch && matchesMonth && matchesDepartment && matchesStatus
  })

  // Calculate stats
  const totalPayroll = filteredPayroll.reduce((sum, item) => sum + item.netSalary, 0)
  const paidCount = filteredPayroll.filter((item) => item.status === "paid").length
  const pendingCount = filteredPayroll.filter((item) => item.status === "pending").length

  const stats = [
    {
      title: "เงินเดือนรวม",
      value: totalPayroll.toLocaleString(),
      unit: "บาท",
      change: "+5.2%",
      icon: Wallet,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "จ่ายแล้ว",
      value: paidCount,
      unit: "คน",
      change: `${((paidCount / filteredPayroll.length) * 100).toFixed(0)}%`,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "รอดำเนินการ",
      value: pendingCount,
      unit: "คน",
      change: "ครบกำหนด 20 ธ.ค.",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      title: "ค่าเฉลี่ย",
      value: (totalPayroll / filteredPayroll.length).toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
      unit: "บาท/คน",
      change: "+3.8%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            จ่ายแล้ว
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            รอดำเนินการ
          </Badge>
        )
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            กำลังดำเนินการ
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Wallet className="w-8 h-8 text-blue-600" />
            รายการเงินเดือน
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            จัดการและติดตามการจ่ายเงินเดือนพนักงาน
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            ส่งออก Excel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Send className="w-4 h-4" />
            จ่ายเงินเดือน
          </Button>
        </div>
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
                  <div className="flex items-baseline gap-2 mt-1">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <span className="text-xs text-gray-500">{stat.unit}</span>
                  </div>
                  <p className={`text-xs mt-1 ${stat.color}`}>{stat.change}</p>
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
                placeholder="ค้นหาพนักงาน (ชื่อ, รหัส, เลขที่จ่าย)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Month Filter */}
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="เดือน" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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
                    {status === "ทั้งหมด" ? status : getStatusBadge(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payroll Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายการเงินเดือน ({filteredPayroll.length} รายการ)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>เลขที่จ่าย</TableHead>
                  <TableHead>พนักงาน</TableHead>
                  <TableHead>แผนก</TableHead>
                  <TableHead className="text-right">เงินเดือนพื้นฐาน</TableHead>
                  <TableHead className="text-right">โบนัส</TableHead>
                  <TableHead className="text-right">OT</TableHead>
                  <TableHead className="text-right">หัก</TableHead>
                  <TableHead className="text-right">รวมสุทธิ</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>วันที่จ่าย</TableHead>
                  <TableHead className="text-right">จัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayroll.length > 0 ? (
                  filteredPayroll.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {item.employeeName}
                          </p>
                          <p className="text-sm text-gray-500">{item.position}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.department}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.baseSalary.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-green-600">
                        +{item.bonus.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-blue-600">
                        +{item.overtime.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-red-600">
                        -{item.deductions.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-gray-900 dark:text-white">
                        {item.netSalary.toLocaleString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {new Date(item.paymentDate).toLocaleDateString("th-TH")}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              ดูรายละเอียด
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="w-4 h-4 mr-2" />
                              พิมพ์สลิป
                            </DropdownMenuItem>
                            {item.status === "pending" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-blue-600">
                                  <Send className="w-4 h-4 mr-2" />
                                  จ่ายเงิน
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center py-8 text-gray-500">
                      <AlertCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p>ไม่พบข้อมูลตามเงื่อนไขที่เลือก</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Summary */}
          {filteredPayroll.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    เงินเดือนพื้นฐานรวม
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {filteredPayroll
                      .reduce((sum, item) => sum + item.baseSalary, 0)
                      .toLocaleString()}{" "}
                    บาท
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">โบนัสรวม</p>
                  <p className="text-lg font-semibold text-green-600">
                    +{filteredPayroll
                      .reduce((sum, item) => sum + item.bonus, 0)
                      .toLocaleString()}{" "}
                    บาท
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">หักรวม</p>
                  <p className="text-lg font-semibold text-red-600">
                    -{filteredPayroll
                      .reduce((sum, item) => sum + item.deductions, 0)
                      .toLocaleString()}{" "}
                    บาท
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">สุทธิรวม</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {totalPayroll.toLocaleString()} บาท
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
