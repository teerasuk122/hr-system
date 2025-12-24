"use client"

import { useState } from "react"
import {
  Receipt,
  Download,
  Plus,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
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

// Mock expenses data
const expensesData = [
  {
    id: "EXP-2024-001",
    description: "ค่าเช่าสำนักงาน",
    category: "สำนักงาน",
    amount: 150000,
    submittedBy: "สมชาย ใจดี",
    department: "Admin",
    status: "approved",
    submittedDate: "2024-12-01",
    approvedDate: "2024-12-02",
    paymentDate: "2024-12-05",
    notes: "ค่าเช่าประจำเดือนธันวาคม",
  },
  {
    id: "EXP-2024-002",
    description: "ค่าไฟฟ้า-น้ำประปา",
    category: "ยูทิลิตี้",
    amount: 35500,
    submittedBy: "สมหญิง รักงาน",
    department: "Admin",
    status: "approved",
    submittedDate: "2024-12-02",
    approvedDate: "2024-12-03",
    paymentDate: "2024-12-05",
    notes: "ค่าสาธารณูปโภคประจำเดือน",
  },
  {
    id: "EXP-2024-003",
    description: "ค่าอุปกรณ์สำนักงาน",
    category: "อุปกรณ์",
    amount: 48000,
    submittedBy: "สมศักดิ์ มั่นคง",
    department: "IT",
    status: "pending",
    submittedDate: "2024-12-10",
    approvedDate: null,
    paymentDate: null,
    notes: "คอมพิวเตอร์และอุปกรณ์สำหรับพนักงานใหม่",
  },
  {
    id: "EXP-2024-004",
    description: "ค่าเดินทางของพนักงาน",
    category: "เดินทาง",
    amount: 25000,
    submittedBy: "สมใจ ดีงาม",
    department: "Sales",
    status: "pending",
    submittedDate: "2024-12-12",
    approvedDate: null,
    paymentDate: null,
    notes: "ค่าเดินทางไปประชุมลูกค้า",
  },
  {
    id: "EXP-2024-005",
    description: "ค่าอาหารและเครื่องดื่ม",
    category: "สวัสดิการ",
    amount: 12500,
    submittedBy: "สมปอง รักดี",
    department: "HR",
    status: "approved",
    submittedDate: "2024-12-08",
    approvedDate: "2024-12-09",
    paymentDate: "2024-12-10",
    notes: "งานปาร์ตี้สิ้นปี",
  },
  {
    id: "EXP-2024-006",
    description: "ค่าซ่อมแซมและบำรุงรักษา",
    category: "สำนักงาน",
    amount: 18000,
    submittedBy: "สมศรี สวยงาม",
    department: "Admin",
    status: "rejected",
    submittedDate: "2024-12-05",
    approvedDate: null,
    paymentDate: null,
    notes: "ซ่อมเครื่องปรับอากาศ - ไม่ผ่านอนุมัติ",
  },
  {
    id: "EXP-2024-007",
    description: "ค่าโฆษณาออนไลน์",
    category: "การตลาด",
    amount: 85000,
    submittedBy: "สมชาย ใจดี",
    department: "Marketing",
    status: "approved",
    submittedDate: "2024-12-03",
    approvedDate: "2024-12-04",
    paymentDate: "2024-12-06",
    notes: "แคมเปญโฆษณา Facebook และ Google Ads",
  },
  {
    id: "EXP-2024-008",
    description: "ค่าฝึกอบรมพนักงาน",
    category: "ฝึกอบรม",
    amount: 45000,
    submittedBy: "สมหญิง รักงาน",
    department: "HR",
    status: "processing",
    submittedDate: "2024-12-14",
    approvedDate: "2024-12-15",
    paymentDate: null,
    notes: "อบรมทักษะดิจิทัลสำหรับทีม",
  },
]

const months = [
  "ทั้งหมด",
  "ธันวาคม 2024",
  "พฤศจิกายน 2024",
  "ตุลาคม 2024",
  "กันยายน 2024",
]
const categories = [
  "ทั้งหมด",
  "สำนักงาน",
  "ยูทิลิตี้",
  "อุปกรณ์",
  "เดินทาง",
  "สวัสดิการ",
  "การตลาด",
  "ฝึกอบรม",
]
const statuses = ["ทั้งหมด", "pending", "processing", "approved", "rejected"]

export default function ExpensesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("ธันวาคม 2024")
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด")
  const [selectedStatus, setSelectedStatus] = useState("ทั้งหมด")

  // Filter expenses data
  const filteredExpenses = expensesData.filter((item) => {
    const matchesSearch =
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.submittedBy.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "ทั้งหมด" || item.category === selectedCategory
    const matchesStatus = selectedStatus === "ทั้งหมด" || item.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Calculate stats
  const totalExpenses = filteredExpenses.reduce((sum, item) => sum + item.amount, 0)
  const approvedCount = filteredExpenses.filter((item) => item.status === "approved").length
  const pendingCount = filteredExpenses.filter((item) => item.status === "pending").length
  const rejectedCount = filteredExpenses.filter((item) => item.status === "rejected").length

  const stats = [
    {
      title: "ค่าใช้จ่ายรวม",
      value: totalExpenses.toLocaleString(),
      unit: "บาท",
      change: "+12.3%",
      icon: Receipt,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      title: "อนุมัติแล้ว",
      value: approvedCount,
      unit: "รายการ",
      change: `${((approvedCount / filteredExpenses.length) * 100).toFixed(0)}%`,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "รออนุมัติ",
      value: pendingCount,
      unit: "รายการ",
      change: `${(
        (pendingCount /
          expensesData.filter((item) => item.status === "pending").length) *
        100
      ).toFixed(0)}%`,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      title: "ไม่อนุมัติ",
      value: rejectedCount,
      unit: "รายการ",
      change: `${rejectedCount} รายการ`,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            อนุมัติแล้ว
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            รออนุมัติ
          </Badge>
        )
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            กำลังดำเนินการ
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            ไม่อนุมัติ
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
            <Receipt className="w-8 h-8 text-orange-600" />
            รายการค่าใช้จ่าย
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            จัดการและติดตามค่าใช้จ่ายทั้งหมด
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            ส่งออก Excel
          </Button>
          <Button className="bg-orange-600 hover:bg-orange-700 gap-2">
            <Plus className="w-4 h-4" />
            เพิ่มรายการ
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
                placeholder="ค้นหารายการ (รายละเอียด, เลขที่, ผู้ยื่น)..."
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

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="ประเภท" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
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

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายการค่าใช้จ่าย ({filteredExpenses.length} รายการ)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>เลขที่</TableHead>
                  <TableHead>รายละเอียด</TableHead>
                  <TableHead>ประเภท</TableHead>
                  <TableHead>ผู้ยื่นเรื่อง</TableHead>
                  <TableHead>แผนก</TableHead>
                  <TableHead className="text-right">จำนวนเงิน</TableHead>
                  <TableHead>วันที่ยื่น</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-right">จัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {item.description}
                          </p>
                          {item.notes && (
                            <p className="text-sm text-gray-500 truncate max-w-xs">
                              {item.notes}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{item.submittedBy}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.department}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-gray-900 dark:text-white">
                        {item.amount.toLocaleString()} บาท
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {new Date(item.submittedDate).toLocaleDateString("th-TH")}
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
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
                            {item.status === "pending" && (
                              <>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  แก้ไข
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-green-600">
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  อนุมัติ
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <XCircle className="w-4 h-4 mr-2" />
                                  ไม่อนุมัติ
                                </DropdownMenuItem>
                              </>
                            )}
                            {item.status === "approved" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <FileText className="w-4 h-4 mr-2" />
                                  พิมพ์ใบเสร็จ
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              ลบ
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                        <AlertCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>ไม่พบข้อมูลตามเงื่อนไขที่เลือก</p>
                      </TableCell>
                    </TableRow>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Summary by Category */}
          {filteredExpenses.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                สรุปตามประเภท
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from(new Set(filteredExpenses.map((item) => item.category))).map(
                  (category) => {
                    const categoryTotal = filteredExpenses
                      .filter((item) => item.category === category)
                      .reduce((sum, item) => sum + item.amount, 0)
                    return (
                      <div
                        key={category}
                        className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                      >
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {category}
                        </p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {categoryTotal.toLocaleString()} บาท
                        </p>
                      </div>
                    )
                  }
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
