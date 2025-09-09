"use client";
import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero({ data, loading }) {

  // Guard: If there's an error or no data after loading
  if (!loading && !data) {
    return <div>No homepage data found</div>;
  }

  return (
    <div className="flex-1">
      <section className="relative bg-primary-light py-16 md:py-20 overflow-hidden">
        {/* Decorative background elements */}
        {/* <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-purple-200 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-indigo-200 rounded-full blur-2xl"></div>
        </div> */}
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              {/* headline with enhanced styling */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  {loading ? (
                    <div>
                      <div className="h-[48px] md:h-[72px] mb-2">
                        <Skeleton height="100%" width="100%" />
                      </div>
                      <div className="h-[48px] md:h-[72px]">
                        <Skeleton height="100%" width="100%" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className="text-secondary block">
                        {data.headline}
                      </span>
                      <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text block">
                        {data.headlineBold}
                      </span>
                    </>
                  )}
                </h1>
                
                {/* decorative line */}
                <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
              </div>

              {/* subheadline with enhanced styling */}
              <div className="text-xl md:text-xl text-secondary/80 font-semibold leading-relaxed max-w-2xl">
                {loading ? (
                  <div>
                    <div className="h-7 md:h-8 mb-2">
                      <Skeleton height="100%" width="90%" />
                    </div>
                    <div className="h-7 md:h-8">
                      <Skeleton height="100%" width="70%" />
                    </div>
                  </div>
                ) : (
                  <h2 className="drop-shadow-sm">{data.subheadline}</h2>
                )}
              </div>
              
              {/* enhanced buttons */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                {/* shop nutrition packs button */}
                {loading
                  ? <Skeleton width={200} height={56} />
                  : (
                    <Link href="/products/nutrition-pack-essentials">
                      <Button 
                        variant="secondary" 
                        size="lg"
                        className="cursor-pointer group relative w-full md:w-auto text-lg px-10 py-6 bg-gradient-to-r from-secondary to-secondary/90 text-white font-semibold border-2 border-secondary rounded-2xl hover:from-secondary/90 hover:to-secondary transition-all duration-300 ease-out shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {data.callToActionText}
                          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Button>
                    </Link>
                  )
                }

                {/* explore recipes button */}
                {loading
                  ? <Skeleton width={180} height={56} />
                  : (
                    <Link href="/recipes">
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="cursor-pointer group relative w-full md:w-auto text-lg px-10 py-6 bg-white/80 backdrop-blur-sm border-2 border-secondary/80 text-secondary font-semibold rounded-2xl hover:bg-white hover:border-secondary hover:text-secondary transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Explore Recipes
                          <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </span>
                      </Button>
                    </Link>
                  )
                }
              </div>
              
              {/* trust indicators */}
              {/* <div className="flex items-center gap-6 pt-2 text-sm text-secondary/70">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Pet Nutritionist Formulated</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Meets AAFCO Standards</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>30-Day Guarantee</span>
                </div>
              </div> */}
            </div>

            {/* enhanced hero image */}
            <div className="flex-1 hidden sm:block">
              {loading
                ? <Skeleton height={400} />
                :
                <div className="">
                  {/* decorative elements around image */}
                  {/* <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-50  transition-opacity duration-300"></div> */}
                  <div className="">
                    <Image
                      src={data.heroImage?.url || ""}
                      alt={data.alternativeText || "Shiba Inu dog standing by a window next to a Grublify nutrition pack"}
                      width={data.heroImage.width}
                      height={data.heroImage.height}
                      className="w-full h-auto max-w-md mx-auto rounded-2xl border-6 border-primary/40 shadow-2xl"
                      priority={true}
                    />
                  
                  </div>
                </div>
              }
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
