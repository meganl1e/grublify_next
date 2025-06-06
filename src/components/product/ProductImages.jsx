"use client";
import Image from 'next/image';
import { useState } from 'react';

export default function ProductImages({ images }) {
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const coverImage = images[selectedIndex] || null;

  const nextImage = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };


  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Product Images */}
      <div className="space-y-4">
        {images.length > 0 ? (
          <div className="relative group aspect-square w-[80vw] sm:w-80 md:w-96 lg:w-[32rem]">
            <Image
              src={coverImage.url}
              alt={coverImage.altText || "Alt text not defined"}
              fill
              className="object-cover rounded-sm"
              priority
              sizes="(max-width: 768px) 90vw, 50vw"
            />
            {/* Left Arrow */}
            <button 
              aria-label="Previous Image"
              onClick={prevImage} 
              className="
                absolute left-2 top-1/2 transform -translate-y-1/2
                bg-gray-500 text-white font-bold p-2 rounded-full w-8 h-8 md:w-12 md:h-12
                opacity-0 group-hover:opacity-70
                transition-opacity duration-300 hover:opacity-100
                cursor-pointer"            >
              &#8592;
            </button>
            {/* Right Arrow */}
            <button 
              aria-label="Next Image"
              onClick={nextImage} 
              className="
                absolute right-2 top-1/2 transform -translate-y-1/2
                bg-gray-600 text-white p-2 rounded-full w-8 h-8 md:w-12 md:h-12
                opacity-0 group-hover:opacity-70
                transition-opacity duration-300 hover:opacity-100
                cursor-pointer"
            >
              &#8594;
            </button>
          </div>
        ) : (
          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">No Image Available</span>
          </div>
        )}

        
        <div className='flex justify-center items-center space-x-2'>
          {/* Thumbnail Images */}
        <div className="inline-grid grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative w-20 aspect-square rounded-lg overflow-hidden transition-all duration-200 ${
                selectedIndex === index
                  ? 'ring-2 ring-primary ring-offset-2'
                  : 'hover:opacity-75'
              } w-12 sm:w-14 md:w-20 aspect-square`}

            >
              <Image
                src={image.url}
                alt={image.altText || "Alt text not defined"}
                fill
                className="object-cover rounded-xs cursor-pointer"
                sizes="(max-width: 768px) 25vw, 20vw"
              />
            </button>
          ))}
        </div>
          </div>
        <div className="text-center text-sm text-muted-foreground">
          {selectedIndex + 1} of {images.length}
        </div>
      </div>
    </div>
  )
};