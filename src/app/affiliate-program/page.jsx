"use client"

import AffiliateHero from "@/components/affiliate/affiliate-hero"
import HowItWorks from "@/components/affiliate/how-it-works"
import AffiliateApplicationForm from "@/components/affiliate/affiliate-application-form"

export default function AffiliateProgramPage() {
  const scrollToForm = () => {
    const formElement = document.getElementById('application-form');
    if (formElement) {
      const navbarHeight = 64; // Headline ticker (32px) + navbar padding (32px)
      const elementPosition = formElement.offsetTop;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AffiliateHero onApplyClick={scrollToForm} />
      <HowItWorks />
      <AffiliateApplicationForm />
    </div>
  )
}