"use client";
import React from "react";
import StrapiImage from "../strapi-image";
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
      <section className="relative py-12 lg:py-24 px-12 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
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

            <div className="text-xl text-white/90">
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
              <div>
                {loading
                  ? <Skeleton width={180} height={48} />
                  : (
                    <Link href="/waitlist">
                      <button
                        className="cursor-pointer text-lg px-6 py-4 bg-primary hover:bg-primary/90 text-secondary font-semibold rounded-md border border-primary transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        {data.callToActionText}
                      </button>
                    </Link>
                  )
                }
              </div>
            </div>
            <div className="flex-1 hidden sm:block">
              {loading
                ? <Skeleton height={320} />
                :
                  <Image
                    src={data.heroImage?.url || ""}
                    alt={data.alternativeText || "Hero Image"}
                    width={data.heroImage.width}
                    height={data.heroImage.height}
                    className="rounded-md w-full h-auto max-w-xl"
                    priority={true}
                  />
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
