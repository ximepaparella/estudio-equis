"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, DollarSign, TrendingUp, TrendingDown, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for financial transactions
const transactions = [
  {
    id: "1",
    date: "2023-06-15",
    description: "Invoice #INV-2023-001 - Acme Corporation",
    type: "income",
    amount: 8000,
    status: "completed",
  },
  {
    id: "2",
    date: "2023-06-10",
    description: "Office Rent - June",
    type: "expense",
    amount: 2500,
    status: "completed",
  },
  {
    id: "3",
    date: "2023-06-05",
    description: "Invoice #INV-2023-008 - TechGiant Inc.",
    type: "income",
    amount: 6250,
    status: "completed",
  },
  {
    id: "4",
    date: "2023-06-03",
    description: "Software Subscriptions",
    type: "expense",
    amount: 350,
    status: "completed",
  },
  {
    id: "5",
    date: "2023-06-01",
    description: "Team Lunch",
    type: "expense",
    amount: 180,
    status: "completed",
  },
  {
    id: "6",
    date: "2023-05-28",
    description: "Invoice #INV-2023-015 - Acme Corporation",
    type: "income",
    amount: 6250,
    status: "pending",
  },
  {
    id: "7",
    date: "2023-05-25",
    description: "Marketing Campaign",
    type: "expense",
    amount: 1200,
    status: "completed",
  },
  {
    id: "8",
    date: "2023-05-20",
    description: "Invoice #INV-2023-022 - Global Media Group",
    type: "income",
    amount: 9200,
    status: "pending",
  },
]

// Mock data for monthly revenue
const monthlyRevenue = [
  { month: "Jan", revenue: 12500 },
  { month: "Feb", revenue: 15800 },
  { month: "Mar", revenue: 18200 },
  { month: "Apr", revenue: 21000 },
  { month: "May", revenue: 19500 },
  { month: "Jun", revenue: 23700 },
]

// Mock data for expense categories
const expenseCategories = [
  { category: "Rent", amount: 7500 },
  { category: "Salaries", amount: 25000 },
  { category: "Software", amount: 1050 },
  { category: "Marketing", amount: 3600 },
  { category: "Utilities", amount: 850 },
  { category: "Miscellaneous", amount: 1200 },
]

export default function FinancePage() {
  const [period, setPeriod] = useState("month")
  const [transactionType, setTransactionType] = useState("all")

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const netIncome = totalIncome - totalExpenses

  const filteredTransactions = transactions.filter((transaction) => {
    if (transactionType === "all") return true
    return transaction.type === transactionType
  })

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Financial Overview</h1>
          <div className="flex gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Income</p>
                  <p className="text-2xl font-bold">${totalIncome.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
                  <p className="text-2xl font-bold">${totalExpenses.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400">
                  <TrendingDown className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Net Income</p>
                  <p className="text-2xl font-bold">${netIncome.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-end justify-between">
                {monthlyRevenue.map((data, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="relative flex flex-col items-center">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.revenue / 25000) * 200}px` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="w-12 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-md"
                      />
                      <span className="mt-2 text-sm text-gray-500">{data.month}</span>
                    </div>
                    <span className="mt-1 text-xs font-medium">${data.revenue.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>Expenses by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenseCategories.map((category, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{category.category}</span>
                      <span className="text-sm text-gray-500">${category.amount.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(category.amount / 25000) * 100}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your recent financial activity</CardDescription>
            </div>
            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter transactions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="income">Income Only</SelectItem>
                <SelectItem value="expense">Expenses Only</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-medium text-gray-500 dark:text-gray-400">Date</th>
                    <th className="text-left py-3 font-medium text-gray-500 dark:text-gray-400">Description</th>
                    <th className="text-left py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                    <th className="text-right py-3 font-medium text-gray-500 dark:text-gray-400">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <motion.tr
                      key={transaction.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="border-b last:border-b-0"
                    >
                      <td className="py-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-sm">{new Date(transaction.date).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-sm">{transaction.description}</span>
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            transaction.status === "completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}
                        >
                          {transaction.status === "completed" ? "Completed" : "Pending"}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <span
                          className={`text-sm font-medium ${
                            transaction.type === "income"
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
