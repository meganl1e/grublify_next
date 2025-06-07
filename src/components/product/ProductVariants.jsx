"use client";
import { useProduct } from '@shopify/hydrogen-react';


export default function ProductVariants() {

  const {
    options,                // Array of product options (e.g. Size, Color)
    selectedOptions,        // Object of currently selected option values
    setSelectedOption,      // Function to update selected option
    selectedVariant,        // The currently selected variant object
    variants                // All variant objects
  } = useProduct();

 return (
    <div className='mb-4'>
      <div>
        {options.map((option) => (

            <div key={option.name} className="flex items-center space-x-3 mb-2">
              {/* <h3 className="font-semibold text-foreground">{option.name}</h3> */}
              {option.values.map((value) => (
                <button
                  key={value}
                  onClick={() => setSelectedOption(option.name, value)}
                  className={`px-4 py-2 border rounded-md transition-all duration-200 cursor-pointer ${
                    selectedOptions[option.name] === value
                      ? 'border-secondary bg-secondary text-white font-bold'
                      : 'border-muted-foreground hover:border-secondary'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
        ))}
      </div>
    </div>
  );
}

