import FaqClient from "@/components/faq/faq-client";
import FaqContact from "@/components/faq/faq-contact";
import PageHeader from "@/components/ui/page-header";
import { fetchFaqs } from "@/lib/strapi-client";

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
    questions: items.map(({ question, answer, answerNew }) => ({
      question,
      answer,
      answerNew,
    })),
  }));

  return categories;
}


export default async function Faqs() {
  const faqs = await fetchFaqs();

  const groupedFaqs = groupFaqItemsToCategories(faqs);


  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title={
          <>
            Frequently Asked <span className="text-primary-dark">Questions</span>
          </>
        }
        subtitle="Everything you need to know about making fresh, homemade dog food with Grublify"
        variant="default"
      />

      <FaqClient faqs={groupedFaqs} />
      {/* <FaqContact /> */}
    </div>
  );
}