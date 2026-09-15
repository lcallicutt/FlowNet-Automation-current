import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  Bot,
  Building2,
  Check,
  ChevronDown,
  CircleCheck,
  Clock3,
  FileCheck2,
  House,
  Laptop,
  Lightbulb,
  ListChecks,
  Menu,
  MessageCircle,
  Network,
  Printer,
  Router as RouterIcon,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
  Zap,
  Activity,
} from 'lucide-react';
import NotFound from '@/pages/not-found';
import {
  Link,
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

const navItems = [
  { label: 'Automation Services', href: '/#automation' },
  { label: 'AI Receptionist', href: '/#ai-receptionist' },
  { label: 'FlowNet Tech Care', href: '/tech-care' },
  { label: 'AI Readiness / Audit', href: '/#readiness' },
  { label: 'Church Solutions', href: '/#churches' },
];

const techServices = [
  { title: 'Home Tech Checkup', description: 'A calm, practical review of your devices, Wi-Fi, backups, and everyday setup.', icon: House, tint: 'bg-[#e4fbf7]' },
  { title: 'Printer & Wi-Fi Rescue', description: 'Get the things that should work together talking again. No jargon, no blame.', icon: Printer, tint: 'bg-[#e7efff]' },
  { title: 'Smart Home Setup', description: 'Doorbells, speakers, streaming, and connected home gear configured around you.', icon: RouterIcon, tint: 'bg-[#fff0dc]' },
  { title: 'New Device Setup', description: 'Move into a new laptop, phone, or tablet with your files and confidence intact.', icon: Laptop, tint: 'bg-[#f0eaff]' },
  { title: 'Church Tech Audit', description: 'A real-world look at Sunday systems, volunteer workflows, security, and gaps.', icon: Building2, tint: 'bg-[#e6f4f4]' },
  { title: 'Quarterly Care Plans', description: 'A familiar technology partner on a regular rhythm, before little issues become big ones.', icon: ShieldCheck, tint: 'bg-[#fff1e8]' },
];

function PageMeta({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attribute: 'name' | 'property', key: string, content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
  }, [description, title]);

  return null;
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" data-testid="link-logo">
      <span className="relative grid h-9 w-9 place-items-center rounded-[11px] bg-[#00c9b1] text-[#0b1628] shadow-[4px_4px_0_#1a6dff]">
        <span className="absolute h-4 w-4 rounded-[5px] border-[3px] border-current border-r-transparent rotate-45" />
        <span className="absolute h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      <span className={`font-display text-lg font-extrabold tracking-[-.04em] ${light ? 'text-white' : 'text-[#0b1628]'}`}>
        FlowNet<span className="text-[#00aF9d]">.</span>
      </span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative z-50 border-b border-[#d9e3ea] bg-[#f8fbfd]/95 backdrop-blur-md">
      <div className="container-wide flex min-h-[76px] items-center justify-between gap-6">
        <Logo />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group inline-flex items-center gap-1 py-4 text-[.78rem] font-bold text-[#41536b] transition-colors hover:text-[#0b1628]"
              data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}
            >
              {item.label}
              {item.label === 'Automation Services' && <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <a href="#request" className="text-sm font-extrabold text-[#0b1628] hover:text-[#00aF9d]" data-testid="link-header-request">Have a question?</a>
          <a href="#request" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#00c9b1] px-5 text-sm font-extrabold text-[#0b1628] shadow-[0_5px_0_#079783] transition-transform hover:-translate-y-0.5 active:translate-y-0" data-testid="link-header-book">
            Book Tech Help <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <button
          className="grid h-11 w-11 place-items-center rounded-xl border border-[#cad8e2] text-[#0b1628] lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          data-testid="button-mobile-menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-[#d9e3ea] bg-[#f8fbfd] px-4 pb-5 pt-2 lg:hidden" aria-label="Mobile navigation">
          <div className="container-wide flex flex-col">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-[#d9e3ea] py-4 text-sm font-extrabold text-[#233851]" data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
                {item.label}
              </Link>
            ))}
            <a href="#request" onClick={() => setOpen(false)} className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#00c9b1] font-extrabold text-[#0b1628]" data-testid="link-mobile-book">
              Book Tech Help <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0b1628] text-white">
      <div className="container-wide grid gap-12 py-14 md:grid-cols-[1.4fr_.8fr_.8fr] md:py-20">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm text-[1rem] leading-7 text-[#b7c6d4]">Technology that works for you — at home, in your church, and in the work that keeps your organization moving.</p>
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#2c4059] px-3 py-2 text-xs font-bold text-[#b7c6d4]">
            <MapPinDot /> Serving Hampton Roads
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[.16em] text-[#00c9b1]">Explore</p>
          <div className="flex flex-col items-start gap-3 text-sm font-bold text-[#c9d4df]">
            <Link href="/#automation" className="hover:text-[#00c9b1]" data-testid="link-footer-automation">Automation Services</Link>
            <Link href="/#readiness" className="hover:text-[#00c9b1]" data-testid="link-footer-readiness">AI Readiness / Audit</Link>
            <Link href="/#churches" className="hover:text-[#00c9b1]" data-testid="link-footer-churches">Church Solutions</Link>
            <Link href="/tech-care" className="hover:text-[#00c9b1]" data-testid="link-footer-tech-care">FlowNet Tech Care</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[.16em] text-[#00c9b1]">Start here</p>
          <p className="text-sm leading-6 text-[#b7c6d4]">Tell us what is getting in the way. We will help you find the next right step.</p>
          <a href="#request" className="mt-5 inline-flex items-center gap-2 font-extrabold text-[#00c9b1] hover:text-white" data-testid="link-footer-request">Book Tech Help <ArrowRight className="h-4 w-4" /></a>
        </div>
      </div>
      <div className="border-t border-[#26384e]">
        <div className="container-wide flex flex-col gap-2 py-5 text-xs font-bold text-[#8294a8] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2025 FlowNet Automation. Built for real life.</span>
          <span>Hampton Roads · Virginia</span>
        </div>
      </div>
    </footer>
  );
}

function MapPinDot() {
  return <span className="grid h-4 w-4 place-items-center rounded-full bg-[#00c9b1]/20"><span className="h-1.5 w-1.5 rounded-full bg-[#00c9b1]" /></span>;
}

function HeroVisual() {
  return (
    <div className="relative mx-auto h-[390px] max-w-[480px] sm:h-[450px]">
      <div className="absolute inset-x-2 top-5 h-[310px] rounded-[30px] border border-white/15 bg-[#142640] p-4 shadow-2xl shadow-[#07101e]/40 sm:inset-x-7 sm:top-10">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#c8d5e2]"><span className="h-2.5 w-2.5 rounded-full bg-[#00c9b1]" /> FlowNet workspace</div>
          <div className="flex gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#48617c]" /><span className="h-1.5 w-1.5 rounded-full bg-[#48617c]" /><span className="h-1.5 w-1.5 rounded-full bg-[#48617c]" /></div>
        </div>
        <div className="mt-5 grid grid-cols-[1fr_1.2fr] gap-3">
          <div className="rounded-2xl bg-[#1b3454] p-3">
            <p className="text-[10px] font-bold text-[#96abc0]">TODAY'S SIGNAL</p>
            <p className="mt-2 font-display text-2xl font-bold text-white">Clearer.</p>
            <div className="mt-5 flex items-end gap-1">
              <span className="h-8 w-1.5 rounded-full bg-[#00c9b1]" /><span className="h-12 w-1.5 rounded-full bg-[#00c9b1]" /><span className="h-6 w-1.5 rounded-full bg-[#1a6dff]" /><span className="h-16 w-1.5 rounded-full bg-[#00c9b1]" /><span className="h-10 w-1.5 rounded-full bg-[#1a6dff]" />
            </div>
          </div>
          <div className="rounded-2xl bg-[#f7fbfc] p-3">
            <div className="flex items-center justify-between"><p className="text-[10px] font-extrabold text-[#6f8091]">SYSTEMS IN RHYTHM</p><span className="rounded-full bg-[#e3faf5] px-2 py-1 text-[9px] font-extrabold text-[#008b79]">ACTIVE</span></div>
            <div className="mt-5 space-y-3">
              {['AI receptionist', 'Follow-up flow', 'Care plan'].map((item, index) => <div key={item} className="flex items-center gap-2"><span className={`grid h-5 w-5 place-items-center rounded-full ${index === 1 ? 'bg-[#e7efff] text-[#1a6dff]' : 'bg-[#e3faf5] text-[#008b79]'}`}><Check className="h-3 w-3" /></span><span className="text-[10px] font-bold text-[#344a62]">{item}</span></div>)}
            </div>
          </div>
        </div>
        <div className="mt-3 rounded-2xl border border-[#29415d] p-3">
          <div className="flex items-center justify-between text-[10px] font-bold text-[#9fb2c5]"><span>THE NEXT RIGHT STEP</span><ArrowRight className="h-3 w-3 text-[#00c9b1]" /></div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#253e5d]"><div className="h-full w-[73%] rounded-full bg-[#00c9b1]" /></div>
        </div>
      </div>
      <div className="float-slow absolute bottom-3 left-0 w-[205px] rounded-2xl border border-[#d4e2e7] bg-[#f7fbfc] p-4 shadow-xl shadow-[#07101e]/20 sm:left-2">
        <div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-xl bg-[#fff0dc] text-[#db7718]"><Wrench className="h-4 w-4" /></span><span className="text-xs font-extrabold text-[#203650]">Tech Care visit</span></div>
        <p className="mt-3 text-[11px] leading-4 text-[#6a7b8b]">Printer, Wi-Fi, and smart home — sorted.</p>
        <div className="mt-3 flex items-center gap-1.5 text-[10px] font-extrabold text-[#008d7c]"><MapPinDot /> Hampton Roads</div>
      </div>
      <div className="absolute right-0 top-0 grid h-16 w-16 place-items-center rounded-2xl bg-[#1a6dff] text-white shadow-xl shadow-[#1a6dff]/20 sm:right-4"><Sparkles className="h-7 w-7" /></div>
    </div>
  );
}

function RequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [service, setService] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!service) {
      setError('Choose the kind of help you need so we can route your request well.');
      return;
    }
    setError('');
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-[355px] flex-col items-center justify-center rounded-[28px] border border-[#a9e9df] bg-[#f3fffc] p-8 text-center" data-testid="status-request-success">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-[#00c9b1] text-[#0b1628]"><CircleCheck className="h-8 w-8" /></div>
        <h3 className="mt-5 font-display text-2xl font-bold text-[#0b1628]">You are on the right track.</h3>
        <p className="mt-3 max-w-sm text-sm leading-6 text-[#53697f]">Thanks for reaching out. We will review your note and be in touch with a practical next step.</p>
        <button onClick={() => { setSubmitted(false); setService(''); }} className="mt-6 text-sm font-extrabold text-[#007e70] underline decoration-2 underline-offset-4" data-testid="button-submit-another">Send another request</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[28px] border border-[#d5e2e8] bg-white p-5 shadow-[0_16px_50px_rgba(11,22,40,.08)] sm:p-7" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-extrabold text-[#263b52]">Your name<span className="ml-1 text-[#00a890]">*</span><input required name="name" type="text" className="mt-2 min-h-12 w-full rounded-xl border border-[#cad9e2] bg-[#fbfdfe] px-4 font-medium outline-none transition focus:border-[#00aF9d] focus:ring-4 focus:ring-[#00c9b1]/15" placeholder="How should we call you?" data-testid="input-request-name" /></label>
        <label className="text-sm font-extrabold text-[#263b52]">Email address<span className="ml-1 text-[#00a890]">*</span><input required name="email" type="email" className="mt-2 min-h-12 w-full rounded-xl border border-[#cad9e2] bg-[#fbfdfe] px-4 font-medium outline-none transition focus:border-[#00aF9d] focus:ring-4 focus:ring-[#00c9b1]/15" placeholder="you@example.com" data-testid="input-request-email" /></label>
        <label className="text-sm font-extrabold text-[#263b52] sm:col-span-2">What can we help with?<span className="ml-1 text-[#00a890]">*</span><select required value={service} onChange={(event) => { setService(event.target.value); setError(''); }} className="mt-2 min-h-12 w-full rounded-xl border border-[#cad9e2] bg-[#fbfdfe] px-4 font-medium outline-none transition focus:border-[#00aF9d] focus:ring-4 focus:ring-[#00c9b1]/15" data-testid="select-request-service"><option value="">Choose a starting point</option><option>Home or personal tech help</option><option>Church tech audit</option><option>Automation or AI consulting</option><option>Ongoing care plan</option></select></label>
        <label className="text-sm font-extrabold text-[#263b52] sm:col-span-2">A little more detail<textarea name="message" rows={4} className="mt-2 w-full resize-none rounded-xl border border-[#cad9e2] bg-[#fbfdfe] px-4 py-3 font-medium outline-none transition focus:border-[#00aF9d] focus:ring-4 focus:ring-[#00c9b1]/15" placeholder="What is getting in the way right now?" data-testid="textarea-request-message" /></label>
      </div>
      {error && <p className="mt-4 text-sm font-bold text-[#b54848]" role="alert" data-testid="text-request-error">{error}</p>}
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-xs text-xs leading-5 text-[#718294]">No hard sell. Just a human reply and a clearer next step.</p><button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0b1628] px-6 text-sm font-extrabold text-white transition hover:bg-[#1a6dff] active:scale-[.98]" data-testid="button-submit-request">Send my request <ArrowRight className="h-4 w-4" /></button></div>
    </form>
  );
}

function Home() {
  return (
    <div className="overflow-hidden">
      <PageMeta
        title="FlowNet Automation | Technology That Works for You"
        description="FlowNet helps organizations improve systems and automate repetitive work without making technology more complicated."
      />
      <Header />
      <main>
        <section className="noise relative overflow-hidden bg-[#0b1628] text-white">
          <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#00c9b1]/10 blur-3xl" />
          <div className="container-wide relative grid items-center gap-10 py-16 md:grid-cols-[1.05fr_.95fr] md:py-24 lg:py-28">
            <div className="fade-up">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#31506b] bg-[#142640] px-3 py-2 text-xs font-extrabold tracking-wide text-[#a9bfce]">
                <span className="h-2 w-2 rounded-full bg-[#00c9b1]" /> Workflow & Systems Automation
              </div>
              <h1 className="max-w-3xl font-display text-[clamp(3rem,8vw,6.3rem)] font-extrabold leading-[.98] tracking-[-.07em]">Technology that <span className="text-[#00c9b1]">works</span> for you.</h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#b7c8d8] sm:text-xl">FlowNet helps churches, nonprofits, service businesses, and professional teams identify inefficient workflows, improve systems, and automate repetitive work without making technology more complicated.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="https://flowreadiness.com" target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#00c9b1] px-7 text-base font-extrabold text-[#0b1628] shadow-[0_6px_0_#078f7d] transition hover:-translate-y-1 active:translate-y-0" data-testid="link-hero-score">Get Your Automation Score <ArrowRight className="h-5 w-5" /></a>
                <a href="https://api.growthhub365.com/widget/booking/UjrHn0RU4NZstAw53cYW" target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#506b83] px-7 text-base font-extrabold text-white transition hover:border-[#00c9b1] hover:text-[#00c9b1]" data-testid="link-hero-call">Book a Strategy Call <ArrowDownRight className="h-5 w-5" /></a>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-bold text-[#91a8bc]">
                <span className="inline-flex items-center gap-2"><FileCheck2 className="h-4 w-4 text-[#00c9b1]" /> Takes ~3 mins</span>
                <span className="inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-[#00c9b1]" /> No obligation</span>
              </div>
            </div>
            <div className="fade-up fade-up-delay-2"><HeroVisual /></div>
          </div>
        </section>

        <section className="container-wide py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-end">
            <div>
              <span className="section-kicker">Systems-first approach</span>
              <h2 className="mt-5 max-w-md font-display text-4xl font-bold leading-tight text-[#0b1628] sm:text-5xl">Understand the workflow and people before the tools.</h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-[#5d7186] md:justify-self-end">You do not need more technology. You need the right technology. We start where the friction is—understanding how your team actually works before we recommend or build any automation.</p>
          </div>
        </section>

        <section className="bg-[#f0f5f7] py-20 md:py-28" id="automation">
          <div className="container-wide grid gap-12 md:grid-cols-[.9fr_1.1fr] md:items-center">
            <div>
              <span className="section-kicker">The Core Offer</span>
              <h2 className="mt-5 max-w-lg font-display text-4xl font-bold leading-tight text-[#0b1628] sm:text-5xl">Consult. Audit. Automate.</h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-[#5d7186]">Our complete method ensures technology actually serves your goals instead of creating more work.</p>
              <a href="https://api.growthhub365.com/widget/booking/UjrHn0RU4NZstAw53cYW" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 font-extrabold text-[#007e70]" data-testid="link-method-book">Discuss your workflow <ArrowRight className="h-4 w-4" /></a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { number: '01', title: 'Consult & Audit', body: 'We map your existing processes to uncover hidden friction and quiet risks.', icon: MessageCircle },
                { number: '02', title: 'Recommend', body: 'We propose plain-language, practical steps to streamline operations.', icon: ListChecks },
                { number: '03', title: 'Automate', body: 'We build systems that handle the repetitive work between the work.', icon: Zap },
                { number: '04', title: 'Measure & Improve', body: 'Ongoing managed digital support to ensure the system evolves with you.', icon: Activity },
              ].map((item, index) => (
                <div key={item.number} className={`rounded-2xl border border-[#d9e4e8] bg-white p-5 ${index === 1 || index === 3 ? 'sm:translate-y-6' : ''}`}>
                  <div className="flex items-center justify-between"><span className="font-mono text-xs font-bold text-[#00aF9d]">{item.number}</span><item.icon className="h-5 w-5 text-[#1a6dff]" /></div><h3 className="mt-8 font-display text-xl font-bold text-[#0b1628]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#6c7e8f]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-wide py-20 md:py-28" id="readiness">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="section-kicker">Organizations in rhythm</span>
              <h2 className="mt-5 font-display text-4xl font-bold text-[#0b1628] sm:text-5xl">Good systems make room for good work.</h2>
            </div>
            <p className="max-w-sm text-base leading-7 text-[#63778b] md:text-right">Real results for teams ready to move beyond manual maintenance.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-[1.1fr_.9fr]">
            <div className="rounded-[28px] bg-[#0b1628] p-7 text-white sm:p-9" id="churches">
              <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1b3454] text-[#00c9b1]"><Building2 className="h-6 w-6" /></span><span className="rounded-full border border-[#3d5570] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.13em] text-[#a6bacb]">Success Story</span></div>
              <h3 className="mt-12 font-display text-3xl font-bold">Greater Emmanuel Church</h3>
              <p className="mt-4 leading-7 text-[#b4c4d3]">They needed a consistent digital presence while reducing the technology burden on leadership. FlowNet stepped in to provide complete website design and launch, ongoing maintenance, digital platform support, and social support.</p>
              <a href="https://api.growthhub365.com/widget/booking/UjrHn0RU4NZstAw53cYW" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 font-extrabold text-[#00c9b1]" data-testid="link-church-story">Explore Church Solutions <ArrowRight className="h-4 w-4" /></a>
            </div>
            <div className="grid gap-5">
              <div className="rounded-[28px] border border-[#d7e2e7] bg-[#fff8ed] p-7 flex flex-col justify-between" id="ai-receptionist">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#ffe5bd] text-[#c06a12]"><Bot className="h-5 w-5" /></span>
                    <span className="rounded-full bg-[#fde1b9] px-2 py-1 text-[10px] font-extrabold text-[#99520a]">LIVE DEMO</span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-[#0b1628]">Meet Aria, the AI Receptionist</h3>
                  <p className="mt-3 text-sm leading-6 text-[#65788b]">A warmer first response for the questions your team answers every day. Give her a call to see how she handles natural conversation.</p>
                </div>
                <a href="tel:+17575749991" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c06a12] px-5 text-sm font-extrabold text-white transition hover:bg-[#a3590e]" data-testid="link-call-aria">Call Aria at (757) 574-9991</a>
              </div>
              <div className="rounded-[28px] border border-[#d7e2e7] bg-[#edf3ff] p-7 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#0b1628]">Automation Score</h3>
                  <p className="mt-2 text-sm leading-6 text-[#65788b]">Take a 3-minute readiness assessment.</p>
                </div>
                <a href="https://flowreadiness.com" target="_blank" rel="noreferrer" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#1a6dff] text-white transition hover:scale-105" aria-label="Take assessment"><ArrowRight className="h-5 w-5" /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0b1628] py-20 text-white md:py-28">
          <div className="container-wide grid gap-12 md:grid-cols-[.9fr_1.1fr] md:items-center">
            <div className="order-2 md:order-1 relative">
              <div className="aspect-square max-w-sm mx-auto overflow-hidden rounded-[2rem] border border-[#2c425c] bg-[#142640]">
                <img src="/founder.png" alt="Net, Founder of FlowNet Automation" className="h-full w-full object-cover opacity-90" />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="section-kicker">Leadership</span>
              <h2 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">Built by a systems professional.</h2>
              <p className="mt-6 text-lg leading-8 text-[#b4c4d3]">FlowNet is led by Net, a systems and data professional with deep experience in business process analysis, systems analysis, requirements gathering, and quality assurance.</p>
              <div className="mt-8 flex flex-wrap gap-2 text-xs font-bold text-[#8ba3ba]">
                {['Workflow Testing', 'Data Validation', 'Automation Architecture', 'Digital Operations', 'AI-Enabled Workflows'].map(skill => (
                  <span key={skill} className="rounded-full border border-[#2d4766] bg-[#102038] px-3 py-1.5">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container-wide py-20 md:py-28" id="local-care">
          <article className="lift relative overflow-hidden rounded-[28px] bg-[#e7fbf7] p-8 sm:p-12">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border-[20px] border-[#b6efe6]" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#c0f2ea] px-3 py-1.5 text-xs font-extrabold text-[#008d7c]"><MapPinDot /> Hampton Roads Local Service</div>
                <h3 className="mt-6 font-display text-3xl font-bold text-[#0b1628] sm:text-4xl">FlowNet Tech Care</h3>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-[#4c6878]">Sometimes the workflow isn't the problem—the Wi-Fi is. We offer patient, hands-on technology help for homes, churches, and small organizations in Hampton Roads.</p>
              </div>
              <Link href="/tech-care" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#0b1628] px-8 font-extrabold text-white transition hover:bg-[#1a6dff]" data-testid="link-home-tech-care">See Tech Care <ArrowRight className="h-5 w-5" /></Link>
            </div>
          </article>
        </section>

        <section className="bg-[#f0f5f7] py-20 md:py-28" id="request">
          <div className="container-wide grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-start">
            <div>
              <span className="section-kicker">Let’s make it less stuck</span>
              <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-[#0b1628] sm:text-5xl">Tell us what is not working.</h2>
              <p className="mt-5 max-w-md leading-7 text-[#526f7b]">Send us a note about the friction in your workflow or home setup. We will help you decide whether a strategy call, a local visit, or an audit is the best fit.</p>
              <div className="mt-8 space-y-4 text-sm font-bold text-[#476773]">
                <div className="flex items-start gap-3"><span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-[#00c9b1] text-[#0b1628]"><Check className="h-3 w-3" /></span>No confusing sales process</div>
                <div className="flex items-start gap-3"><span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-[#00c9b1] text-[#0b1628]"><Check className="h-3 w-3" /></span>Plain-language next steps</div>
                <div className="flex items-start gap-3"><span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-[#00c9b1] text-[#0b1628]"><Check className="h-3 w-3" /></span>Local or remote, depending on the need</div>
              </div>
            </div>
            <RequestForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function TechCare() {
  return (
    <div className="overflow-hidden">
      <PageMeta
        title="FlowNet Tech Care | Serving Hampton Roads"
        description="Patient, practical technology help for homeowners, seniors, churches, and small organizations across Hampton Roads."
      />
      <Header />
      <main>
        <section className="noise relative overflow-hidden bg-[#0b1628] text-white">
          <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-[#1a6dff]/20 blur-3xl" />
          <div className="container-wide relative grid gap-10 py-16 md:grid-cols-[1fr_.8fr] md:items-end md:py-24">
            <div className="fade-up"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#3a5772] bg-[#142640] px-3 py-2 text-xs font-extrabold uppercase tracking-[.12em] text-[#c2d1dd]"><MapPinDot /> Local technology help</div><h1 className="max-w-3xl font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[.98] tracking-[-.07em]">Your tech should feel <span className="text-[#00c9b1]">friendly.</span></h1><p className="mt-7 max-w-2xl text-lg leading-8 text-[#b7c8d8] sm:text-xl">FlowNet Tech Care brings patient, hands-on technology help to homeowners, seniors, churches, and small organizations across Hampton Roads.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#request" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#00c9b1] px-7 font-extrabold text-[#0b1628] shadow-[0_6px_0_#078f7d] transition hover:-translate-y-1" data-testid="link-tech-care-book">Book Tech Help <ArrowRight className="h-5 w-5" /></a><Link href="/#automation" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#506b83] px-7 font-extrabold text-white transition hover:border-[#00c9b1] hover:text-[#00c9b1]" data-testid="link-tech-care-automation">Need systems help? <ArrowRight className="h-4 w-4" /></Link></div></div>
            <div className="fade-up fade-up-delay-2 relative md:pb-3"><div className="rounded-[28px] border border-[#38536c] bg-[#142640] p-6"><div className="flex items-center justify-between text-xs font-extrabold text-[#a9bbca]"><span>LOCAL COVERAGE</span><span className="text-[#00c9b1]">HAMPTON ROADS</span></div><div className="relative mt-6 h-44 overflow-hidden rounded-2xl bg-[#102039]"><div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'linear-gradient(#2c4662 1px, transparent 1px), linear-gradient(90deg, #2c4662 1px, transparent 1px)', backgroundSize: '32px 32px' }} /><div className="absolute left-[29%] top-[28%] h-20 w-20 rounded-full border border-[#00c9b1]/40 bg-[#00c9b1]/10" /><div className="absolute left-[29%] top-[28%] h-3 w-3 rounded-full bg-[#00c9b1] shadow-[0_0_0_7px_#00c9b133]" /><div className="absolute left-[52%] top-[52%] h-3 w-3 rounded-full bg-[#1a6dff] shadow-[0_0_0_7px_#1a6dff33]" /><div className="absolute bottom-3 left-4 text-[10px] font-bold text-[#8ea3b7]">Norfolk · Virginia Beach · Chesapeake · Suffolk</div></div><div className="mt-5 grid grid-cols-3 gap-2 text-center"><div><p className="font-display text-xl font-bold text-white">Local</p><p className="mt-1 text-[10px] font-bold text-[#8ea3b7]">hands-on help</p></div><div><p className="font-display text-xl font-bold text-white">Clear</p><p className="mt-1 text-[10px] font-bold text-[#8ea3b7]">plain language</p></div><div><p className="font-display text-xl font-bold text-white">Human</p><p className="mt-1 text-[10px] font-bold text-[#8ea3b7]">real follow-through</p></div></div></div></div>
          </div>
        </section>

        <section className="container-wide py-20 md:py-28">
          <div className="max-w-2xl"><span className="section-kicker">What we can untangle</span><h2 className="mt-5 font-display text-4xl font-bold leading-tight text-[#0b1628] sm:text-5xl">Small problems deserve expert attention, too.</h2><p className="mt-5 text-lg leading-8 text-[#63778b]">You should not have to become a part-time IT department to use the technology you already paid for.</p></div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techServices.map((service, index) => (
              <article key={service.title} className={`lift rounded-[24px] border border-[#d8e3e8] p-6 ${service.tint}`} data-testid={`card-tech-service-${index}`}>
                <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/80 text-[#0b1628]"><service.icon className="h-6 w-6" /></span><span className="font-mono text-xs font-bold text-[#7c8e9d]">0{index + 1}</span></div>
                <h3 className="mt-9 font-display text-xl font-bold text-[#0b1628]">{service.title}</h3><p className="mt-3 text-sm leading-6 text-[#5d7180]">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#f0f5f7] py-20 md:py-28">
          <div className="container-wide grid gap-12 md:grid-cols-[1fr_.9fr] md:items-center"><div><span className="section-kicker">How a visit feels</span><h2 className="mt-5 font-display text-4xl font-bold leading-tight text-[#0b1628] sm:text-5xl">No jargon. No judgment. No mystery.</h2><p className="mt-5 max-w-xl text-lg leading-8 text-[#63778b]">We arrive curious, solve what we can, explain what matters, and leave you with a setup you can actually live with.</p></div><div className="space-y-3">{['We look at the whole setup, not just the loudest symptom.', 'We explain the fix in words you can pass along.', 'We flag the next thing worth doing — without piling on extras.'].map((item, index) => <div key={item} className="flex items-start gap-4 rounded-2xl border border-[#d7e3e8] bg-white p-5"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#e4fbf7] font-mono text-xs font-bold text-[#008d7c]">0{index + 1}</span><p className="pt-1 text-sm font-bold leading-6 text-[#344b62]">{item}</p></div>)}</div></div>
        </section>

        <section className="container-wide py-20 md:py-28" id="request">
          <div className="grid gap-10 md:grid-cols-[.75fr_1.25fr] md:items-start"><div><span className="section-kicker">Start with a conversation</span><h2 className="mt-5 font-display text-4xl font-bold leading-tight text-[#0b1628] sm:text-5xl">Let’s get your setup back on your side.</h2><p className="mt-5 leading-7 text-[#63778b]">Tell us what is going on and where you are located. We will help you decide whether a visit, a care plan, or a systems conversation is the best fit.</p><div className="mt-8 rounded-2xl border border-[#d7e3e8] bg-[#f0f5f7] p-5"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff0dc] text-[#db7718]"><Lightbulb className="h-5 w-5" /></div><p className="text-sm font-bold leading-6 text-[#42586d]">Already seeing a bigger pattern?</p></div><p className="mt-3 text-sm leading-6 text-[#687c8e]">We can connect a local fix to FlowNet’s remote automation and AI consulting — only when it genuinely helps.</p><Link href="/#automation" className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#1a5bd3]" data-testid="link-tech-care-cross-sell">Explore the systems side <ArrowRight className="h-4 w-4" /></Link></div></div><RequestForm /></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/tech-care" component={TechCare} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
