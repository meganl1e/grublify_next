"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, ShoppingCart, Gift, ArrowRight } from "lucide-react"
import { BsFillBagHeartFill } from "react-icons/bs";
import { GiCookingPot } from "react-icons/gi";
import { PiCookingPot } from "react-icons/pi";
import { TbDogBowl } from "react-icons/tb";

const referralTiers = [
  {
    referrals: 1,
    reward: "Tote Bag",
    description:
      "Show off your Grublify pride with a stylish, durable tote bag customized with our logo. Perfect for groceries, beach trips, or everyday essentials.",
    icon: <BsFillBagHeartFill className="text-teal-400" />, // use the icon component
    color: "from-teal-400 to-teal-600",
  },
  {
    referrals: 4,
    reward: "Customized Yeti Dog Bowl",
    description:
      "Keep your furry friend hydrated in style! This premium Yeti dog bowl will be customized with your pet's name or a special message, making it a unique and practical gift.",
    icon: <TbDogBowl className="text-green-400" />,
    color: "from-green-400 to-green-600",
  },
  {
    referrals: 8,
    reward: "Pressure Cooker",
    description:
      "Elevate your home cooking with a brand new pressure cooker. Prepare delicious, healthy meals in a fraction of the time, perfect for busy Grublify enthusiasts.",
    icon: <GiCookingPot className="text-blue-400" />,
    color: "from-blue-400 to-blue-600",
  },
]

export default function ReferralPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-secondary text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Gift className="w-12 h-12 text-primary" />
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Referral <span className="text-primary">Program</span>
            </h1>
          </div>
          <p className="text-xl text-gray-200 leading-relaxed mb-8">
            Share Grublify with friends and earn amazing rewards! Refer friends, they get healthy dog food, you get
            awesome prizes.
          </p>

          <Button
            size="lg"
            className="hover:bg-teal-600 text-secondary font-bold text-xl px-10 py-6 shadow-xl hover:shadow-2xl transition-all"

          >
            <a
              href="https://forms.gle/G4pcQ7rUf7fzksNf8"
              target="_blank"
              rel="noopener noreferrer"
            >
              Refer Your Friends Now!
            </a>
          </Button>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="py-20 bg-primary-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-6">Earn These Rewards</h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              The more friends you refer, the better the prizes get!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {referralTiers.map((tier, index) => (
              <Card
                key={index}
                className="border-0 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 bg-white rounded-2xl overflow-hidden p-0"
              >
                <div className={`h-2 bg-gradient-to-r ${tier.color}`}></div>
                <CardContent className="p-8">
                  <div className="text-center mb-6 flex flex-col items-center">
                    <div className="text-6xl mb-4">{tier.icon}</div>
                    <Badge
                      className={`bg-gradient-to-r ${tier.color} text-white px-4 py-2 text-lg font-bold rounded-full`}
                    >
                      {tier.referrals} {tier.referrals === 1 ? "Referral" : "Referrals"}
                    </Badge>
                  </div>

                  <h3 className="text-2xl font-bold text-secondary mb-4 text-center">{tier.reward}</h3>
                  <p className="text-foreground text-lg leading-relaxed text-center">{tier.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Earning?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Tell your friends about Grublify and start collecting amazing rewards today!
          </p>

          <Button
            size="lg"
            variant="secondary"
            className="hover:bg-slate-800 text-white font-bold text-xl px-10 py-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer"
          >
            <a
              href="https://forms.gle/G4pcQ7rUf7fzksNf8"
              target="_blank"
              rel="noopener noreferrer"
            >
              Refer Your Friends Now!
            </a>
          </Button>

          <p className="text-md font-medium text-gray-200 mt-6">
            Questions?{" "}
            <span className="text-secondary">Email hello@grublify.com</span>
          </p>
        </div>
      </section>
    </div>
  )
}
