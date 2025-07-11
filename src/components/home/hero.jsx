"use client";
import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Link from "next/link";
import Image from "next/image";

export default function Hero({ data, loading }) {

  // Guard: If there's an error or no data after loading
  if (!loading && !data) {
    return <div>No homepage data found</div>;
  }

  return (
    <div className="flex-1">
      <section className="relative bg-gradient-to-br from-secondary to-secondary/90 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">

              {/* headline */}
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                {loading ? (
                  <div>
                    <div className="h-[40px] md:h-[64px] mb-2">
                      <Skeleton height="100%" width="100%" />
                    </div>
                    <div className="h-[40px] md:h-[64px]">
                      <Skeleton height="100%" width="100%" />
                    </div>
                  </div>
                ) : (
                  <>
                    {data.headline}{" "}
                    <span className="text-primary">{data.headlineBold}</span>
                  </>
                )}
              </h1>

              {/* subheadline */}
              <div className="text-xl text-slate-200 ">
                {loading ? (
                  <div>
                    <div className="h-6 md:h-7 mb-1">
                      <Skeleton height="100%" width="90%" />
                    </div>
                    <div className="h-6 md:h-7">
                      <Skeleton height="100%" width="70%" />
                    </div>
                  </div>
                ) : (
                  <h2>{data.subheadline}</h2>
                )}
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">

                {/* shop nutrition packs button */}
                {loading
                  ? <Skeleton width={180} height={48} />
                  : (
                    <Link href="/products/nutrition-pack-essentials">
                      <button
                        className="w-full cursor-pointer border-2 border-primary text-lg px-8 py-3 bg-primary text-secondary font-semibold rounded-2xl  hover:bg-primary/90 hover:scale-105 transition-all duration-200"
                      >
                        {data.callToActionText}
                      </button>
                    </Link>
                  )
                }

                {/* explore recipes button */}
                {loading
                  ? <Skeleton width={180} height={48} />
                  : (
                    <Link href="/recipes">
                      <button
                        className="w-full cursor-pointer border-2 border-muted text-lg px-8 py-3 bg-transparent text-muted font-semibold rounded-2xl  hover:bg-muted hover:text-secondary hover:scale-105 transition-all duration-200"
                      >
                        Explore Recipes
                      </button>
                    </Link>
                  )
                }
              </div>
            </div>

            {/* hero image */}
            <div className="flex-1 hidden sm:block">
              {loading
                ? <Skeleton height={320} />
                :
                <div className="rounded-md w-full h-auto max-w-md mx-auto border-6 border-white shadow-2xl">
                <Image
                  src={data.heroImage?.url || ""}
                  alt={data.alternativeText || "Shiba Inu dog standing by a window next to a Grublify nutrition pack"}
                  width={data.heroImage.width}
                  height={data.heroImage.height}
                  className="rounded-md w-full h-auto max-w-md mx-auto"
                  priority={true}
                />
                </div>
              }
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
