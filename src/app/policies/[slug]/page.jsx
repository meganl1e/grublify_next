import PolicyBlocksRenderer from "@/components/ui/blocks/policy-blocks-renderer";
import NotFound from "../../not-found";
import { fetchPolicyBySlug } from "@/lib/strapi-client";


export default async function Policy({ params }) {
  const { slug } = await params;
  const policy = await fetchPolicyBySlug(slug);


  if (!policy ) return <NotFound />;

  const { title, content } = policy;

  return (
    <div className="flex-1 px-6 py-12">
      <div className="max-w-4xl mx-auto text-secondary">
        <div className="text-center mb-8 text-5xl font-semibold">
          {title || "Untitled Policy"}
        </div>
        {content && content.length > 0 ? (
          <PolicyBlocksRenderer content={content} />
        ) : (
          <div className="text-center text-muted-foreground">No content available for this policy.</div>
        )}
      </div>
    </div>
  );
}