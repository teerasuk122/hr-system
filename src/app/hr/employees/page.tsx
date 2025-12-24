"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Users,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

// Mock employee data
const employees = [
  {
    id: "EMP001",
    name: "สมชาย ใจดี",
    position: "Senior Developer",
    department: "IT",
    email: "somchai@company.com",
    phone: "081-234-5678",
    status: "active",
    joinDate: "2022-01-15",
    avatar: null,
  },
  {
    id: "EMP002",
    name: "สมหญิง รักงาน",
    position: "HR Manager",
    department: "HR",
    email: "somying@company.com",
    phone: "082-345-6789",
    status: "active",
    joinDate: "2021-06-20",
    avatar: null,
  },
  {
    id: "EMP003",
    name: "สมศักดิ์ มั่นคง",
    position: "Accountant",
    department: "Finance",
    email: "somsak@company.com",
    phone: "083-456-7890",
    status: "active",
    joinDate: "2023-03-10",
    avatar: null,
  },
  {
    id: "EMP004",
    name: "สมใจ ดีงาม",
    position: "Designer",
    department: "Marketing",
    email: "somjai@company.com",
    phone: "084-567-8901",
    status: "active",
    joinDate: "2022-09-05",
    avatar: null,
  },
  {
    id: "EMP005",
    name: "สมปอง รักดี",
    position: "Sales Manager",
    department: "Sales",
    email: "sompong@company.com",
    phone: "085-678-9012",
    status: "leave",
    joinDate: "2020-11-25",
    avatar: null,
  },
  {
    id: "EMP006",
    name: "สมศรี สวยงาม",
    position: "Product Manager",
    department: "Product",
    email: "somsri@company.com",
    phone: "086-789-0123",
    status: "active",
    joinDate: "2021-08-14",
    avatar: null,
  },
]

const departments = ["All", "IT", "HR", "Finance", "Marketing", "Sales", "Product"]
const statuses = ["All", "active", "leave", "inactive"]

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")

  // Filter employees
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment =
      selectedDepartment === "All" || emp.department === selectedDepartment
    const matchesStatus = selectedStatus === "All" || emp.status === selectedStatus
    return matchesSearch && matchesDepartment && matchesStatus
  })

  // Stats
  const stats = [
    {
      title: "พนักงานทั้งหมด",
      value: employees.length,
      change: "+3",
      changeType: "positive",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "ทำงานอยู่",
      value: employees.filter((e) => e.status === "active").length,
      change: "95%",
      changeType: "positive",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "ลา",
      value: employees.filter((e) => e.status === "leave").length,
      change: "2 คน",
      changeType: "warning",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      title: "แผนก",
      value: new Set(employees.map((e) => e.department)).size,
      change: "Active",
      changeType: "neutral",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            จัดการพนักงาน
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            รายชื่อพนักงานทั้งหมด {filteredEmployees.length} คน
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Plus className="w-4 h-4" />
          เพิ่มพนักงานใหม่
        </Button>
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
                  <p className={`text-xs mt-1 ${stat.color}`}>{stat.change}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Users className={`w-5 h-5 ${stat.color}`} />
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
                placeholder="ค้นหาพนักงาน (ชื่อ, รหัส, ตำแหน่ง)..."
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
                    {status === "All" ? "ทุกสถานะ" : status}
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

      {/* Employee Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((employee) => (
          <Card
            key={employee.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={employee.avatar || undefined} />
                    <AvatarFallback className="bg-blue-500 text-white">
                      {employee.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">
                      <Link
                        href={`/hr/employees/${employee.id}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {employee.name}
                      </Link>
                    </CardTitle>
                    <p className="text-sm text-gray-500">{employee.id}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/hr/employees/${employee.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        ดูรายละเอียด
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      แก้ไข
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      ลบ
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium">{employee.position}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {employee.department}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {employee.email}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {employee.phone}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  เริ่มงาน: {new Date(employee.joinDate).toLocaleDateString("th-TH")}
                </span>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <Badge
                  variant={employee.status === "active" ? "default" : "secondary"}
                  className={
                    employee.status === "active"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                  }
                >
                  {employee.status === "active" ? "ทำงานอยู่" : "ลา"}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Link href={`/hr/employees/${employee.id}`}>
                    ดูรายละเอียด →
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredEmployees.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              ไม่พบพนักงาน
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              ลองเปลี่ยนเงื่อนไขการค้นหาหรือเพิ่มพนักงานใหม่
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มพนักงานใหม่
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
