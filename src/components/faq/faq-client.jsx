"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, HelpCircle, Play, Heart, ChefHat, Truck, CreditCard, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"
import FaqSidebar from "@/components/faq/faq-sidebar"
import FaqCategory from "@/components/faq/faq-category"
import FaqQuestion from "@/components/faq/faq-question"
import FaqContact from "@/components/faq/faq-contact"

export default function FaqClient({ faqs }) {

  const [searchTerm, setSearchTerm] = useState("")
  const [openQuestions, setOpenQuestions] = useState([])

  const toggleQuestion = (categoryId, questionIndex) => {
    const questionId = `${categoryId}-${questionIndex}`
    setOpenQuestions((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId],
    )
  }

  // confirms it is an array
  const faqsArray = Array.isArray(faqs) ? faqs : [];

  // creates a new array called categories which only contains the title and id
  const categories = faqsArray.map(category => ({
    title: category.title,
    id: category.id
  }));

  // console.log("CAT: ", categories)

  // filter categories based on search term
  const filteredCategories = faqsArray.filter((category) => {
    if (searchTerm) {
      return category.questions.some(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    return true
  })

  // filter questions based on search term
  const filteredQuestions = (questions) => {
    if (!searchTerm) return questions
    return questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  // finds dom element on page with id=categoryId
  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  return (
    <>
      {/* Interactive Search Section */}
      <section className="bg-secondary text-white p-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className=" pl-12 pr-4 py-4 text-lg rounded-full border-0 !text-gray-200 !placeholder-gray-200"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <FaqSidebar
            categories={categories}
            scrollToCategory={scrollToCategory}
          />


          {/* FAQ Content */}
          <div className="lg:col-span-3">
            {filteredCategories.length === 0 ? (
              <Card className="p-8 text-center">
                <CardContent>
                  <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
                  <p className="text-gray-600">Try adjusting your search terms or browse all categories.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8">
                {filteredCategories.map((category) => {
                  const IconComponent = category.icon || Package
                  const questions = filteredQuestions(category.questions)

                  if (questions.length === 0) return null

                  return (
                    <div key={category.id} id={category.id} style={{ scrollMarginTop: '90px' }}>
                      <FaqCategory
                        category={category}
                        IconComponent={IconComponent}
                        scrollToCategory={scrollToCategory}
                      />
                      <FaqQuestion
                        questions={questions}
                        category={category}
                        openQuestions={openQuestions}
                        toggleQuestion={toggleQuestion} />
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <FaqContact />
    </>
  )
}
