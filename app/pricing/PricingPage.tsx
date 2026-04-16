'use client';

import { useMemo, useState } from 'react';
import { Check, Shield, RefreshCw, Puzzle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
const plans = {
  monthly: [
    {
      name: 'Standard',
      price: 12,
      description: 'Perfect for growing teams and focused projects.',
      features: [
        'Up to 10 team members',
        '5GB collaborative storage',
        'Standard workflow automations',
        'Basic analytics dashboard',
      ],
      cta: 'Get Started',
      featured: false,
    },
    {
      name: 'Professional',
      price: 24,
      description: 'Advanced features for high-performance organizations.',
      features: [
        'Unlimited team members',
        '100GB shared storage',
        'Custom priority workflows',
        'Advanced data visualization',
        '24/7 dedicated support',
      ],
      cta: 'Get Started',
      featured: true,
    },
  ],
  yearly: [
    {
      name: 'Standard',
      price: 10,
      description: 'Perfect for growing teams and focused projects.',
      features: [
        'Up to 10 team members',
        '5GB collaborative storage',
        'Standard workflow automations',
        'Basic analytics dashboard',
      ],
      cta: 'Get Started',
      featured: false,
    },
    {
      name: 'Professional',
      price: 19,
      description: 'Advanced features for high-performance organizations.',
      features: [
        'Unlimited team members',
        '100GB shared storage',
        'Custom priority workflows',
        'Advanced data visualization',
        '24/7 dedicated support',
      ],
      cta: 'Get Started',
      featured: true,
    },
  ],
};

const highlights = [
  {
    icon: Shield,
    title: 'Enterprise Grade Security',
    description:
      'Your data is protected by industry-leading encryption and compliance standards at every layer.',
  },
  {
    icon: RefreshCw,
    title: 'Real-time Collaboration',
    description:
      'Experience zero-latency updates. See changes as they happen across every device and team member.',
  },
  {
    icon: Puzzle,
    title: 'Native Integrations',
    description:
      'Seamlessly connect with your existing tools. We play well with Slack, GitHub, and Figma.',
  },
];

function PricingCard({
  name,
  price,
  description,
  features,
  cta,
  featured,
}: {
  name: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
}) {
  return (
    <Card
      className={[
        'relative h-full rounded-[28px] border transition-all duration-300',
        'bg-white/95 shadow-sm',
        featured
          ? 'border-[#4e45e4]/20 shadow-[0_24px_60px_-24px_rgba(78,69,228,0.4)]'
          : 'border-slate-200/70 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(15,23,42,0.18)]',
      ].join(' ')}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge className="rounded-full bg-[#4e45e4] px-4 py-1.5 text-xs font-bold tracking-[0.18em] text-white hover:bg-[#4e45e4]">
            MOST POPULAR
          </Badge>
        </div>
      )}

      <CardHeader className="space-y-4 px-8 pt-10 pb-6">
        <div>
          <CardTitle className="font-[var(--font-headline)] text-2xl font-extrabold tracking-tight text-slate-900">
            {name}
          </CardTitle>
          <CardDescription className="mt-2 text-[15px] leading-7 text-slate-500">
            {description}
          </CardDescription>
        </div>

        <div className="flex items-end gap-2">
          <span className="font-[var(--font-headline)] text-5xl font-extrabold tracking-tight text-slate-900">
            ${price}
          </span>
          <span className="pb-1 text-sm font-medium text-slate-500">
            /user/mo
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex h-[calc(100%-12rem)] flex-col px-8 pb-8">
        <ul className="mb-8 space-y-4">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm text-slate-600"
            >
              <span
                className={[
                  'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border',
                  featured
                    ? 'border-[#4e45e4] bg-[#4e45e4] text-white'
                    : 'border-[#4e45e4]/20 bg-[#4e45e4]/5 text-[#4e45e4]',
                ].join(' ')}
              >
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className={featured ? 'font-medium text-slate-700' : ''}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <Button
            className={[
              'h-12 w-full rounded-2xl text-sm font-bold shadow-none',
              featured
                ? 'bg-[#4e45e4] text-white hover:bg-[#4135d8]'
                : 'bg-[#d5f8ef] text-[#416059] hover:bg-[#c8f2e6]',
            ].join(' ')}
          >
            {cta}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(15,23,42,0.16)]">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4e45e4]/10 text-[#4e45e4]">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="font-[var(--font-headline)] text-xl font-extrabold tracking-tight text-slate-900">
        {title}
      </h3>
      <p className="mt-3 text-[15px] leading-7 text-slate-500">{description}</p>
    </div>
  );
}

export default function TeamSpacePricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const currentPlans = useMemo(() => {
    return isYearly ? plans.yearly : plans.monthly;
  }, [isYearly]);

  return (
    <div className="min-h-screen bg-[#fafaf5] text-slate-900 [font-family:var(--font-body)]">
      <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-[#fafaf5]/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-8">
          <div className="flex items-center gap-10">
            <span className="font-[var(--font-headline)] text-xl font-extrabold tracking-tight text-slate-900">
              TeamSpace
            </span>
            <div className="hidden items-center gap-8 md:flex">
              <Link
                href="/"
                className="text-sm font-medium text-slate-500 transition-colors hover:text-[#4e45e4]"
              >
                Features
              </Link>
              <Link
                href="#"
                className="border-b-2 border-[#4e45e4] pb-1 text-sm font-semibold text-[#4e45e4]"
              >
                Pricing
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-[#4e45e4] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-[#4e45e4]/20">
              <Link href={`/login`}>Get Started</Link>
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="px-6 pb-16 pt-20 md:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-8 rounded-full bg-[#dafe92] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#476303] hover:bg-[#dafe92]">
              Pricing Plans
            </Badge>

            <h1 className="font-[var(--font-headline)] text-5xl font-extrabold tracking-[-0.03em] text-slate-900 md:text-6xl">
              The Digital Sanctuary for your team
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500 md:text-xl">
              Flexible plans designed to scale with your team&apos;s creative
              journey and operational needs.
            </p>

            <div className="mt-12 inline-flex items-center gap-4 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm">
              <span
                className={
                  isYearly
                    ? 'text-sm font-medium text-slate-400'
                    : 'text-sm font-semibold text-slate-900'
                }
              >
                Monthly
              </span>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} />
              <span
                className={
                  isYearly
                    ? 'text-sm font-semibold text-slate-900'
                    : 'text-sm font-medium text-slate-400'
                }
              >
                Yearly
              </span>
              <Badge
                variant="secondary"
                className="rounded-full bg-[#4e45e4]/10 text-[#4e45e4] hover:bg-[#4e45e4]/10"
              >
                Save 20%
              </Badge>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 md:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            {currentPlans.map((plan) => (
              <PricingCard key={plan.name} {...plan} />
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200/60 bg-slate-50/70 px-6 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 text-center">
              <h2 className="font-[var(--font-headline)] text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                Why teams choose TeamSpace
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-500">
                Built for collaboration, clarity, and less of the usual
                workplace chaos.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {highlights.map((item) => (
                <FeatureCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 md:px-8">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-[#4e45e4] p-10 text-white shadow-[0_32px_80px_-24px_rgba(78,69,228,0.55)] md:p-14">
            <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="font-[var(--font-headline)] text-3xl font-extrabold tracking-tight md:text-4xl">
                  Still have questions?
                </h2>
                <p className="mt-4 text-base leading-8 text-white/80 md:text-lg">
                  Our team is here to help you find the perfect setup for your
                  organization&apos;s unique needs.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button className="rounded-2xl bg-white px-6 text-[#4e45e4] hover:bg-white/90">
                  Talk to Sales
                </Button>
                <Button
                  variant="outline"
                  className="rounded-2xl border-white/30 bg-white/10 px-6 text-white hover:bg-white/20 hover:text-white"
                >
                  View FAQ
                </Button>
              </div>
            </div>

            <div className="pointer-events-none absolute" />
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/60 bg-slate-50/80">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-[var(--font-headline)] text-lg font-bold tracking-tight text-slate-900">
                TeamSpace
              </p>
              <p className="mt-2 text-sm text-slate-500">
                © 2024 TeamSpace. A digital sanctuary for teams.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-slate-500">
              <a href="#" className="transition-colors hover:text-[#4e45e4]">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-[#4e45e4]">
                Terms of Service
              </a>
              <a href="#" className="transition-colors hover:text-[#4e45e4]">
                Cookie Settings
              </a>
            </div>
          </div>
          <Separator className="my-8 bg-slate-200/70" />
          <p className="text-xs text-slate-400">
            Styled with shadcn/ui primitives and aligned to your provided
            Tailwind theme tokens.
          </p>
        </div>
      </footer>
    </div>
  );
}
