import { type FormEvent, useState } from 'react';
import { ArrowRight, CircleCheck } from 'lucide-react';
import {
  useSubmitTechCareRequest,
  type TechCareRequestInput,
} from '@workspace/api-client-react';

const services = [
  'Home Tech Checkup',
  'Printer & Wi-Fi Rescue',
  'Smart Home Setup',
  'New Device Setup',
  'Church Tech Audit',
  'Quarterly Care Plans',
] as const;

const cities = [
  'Norfolk',
  'Virginia Beach',
  'Chesapeake',
  'Suffolk',
  'Portsmouth',
  'Hampton',
  'Newport News',
  'Other',
] as const;

const customerTypes = ['Home', 'Church', 'Small business / nonprofit'] as const;

const fieldClass =
  'mt-2 min-h-12 w-full rounded-xl border border-[#cad9e2] bg-[#fbfdfe] px-4 font-medium outline-none transition focus:border-[#00af9d] focus:ring-4 focus:ring-[#00c9b1]/15';
const labelClass = 'text-sm font-extrabold text-[#263b52]';

export default function TechCareRequestForm() {
  const request = useSubmitTechCareRequest();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (request.isPending) return;

    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? '').trim();
    const payload: TechCareRequestInput = {
      full_name: value('full_name'),
      email: value('email'),
      phone: value('phone'),
      tech_care_service: value('tech_care_service') as TechCareRequestInput['tech_care_service'],
      tech_care_city: value('tech_care_city') as TechCareRequestInput['tech_care_city'],
      customer_type: value('customer_type') as TechCareRequestInput['customer_type'],
      tech_care_detail: value('tech_care_detail'),
      preferred_contact: value('preferred_contact') as TechCareRequestInput['preferred_contact'],
      best_time: value('best_time'),
    };

    setError('');
    try {
      const response = await request.mutateAsync({ data: payload });
      if (response.success) {
        setSubmitted(true);
      } else {
        setError('We could not send your request right now. Please try again later.');
      }
    } catch {
      setError('We could not send your request right now. Please try again later. You can also call Aria at (757) 574-9991.');
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-[355px] flex-col items-center justify-center rounded-[28px] border border-[#a9e9df] bg-[#f3fffc] p-8 text-center" role="status" data-testid="status-tech-care-success">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-[#00c9b1] text-[#0b1628]">
          <CircleCheck className="h-8 w-8" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold text-[#0b1628]">Thank you. Linette will reply within one business day.</h3>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[28px] border border-[#d5e2e8] bg-white p-5 shadow-[0_16px_50px_rgba(11,22,40,.08)] sm:p-7" data-testid="form-tech-care">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          Your name *
          <input required maxLength={150} name="full_name" autoComplete="name" className={fieldClass} placeholder="Your full name" />
        </label>
        <label className={labelClass}>
          Email address *
          <input required maxLength={254} name="email" type="email" autoComplete="email" className={fieldClass} placeholder="you@example.com" />
        </label>
        <label className={labelClass}>
          Phone *
          <input required minLength={7} maxLength={40} name="phone" type="tel" autoComplete="tel" className={fieldClass} placeholder="(757) 555-0123" />
        </label>
        <label className={labelClass}>
          What can we help with? *
          <select required name="tech_care_service" defaultValue="" className={fieldClass}>
            <option value="" disabled>Choose a service</option>
            {services.map((service) => <option key={service} value={service}>{service}</option>)}
          </select>
        </label>
        <label className={labelClass}>
          Where are you located? *
          <select required name="tech_care_city" defaultValue="" className={fieldClass}>
            <option value="" disabled>Choose a city</option>
            {cities.map((city) => <option key={city} value={city}>{city}</option>)}
          </select>
        </label>
        <label className={labelClass}>
          Is this for your home, a church, or a business? *
          <select required name="customer_type" defaultValue="" className={fieldClass}>
            <option value="" disabled>Choose one</option>
            {customerTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </label>
        <label className={labelClass}>
          Preferred contact
          <select name="preferred_contact" defaultValue="Email" className={fieldClass}>
            <option>Email</option>
            <option>Phone</option>
            <option>Text</option>
          </select>
        </label>
        <label className={labelClass}>
          Best time to reach you
          <input name="best_time" maxLength={200} className={fieldClass} placeholder="e.g. Weekday mornings" />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          A little more detail
          <textarea name="tech_care_detail" maxLength={3000} rows={4} className={`${fieldClass} resize-y py-3`} placeholder="What is getting in the way right now?" />
        </label>
      </div>
      {error && <p role="alert" className="mt-4 text-sm font-bold text-[#b54848]">{error}</p>}
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs leading-5 text-[#718294]">Your request will be sent securely. We will follow up using your preferred contact method.</p>
        <button disabled={request.isPending} type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0b1628] px-6 text-sm font-extrabold text-white transition hover:bg-[#1a6dff] disabled:cursor-wait disabled:opacity-60" data-testid="button-submit-tech-care">
          {request.isPending ? 'Sending…' : 'Send my request'} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}