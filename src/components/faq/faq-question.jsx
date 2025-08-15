import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import StrapiBlocksRenderer from "../ui/blocks/strapi-blocks-renderer";

export default function FaqQuestion({ questions, category, openQuestions, toggleQuestion }) {
  return (
    <div className="space-y-4">
      {questions.map((faq, index) => {
        const questionId = `${category.id}-${index}`
        const isOpen = openQuestions.includes(questionId)

        return (
          <Card key={index} className="p-0 border-0 shadow-md hover:shadow-lg hover:bg-gray-50 transition-colors">
            <CardContent className="p-0">
              <button
                onClick={() => toggleQuestion(category.id, index)}
                className="w-full text-left p-6 flex items-center justify-between "
              >
                <h3 className="text-lg font-semibold text-secondary pr-4">{faq.question}</h3>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-secondary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 textsecondary flex-shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-6 pb-6">
                  <div className="border-t pt-4">
                    <p className="text-secondary leading-relaxed">
                      <StrapiBlocksRenderer content={faq.answer} />
                      {/* {faq.answerNew} */}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}