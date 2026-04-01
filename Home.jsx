import React from "react";
import Hero from "../components/home/Hero";
import StatsBar from "../components/home/StatsBar";
import ServicesOverview from "../components/home/ServicesOverview";
import PortfolioSection from "../components/home/PortfolioSection";
import ContractorPortal from "../components/home/ContractorPortal";
import Testimonials from "../components/home/Testimonials";
import CTABanner from "../components/home/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesOverview />
      <PortfolioSection />
      <ContractorPortal />
      <Testimonials />
      <CTABanner />
    </>
  );
}
