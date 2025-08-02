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

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')     // Replace spaces with dash
    .replace(/[^\w-]/g, '')   // Remove all non-word chars except dash
    .replace(/--+/g, '-')     // Replace multiple dashes with one dash
    .replace(/^-+/, '')       // Trim starting dash
    .replace(/-+$/, '');      // Trim ending dash
}

function groupFaqItemsToCategories(faqItems) {
  const grouped = {};

  // Group items by category (or "Uncategorized")
  faqItems.forEach(item => {
    const cat = item.category || "Uncategorized";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  });

  // Transform grouped object into array of category objects
  const categories = Object.entries(grouped).map(([categoryName, items]) => ({
    id: slugify(categoryName),
    title: categoryName,
    // icon: iconMap[categoryName] || null,   // or undefined if no icon
    // color: colorMap[categoryName] || null, // or undefined if no color
    questions: items.map(({ question, answer }) => ({
      question,
      answer,
    })),
  }));

  // console.log("CATEGORIES: ", categories)

  return categories;
}


export default async function Faqs() {
  const faqs = await fetchFaqs();

  // const groupedFaqs = groupByCategory(faqs);
  const groupedFaqs = groupFaqItemsToCategories(faqs);

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