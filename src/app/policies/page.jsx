"use client"
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";

const policies2 = [
  { title: "Privacy Policy", slug: "privacy", description: "We respect your privacy and do not share your data with third parties." },
  { title: "Refund Policy", slug: "refund", description: "Refunds are available within 30 days of purchase with valid reason." },
  { title: "Terms of Service", slug: "terms", description: "By using our service, you agree to our terms and conditions." },
  { title: "Cookie Policy", slug: "cookie", description: "We use cookies to improve your experience on our site." }
];

export default function Policies() {

  const [policies, setPolicies] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/policies?fields=title&fields=slug`)
      .then(res => res.json())
      .then(data => {
        if (data?.data) {
          setPolicies(data);
          console.log("Fetched policies data:", data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching policies:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-xl mx-auto my-8 flex-1">
      <h1 className="text-3xl text-secondary font-bold mb-6">Policies</h1>
      <ul className="space-y-4">
        {loading ? (
          <li>Loading...</li>
        ) : (
          policies && policies.data && policies.data.length > 0 ? (
            policies.data.map((policy, idx) => (
              <li key={policy.id || idx}>
                <Link
                  href={`/policies/${policy.slug}`}
                  className="text-secondary hover:underline font-medium text-lg"
                >
                  {policy.attributes?.title || policy.title}
                </Link>
              </li>
            ))
          ) : (
            <li>No policies found.</li>
          )
        )}
      </ul>
    </div>
  );
}
