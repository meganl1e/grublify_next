"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function AffiliateHero({ onApplyClick }) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <Image
              src="/affiliate2.jpg"
              alt="Affiliate Program"
              width={600}
              height={600}
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-secondary">Become a <span className="text-primary">Grublify</span> Affiliate</h1>
            <p className="text-xl text-muted-foreground">Get paid and earn exclusive rewards for being your dog's personal chef!</p>
            <Button
              variant="default"
              size="lg"
              onClick={onApplyClick}
              className="cursor-pointer group relative text-lg px-10 py-6 bg-gradient-to-r from-secondary to-secondary/90 text-white font-semibold border-2 border-secondary rounded-2xl hover:from-secondary/90 hover:to-secondary transition-all duration-300 ease-out shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Apply Now
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
