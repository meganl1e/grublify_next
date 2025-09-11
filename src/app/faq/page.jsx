import FaqClient from "@/components/faq/faq-client";
import FaqContact from "@/components/faq/faq-contact";
import PageHeader from "@/components/ui/page-header";
import FaqErrorBoundary from "@/components/faq/faq-error-boundary";
import { Button } from "@/components/ui/button";
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
  // Handle null, undefined, or non-array inputs
  if (!faqItems || !Array.isArray(faqItems)) {
    return [];
  }

  const grouped = {};

  // Group items by category (or "Uncategorized")
  faqItems.forEach(item => {
    // Skip items that don't have required properties
    if (!item || typeof item !== 'object') return;
    
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
  try {
    const faqs = await fetchFaqs();
    const groupedFaqs = groupFaqItemsToCategories(faqs);

    return (
      <FaqErrorBoundary>
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
        
        {/* Contact Section */}
        <section className="bg-primary-dark py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="text-3xl font-semibold text-white mb-8">
              Still have questions?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                variant="secondary" 
                size="lg"
                className="cursor-pointer group relative text-lg px-10 py-6 bg-gradient-to-r from-secondary to-secondary/90 text-white font-semibold border-2 border-secondary rounded-2xl hover:from-secondary/90 hover:to-secondary transition-all duration-300 ease-out shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
              >
                <a href="mailto:hello@grublify.com">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Email us at hello@grublify.com
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </Button>
              <span className="text-gray-300">or</span>
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="cursor-pointer group relative text-lg px-10 py-6 bg-transparent backdrop-blur-sm border-2 border-white/80 text-white font-semibold rounded-2xl hover:bg-white hover:border-white hover:text-primary-dark transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1"
              >
                <a href="/contact">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Visit our contact page
                    <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </span>
                </a>
              </Button>
            </div>
          </div>
        </section>
        </div>
      </FaqErrorBoundary>
    );
  } catch (error) {
    console.error('Error in FAQ page:', error);
    // Return a fallback UI if there's an error during server-side rendering
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white shadow-md rounded-lg p-8">
              <h1 className="text-2xl font-bold text-primary mb-4">Something went wrong</h1>
              <p className="text-secondary mb-4">
                We're having trouble loading the FAQ section. Please try refreshing the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-white font-semibold rounded-md shadow hover:bg-primary/90"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}