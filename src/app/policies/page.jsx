import React from "react";
import Link from "next/link";
// import NotFound from "./not-found";

// Helper to fetch policies from Strapi
async function fetchPolicies() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/policies?fields=title&fields=slug`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data?.data || null;
}

export default async function Policies() {
  const policies = await fetchPolicies();
  
  // if (!policies) return <NotFound />;

  return (
    <div className="max-w-xl mx-auto my-8 flex-1">
      <h1 className="text-3xl text-secondary font-bold mb-6">Policies</h1>
      <ul className="space-y-4">
        {policies.length > 0 ? (
          policies.map((policy, idx) => (
            <li key={policy.id || idx}>
              <Link
                href={`/policies/${policy.attributes?.slug || policy.slug}`}
                className="text-secondary hover:underline font-medium text-lg"
              >
                {policy.attributes?.title || policy.title}
              </Link>
            </li>
          ))
        ) : (
          <li>No policies found.</li>
        )}
      </ul>
    </div>
  );
}
