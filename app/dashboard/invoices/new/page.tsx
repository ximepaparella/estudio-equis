"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Plus, Trash2, Save, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Mock data for clients
const clients = [
  { id: "1", name: "Acme Corporation" },
  { id: "2", name: "TechGiant Inc." },
  { id: "3", name: "Global Media Group" },
  { id: "4", name: "Startup Ventures" },
  { id: "5", name: "Retail Solutions" },
]

// Mock data for projects
const projects = [
  { id: "p1", name: "Website Redesign", clientId: "1" },
  { id: "p2", name: "Brand Identity Refresh", clientId: "1" },
  { id: "p3", name: "Social Media Campaign", clientId: "1" },
  { id: "p4", name: "Mobile App Development", clientId: "2" },
  { id: "p5", name: "SEO Optimization", clientId: "2" },
  { id: "p6", name: "Content Marketing Strategy", clientId: "3" },
  { id: "p7", name: "E-commerce Platform", clientId: "4" },
  { id: "p8", name: "Product Photography", clientId: "5" },
]

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
}

export default function NewInvoicePage() {
  const searchParams = useSearchParams()
  const clientId = searchParams.get("client")

  const [selectedClient, setSelectedClient] = useState(clientId || "")
  const [selectedProject, setSelectedProject] = useState("")
  const [invoiceNumber, setInvoiceNumber] = useState(
    "INV-2023-" +
      Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0"),
  )
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split("T")[0])
  const [dueDate, setDueDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0])
  const [items, setItems] = useState<InvoiceItem[]>([{ id: "1", description: "", quantity: 1, rate: 0, amount: 0 }])
  const [notes, setNotes] = useState("")

  const filteredProjects = projects.filter((project) => project.clientId === selectedClient)

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }

          // Recalculate amount if quantity or rate changes
          if (field === "quantity" || field === "rate") {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate
          }

          return updatedItem
        }
        return item
      }),
    )
  }

  const addItem = () => {
    const newId = (items.length + 1).toString()
    setItems([...items, { id: newId, description: "", quantity: 1, rate: 0, amount: 0 }])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0)
  const taxRate = 0.1 // 10%
  const tax = subtotal * taxRate
  const total = subtotal + tax

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/invoices">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Create New Invoice</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Client Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client">Client</Label>
                    <Select value={selectedClient} onValueChange={setSelectedClient}>
                      <SelectTrigger id="client">
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="project">Project</Label>
                    <Select value={selectedProject} onValueChange={setSelectedProject} disabled={!selectedClient}>
                      <SelectTrigger id="project">
                        <SelectValue placeholder={selectedClient ? "Select project" : "Select a client first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredProjects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="invoice-number">Invoice Number</Label>
                    <Input
                      id="invoice-number"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="issue-date">Issue Date</Label>
                    <Input
                      id="issue-date"
                      type="date"
                      value={issueDate}
                      onChange={(e) => setIssueDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="due-date">Due Date</Label>
                    <Input id="due-date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Line Items</h2>
                  <Button onClick={addItem} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Item
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium text-gray-500 dark:text-gray-400">Description</th>
                        <th className="text-right py-2 font-medium text-gray-500 dark:text-gray-400">Quantity</th>
                        <th className="text-right py-2 font-medium text-gray-500 dark:text-gray-400">Rate</th>
                        <th className="text-right py-2 font-medium text-gray-500 dark:text-gray-400">Amount</th>
                        <th className="py-2 w-10"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="border-b last:border-b-0"
                        >
                          <td className="py-2 pr-2">
                            <Input
                              placeholder="Item description"
                              value={item.description}
                              onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                            />
                          </td>
                          <td className="py-2 px-2 w-24">
                            <Input
                              type="number"
                              min="1"
                              className="text-right"
                              value={item.quantity}
                              onChange={(e) =>
                                handleItemChange(item.id, "quantity", Number.parseInt(e.target.value) || 0)
                              }
                            />
                          </td>
                          <td className="py-2 px-2 w-32">
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              className="text-right"
                              value={item.rate}
                              onChange={(e) =>
                                handleItemChange(item.id, "rate", Number.parseFloat(e.target.value) || 0)
                              }
                            />
                          </td>
                          <td className="py-2 px-2 w-32 text-right">${item.amount.toFixed(2)}</td>
                          <td className="py-2 pl-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              disabled={items.length === 1}
                            >
                              <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                            </Button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Enter any additional notes or payment instructions"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Send className="mr-2 h-4 w-4" />
                Save and Send
              </Button>
              <Button variant="outline" className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save as Draft
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
