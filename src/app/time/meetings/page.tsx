"use client"

import { useState } from "react"
import {
  Video,
  Calendar,
  Clock,
  Users,
  MapPin,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  AlertCircle,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Meeting data
const meetings = [
  {
    id: 1,
    title: "Daily Standup",
    date: "2024-12-24",
    time: "09:00 - 09:30",
    room: "ห้องประชุม A",
    type: "team",
    status: "in-progress",
    organizer: {
      name: "สมชาย ใจดี",
      avatar: "ส",
    },
    participants: [
      { name: "สมหญิง รักงาน", avatar: "ส" },
      { name: "สมศักดิ์ มั่นคง", avatar: "ส" },
      { name: "สมใจ ดีงาม", avatar: "ส" },
    ],
    description: "ประชุมรายวันของทีมพัฒนา",
  },
  {
    id: 2,
    title: "Client Presentation",
    date: "2024-12-24",
    time: "10:00 - 11:30",
    room: "ห้องประชุม B",
    type: "client",
    status: "upcoming",
    organizer: {
      name: "สมหญิง รักงาน",
      avatar: "ส",
    },
    participants: [
      { name: "ลูกค้า A", avatar: "ล" },
      { name: "ลูกค้า B", avatar: "ล" },
    ],
    description: "นำเสนอโปรเจกต์ให้ลูกค้า",
  },
  {
    id: 3,
    title: "Team Planning",
    date: "2024-12-24",
    time: "14:00 - 15:30",
    room: "ห้องประชุม C",
    type: "planning",
    status: "upcoming",
    organizer: {
      name: "สมศักดิ์ มั่นคง",
      avatar: "ส",
    },
    participants: [
      { name: "สมชาย ใจดี", avatar: "ส" },
      { name: "สมหญิง รักงาน", avatar: "ส" },
      { name: "สมใจ ดีงาม", avatar: "ส" },
      { name: "สมปอง รักดี", avatar: "ส" },
    ],
    description: "วางแผนงานสำหรับ Sprint ถัดไป",
  },
  {
    id: 4,
    title: "Code Review",
    date: "2024-12-24",
    time: "16:00 - 17:00",
    room: "Online",
    type: "technical",
    status: "upcoming",
    organizer: {
      name: "สมใจ ดีงาม",
      avatar: "ส",
    },
    participants: [
      { name: "สมชาย ใจดี", avatar: "ส" },
      { name: "สมศักดิ์ มั่นคง", avatar: "ส" },
    ],
    description: "รีวิวโค้ดของสัปดาห์นี้",
  },
  {
    id: 5,
    title: "HR Policy Review",
    date: "2024-12-25",
    time: "10:00 - 12:00",
    room: "ห้องประชุม A",
    type: "internal",
    status: "scheduled",
    organizer: {
      name: "สมหญิง รักงาน",
      avatar: "ส",
    },
    participants: [
      { name: "ทีม HR", avatar: "ท" },
      { name: "ทีมบริหาร", avatar: "ท" },
    ],
    description: "ทบทวนนโยบายบริษัท",
  },
  {
    id: 6,
    title: "Monthly All Hands",
    date: "2024-12-26",
    time: "15:00 - 16:30",
    room: "ห้องใหญ่",
    type: "company",
    status: "scheduled",
    organizer: {
      name: "CEO",
      avatar: "C",
    },
    participants: [{ name: "พนักงานทุกคน", avatar: "พ" }],
    description: "ประชุมใหญ่ประจำเดือน",
  },
]

const meetingTypes = [
  { value: "all", label: "ทั้งหมด" },
  { value: "team", label: "ทีม" },
  { value: "client", label: "ลูกค้า" },
  { value: "planning", label: "วางแผน" },
  { value: "technical", label: "เทคนิค" },
  { value: "internal", label: "ภายใน" },
  { value: "company", label: "บริษัท" },
]

const statusColors: Record<string, { badge: string; label: string; icon: typeof CheckCircle }> = {
  "in-progress": {
    badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    label: "กำลังประชุม",
    icon: CheckCircle,
  },
  upcoming: {
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    label: "กำลังจะถึง",
    icon: Clock,
  },
  scheduled: {
    badge: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
    label: "กำหนดการ",
    icon: Calendar,
  },
  cancelled: {
    badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    label: "ยกเลิก",
    icon: AlertCircle,
  },
}

export default function MeetingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch =
      meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.organizer.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || meeting.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Video className="w-8 h-8 text-blue-600" />
            จัดการห้องประชุม
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            ดูและจัดการการประชุมทั้งหมด
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          สร้างการประชุม
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                <Video className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {meetings.filter((m) => m.status === "in-progress").length}
                </p>
                <p className="text-sm text-gray-500">กำลังประชุม</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {meetings.filter((m) => m.status === "upcoming").length}
                </p>
                <p className="text-sm text-gray-500">วันนี้</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {meetings.filter((m) => m.status === "scheduled").length}
                </p>
                <p className="text-sm text-gray-500">กำหนดการ</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  5
                </p>
                <p className="text-sm text-gray-500">ห้องประชุม</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="ค้นหาการประชุม..."
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
                {meetingTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Meetings List */}
      <div className="grid gap-4">
        {filteredMeetings.map((meeting) => {
          const statusConfig = statusColors[meeting.status]
          const StatusIcon = statusConfig.icon

          return (
            <Card
              key={meeting.id}
              className="hover:shadow-lg transition-all duration-200"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`p-3 rounded-xl ${
                      meeting.status === "in-progress"
                        ? "bg-green-50 dark:bg-green-900/20"
                        : "bg-blue-50 dark:bg-blue-900/20"
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

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {meeting.title}
                          </h3>
                          <Badge className={statusConfig.badge}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig.label}
                          </Badge>
                          <Badge variant="outline">{meeting.type}</Badge>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {meeting.description}
                        </p>
                      </div>

                      {/* Actions */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            แก้ไข
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            คัดลอก
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            ยกเลิก
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Details */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(meeting.date).toLocaleDateString("th-TH", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {meeting.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {meeting.room}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {meeting.participants.length + 1} คน
                      </div>
                    </div>

                    {/* Participants */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">ผู้เข้าร่วม:</span>
                      <div className="flex items-center -space-x-2">
                        <Avatar className="w-8 h-8 border-2 border-white dark:border-gray-900">
                          <AvatarFallback className="bg-blue-500 text-white text-xs">
                            {meeting.organizer.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {meeting.participants.slice(0, 3).map((participant, idx) => (
                          <Avatar
                            key={idx}
                            className="w-8 h-8 border-2 border-white dark:border-gray-900"
                          >
                            <AvatarFallback className="bg-purple-500 text-white text-xs">
                              {participant.avatar}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {meeting.participants.length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs font-medium">
                            +{meeting.participants.length - 3}
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        จัดโดย: {meeting.organizer.name}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredMeetings.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              ไม่พบการประชุม
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
