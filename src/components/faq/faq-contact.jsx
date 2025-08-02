import { Button } from "../ui/button"
import { fetchFaqs } from "@/lib/strapi-client"

export default function FaqContact() {
  // const faqs = await fetchFaqs();


  return (
    <section className="bg-gradient-to-br from-slate-700 via-slate-600 to-teal-700 text-white py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Still have questions?</h2>
        <p className="text-xl text-gray-200 mb-8 leading-relaxed">
          Our customer support team is here to help you and your pup succeed with homemade nutrition.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-4 rounded-full text-lg">
            Contact Support
          </Button>
          <Button
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-slate-800 font-semibold px-8 py-4 rounded-full text-lg bg-transparent"
          >
            Schedule a Call
          </Button>
        </div>
      </div>
    </section>
  )
}