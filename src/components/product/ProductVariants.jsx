"use client";


export default function ProductVariants({ variants, selectedVariantIndex, setSelectedVariantIndex }) {

  return (
    <div className='mb-4'>
      {/* Size Selection */}
      <div>
        <h3 className="font-semibold text-foreground mb-2">Options</h3>
        <div className="flex items-center space-x-3">
          {variants.map((variant, index) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariantIndex(index)}
              className={`px-4 py-2 border rounded-md transition-all duration-200 cursor-pointer ${selectedVariantIndex === index
                ? 'border-secondary bg-secondary text-white font-bold'
                : 'border-muted-foreground  hover:border-secondary '
                }`}
            >
              {variant.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

