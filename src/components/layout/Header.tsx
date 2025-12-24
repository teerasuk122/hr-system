"use client"

import { useState } from "react"
import {
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  className?: string
}

// Mock notifications
const notifications = [
  { id: 1, title: "ใบลาใหม่", desc: "สมชาย ขอลาป่วย 2 วัน", time: "5 นาทีที่แล้ว", unread: true },
  { id: 2, title: "อนุมัติแล้ว", desc: "ใบลาของคุณได้รับการอนุมัติ", time: "1 ชั่วโมงที่แล้ว", unread: true },
  { id: 3, title: "ประชุมทีม", desc: "นัดประชุมวันพรุ่งนี้ 10:00", time: "3 ชั่วโมงที่แล้ว", unread: false },
]

export function Header({ className }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex items-center justify-between gap-4 px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800",
        className
      )}
    >
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="search"
            placeholder="ค้นหาพนักงาน, เอกสาร..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-xl">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="px-4 py-3 border-b">
              <h3 className="font-semibold">การแจ้งเตือน</h3>
              <p className="text-sm text-gray-500">{unreadCount} รายการใหม่</p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notif) => (
                <DropdownMenuItem
                  key={notif.id}
                  className={cn(
                    "flex flex-col items-start gap-1 p-4 cursor-pointer",
                    notif.unread && "bg-blue-50 dark:bg-blue-900/20"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{notif.title}</span>
                    {notif.unread && (
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{notif.desc}</p>
                  <p className="text-xs text-gray-400">{notif.time}</p>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-blue-600 font-medium">
              ดูทั้งหมด
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings */}
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 rounded-xl px-2"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src="/avatar.png" />
                <AvatarFallback className="bg-blue-500 text-white text-sm">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-gray-500">ผู้ดูแลระบบ</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-4 py-3 border-b">
              <p className="font-medium">Admin</p>
              <p className="text-sm text-gray-500">admin@hr.com</p>
            </div>
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              โปรไฟล์
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              ตั้งค่า
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              ออกจากระบบ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Header
