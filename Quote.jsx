import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QuoteStep from "../components/quote/QuoteStep";
import { base44 } from "@/api/base44Client";

const SERVICE_TYPES = [
  { value: "commercial", label: "Commercial Building", description: "Office, retail, or corporate" },
  { value: "residential", label: "Residential Home", description: "House or condo" },
  { value: "apartment", label: "Apartment Complex", description: "Multi-unit property" },
  { value: "property_mgmt", label: "Property Management", description: "Portfolio of properties" },
  { value: "real_estate", label: "Real Estate Prep", description: "Listing or staging prep" },
];

const FREQUENCY = [
  { value: "one_time", label: "One-Time", description: "Single deep clean" },
  { value: "weekly", label: "Weekly", description: "Recurring weekly service" },
  { value: "biweekly", label: "Bi-Weekly", description: "Every two weeks" },
  { value: "monthly", label: "Monthly", description: "Once per month" },
];

const SIZE = [
  { value: "small", label: "Under 1,000 sqft" },
  { value: "medium", label: "1,000 – 3,000 sqft" },
  { value: "large", label: "3,000 – 10,000 sqft" },
  { value: "xlarge", label: "10,000 – 50,000 sqft" },
  { value: "enterprise", label: "50,000+ sqft" },
];

const SPECIALTIES = [
  { value: "deep_clean", label: "Deep Clean" },
  { value: "post_construction", label: "Post-Construction" },
  { value: "move_out", label: "Move-Out Clean" },
  { value: "floor_care", label: "Floor Care & Polish" },
  { value: "window", label: "Window Cleaning" },
  { value: "pressure_wash", label: "Pressure Washing" },
];

export default function Quote() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    serviceType: "",
    frequency: "",
    size: "",
    specialties: [],
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const steps = [
    { label: "Property Type", key: "serviceType" },
    { label: "Frequency", key: "frequency" },
    { label: "Size", key: "size" },
    { label: "Specialty Services", key: "specialties" },
    { label: "Your Details", key: "contact" },
  ];

  const canAdvance = () => {
    if (step === 0) return form.serviceType;
    if (step === 1) return form.frequency;
    if (step === 2) return form.size;
    if (step === 3) return true;
    if (step === 4) return form.name && form.email;
    return false;
  };

  const handleSubmit = () => {
    const body = `New Quote Request from Bytown Cleaning Website\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "Not provided"}\n\nProperty Type: ${form.serviceType}\nFrequency: ${form.frequency}\nSize: ${form.size}\nSpecialty Services: ${form.specialties.length > 0 ? form.specialties.join(", ") : "None"}\n\nAdditional Notes:\n${form.notes || "None"}`;

    // Fire and forget — don't block the UI
    base44.entities.QuoteRequest.create({
      name: form.name,
      email: form.email,
      phone: form.phone,
      service_type: form.serviceType,
      frequency: form.frequency,
      size: form.size,
      specialties: form.specialties,
      notes: form.notes,
      status: "new",
    }).catch(() => {});

    base44.integrations.Core.SendEmail({
      to: "bytowncleaning@gmail.com",
      subject: `New Quote Request — ${form.name}`,
      body,
    }).catch(() => {});

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-8">
            <Check size={28} className="text-primary-foreground" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-foreground tracking-tight mb-4">
            Quote request received
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed">
            Thank you, {form.name}. We'll review your request and send a detailed estimate to {form.email} within 24 hours.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <section className="py-16 lg:py-20 px-6 lg:px-10 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <p className="font-body text-sm tracking-widest uppercase text-primary mb-4">
            Free Estimate
          </p>
          <h1 className="font-heading font-extrabold text-3xl lg:text-5xl text-foreground tracking-tight leading-tight mb-4">
            Get your quote
          </h1>
          <p className="font-body text-muted-foreground text-lg leading-relaxed">
            Tell us about your space and we'll build a custom estimate. Takes under 2 minutes.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-12">
            {steps.map((s, i) => (
              <React.Fragment key={i}>
                <div
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    i <= step ? "bg-primary" : "bg-border"
                  }`}
                />
              </React.Fragment>
            ))}
          </div>

          <p className="font-mono text-xs text-muted-foreground mb-2">
            Step {step + 1} of {steps.length}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && (
                <QuoteStep
                  label="What type of property do you need cleaned?"
                  options={SERVICE_TYPES}
                  selected={form.serviceType}
                  onSelect={(v) => setForm({ ...form, serviceType: v })}
                />
              )}
              {step === 1 && (
                <QuoteStep
                  label="How often do you need service?"
                  options={FREQUENCY}
                  selected={form.frequency}
                  onSelect={(v) => setForm({ ...form, frequency: v })}
                />
              )}
              {step === 2 && (
                <QuoteStep
                  label="What's the approximate size?"
                  options={SIZE}
                  selected={form.size}
                  onSelect={(v) => setForm({ ...form, size: v })}
                />
              )}
              {step === 3 && (
                <QuoteStep
                  label="Any specialty services needed? (Select all that apply)"
                  options={SPECIALTIES}
                  selected={form.specialties}
                  onSelect={(v) => setForm({ ...form, specialties: v })}
                  multi
                />
              )}
              {step === 4 && (
                <div>
                  <p className="font-heading font-bold text-sm text-foreground mb-6 tracking-wide">
                    How should we reach you?
                  </p>
                  <div className="space-y-4 max-w-md">
                    <Input
                      placeholder="Full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="h-12 rounded-sm font-body text-sm bg-card border-border"
                    />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="h-12 rounded-sm font-body text-sm bg-card border-border"
                    />
                    <Input
                      type="tel"
                      placeholder="Phone (optional)"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="h-12 rounded-sm font-body text-sm bg-card border-border"
                    />
                    <Textarea
                      placeholder="Anything else we should know?"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="rounded-sm font-body text-sm bg-card border-border min-h-24"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
            <Button
              variant="ghost"
              onClick={() => setStep(step - 1)}
              disabled={step === 0}
              className="font-heading font-semibold text-sm h-12 px-6 rounded-sm text-muted-foreground"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>

            {step < steps.length - 1 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canAdvance()}
                className="bg-primary text-primary-foreground font-heading font-semibold text-sm h-12 px-8 rounded-sm hover:bg-primary/90"
              >
                Continue
                <ArrowRight size={16} className="ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canAdvance() || sending}
                className="bg-primary text-primary-foreground font-heading font-semibold text-sm h-12 px-8 rounded-sm hover:bg-primary/90"
              >
                {sending ? (
                <>Sending... <Loader2 size={16} className="ml-2 animate-spin" /></>
              ) : (
                <>Submit Quote Request <Check size={16} className="ml-2" /></>
              )}
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
