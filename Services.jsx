import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Home, Building, Users, Key, Check } from "lucide-react";
import { motion } from "framer-motion";

const IMAGES = {
  commercial: "https://media.base44.com/images/public/69cc5618d41ab511e56ff5b5/2b041ba57_generated_5d452848.png",
  residential: "https://media.base44.com/images/public/69cc5618d41ab511e56ff5b5/420fbc00b_generated_75bfa507.png",
  apartments: "https://media.base44.com/images/public/69cc5618d41ab511e56ff5b5/acbf702bd_generated_1d7487f1.png",
  property: "https://media.base44.com/images/public/69cc5618d41ab511e56ff5b5/a7d13ad64_generated_d4f09bff.png",
  agents: "https://media.base44.com/images/public/69cc5618d41ab511e56ff5b5/4d1b3c6e2_generated_1c9f6314.png",
};

const services = [
  {
    id: "commercial",
    icon: Building2,
    title: "Commercial Buildings",
    subtitle: "Corporate environments deserve corporate standards",
    description: "From executive suites to expansive lobbies, our commercial cleaning protocols are designed around your business hours, security requirements, and brand standards. We work when you don't — so every morning starts pristine.",
    features: ["Daily/Weekly/Monthly Programs", "After-Hours Scheduling", "Green Cleaning Certified", "Floor Care & Restoration", "Window & Glass Services", "Restroom Deep Sanitation"],
    image: IMAGES.commercial,
  },
  {
    id: "residential",
    icon: Home,
    title: "Residential Homes",
    subtitle: "Your sanctuary, meticulously restored",
    description: "Whether it's a recurring maintenance clean or a deep restoration, we treat every home as a private commission. Our teams are vetted, insured, and trained in the care of premium materials and finishes.",
    features: ["Recurring Maintenance Plans", "Deep Clean & Restoration", "Move-In / Move-Out Prep", "Kitchen & Bath Detailing", "Eco-Friendly Products", "Same-Week Availability"],
    image: IMAGES.residential,
  },
  {
    id: "apartments",
    icon: Building,
    title: "Apartment Complexes",
    subtitle: "Common areas that elevate your entire property",
    description: "We manage the common spaces that shape first impressions — lobbies, hallways, stairwells, amenity rooms, and laundry facilities. Our systematic approach ensures consistent quality across every visit.",
    features: ["Common Area Maintenance", "Unit Turnover Service", "Amenity Space Cleaning", "Trash & Recycling Areas", "Pressure Washing", "Emergency Cleanup Response"],
    image: IMAGES.apartments,
  },
  {
    id: "property",
    icon: Users,
    title: "Property Managers",
    subtitle: "Your operational backbone for portfolio cleanliness",
    description: "Managing multiple properties requires a cleaning partner who understands logistics, not just soap. We offer centralized billing, custom scheduling dashboards, and documentation that satisfies your reporting needs.",
    features: ["Centralized Billing Portal", "Custom Scheduling Dashboard", "Photo-Documented Reports", "Dedicated Account Manager", "Multi-Property Discounts", "Emergency Response SLA"],
    image: IMAGES.property,
  },
  {
    id: "agents",
    icon: Key,
    title: "Real Estate Agents",
    subtitle: "Listings that sell themselves",
    description: "First impressions close deals. Our pre-listing and post-showing services ensure every property presents at its absolute best — spotless surfaces, streak-free windows, and that unmistakable 'new' feeling.",
    features: ["Pre-Listing Deep Clean", "Post-Showing Touch-Ups", "Staging Support Cleaning", "Open House Preparation", "Fast Turnaround (24–48hrs)", "Flexible Per-Visit Pricing"],
    image: IMAGES.agents,
  },
];

export default function Services() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, []);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <p className="font-body text-sm tracking-widest uppercase text-primary mb-4">
            What We Do
          </p>
          <h1 className="font-heading font-extrabold text-4xl lg:text-6xl text-foreground tracking-tight leading-tight mb-6">
            Services
          </h1>
          <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-2xl">
            Every environment has its own language. We've spent over a decade learning to speak each one fluently.
          </p>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service, i) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 lg:py-28 px-6 lg:px-10 ${i % 2 === 0 ? "bg-background" : "bg-card"}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 !== 0 ? "lg:direction-rtl" : ""}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={i % 2 !== 0 ? "lg:order-2" : ""}
              >
                <service.icon size={32} strokeWidth={1.5} className="text-primary mb-6" />
                <h2 className="font-heading font-extrabold text-2xl lg:text-4xl text-foreground tracking-tight leading-tight mb-3">
                  {service.title}
                </h2>
                <p className="font-body text-primary text-base mb-6">
                  {service.subtitle}
                </p>
                <p className="font-body text-muted-foreground text-base leading-relaxed mb-8">
                  {service.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <Check size={16} className="text-primary shrink-0" />
                      <span className="font-body text-sm text-foreground">{f}</span>
                    </div>
                  ))}
                </div>
                <Link to="/quote">
                  <Button className="bg-primary text-primary-foreground font-heading font-semibold text-sm h-12 px-8 rounded-sm hover:bg-primary/90">
                    Get a Quote
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`aspect-video overflow-hidden bg-muted ${i % 2 !== 0 ? "lg:order-1" : ""}`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
