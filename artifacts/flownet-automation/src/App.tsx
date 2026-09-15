import { type FormEvent, type ReactNode, useState } from 'react';
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
      <Header />
      <main>
        <section className="noise relative overflow-hidden bg-[#0b1628] text-white">
          <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#00c9b1]/10 blur-3xl" />
          <div className="container-wide relative grid items-center gap-10 py-16 md:grid-cols-[1.05fr_.95fr] md:py-24 lg:py-28">
            <div className="fade-up">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#31506b] bg-[#142640] px-3 py-2 text-xs font-extrabold tracking-wide text-[#a9bfce]"><span className="h-2 w-2 rounded-full bg-[#00c9b1]" /> Practical help. Serious systems.</div>
              <h1 className="max-w-3xl font-display text-[clamp(3rem,8vw,6.3rem)] font-extrabold leading-[.98] tracking-[-.07em]">Technology that <span className="text-[#00c9b1]">works</span> for you.</h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#b7c8d8] sm:text-xl">Automation, AI, and hands-on tech support for churches, small businesses, and everyday people.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#request" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#00c9b1] px-7 text-base font-extrabold text-[#0b1628] shadow-[0_6px_0_#078f7d] transition hover:-translate-y-1 active:translate-y-0" data-testid="link-hero-book">Book Tech Help <ArrowRight className="h-5 w-5" /></a>
                <a href="#automation" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#506b83] px-7 text-base font-extrabold text-white transition hover:border-[#00c9b1] hover:text-[#00c9b1]" data-testid="link-hero-automation">Explore Automation <ArrowDownRight className="h-5 w-5" /></a>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-bold text-[#91a8bc]"><span className="inline-flex items-center gap-2"><MapPinDot /> Serving Hampton Roads</span><span className="inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-[#00c9b1]" /> Built for real life</span></div>
            </div>
            <div className="fade-up fade-up-delay-2"><HeroVisual /></div>
          </div>
          <div className="border-t border-white/10">
            <div className="container-wide flex items-center gap-8 overflow-hidden py-4 text-xs font-extrabold uppercase tracking-[.16em] text-[#7f96ab]">
              <span className="shrink-0 text-[#00c9b1]">One partner, two ways to move forward</span><span className="hidden h-px w-20 bg-[#38516b] sm:block" /><span className="shrink-0">Local hands-on care</span><span className="shrink-0">Remote systems thinking</span>
            </div>
          </div>
        </section>

        <section className="container-wide py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-end">
            <div><span className="section-kicker">A better starting point</span><h2 className="mt-5 max-w-md font-display text-4xl font-bold leading-tight text-[#0b1628] sm:text-5xl">You do not need more technology. You need the right technology.</h2></div>
            <p className="max-w-xl text-lg leading-8 text-[#5d7186] md:justify-self-end">FlowNet makes technology feel less like a maze. We can sit beside you and fix the Wi-Fi, or step back and build the automation that gives your team hours back every week.</p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-[1.15fr_.85fr]">
            <article className="lift group relative overflow-hidden rounded-[28px] bg-[#e7fbf7] p-7 sm:p-9" id="local-care">
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border-[20px] border-[#b6efe6]" />
              <div className="relative"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0b1628] text-[#00c9b1]"><Wrench className="h-6 w-6" /></div><p className="mt-8 text-xs font-extrabold uppercase tracking-[.16em] text-[#008d7c]">FlowNet Tech Care · local</p><h3 className="mt-3 max-w-md font-display text-3xl font-bold text-[#0b1628]">A patient, capable human in your corner.</h3><p className="mt-4 max-w-lg leading-7 text-[#4c6878]">For homes, churches, and small organizations in Hampton Roads. We fix what is in front of you, then leave things easier to use.</p><Link href="/tech-care" className="mt-7 inline-flex items-center gap-2 font-extrabold text-[#007d6e] group-hover:gap-3" data-testid="link-home-tech-care">See Tech Care <ArrowRight className="h-4 w-4" /></Link></div>
            </article>
            <article className="lift rounded-[28px] bg-[#e9efff] p-7 sm:p-9" id="automation">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1a6dff] text-white"><Network className="h-6 w-6" /></div><p className="mt-8 text-xs font-extrabold uppercase tracking-[.16em] text-[#285cc4]">Automation & AI · remote</p><h3 className="mt-3 max-w-md font-display text-3xl font-bold text-[#0b1628]">Make the repeatable feel effortless.</h3><p className="mt-4 leading-7 text-[#566c83]">For teams ready to simplify intake, follow-up, scheduling, and the work between the work.</p><a href="#readiness" className="mt-7 inline-flex items-center gap-2 font-extrabold text-[#1a5bd3] hover:gap-3" data-testid="link-home-automation">Explore the systems side <ArrowRight className="h-4 w-4" /></a>
            </article>
          </div>
        </section>

        <section className="bg-[#f0f5f7] py-20 md:py-28" id="ai-receptionist">
          <div className="container-wide grid gap-12 md:grid-cols-[.9fr_1.1fr] md:items-center">
            <div><span className="section-kicker">The FlowNet difference</span><h2 className="mt-5 max-w-lg font-display text-4xl font-bold leading-tight text-[#0b1628] sm:text-5xl">Start where the friction is. Build from there.</h2><p className="mt-6 max-w-lg text-lg leading-8 text-[#5d7186]">A printer problem and a missed follow-up often have the same root: technology that was never shaped around the people using it.</p><a href="#request" className="mt-8 inline-flex items-center gap-2 font-extrabold text-[#007e70]" data-testid="link-difference-start">Talk through your next step <ArrowRight className="h-4 w-4" /></a></div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { number: '01', title: 'Listen first', body: 'We begin with your actual routine, not a catalog of tools.', icon: MessageCircle },
                { number: '02', title: 'Make it usable', body: 'Clear handoffs, plain language, and systems people will actually use.', icon: ListChecks },
                { number: '03', title: 'Leave a path', body: 'You get a next step that makes sense, whether we do it together or not.', icon: ArrowRight },
                { number: '04', title: 'Stay close', body: 'When technology changes, you do not have to figure it out alone.', icon: Clock3 },
              ].map((item, index) => (
                <div key={item.number} className={`rounded-2xl border border-[#d9e4e8] bg-white p-5 ${index === 1 ? 'sm:translate-y-6' : ''}`}>
                  <div className="flex items-center justify-between"><span className="font-mono text-xs font-bold text-[#00aF9d]">{item.number}</span><item.icon className="h-5 w-5 text-[#1a6dff]" /></div><h3 className="mt-8 font-display text-xl font-bold text-[#0b1628]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#6c7e8f]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-wide py-20 md:py-28" id="readiness">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><span className="section-kicker">For organizations ready to move</span><h2 className="mt-5 font-display text-4xl font-bold text-[#0b1628] sm:text-5xl">Good systems make room for good work.</h2></div><p className="max-w-sm text-base leading-7 text-[#63778b] md:text-right">Remote consulting for leaders who want clarity before they add another tool.</p></div>
          <div className="mt-12 grid gap-5 md:grid-cols-[.8fr_1.2fr]">
            <div className="rounded-[28px] bg-[#0b1628] p-7 text-white sm:p-9" id="churches"><div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1b3454] text-[#00c9b1]"><Building2 className="h-6 w-6" /></span><span className="rounded-full border border-[#3d5570] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.13em] text-[#a6bacb]">Church solutions</span></div><h3 className="mt-12 font-display text-3xl font-bold">More ministry. Less maintenance.</h3><p className="mt-4 leading-7 text-[#b4c4d3]">A church tech audit sees the Sunday morning experience, the volunteer handoff, and the quiet risks in between.</p><Link href="/tech-care" className="mt-8 inline-flex items-center gap-2 font-extrabold text-[#00c9b1]" data-testid="link-church-solutions">See a practical starting point <ArrowRight className="h-4 w-4" /></Link></div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-[28px] border border-[#d7e2e7] bg-[#fff8ed] p-7"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#ffe5bd] text-[#c06a12]"><Bot className="h-5 w-5" /></span><h3 className="mt-9 font-display text-2xl font-bold text-[#0b1628]">AI Receptionist</h3><p className="mt-3 text-sm leading-6 text-[#65788b]">A warmer first response for the questions your team answers every day.</p></div>
              <div className="rounded-[28px] border border-[#d7e2e7] bg-[#edf3ff] p-7 sm:translate-y-8"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#d9e5ff] text-[#1a6dff]"><FileCheck2 className="h-5 w-5" /></span><h3 className="mt-9 font-display text-2xl font-bold text-[#0b1628]">AI Readiness Audit</h3><p className="mt-3 text-sm leading-6 text-[#65788b]">Know where AI can help, what it should not touch, and what to fix first.</p></div>
            </div>
          </div>
        </section>

        <section className="bg-[#e7fbf7] py-20 md:py-28" id="request">
          <div className="container-wide grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-start">
            <div><span className="section-kicker">Let’s make it less stuck</span><h2 className="mt-5 font-display text-4xl font-bold leading-tight text-[#0b1628] sm:text-5xl">Tell us what is not working.</h2><p className="mt-5 max-w-md leading-7 text-[#526f7b]">A few details help us point you to the right kind of help — a local visit, a systems conversation, or both.</p><div className="mt-8 space-y-4 text-sm font-bold text-[#476773]"><div className="flex items-start gap-3"><span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-[#00c9b1] text-[#0b1628]"><Check className="h-3 w-3" /></span>No confusing sales process</div><div className="flex items-start gap-3"><span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-[#00c9b1] text-[#0b1628]"><Check className="h-3 w-3" /></span>Plain-language next steps</div><div className="flex items-start gap-3"><span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-[#00c9b1] text-[#0b1628]"><Check className="h-3 w-3" /></span>Local or remote, depending on the need</div></div></div>
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