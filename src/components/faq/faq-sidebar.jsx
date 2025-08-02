import { ChevronDown, ChevronUp, Search, User, ShoppingCart, HelpCircle, Play, Heart, ChefHat, Truck, CreditCard } from "lucide-react";


export default function FaqSidebar({ scrollToCategory, categories }) {

  
  // console.log("CAT: ", categories)


  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => scrollToCategory("all")}
            className="w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 bg-white text-secondary hover:bg-gray-100"
          >
            {/* <HelpCircle className="w-5 h-5" /> */}
            All Questions
          </button>
          {categories.map((category) => {
            // const IconComponent = category.icon
            return (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className="w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 bg-white text-secondary hover:bg-gray-100"
              >
                {/* <IconComponent className="w-5 h-5" /> */}
                {category.title}
                {/* <div className="ml-auto text-sm opacity-70">
                  {category.questions.length}
                </div> */}
              </button>
            )
          })}

        </div>
      </div>
    </div>
  )
}


// {Object.entries(faqs).map(([categoryTitle, faqs]) => {
//   // const IconComponent = category.icon
//   return (
//     <button
//       key={categoryTitle}
//       onClick={() => scrollToCategory(categoryTitle)}
//       className="w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 bg-white text-secondary hover:bg-gray-100"
//     >
//       {/* <IconComponent className="w-5 h-5" /> */}
//       {categoryTitle}
//       {/* <div className="ml-auto text-sm opacity-70">
//         {category.questions.length}
//       </div> */}
//     </button>
//   )
// })}