"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { WeeklyScheduleTimelineWithDnD } from './weekly-schedule-timeline-with-dnd'
import { EnhancedRouteMapWithAssignment } from './enhanced-route-map-with-assignment'
import { EnhancedReportsAndAnalytics } from './enhanced-reports-and-analytics'
import { StaffManagement } from './staff'
import { Accounting } from './accounting'
import { ActiveDeliveryTracker } from './active-delivery-tracker'
import { LayoutDashboard, Calendar, TruckIcon, Users, FileText, DollarSign, Truck, Plus, FileOutput, FileMinus, FileSpreadsheet, FileCheck } from 'lucide-react'
import { NewQuoteForm } from './new-quote-form'
import { NewInvoiceForm } from './new-invoice-form'
import { NewContactForm } from './new-contact-form'

interface Quote {
  number: string;
  ref: string;
  to: string;
  date: string;
  amount: number;
  status: string;
}

interface Invoice {
  number: string;
  ref: string;
  to: string;
  date: string;
  dueDate: string;
  amount: number;
  status: string;
}

type FormType = 'quote' | 'invoice' | 'contact' | null;

export default function LogisticsDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showNewForm, setShowNewForm] = useState<FormType>(null)

  const quotes: Quote[] = [
    { number: 'QT-26350', ref: 'K0M0QGCRR', to: 'Ab-Inbev Namibia (Pty) Ltd', date: '23 Oct 2024', amount: 18500.00, status: 'Pending' },
    { number: 'QT-26349', ref: 'NBL EXCHANGE', to: 'Ab-Inbev Namibia (Pty) Ltd', date: '20 Oct 2024', amount: 6000.00, status: 'Accepted' },
  ]

  const invoices: Invoice[] = [
    { number: 'INL-26348', ref: 'K0M0QGCRR', to: 'Ab-Inbev Namibia (Pty) Ltd', date: '21 Oct 2024', dueDate: '21 Nov 2024', amount: 17039.06, status: 'Draft' },
    { number: 'INL-26347', ref: 'NBL EXCHANGE', to: 'Ab-Inbev Namibia (Pty) Ltd', date: '18 Oct 2024', dueDate: '18 Nov 2024', amount: 5416.50, status: 'Sent' },
    { number: 'INL-26346', ref: 'K0M0T2RRR', to: 'Ab-Inbev Namibia (Pty) Ltd', date: '17 Oct 2024', dueDate: '17 Nov 2024', amount: 33451.87, status: 'Paid' },
  ]

  const handleNewFormOpen = (formType: FormType) => {
    setShowNewForm(formType)
  }

  const handleNewFormClose = () => {
    setShowNewForm(null)
  }

  const renderQuotesTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Number</TableHead>
          <TableHead>Ref</TableHead>
          <TableHead>To</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {quotes.map((quote) => (
          <TableRow key={quote.number}>
            <TableCell>{quote.number}</TableCell>
            <TableCell>{quote.ref}</TableCell>
            <TableCell>{quote.to}</TableCell>
            <TableCell>{quote.date}</TableCell>
            <TableCell>N${quote.amount.toFixed(2)}</TableCell>
            <TableCell>{quote.status}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm">
                <FileCheck className="mr-2 h-4 w-4" />
                Convert to Invoice
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  const renderInvoicesTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Number</TableHead>
          <TableHead>Ref</TableHead>
          <TableHead>To</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.number}>
            <TableCell>{invoice.number}</TableCell>
            <TableCell>{invoice.ref}</TableCell>
            <TableCell>{invoice.to}</TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell>{invoice.dueDate}</TableCell>
            <TableCell>N${invoice.amount.toFixed(2)}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" className="mr-2">
                <FileOutput className="mr-2 h-4 w-4" />
                Send
              </Button>
              <Button variant="outline" size="sm">
                <FileMinus className="mr-2 h-4 w-4" />
                Credit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Logistics Dashboard</CardTitle>
            <CardDescription>Manage your logistics operations efficiently</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="group relative"
                aria-label="Add new item"
              >
                <Truck className="h-4 w-4" />
                <span className="sr-only group-hover:not-sr-only absolute left-0 top-0 flex h-full w-full items-center justify-center bg-background">
                  Add New
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => handleNewFormOpen('quote')}>New Quote</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleNewFormOpen('invoice')}>New Invoice</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleNewFormOpen('contact')}>New Contact</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-7 mb-4">
              <TabsTrigger value="dashboard">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="schedule">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </TabsTrigger>
              <TabsTrigger value="routes">
                <TruckIcon className="w-4 h-4 mr-2" />
                Routes
              </TabsTrigger>
              <TabsTrigger value="staff">
                <Users className="w-4 h-4 mr-2" />
                Staff
              </TabsTrigger>
              <TabsTrigger value="quotes-invoices">
                <FileText className="w-4 h-4 mr-2" />
                Quotes & Invoices
              </TabsTrigger>
              <TabsTrigger value="accounting">
                <DollarSign className="w-4 h-4 mr-2" />
                Accounting
              </TabsTrigger>
              <TabsTrigger value="active-deliveries">
                <Truck className="w-4 h-4 mr-2" />
                Active Deliveries
              </TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard">
              <EnhancedReportsAndAnalytics />
            </TabsContent>
            <TabsContent value="schedule">
              <WeeklyScheduleTimelineWithDnD />
            </TabsContent>
            <TabsContent value="routes">
              <EnhancedRouteMapWithAssignment />
            </TabsContent>
            <TabsContent value="staff">
              <StaffManagement />
            </TabsContent>
            <TabsContent value="quotes-invoices">
              <Card>
                <CardHeader>
                  <CardTitle>Quotes and Invoices</CardTitle>
                  <CardDescription>Manage your quotes and invoices</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="quotes">
                    <TabsList>
                      <TabsTrigger value="quotes">Quotes</TabsTrigger>
                      <TabsTrigger value="invoices">Invoices</TabsTrigger>
                    </TabsList>
                    <TabsContent value="quotes">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Quotes</h3>
                        <Button onClick={() => handleNewFormOpen('quote')}>
                          <Plus className="mr-2 h-4 w-4" /> New Quote
                        </Button>
                      </div>
                      {renderQuotesTable()}
                    </TabsContent>
                    <TabsContent value="invoices">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Invoices</h3>
                        <div>
                          <Button onClick={() => handleNewFormOpen('invoice')} className="mr-2">
                            <Plus className="mr-2 h-4 w-4" /> New Invoice
                          </Button>
                          <Button>
                            <FileSpreadsheet className="mr-2 h-4 w-4" /> Create Statement
                          </Button>
                        </div>
                      </div>
                      {renderInvoicesTable()}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="accounting">
              <Accounting />
            </TabsContent>
            <TabsContent value="active-deliveries">
              <ActiveDeliveryTracker />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={showNewForm !== null} onOpenChange={handleNewFormClose}>
        <DialogContent className="max-w-4xl">
          {showNewForm === 'quote' && <NewQuoteForm onClose={handleNewFormClose} />}
          {showNewForm === 'invoice' && <NewInvoiceForm onClose={handleNewFormClose} />}
          {showNewForm === 'contact' && <NewContactForm onClose={handleNewFormClose} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}