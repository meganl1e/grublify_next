"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "../ui/card";

// Sample FAQ data - in production, this would come from your CMS/API
const faqs = [
  {
    id: 1,
    question: "Is homemade dog food really better than kibble?",
    answer: "Yes! Homemade dog food with proper nutrition packs provides fresher ingredients, better digestibility, and allows you to control exactly what your dog eats. Our nutrition packs ensure complete and balanced nutrition that meets AAFCO standards."
  },
  {
    id: 2,
    question: "How do I know if my dog is getting complete nutrition?",
    answer: "Our nutrition packs are formulated by certified pet nutritionists and meet AAFCO standards for complete and balanced nutrition. Each pack contains essential vitamins, minerals, and supplements your dog needs for optimal health."
  },
  {
    id: 3,
    question: "How long does it take to prepare a meal?",
    answer: "Most of our recipes can be prepared in 15-25 minutes. We've designed them to be simple and use ingredients you can find at any grocery store. The nutrition packs make it easy to ensure complete nutrition without guesswork."
  },
  {
    id: 4,
    question: "Can I use Grublify for puppies and senior dogs?",
    answer: "Yes! Our recipes and nutrition packs are suitable for dogs of all ages. We provide portion calculators and feeding guides to help you adjust serving sizes based on your dog's age, weight, and activity level."
  },
  {
    id: 5,
    question: "What if my dog doesn't like the food?",
    answer: "We offer a 30-day money-back guarantee. If your dog doesn't love their new meals, we'll refund your purchase. Most dogs love the fresh ingredients and variety of recipes we offer."
  },
  {
    id: 6,
    question: "How much does it cost compared to premium kibble?",
    answer: "Grublify typically costs 30-50% less than premium kibble while providing superior nutrition. Our portion calculator helps you determine exact costs based on your dog's size and needs."
  }
];

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <Card className="border border-gray-200 hover:border-primary/30 transition-colors duration-300">
      <CardContent className="p-0">
        <button
          onClick={() => onToggle(faq.id)}
          className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-200"
        >
          <h3 className="text-lg font-semibold text-secondary pr-4">
            {faq.question}
          </h3>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
          )}
        </button>

        {isOpen && (
          <div className="px-6 pb-6">
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-700 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function HomepageFaq() {
  const [openFaqs, setOpenFaqs] = useState([]);

  const toggleFaq = (faqId) => {
    setOpenFaqs(prev => 
      prev.includes(faqId) 
        ? prev.filter(id => id !== faqId)
        : [...prev, faqId]
    );
  };

  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Everything you need to know about making fresh, homemade dog food
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq) => (
            <FaqItem
              key={faq.id}
              faq={faq}
              isOpen={openFaqs.includes(faq.id)}
              onToggle={toggleFaq}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-white rounded-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-secondary mb-4">
            Still Have Questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our team of pet nutrition experts is here to help you give your dog the best nutrition possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/faq" 
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors duration-200"
            >
              View All FAQs
            </a>
            <a 
              href="mailto:support@grublify.com" 
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-colors duration-200"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
