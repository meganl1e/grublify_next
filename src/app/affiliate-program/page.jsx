"use client"

import { Button } from "@/components/ui/button"
import PageHeader from "@/components/ui/page-header"
import Image from "next/image"

export default function AffiliateProgramPage() {
  const scrollToForm = () => {
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {/* <PageHeader
        title="Partner With Grublify"
        // subtitle="Help pet owners discover Grublify and earn money doing it! (Our affiliate program)"
        variant="default"
      /> */}

      {/* Main CTA */}
      {/* <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 text-lg"
            onClick={scrollToForm}
          >
            Join now
          </Button>
        </div>
      </section> */}

      {/* Benefits */}
      <section className="py-16 bg-white">
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
                onClick={scrollToForm}
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

        {/* How it works */}
        <section className="py-12 md:py-16 bg-primary-light">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
                How it works
              </h2>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="bg-white rounded-2xl shadow-lg border border-primary w-full max-w-sm p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-xl transition-all duration-300 group">
                <div className="bg-primary rounded-xl w-16 h-16 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <div className="flex flex-col gap-1 mb-4">
                  <div className="text-primary font-bold text-md tracking-widest">STEP 1</div>
                  <p className="text-2xl font-extrabold text-secondary group-hover:text-primary transition-colors duration-300">Join</p>
                </div>
                <p className="text-secondary/80 text-base text-center">Join at no charge. You'll be notified when your application is reviewed.</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-primary w-full max-w-sm p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-xl transition-all duration-300 group">
                <div className="bg-primary rounded-xl w-16 h-16 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 mb-4">
                  <span className="text-2xl">📢</span>
                </div>
                <div className="flex flex-col gap-1 mb-4">
                  <div className="text-primary font-bold text-md tracking-widest">STEP 2</div>
                  <p className="text-2xl font-extrabold text-secondary group-hover:text-primary transition-colors duration-300">Promote</p>
                </div>
                <p className="text-secondary/80 text-base text-center">Promote your link and share Grublify with your audience using your unique referral code.</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-primary w-full max-w-sm p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-xl transition-all duration-300 group">
                <div className="bg-primary rounded-xl w-16 h-16 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="flex flex-col gap-1 mb-4">
                  <div className="text-primary font-bold text-md tracking-widest">STEP 3</div>
                  <p className="text-2xl font-extrabold text-secondary group-hover:text-primary transition-colors duration-300">Earn</p>
                </div>
                <p className="text-secondary/80 text-base text-center">Earn $15 for each new customer you refer, plus 10% commission on their purchases.</p>
              </div>
            </div>
          </div>
        </section>


      {/* Application Form */}
      <section id="application-form" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-secondary mb-4 text-center">Ready to Get Started?</h2>
            <p className="text-lg text-foreground mb-8 text-center">
              Fill out the form below to apply for our affiliate program!
            </p>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-secondary mb-2">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-secondary mb-2">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="audience" className="block text-sm font-semibold text-secondary mb-2">Tell us about your audience *</label>
                <textarea
                  id="audience"
                  name="audience"
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Describe your audience, followers, or how you plan to promote Grublify..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">Social Media Platforms</label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="instagram" className="block text-xs text-gray-600 mb-1">Instagram</label>
                    <input
                      type="text"
                      id="instagram"
                      name="instagram"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="@yourhandle"
                    />
                  </div>
                  <div>
                    <label htmlFor="tiktok" className="block text-xs text-gray-600 mb-1">TikTok</label>
                    <input
                      type="text"
                      id="tiktok"
                      name="tiktok"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="@yourhandle"
                    />
                  </div>
                  <div>
                    <label htmlFor="youtube" className="block text-xs text-gray-600 mb-1">YouTube</label>
                    <input
                      type="text"
                      id="youtube"
                      name="youtube"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="@yourhandle or Channel Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="facebook" className="block text-xs text-gray-600 mb-1">Facebook</label>
                    <input
                      type="text"
                      id="facebook"
                      name="facebook"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="@yourhandle or Page Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="twitter" className="block text-xs text-gray-600 mb-1">Twitter/X</label>
                    <input
                      type="text"
                      id="twitter"
                      name="twitter"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="@yourhandle"
                    />
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-xs text-gray-600 mb-1">Website/Blog</label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-semibold text-secondary mb-2">Additional information</label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Anything else you'd like us to know (e.g., content ideas, timing, past partnerships, etc.)"
                />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3"
                >
                  Submit Application
                </Button>
              </div>
            </form>

            <p className="text-center text-foreground mt-6">
              Have questions? Just email us at{" "}
              <a href="mailto:hello@grublify.com" className="text-primary hover:underline font-semibold">
                hello@grublify.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}