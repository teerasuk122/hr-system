"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Calculator,
  Clock,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Moon,
  Sun,
  LogOut,
  Settings,
  User,
  Menu,
  X,
  UserCheck,
  FileText,
  CalendarDays,
  Wallet,
  Receipt,
  Video,
  CalendarCheck,
  Palmtree,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

// Navigation items
const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "HR",
    href: "/hr",
    icon: Users,
    submenu: [
      { title: "พนักงาน", href: "/hr/employees", icon: UserCheck },
      { title: "การลา", href: "/hr/leave", icon: FileText },
      { title: "เวลาเข้างาน", href: "/hr/attendance", icon: CalendarDays },
    ],
  },
  {
    title: "Accounting",
    href: "/accounting",
    icon: Calculator,
    submenu: [
      { title: "เงินเดือน", href: "/accounting/payroll", icon: Wallet },
      { title: "ค่าใช้จ่าย", href: "/accounting/expenses", icon: Receipt },
    ],
  },
  {
    title: "Time Management",
    href: "/time",
    icon: Clock,
    submenu: [
      { title: "รายการประชุม", href: "/time/meetings", icon: Video },
      { title: "ตารางงาน", href: "/time/schedules", icon: CalendarCheck },
      { title: "วันหยุด", href: "/time/holidays", icon: Palmtree },
    ],
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["HR", "Accounting", "Time Management"])
  const [darkMode, setDarkMode] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Toggle submenu
  const toggleSubmenu = (title: string) => {
    setExpandedMenus((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    )
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  // Check if path is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  // Sidebar content
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500 text-white font-bold text-lg">
          HR
        </div>
        {!collapsed && (
          <span className="font-semibold text-lg text-gray-800 dark:text-white">
            HR System
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => (
            <div key={item.title}>
              {item.submenu ? (
                // Menu with submenu
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => !collapsed && toggleSubmenu(item.title)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                          isActive(item.href)
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        )}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 text-left">{item.title}</span>
                            {expandedMenus.includes(item.title) ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </>
                        )}
                      </button>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">
                        {item.title}
                      </TooltipContent>
                    )}
                  </Tooltip>

                  {/* Submenu items */}
                  {!collapsed && expandedMenus.includes(item.title) && (
                    <div className="mt-1 ml-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                            isActive(subItem.href)
                              ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                              : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                          )}
                        >
                          <subItem.icon className="w-4 h-4" />
                          <span>{subItem.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                // Regular menu item
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive(item.href)
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                          : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                      )}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      {item.title}
                    </TooltipContent>
                  )}
                </Tooltip>
              )}
            </div>
          ))}
        </TooltipProvider>
      </nav>

      {/* Footer */}
      <div className="border-t p-3 space-y-3">
        {/* Dark Mode Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size={collapsed ? "icon" : "default"}
              onClick={toggleDarkMode}
              className={cn(
                "w-full justify-start gap-3 rounded-xl",
                collapsed && "justify-center"
              )}
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
              {!collapsed && (
                <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
              )}
            </Button>
          </TooltipTrigger>
          {collapsed && (
            <TooltipContent side="right">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </TooltipContent>
          )}
        </Tooltip>

        <Separator />

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 rounded-xl h-auto py-2",
                collapsed && "justify-center px-2"
              )}
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src="/avatar.png" />
                <AvatarFallback className="bg-blue-500 text-white text-sm">
                  AD
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">Admin</p>
                  <p className="text-xs text-gray-500">admin@hr.com</p>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
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
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-40",
          collapsed ? "w-[72px]" : "w-64",
          className
        )}
      >
        <SidebarContent />

        {/* Collapse Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-7 w-6 h-6 rounded-full border bg-white dark:bg-gray-800 shadow-md hover:shadow-lg"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed left-4 top-4 z-50 bg-white dark:bg-gray-800 shadow-md rounded-xl"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Spacer for main content */}
      <div
        className={cn(
          "hidden lg:block transition-all duration-300",
          collapsed ? "w-[72px]" : "w-64"
        )}
      />
    </>
  )
}

export default Sidebar
