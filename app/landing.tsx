'use client';
import {
  Layout,
  Folder,
  MessageSquare,
  PlayCircle,
  CheckCircle2,
  FileText,
  Kanban,
  Rocket,
  Users,
  ArrowRight,
  Edit3,
  CheckSquare,
  Globe,
  Mail,
  MousePointer2,
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-[#fafaf5]/80 backdrop-blur-md border-b border-slate-200/50 font-[Inter]">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <span className="text-xl font-extrabold tracking-tight text-slate-900 font-['Plus_Jakarta_Sans']">
          TeamSpace
        </span>
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#"
            className="text-sm font-semibold text-[#4e45e4] border-b-2 border-[#4e45e4] pb-1"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-slate-500 hover:text-[#4e45e4] transition-colors"
          >
            Pricing
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="bg-[#4e45e4] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-[#4e45e4]/20">
          <Link href={`/login`}>Get Started</Link>
        </button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-20 pb-32 overflow-hidden px-6 font-[Inter] bg-[#fafaf5] text-slate-900">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10"
      >
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#dafe92] text-[#476303] text-xs font-bold mb-8">
          New: Collective Intelligence 2.0
        </span>
        <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 leading-[1.05] mb-8 tracking-tight font-['Plus_Jakarta_Sans']">
          The workspace where{' '}
          <span className="text-[#4e45e4]">teams click.</span>
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg">
          A digital sanctuary for high-performing teams. Unified documents,
          projects, and real-time talk in one beautifully structured
          environment.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/login">
            <button className="bg-[#4e45e4] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-[#4e45e4]/30 transition-all">
              Create your space
            </button>
          </Link>
          <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-2 hover:bg-slate-50 transition-all border border-slate-200">
            <PlayCircle className="w-6 h-6" /> Watch Demo
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <div className="bg-white rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] p-6 aspect-[4/3] border border-slate-200/50 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-slate-50 border-r border-slate-100 flex flex-col items-center py-8 gap-6">
            <div className="w-10 h-10 rounded-xl bg-[#4e45e4]/10 flex items-center justify-center text-[#4e45e4]">
              <Layout className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-200/50 flex items-center justify-center text-slate-400">
              <Folder className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-200/50 flex items-center justify-center text-slate-400">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>

          <div className="ml-16 h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <div className="h-4 w-40 bg-slate-100 rounded-full"></div>
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded-full border-2 border-white bg-slate-${i * 100 + 100}`}
                  ></div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 flex-1">
              <div className="space-y-4">
                <div className="h-32 bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <div className="h-2 w-2/3 bg-slate-200 rounded mb-3"></div>
                  <div className="h-2 w-full bg-slate-200 rounded"></div>
                </div>
                <div className="h-48 bg-slate-50 rounded-2xl relative overflow-hidden border border-slate-100">
                  <img
                    src="https://picsum.photos/seed/team/800/600"
                    alt="Team"
                    className="w-full h-full object-cover opacity-40 grayscale"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-1/2 left-1/3 flex items-center gap-2">
                    <MousePointer2 className="w-5 h-5 text-[#4e45e4] fill-[#4e45e4]" />
                    <span className="bg-[#4e45e4] text-white text-[10px] px-2 py-1 rounded-lg font-bold shadow-lg">
                      Alex editing...
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-48 bg-slate-50 rounded-2xl border border-slate-100"></div>
                <div className="h-32 bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <div className="flex gap-2 items-center mb-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <div className="h-2 w-20 bg-slate-200 rounded"></div>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded mb-2"></div>
                  <div className="h-2 w-3/4 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#4e45e4]/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>
      </motion.div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-32 px-6 bg-slate-50/50 font-[Inter]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight font-['Plus_Jakarta_Sans']">
          Collaboration Zones
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Designed to separate focus areas while keeping the team connected. No
          clutter, just flow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: 'Shared Documents',
            desc: 'Multiplayer editing with granular privacy controls. Write, brainstorm, and refine ideas together in real-time.',
            icon: FileText,
            color: 'bg-indigo-50 text-indigo-600',
            checks: ['Real-time cursors', 'Nested hierarchies'],
          },
          {
            title: 'Team Projects',
            desc: 'Visualize momentum with agile boards, timelines, and goal tracking designed for human readability.',
            icon: Kanban,
            color: 'bg-emerald-50 text-emerald-600',
            checks: ['Automated workflows', 'Dependency mapping'],
          },
          {
            title: 'Real-time Cursor',
            desc: 'Threaded discussions that stay on topic. Connect conversation to context without leaving your workspace.',
            icon: MousePointer2,
            color: 'bg-amber-50 text-amber-600',
            checks: ['Integrated voice huddles', 'Smart notification AI'],
          },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -8 }}
            className="bg-white p-10 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
          >
            <div
              className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-8`}
            >
              <feature.icon className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 tracking-tight font-['Plus_Jakarta_Sans']">
              {feature.title}
            </h3>
            <p className="text-slate-500 mb-8 leading-relaxed">
              {feature.desc}
            </p>
            <ul className="space-y-3">
              {feature.checks.map((check, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-semibold text-slate-700"
                >
                  <CheckCircle2 className="w-5 h-5 text-slate-400" /> {check}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Connection = () => (
  <section className="py-32 px-6 bg-white overflow-hidden font-[Inter]">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
      <div className="w-full lg:w-1/2">
        <h2 className="text-5xl font-extrabold mb-8 leading-tight text-slate-900 tracking-tight font-['Plus_Jakarta_Sans']">
          Visualizing Connection
        </h2>
        <p className="text-xl text-slate-500 mb-12 leading-relaxed">
          Work doesn't happen in a vacuum. TeamSpace maps the neural pathways of
          your organization, showing how projects intersect and how teams
          influence each other.
        </p>

        <div className="space-y-10">
          {[
            {
              title: 'Interconnected Projects',
              desc: 'See the direct relationship between task completions and high-level milestones.',
              icon: Rocket,
            },
            {
              title: 'Team Proximity Maps',
              desc: 'Discover organic collaborations forming across different departments.',
              icon: Users,
            },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center flex-shrink-0 text-slate-400 border border-slate-100">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-xl text-slate-900 mb-2 tracking-tight font-['Plus_Jakarta_Sans']">
                  {item.title}
                </h4>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-1/2 relative h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#4e45e4]/10 to-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="grid grid-cols-3 grid-rows-3 gap-8 w-full max-w-md relative">
            <svg
              className="absolute inset-0 w-full h-full -z-10 opacity-20"
              viewBox="0 0 400 400"
            >
              <path
                d="M100 100 Q 200 200 300 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-[#4e45e4]"
              />
              <path
                d="M100 300 Q 200 200 300 300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-emerald-500"
              />
              <path
                d="M100 100 L 100 300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-amber-500"
              />
            </svg>

            <div className="bg-white p-5 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center justify-center transform hover:-translate-y-2 transition-all">
              <div className="w-12 h-12 rounded-full bg-indigo-500 mb-3"></div>
              <div className="h-2 w-12 bg-slate-100 rounded"></div>
            </div>
            <div className="col-start-2 row-start-2 bg-white p-8 rounded-3xl shadow-2xl border-2 border-[#4e45e4]/10 flex flex-col items-center justify-center z-10 scale-125">
              <div className="w-16 h-16 rounded-full bg-[#4e45e4] mb-3 flex items-center justify-center text-white shadow-xl shadow-[#4e45e4]/30">
                <Rocket className="w-8 h-8" />
              </div>
              <div className="h-2 w-16 bg-slate-100 rounded"></div>
            </div>
            <div className="col-start-3 row-start-1 bg-white p-5 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center justify-center transform hover:-translate-y-2 transition-all">
              <div className="w-12 h-12 rounded-full bg-emerald-500 mb-3"></div>
              <div className="h-2 w-12 bg-slate-100 rounded"></div>
            </div>
            <div className="col-start-1 row-start-3 bg-white p-5 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center justify-center transform hover:-translate-y-2 transition-all">
              <div className="w-12 h-12 rounded-full bg-amber-500 mb-3"></div>
              <div className="h-2 w-12 bg-slate-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Pulse = () => (
  <section className="py-32 px-6 bg-slate-50/50 font-[Inter]">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-xl">
          <span className="text-[#4e45e4] font-bold text-sm tracking-widest uppercase block mb-4">
            Live Insights
          </span>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight font-['Plus_Jakarta_Sans']">
            The Pulse of Your Team
          </h2>
          <p className="text-slate-500 text-lg">
            Monitor momentum without micromanaging. A bird's-eye view of team
            health and output.
          </p>
        </div>
        <button className="bg-white border border-slate-200 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all text-slate-700">
          Full Activity Feed <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-3xl p-10 shadow-sm border border-slate-200/60">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans']">
              Weekly Momentum
            </h3>
            <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100">
              +12% vs last week
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-4">
            {[40, 60, 45, 80, 100, 70, 90].map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="w-full bg-[#4e45e4]/10 rounded-t-xl relative group overflow-hidden"
              >
                <div className="absolute inset-x-0 bottom-0 bg-[#4e45e4] rounded-t-xl transition-all h-full scale-y-90 group-hover:scale-y-100"></div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-3xl p-10 shadow-sm border border-slate-200/60 flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 mb-8 tracking-tight font-['Plus_Jakarta_Sans']">
            Recent Activity
          </h3>
          <div className="space-y-8">
            {[
              {
                user: 'Sarah',
                action: 'updated "Project Atlas"',
                time: '2 minutes ago',
                icon: Edit3,
                color: 'bg-amber-50 text-amber-600',
              },
              {
                user: 'Marketing',
                action: 'new discussion started',
                time: '15 minutes ago',
                icon: MessageSquare,
                color: 'bg-indigo-50 text-indigo-600',
              },
              {
                user: 'James',
                action: 'completed 3 tasks',
                time: '1 hour ago',
                icon: CheckSquare,
                color: 'bg-emerald-50 text-emerald-600',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-5">
                <div
                  className={`w-11 h-11 rounded-xl ${item.color} flex-shrink-0 flex items-center justify-center`}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {item.user}{' '}
                    <span className="font-medium text-slate-500">
                      {item.action}
                    </span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-32 px-6 font-[Inter] bg-[#fafaf5]">
    <div className="max-w-6xl mx-auto bg-[#4e45e4] rounded-[3rem] p-16 md:p-24 text-center relative overflow-hidden text-white shadow-2xl shadow-[#4e45e4]/30">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://picsum.photos/seed/office/1200/800"
          alt="Office"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="relative z-10">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-8 tracking-tight font-['Plus_Jakarta_Sans']">
          Ready to find your flow?
        </h2>
        <p className="text-xl opacity-80 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join 10,000+ teams who have already built their digital sanctuary on
          TeamSpace.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link href="/login">
            <button className="bg-white text-[#4e45e4] px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-xl">
              Create your space
            </button>
          </Link>
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all">
            Talk to Sales
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-50 pt-24 pb-12 px-6 border-t border-slate-200 font-[Inter]">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
      <div className="col-span-1 md:col-span-2">
        <span className="text-2xl font-extrabold tracking-tight text-slate-900 block mb-8 font-['Plus_Jakarta_Sans']">
          TeamSpace
        </span>
        <p className="text-slate-500 leading-relaxed max-w-sm text-lg">
          Building the digital architecture for teams to think, create, and grow
          together.
        </p>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 mb-8 tracking-tight font-['Plus_Jakarta_Sans']">
          Product
        </h4>
        <ul className="space-y-4">
          {['Features', 'Pricing', 'Integrations', 'Enterprise'].map((link) => (
            <li key={link}>
              <a
                href="#"
                className="text-slate-500 hover:text-[#4e45e4] transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 mb-8 tracking-tight font-['Plus_Jakarta_Sans']">
          Company
        </h4>
        <ul className="space-y-4">
          {['About Us', 'Privacy Policy', 'Contact', 'Careers'].map((link) => (
            <li key={link}>
              <a
                href="#"
                className="text-slate-500 hover:text-[#4e45e4] transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-8">
      <span className="text-sm text-slate-400 font-medium">
        © 2024 TeamSpace. Built for teams.
      </span>
      <div className="flex gap-8">
        <a
          href="#"
          className="text-slate-400 hover:text-[#4e45e4] transition-colors"
        >
          <Globe className="w-5 h-5" />
        </a>
        <a
          href="#"
          className="text-slate-400 hover:text-[#4e45e4] transition-colors"
        >
          <Mail className="w-5 h-5" />
        </a>
      </div>
    </div>
  </footer>
);

export function Landing() {
  return (
    <div className="min-h-screen bg-[#fafaf5] text-slate-900 font-[Inter]">
      <Navbar />
      <Hero />
      <Features />
      <Connection />
      <Pulse />
      <CTA />
      <Footer />
    </div>
  );
}
