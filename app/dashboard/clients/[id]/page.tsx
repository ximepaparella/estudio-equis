"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Edit, Trash2, Plus, FileText, Calendar, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Mock data for client details
const clientData = {
  id: "1",
  name: "Acme Corporation",
  logo: "/placeholder.svg?height=100&width=100",
  contact: "John Smith",
  email: "john@acmecorp.com",
  phone: "+1 (555) 123-4567",
  address: "123 Business Ave, Suite 100, San Francisco, CA 94107",
  website: "https://acmecorp.example.com",
  status: "Active",
  industry: "Technology",
  notes:
    "Acme Corporation is a long-term client with multiple ongoing projects. They prefer weekly updates and have a dedicated team on their account.",
  joinedDate: "January 15, 2022",
  projects: [
    {
      id: "p1",
      name: "Website Redesign",
      status: "In Progress",
      dueDate: "June 30, 2023",
      budget: "$12,500",
      completion: 65,
    },
    {
      id: "p2",
      name: "Brand Identity Refresh",
      status: "Completed",
      dueDate: "March 15, 2023",
      budget: "$8,000",
      completion: 100,
    },
    {
      id: "p3",
      name: "Social Media Campaign",
      status: "Planning",
      dueDate: "August 1, 2023",
      budget: "$4,000",
      completion: 10,
    },
  ],
  invoices: [
    {
      id: "inv1",
      number: "INV-2023-001",
      date: "February 15, 2023",
      amount: "$8,000",
      status: "Paid",
    },
    {
      id: "inv2",
      number: "INV-2023-008",
      date: "April 1, 2023",
      amount: "$6,250",
      status: "Paid",
    },
    {
      id: "inv3",
      number: "INV-2023-015",
      date: "May 15, 2023",
      amount: "$6,250",
      status: "Pending",
    },
  ],
  contacts: [
    {
      id: "c1",
      name: "John Smith",
      position: "CEO",
      email: "john@acmecorp.com",
      phone: "+1 (555) 123-4567",
      primary: true,
    },
    {
      id: "c2",
      name: "Sarah Johnson",
      position: "Marketing Director",
      email: "sarah@acmecorp.com",
      phone: "+1 (555) 987-6543",
      primary: false,
    },
    {
      id: "c3",
      name: "Michael Brown",
      position: "Project Manager",
      email: "michael@acmecorp.com",
      phone: "+1 (555) 456-7890",
      primary: false,
    },
  ],
}

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const [isEditClientOpen, setIsEditClientOpen] = useState(false)
  const [isAddContactOpen, setIsAddContactOpen] = useState(false)
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false)

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/clients">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{clientData.name}</h1>
          <Badge variant={clientData.status === "Active" ? "success" : "secondary"}>{clientData.status}</Badge>
          <div className="ml-auto flex gap-2">
            <Dialog open={isEditClientOpen} onOpenChange={setIsEditClientOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Client
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Edit Client</DialogTitle>
                  <DialogDescription>
                    Make changes to the client information. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Company Name
                    </Label>
                    <Input id="name" defaultValue={clientData.name} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="industry" className="text-right">
                      Industry
                    </Label>
                    <Input id="industry" defaultValue={clientData.industry} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="website" className="text-right">
                      Website
                    </Label>
                    <Input id="website" defaultValue={clientData.website} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">
                      Address
                    </Label>
                    <Textarea id="address" defaultValue={clientData.address} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">
                      Notes
                    </Label>
                    <Textarea id="notes" defaultValue={clientData.notes} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => setIsEditClientOpen(false)}>
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Industry</h3>
                    <p className="mt-1">{clientData.industry}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</h3>
                    <p className="mt-1">
                      <a
                        href={clientData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {clientData.website}
                      </a>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</h3>
                    <p className="mt-1">{clientData.address}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Client Since</h3>
                    <p className="mt-1">{clientData.joinedDate}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</h3>
                    <p className="mt-1 text-sm">{clientData.notes}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Client Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Projects</div>
                  <div className="text-2xl font-bold">{clientData.projects.length}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Projects</div>
                  <div className="text-2xl font-bold">
                    {clientData.projects.filter((p) => p.status === "In Progress" || p.status === "Planning").length}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Invoiced</div>
                  <div className="text-2xl font-bold">
                    $
                    {clientData.invoices
                      .reduce((sum, inv) => sum + Number.parseFloat(inv.amount.replace("$", "").replace(",", "")), 0)
                      .toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Outstanding</div>
                  <div className="text-2xl font-bold">
                    $
                    {clientData.invoices
                      .filter((inv) => inv.status === "Pending")
                      .reduce((sum, inv) => sum + Number.parseFloat(inv.amount.replace("$", "").replace(",", "")), 0)
                      .toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="contacts">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>

          <TabsContent value="contacts" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Contacts</h2>
              <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Contact
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Add New Contact</DialogTitle>
                    <DialogDescription>
                      Add a new contact for this client. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="contact-name" className="text-right">
                        Name
                      </Label>
                      <Input id="contact-name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="position" className="text-right">
                        Position
                      </Label>
                      <Input id="position" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="contact-email" className="text-right">
                        Email
                      </Label>
                      <Input id="contact-email" type="email" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="contact-phone" className="text-right">
                        Phone
                      </Label>
                      <Input id="contact-phone" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={() => setIsAddContactOpen(false)}>
                      Save Contact
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clientData.contacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-4">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${contact.name.charAt(0)}`} />
                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-medium">{contact.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{contact.position}</p>
                          </div>
                        </div>
                        {contact.primary && (
                          <Badge variant="outline" className="ml-2">
                            Primary
                          </Badge>
                        )}
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm">
                          <span className="text-gray-500 dark:text-gray-400 mr-2">Email:</span>
                          <span>{contact.email}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="text-gray-500 dark:text-gray-400 mr-2">Phone:</span>
                          <span>{contact.phone}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Projects</h2>
              <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Add New Project</DialogTitle>
                    <DialogDescription>
                      Create a new project for this client. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="project-name" className="text-right">
                        Project Name
                      </Label>
                      <Input id="project-name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="project-status" className="text-right">
                        Status
                      </Label>
                      <Input id="project-status" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="due-date" className="text-right">
                        Due Date
                      </Label>
                      <Input id="due-date" type="date" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="budget" className="text-right">
                        Budget
                      </Label>
                      <Input id="budget" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={() => setIsAddProjectOpen(false)}>
                      Create Project
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {clientData.projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">{project.name}</h3>
                          <div className="flex items-center mt-1">
                            <Badge
                              variant={
                                project.status === "Completed"
                                  ? "success"
                                  : project.status === "In Progress"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {project.status}
                            </Badge>
                            <span className="mx-2 text-gray-400">•</span>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Calendar className="h-4 w-4 mr-1" />
                              Due: {project.dueDate}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center">
                          <div className="text-right mr-4">
                            <div className="text-sm text-gray-500 dark:text-gray-400">Budget</div>
                            <div className="font-medium">{project.budget}</div>
                          </div>
                          <Link href={`/dashboard/projects/${project.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Completion</span>
                          <span className="text-sm font-medium">{project.completion}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${project.completion}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="invoices" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Invoices</h2>
              <Link href={`/dashboard/invoices/new?client=${clientData.id}`}>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Invoice
                </Button>
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Invoice #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {clientData.invoices.map((invoice) => (
                      <motion.tr
                        key={invoice.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-gray-400" />
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{invoice.number}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {invoice.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {invoice.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`flex items-center text-sm font-medium ${
                              invoice.status === "Paid"
                                ? "text-green-600 dark:text-green-400"
                                : "text-amber-600 dark:text-amber-400"
                            }`}
                          >
                            {invoice.status === "Paid" ? (
                              <CheckCircle className="h-4 w-4 mr-1" />
                            ) : (
                              <Clock className="h-4 w-4 mr-1" />
                            )}
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/dashboard/invoices/${invoice.id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
