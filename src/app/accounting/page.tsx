"use client"

import Link from "next/link"
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Receipt,
  PieChart,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Stats data
const stats = [
  {
    title: "เงินเดือนเดือนนี้",
    value: "1,250,000",
    unit: "บาท",
    change: "+5.2%",
    changeType: "positive",
    icon: Wallet,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    description: "จ่ายแล้ว 45 คน",
  },
  {
    title: "ค่าใช้จ่ายรวม",
    value: "385,500",
    unit: "บาท",
    change: "+12.3%",
    changeType: "negative",
    icon: Receipt,
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    description: "เดือนนี้",
  },
  {
    title: "รายการรออนุมัติ",
    value: "8",
    unit: "รายการ",
    change: "125,000 บาท",
    changeType: "warning",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    description: "ต้องดำเนินการ",
  },
  {
    title: "งบประมาณคงเหลือ",
    value: "2,750,000",
    unit: "บาท",
    change: "68% ของปี",
    changeType: "positive",
    icon: PieChart,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    description: "ปี 2024",
  },
]

// Recent transactions
const recentTransactions = [
  {
    id: "TXN001",
    type: "payroll",
    description: "เงินเดือนเดือน ธันวาคม 2024",
    amount: 1250000,
    status: "completed",
    date: "2024-12-05",
    category: "เงินเดือน",
  },
  {
    id: "TXN002",
    type: "expense",
    description: "ค่าเช่าสำนักงาน",
    amount: 150000,
    status: "completed",
    date: "2024-12-01",
    category: "สำนักงาน",
  },
  {
    id: "TXN003",
    type: "expense",
    description: "ค่าไฟฟ้า-น้ำประปา",
    amount: 35500,
    status: "completed",
    date: "2024-12-03",
    category: "ยูทิลิตี้",
  },
  {
    id: "TXN004",
    type: "expense",
    description: "ค่าอุปกรณ์สำนักงาน",
    amount: 48000,
    status: "pending",
    date: "2024-12-10",
    category: "อุปกรณ์",
  },
  {
    id: "TXN005",
    type: "expense",
    description: "ค่าเดินทางของพนักงาน",
    amount: 25000,
    status: "pending",
    date: "2024-12-12",
    category: "เดินทาง",
  },
]

// Quick actions
const quickActions = [
  {
    title: "รายการเงินเดือน",
    description: "ดูและจัดการเงินเดือนพนักงาน",
    icon: Wallet,
    href: "/accounting/payroll",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "ค่าใช้จ่าย",
    description: "บันทึกและติดตามค่าใช้จ่าย",
    icon: Receipt,
    href: "/accounting/expenses",
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    title: "รายงานการเงิน",
    description: "ดูรายงานและวิเคราะห์",
    icon: PieChart,
    href: "/accounting/reports",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    title: "งบประมาณ",
    description: "วางแผนและควบคุมงบประมาณ",
    icon: DollarSign,
    href: "/accounting/budget",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
]

export default function AccountingPage() {
  // Get current month in Thai
  const currentMonth = new Date().toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-blue-600" />
            ระบบบัญชีและการเงิน
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            ภาพรวมการเงิน {currentMonth}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Calendar className="w-3 h-3" />
            {currentMonth}
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </span>
                <span className="text-sm text-gray-500">{stat.unit}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">{stat.description}</span>
                <div className="flex items-center gap-1 text-xs">
                  {stat.changeType === "positive" && (
                    <span className="text-green-600 flex items-center gap-0.5">
                      <ArrowUpRight className="w-3 h-3" />
                      {stat.change}
                    </span>
                  )}
                  {stat.changeType === "negative" && (
                    <span className="text-red-600 flex items-center gap-0.5">
                      <ArrowDownRight className="w-3 h-3" />
                      {stat.change}
                    </span>
                  )}
                  {stat.changeType === "warning" && (
                    <span className="text-orange-600">{stat.change}</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => (
          <Link key={action.title} href={action.href}>
            <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group h-full">
              <CardContent className="p-6">
                <div className={`p-3 rounded-xl ${action.bgColor} w-fit mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className={`w-6 h-6 ${action.color}`} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {action.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>รายการล่าสุด</span>
            <Button variant="ghost" size="sm">
              ดูทั้งหมด
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.type === "payroll"
                      ? "bg-blue-100 dark:bg-blue-900/30"
                      : "bg-orange-100 dark:bg-orange-900/30"
                  }`}
                >
                  {transaction.type === "payroll" ? (
                    <Wallet className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Receipt className="w-6 h-6 text-orange-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {transaction.description}
                    </p>
                    <Badge
                      variant="outline"
                      className="text-xs"
                    >
                      {transaction.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {transaction.id}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleDateString("th-TH")}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {transaction.amount.toLocaleString()} บาท
                  </p>
                  <Badge
                    variant={
                      transaction.status === "completed" ? "default" : "secondary"
                    }
                    className={
                      transaction.status === "completed"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }
                  >
                    {transaction.status === "completed" ? "เสร็จสิ้น" : "รอดำเนินการ"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              รายรับ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    รายได้จากธุรกิจ
                  </span>
                  <span className="text-sm font-medium">5,500,000 บาท</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "85%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    รายได้อื่นๆ
                  </span>
                  <span className="text-sm font-medium">850,000 บาท</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "15%" }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900 dark:text-white">
                  รวมรายรับ
                </span>
                <span className="text-xl font-bold text-blue-600">
                  6,350,000 บาท
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-orange-600" />
              รายจ่าย
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    เงินเดือน
                  </span>
                  <span className="text-sm font-medium">1,250,000 บาท</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full"
                    style={{ width: "65%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ค่าใช้จ่ายอื่นๆ
                  </span>
                  <span className="text-sm font-medium">385,500 บาท</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: "35%" }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900 dark:text-white">
                  รวมรายจ่าย
                </span>
                <span className="text-xl font-bold text-orange-600">
                  1,635,500 บาท
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
