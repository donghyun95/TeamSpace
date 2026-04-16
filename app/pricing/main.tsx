/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
'use client';
import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Receipt,
  Layers,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  CheckCircle2,
  Mail,
  Download,
  Lightbulb,
  Calendar,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', active: false },
  { icon: Users, label: 'Customers', active: false },
  { icon: CreditCard, label: 'Subscriptions', active: false },
  { icon: Receipt, label: 'Invoices', active: false },
  { icon: Layers, label: 'Plans', active: false },
  { icon: Settings, label: 'Settings', active: true },
];

const BILLING_HISTORY = [
  {
    date: 'Oct 12, 2023',
    plan: 'Pro Monthly',
    amount: '$15.00',
    status: 'PAID',
  },
  {
    date: 'Sep 12, 2023',
    plan: 'Pro Monthly',
    amount: '$15.00',
    status: 'PAID',
  },
  {
    date: 'Aug 12, 2023',
    plan: 'Pro Monthly',
    amount: '$15.00',
    status: 'PAID',
  },
];

export default function App() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'monthly',
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r bg-card px-6 py-6 lg:flex">
          <div className="mb-10 flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Layers className="h-5 w-5 fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              TeamSpace Billing
            </span>
          </div>

          <nav className="flex-1 space-y-1">
            {NAV_ITEMS.map((item) => (
              <motion.a
                key={item.label}
                href="#"
                whileHover={{ x: 4 }}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  item.active
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <item.icon
                  className={cn(
                    'h-4 w-4',
                    item.active ? 'text-primary' : 'text-muted-foreground',
                  )}
                />
                {item.label}
              </motion.a>
            ))}
          </nav>

          <div className="mt-auto space-y-1 border-t pt-6">
            <a
              href="#"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <HelpCircle className="h-4 w-4" />
              Help Center
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </a>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-2xl border bg-primary/5 p-5"
            >
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Pro Plan
              </p>
              <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
                Unlock advanced analytics and API access.
              </p>
              <Button size="sm" className="w-full rounded-xl font-semibold">
                Upgrade Plan
              </Button>
            </motion.div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 lg:ml-64">
          {/* Header */}
          <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b bg-background/80 px-6 backdrop-blur lg:px-10">
            <h1 className="text-xl font-bold">Billing Center</h1>

            <div className="flex items-center gap-4 lg:gap-6">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  className="w-72 rounded-2xl border-0 bg-muted pl-10 shadow-none focus-visible:ring-2"
                />
              </div>

              <Button variant="ghost" size="icon" className="rounded-2xl">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </Button>

              <Avatar className="h-10 w-10 border shadow-sm">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="mx-auto grid max-w-7xl grid-cols-12 gap-8 p-6 lg:gap-10 lg:p-10">
            {/* Left */}
            <div className="col-span-12 space-y-12 lg:col-span-8">
              {/* Current Plan */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-[2rem] border bg-muted/50 p-8 lg:p-10"
              >
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

                <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                  <div>
                    <Badge className="mb-4 border-0 bg-lime-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-lime-800 hover:bg-lime-100">
                      Current Zone
                    </Badge>
                    <h2 className="mb-3 text-4xl font-extrabold tracking-tight">
                      Free Tier
                    </h2>
                    <p className="max-w-md leading-relaxed text-muted-foreground">
                      You're currently using the basic version of TeamSpace.
                      Unlock the full potential of collaborative billing.
                    </p>
                  </div>

                  <Card className="min-w-[240px] rounded-3xl border-0 bg-background p-8 text-center shadow-lg">
                    <p className="mb-1 text-sm font-medium text-muted-foreground">
                      Next charge
                    </p>
                    <p className="mb-6 text-2xl font-bold">N/A</p>
                    <Button className="w-full rounded-2xl py-6 font-semibold">
                      Upgrade to Pro
                    </Button>
                  </Card>
                </div>
              </motion.section>

              {/* Compare Plans */}
              <section>
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <h3 className="text-2xl font-bold">Compare Plans</h3>

                  <div className="flex rounded-2xl bg-muted p-1.5">
                    <button
                      onClick={() => setBillingCycle('monthly')}
                      className={cn(
                        'rounded-xl px-6 py-2 text-sm font-bold transition-colors',
                        billingCycle === 'monthly'
                          ? 'bg-background text-primary shadow-sm'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setBillingCycle('yearly')}
                      className={cn(
                        'rounded-xl px-6 py-2 text-sm font-bold transition-colors',
                        billingCycle === 'yearly'
                          ? 'bg-background text-primary shadow-sm'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      Yearly (Save 20%)
                    </button>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <Card className="flex flex-col rounded-[2rem] border p-8 shadow-sm">
                    <CardHeader className="mb-8 p-0">
                      <CardTitle className="mb-2 text-lg font-bold">
                        Standard
                      </CardTitle>
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-extrabold">$0</span>
                        <span className="text-sm font-medium text-muted-foreground">
                          /mo
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 p-0">
                      <ul className="space-y-5">
                        {[
                          '3 Active Projects',
                          'Basic Analytics',
                          'Community Support',
                        ].map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-3 text-sm text-muted-foreground"
                          >
                            <CheckCircle2 className="h-5 w-5 text-lime-600" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <Button
                      variant="secondary"
                      className="mt-10 w-full cursor-default rounded-2xl py-6 font-bold"
                    >
                      Current Plan
                    </Button>
                  </Card>

                  <Card className="relative flex flex-col rounded-[2rem] border-2 border-primary p-8 shadow-lg">
                    <div className="absolute right-0 top-0 rounded-bl-2xl bg-primary px-6 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground">
                      Recommended
                    </div>

                    <CardHeader className="mb-8 p-0">
                      <CardTitle className="mb-2 text-lg font-bold">
                        Professional
                      </CardTitle>
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-extrabold">$15</span>
                        <span className="text-sm font-medium text-muted-foreground">
                          /mo
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 p-0">
                      <ul className="space-y-5">
                        {[
                          'Unlimited Projects',
                          'Real-time Performance Data',
                          'Priority 24/7 Support',
                          'Advanced API Hooks',
                        ].map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-3 text-sm font-medium"
                          >
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <Button className="mt-10 w-full rounded-2xl py-6 font-bold">
                      Upgrade to Pro
                    </Button>
                  </Card>
                </div>
              </section>

              {/* Payment Method */}
              <section>
                <h3 className="mb-8 text-2xl font-bold">Payment Method</h3>

                <div className="flex flex-col items-center gap-10 rounded-[2rem] border bg-muted/30 p-8 lg:flex-row lg:p-10">
                  <motion.div
                    whileHover={{ rotateY: 5, rotateX: -5 }}
                    className="relative aspect-[1.6/1] w-full max-w-[360px] overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-900 p-8 text-white shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />

                    <div className="relative z-10 flex h-full flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <CreditCard className="h-10 w-10 opacity-80" />
                        <div className="text-xl font-black italic tracking-tighter opacity-90">
                          VISA
                        </div>
                      </div>

                      <div>
                        <p className="mb-1 text-[10px] font-bold tracking-[0.2em] opacity-40">
                          CARD HOLDER
                        </p>
                        <p className="text-lg font-bold tracking-tight">
                          ALEXANDRA STERLING
                        </p>
                      </div>

                      <div className="flex items-end justify-between">
                        <p className="text-xl font-bold tracking-[0.25em]">
                          •••• •••• •••• 4242
                        </p>
                        <p className="text-sm font-medium opacity-80">12/26</p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="w-full flex-1 space-y-5">
                    <div className="flex items-center justify-between rounded-2xl border bg-card p-5 shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">Billing Email</p>
                          <p className="text-xs text-muted-foreground">
                            alexandra@workspace.com
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-bold text-primary"
                      >
                        Edit
                      </Button>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        variant="secondary"
                        className="flex-1 rounded-2xl py-6 font-bold"
                      >
                        Update Card
                      </Button>
                      <Button
                        variant="ghost"
                        className="rounded-2xl px-8 py-6 font-bold text-muted-foreground hover:text-destructive"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Billing History */}
              <section>
                <div className="mb-8 flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Billing History</h3>
                  <Button
                    variant="ghost"
                    className="gap-2 font-bold text-primary"
                  >
                    Download All <Download className="h-4 w-4" />
                  </Button>
                </div>

                <Card className="overflow-hidden rounded-[2rem] border shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-none bg-muted/50 hover:bg-muted/50">
                        <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                          Date
                        </TableHead>
                        <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                          Plan
                        </TableHead>
                        <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                          Amount
                        </TableHead>
                        <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                          Status
                        </TableHead>
                        <TableHead className="px-8 py-5 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                          Receipt
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {BILLING_HISTORY.map((item, i) => (
                        <TableRow
                          key={i}
                          className="border-border/50 transition-colors hover:bg-muted/30"
                        >
                          <TableCell className="px-8 py-6 font-medium">
                            {item.date}
                          </TableCell>
                          <TableCell className="px-8 py-6 text-muted-foreground">
                            {item.plan}
                          </TableCell>
                          <TableCell className="px-8 py-6 font-bold">
                            {item.amount}
                          </TableCell>
                          <TableCell className="px-8 py-6">
                            <Badge className="border-0 bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 hover:bg-emerald-100">
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="px-8 py-6 text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-full text-primary"
                            >
                              <Receipt className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </section>
            </div>

            {/* Right */}
            <div className="col-span-12 space-y-10 lg:col-span-4">
              <Card className="rounded-[2rem] border p-8 shadow-sm">
                <h3 className="mb-8 text-sm font-bold">Workspace Usage</h3>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-muted-foreground">
                        Active Seats
                      </span>
                      <span>3 / 5</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-muted-foreground">
                        Cloud Storage
                      </span>
                      <span>1.2 GB / 5 GB</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-muted-foreground">
                        Monthly Projects
                      </span>
                      <span>8 / 10</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </div>
              </Card>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-[2rem] border border-lime-200 bg-gradient-to-br from-lime-100 to-lime-200 p-8"
              >
                <div className="relative z-10">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/40">
                    <Lightbulb className="h-5 w-5 text-lime-900" />
                  </div>

                  <h4 className="mb-2 text-sm font-bold text-lime-900">
                    Did you know?
                  </h4>
                  <p className="mb-6 text-xs leading-relaxed text-lime-900/80">
                    Switching to an annual plan can save your team up to{' '}
                    <span className="font-bold text-lime-900">$120/year</span>.
                    That's two months for free!
                  </p>

                  <Button
                    variant="link"
                    className="h-auto p-0 text-xs font-bold text-lime-900 hover:no-underline"
                  >
                    View Annual Plans <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>

                <CreditCard className="absolute -bottom-6 -right-6 h-32 w-32 -rotate-12 text-lime-900/10" />
              </motion.div>

              <Card className="rounded-[2rem] border bg-muted/50 p-8">
                <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Estimated Invoice
                </h3>

                <div className="mb-6 flex items-center gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background text-primary shadow-sm">
                    <Calendar className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="mb-0.5 text-xs font-medium text-muted-foreground">
                      November 12, 2023
                    </p>
                    <p className="text-3xl font-extrabold tracking-tight">
                      $0.00
                    </p>
                  </div>
                </div>

                <Separator className="mb-6" />

                <p className="text-[11px] italic leading-relaxed text-muted-foreground">
                  You are currently on a free tier. No charges will be applied
                  unless you upgrade.
                </p>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
