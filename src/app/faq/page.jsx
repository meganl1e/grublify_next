"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, Search, User, ShoppingCart, HelpCircle } from "lucide-react"

const faqCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    questions: [
      {
        question: "What is Grublify and how does it work?",
        answer:
          "Grublify provides easy-to-follow recipes and essential nutrition packs to help you make fresh, homemade dog food. Simply choose a recipe, add our nutrition pack to your fresh ingredients, and serve a complete, balanced meal to your pup.",
      },
      {
        question: "Is homemade dog food safe for my dog?",
        answer:
          "Yes! All our recipes are developed and approved by veterinary nutritionists. Our nutrition packs ensure your dog gets all essential vitamins and minerals needed for optimal health. We follow AAFCO guidelines for complete and balanced nutrition.",
      },
      {
        question: "How do I know which recipes are right for my dog?",
        answer:
          "Our recipes are suitable for most adult dogs. We provide guidance based on your dog's size, age, and activity level. If your dog has specific health conditions or dietary restrictions, we recommend consulting with your veterinarian first.",
      },
      {
        question: "Do I need any special equipment to make the recipes?",
        answer:
          "No special equipment needed! Our recipes use standard kitchen tools like pots, pans, and measuring cups. Most meals can be prepared in 30 minutes or less using ingredients from your regular grocery store.",
      },
    ],
  },
  {
    id: "nutrition-health",
    title: "Nutrition & Health",
    questions: [
      {
        question: "Are the nutrition packs necessary?",
        answer:
          "Yes, our nutrition packs are essential for providing complete and balanced nutrition. Fresh ingredients alone don't provide all the vitamins and minerals dogs need. Our packs fill those nutritional gaps to ensure your dog gets everything they need.",
      },
      {
        question: "What's in the nutrition packs?",
        answer:
          "Our nutrition packs contain essential vitamins (A, D, E, K, B-complex), minerals (calcium, phosphorus, zinc, iron), omega fatty acids, and other nutrients specifically formulated for dogs. All ingredients are sourced from reputable suppliers and tested for purity.",
      },
      {
        question: "Can puppies eat Grublify meals?",
        answer:
          "Our current recipes are formulated for adult dogs. Puppies have different nutritional requirements for proper growth and development. We're working on puppy-specific recipes and nutrition packs. For now, we recommend sticking with puppy-formulated commercial foods.",
      },
      {
        question: "Will this help with my dog's allergies?",
        answer:
          "Many of our recipes use limited, whole food ingredients which can be helpful for dogs with food sensitivities. However, we recommend consulting with your vet before making dietary changes if your dog has known allergies or health conditions.",
      },
    ],
  },
  {
    id: "recipes-cooking",
    title: "Recipes & Cooking",
    questions: [
      {
        question: "How many recipes do you offer?",
        answer:
          "We currently offer 50+ vet-approved recipes featuring different proteins like chicken, beef, turkey, fish, and vegetarian options. We regularly add new recipes based on customer feedback and seasonal ingredients.",
      },
      {
        question: "How long do the meals stay fresh?",
        answer:
          "Freshly prepared meals can be stored in the refrigerator for up to 3-4 days. You can also freeze portions for up to 3 months. We recommend making meals in batches and freezing individual portions for convenience.",
      },
      {
        question: "Can I modify the recipes?",
        answer:
          "We recommend following recipes exactly as written to ensure proper nutrition balance. If you need to substitute ingredients due to allergies or availability, please consult our substitution guide or contact our nutrition team for guidance.",
      },
      {
        question: "How much should I feed my dog?",
        answer:
          "Feeding amounts depend on your dog's weight, age, and activity level. Each recipe includes feeding guidelines, and our nutrition packs come with detailed feeding charts. Start with recommended amounts and adjust based on your dog's body condition.",
      },
    ],
  },
  {
    id: "subscription-delivery",
    title: "Subscription & Delivery",
    questions: [
      {
        question: "How does the subscription work?",
        answer:
          "Choose your delivery frequency (monthly or bi-monthly) and we'll automatically send nutrition packs based on your dog's needs. You can pause, skip, or cancel anytime. Recipes are always available in your account.",
      },
      {
        question: "What if I need to skip a delivery?",
        answer:
          "You can easily skip deliveries in your account dashboard or by contacting customer service. We recommend skipping at least 5 days before your next scheduled delivery date.",
      },
      {
        question: "Do you ship everywhere?",
        answer:
          "We currently ship to all 50 US states. Shipping is free on orders over $35. We're working on expanding to Canada and other international markets in the future.",
      },
      {
        question: "Can I change my subscription frequency?",
        answer:
          "You can change your delivery frequency anytime in your account settings. Popular options are monthly for most dogs, or bi-monthly for smaller dogs or multi-dog households.",
      },
    ],
  },
  {
    id: "account-billing",
    title: "Account & Billing",
    questions: [
      {
        question: "How do I cancel my subscription?",
        answer:
          "You can cancel anytime in your account dashboard under 'Subscription Settings' or by contacting customer service. There are no cancellation fees, and you'll continue to receive deliveries until your current billing period ends.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express, Discover) and PayPal. Your payment method is securely stored and automatically charged for subscription deliveries.",
      },
      {
        question: "Can I get a refund if my dog doesn't like the food?",
        answer:
          "Yes! We offer a 30-day money-back guarantee. If you're not completely satisfied, contact us for a full refund. We want both you and your pup to be happy with Grublify.",
      },
      {
        question: "How do I update my shipping address?",
        answer:
          "You can update your shipping address anytime in your account settings. Changes made at least 2 days before your next delivery will apply to that shipment. Otherwise, they'll apply to the following delivery.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [openQuestions, setOpenQuestions] = useState([])

  const toggleQuestion = (categoryId, questionIndex) => {
    const questionId = `${categoryId}-${questionIndex}`
    setOpenQuestions((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId],
    )
  }

  const filteredCategories = faqCategories.filter((category) => {
    if (selectedCategory !== "all" && category.id !== selectedCategory) return false

    if (searchTerm) {
      return category.questions.some(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    return true
  })

  const filteredQuestions = (questions) => {
    if (!searchTerm) return questions
    return questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  return (
    <div className="min-h-screen bg-white">
      

      {/* Hero Section - Matching Grublify's style */}
      <section className="bg-gradient-to-br from-slate-700 via-slate-600 to-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Frequently Asked <span className="text-teal-300">Questions</span>
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              Everything you need to know about making fresh, homemade dog food with Grublify
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-full border-0 bg-white text-gray-800 placeholder-gray-500"
              />
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  selectedCategory === "all" ? "bg-teal-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                All Questions
              </button>
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-teal-500 text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content - Light teal background like "How Grublify Works" section */}
      <section className="py-20 bg-gradient-to-b from-teal-50 via-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-16">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No results found</h3>
              <p className="text-gray-600 text-lg">Try adjusting your search terms or browse all categories.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((category) => {
                const questions = filteredQuestions(category.questions)

                if (questions.length === 0) return null

                return (
                  <div key={category.id}>
                    <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">{category.title}</h2>

                    <div className="space-y-4">
                      {questions.map((faq, index) => {
                        const questionId = `${category.id}-${index}`
                        const isOpen = openQuestions.includes(questionId)

                        return (
                          <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                          >
                            <button
                              onClick={() => toggleQuestion(category.id, index)}
                              className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                              <h3 className="text-lg font-semibold text-slate-800 pr-4">{faq.question}</h3>
                              {isOpen ? (
                                <ChevronUp className="w-6 h-6 text-teal-600 flex-shrink-0" />
                              ) : (
                                <ChevronDown className="w-6 h-6 text-teal-600 flex-shrink-0" />
                              )}
                            </button>

                            {isOpen && (
                              <div className="px-6 pb-6">
                                <div className="border-t border-gray-200 pt-4">
                                  <p className="text-gray-700 leading-relaxed text-lg">{faq.answer}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section - Dark background like hero */}
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
    </div>
  )
}
