import FaqClient from "@/components/faq/faq-client";
import FaqContact from "@/components/faq/faq-contact";
import { fetchFaqs } from "@/lib/strapi-client";

function groupByCategory(faqItems) {
  const grouped = {};
  faqItems.forEach(item => {
    const cat = item.category || "Uncategorized";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  });
  return grouped;
}


export default async function Faqs() {
  const faqs = await fetchFaqs();

  const groupedFaqs = groupByCategory(faqs);

  // console.log(groupedFaqs)



  return (
    <div className="min-h-screen bg-white">
      <section className="bg-secondary text-white pt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight pb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Everything you need to know about making fresh, homemade dog food with Grublify
            </p>
          </div>
        </div>
      </section>

      <FaqClient faqs={groupedFaqs} />
      <FaqContact />
    </div>
  );
}