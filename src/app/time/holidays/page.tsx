"use client"

import { useState } from "react"
import {
  Palmtree,
  Calendar,
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Star,
  Building,
  Users,
  Sun,
  Gift,
  Heart,
  Sparkles,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Holiday data
const holidays = [
  {
    id: 1,
    name: "วันคริสต์มาส",
    date: "2024-12-25",
    type: "public",
    status: "upcoming",
    daysLeft: 1,
    description: "วันหยุดสากล",
    icon: Gift,
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-900/20",
  },
  {
    id: 2,
    name: "วันขึ้นปีใหม่",
    date: "2025-01-01",
    type: "public",
    status: "upcoming",
    daysLeft: 8,
    description: "วันหยุดประจำชาติ",
    icon: Sparkles,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
  },
  {
    id: 3,
    name: "วันตรุษจีน",
    date: "2025-01-29",
    type: "public",
    status: "upcoming",
    daysLeft: 36,
    description: "วันหยุดประจำชาติ",
    icon: Star,
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    id: 4,
    name: "วันมาฆบูชา",
    date: "2025-02-12",
    type: "public",
    status: "upcoming",
    daysLeft: 50,
    description: "วันหยุดราชการ",
    icon: Sun,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    id: 5,
    name: "วันจักรี",
    date: "2025-04-06",
    type: "public",
    status: "upcoming",
    daysLeft: 103,
    description: "วันหยุดราชการ",
    icon: Heart,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    id: 6,
    name: "วันสงกรานต์",
    date: "2025-04-13",
    type: "public",
    status: "upcoming",
    daysLeft: 110,
    description: "วันหยุดประจำชาติ",
    icon: Sun,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
  },
  {
    id: 7,
    name: "วันแรงงาน",
    date: "2025-05-01",
    type: "public",
    status: "upcoming",
    daysLeft: 128,
    description: "วันหยุดแรงงาน",
    icon: Building,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    id: 8,
    name: "วันครบรอบบริษัท",
    date: "2025-06-15",
    type: "company",
    status: "upcoming",
    daysLeft: 173,
    description: "วันหยุดบริษัท",
    icon: Building,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
  },
]

// Employee leave stats
const leaveStats = [
  {
    name: "สมชาย ใจดี",
    total: 10,
    used: 3,
    remaining: 7,
    avatar: "ส",
  },
  {
    name: "สมหญิง รักงาน",
    total: 10,
    used: 5,
    remaining: 5,
    avatar: "ส",
  },
  {
    name: "สมศักดิ์ มั่นคง",
    total: 12,
    used: 4,
    remaining: 8,
    avatar: "ส",
  },
  {
    name: "สมใจ ดีงาม",
    total: 10,
    used: 2,
    remaining: 8,
    avatar: "ส",
  },
  {
    name: "สมปอง รักดี",
    total: 10,
    used: 6,
    remaining: 4,
    avatar: "ส",
  },
]

const holidayTypes = [
  { value: "all", label: "ทั้งหมด" },
  { value: "public", label: "วันหยุดราชการ" },
  { value: "company", label: "วันหยุดบริษัท" },
]

export default function HolidaysPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [currentYear, setCurrentYear] = useState(2025)

  const filteredHolidays = holidays.filter((holiday) => {
    const matchesSearch = holiday.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || holiday.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Palmtree className="w-8 h-8 text-orange-600" />
            วันหยุดและการลา
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            จัดการวันหยุดและติดตามการลาของพนักงาน
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          เพิ่มวันหยุด
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {holidays.filter((h) => h.type === "public").length}
                </p>
                <p className="text-sm text-gray-500">วันหยุดราชการ</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20">
                <Building className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {holidays.filter((h) => h.type === "company").length}
                </p>
                <p className="text-sm text-gray-500">วันหยุดบริษัท</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20">
                <Palmtree className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  156
                </p>
                <p className="text-sm text-gray-500">วันลาคงเหลือ</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  3.5
                </p>
                <p className="text-sm text-gray-500">วัน/คน เฉลี่ย</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Year Navigator */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentYear(currentYear - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="font-semibold text-gray-900 dark:text-white text-xl">
                ปี {currentYear}
              </span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentYear(currentYear + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="ค้นหาวันหยุด..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="ประเภท" />
              </SelectTrigger>
              <SelectContent>
                {holidayTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Holidays Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredHolidays.map((holiday) => {
          const HolidayIcon = holiday.icon

          return (
            <Card
              key={holiday.id}
              className="hover:shadow-lg transition-all duration-200 group cursor-pointer"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl ${holiday.bgColor} group-hover:scale-110 transition-transform`}
                  >
                    <HolidayIcon className={`w-6 h-6 ${holiday.color}`} />
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      holiday.type === "public"
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    }
                  >
                    {holiday.type === "public" ? "ราชการ" : "บริษัท"}
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {holiday.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {holiday.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {new Date(holiday.date).toLocaleDateString("th-TH", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                    {holiday.daysLeft} วัน
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Employee Leave Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            สรุปการลาของพนักงาน
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaveStats.map((employee, index) => {
              const usedPercentage = (employee.used / employee.total) * 100
              const remainingPercentage =
                (employee.remaining / employee.total) * 100

              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-semibold">
                        {employee.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {employee.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          ใช้ไป {employee.used} วัน • เหลือ {employee.remaining} วัน
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      {employee.remaining} / {employee.total} วัน
                    </span>
                  </div>
                  <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-full transition-all duration-300"
                      style={{ width: `${usedPercentage}%` }}
                    />
                    <div
                      className="bg-green-600 h-full transition-all duration-300"
                      style={{ width: `${remainingPercentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-gray-900 dark:text-white">
                สถิติการลา
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">ใช้ไปแล้ว</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {leaveStats.reduce((sum, emp) => sum + emp.used, 0)} วัน
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-600" />
                <div>
                  <p className="text-sm text-gray-500">คงเหลือ</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {leaveStats.reduce((sum, emp) => sum + emp.remaining, 0)} วัน
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredHolidays.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Palmtree className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              ไม่พบวันหยุด
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              ลองค้นหาด้วยคำอื่นหรือเปลี่ยนตัวกรอง
            </p>
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              ล้างการค้นหา
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
