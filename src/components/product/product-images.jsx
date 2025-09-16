"use client";
import Image from 'next/image';
import { useState } from 'react';
import { useProduct } from '@shopify/hydrogen-react';

export default function ProductImages() {

  // fetch images from the product context
  const { product } = useProduct();
  const images = product.images?.edges?.map(edge => edge.node) || [];
  
  // set the cover image to the first image or null if no images
  const [selectedIndex, setSelectedIndex] = useState(0);
  const coverImage = images[selectedIndex] || null;

  const nextImage = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };


  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-10">
      {/* Thumbnail Images - Left Side */}
      {images.length > 1 && (
        <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 order-2 lg:order-1 mt-4 lg:mt-0">
          {images.map((image, index) => (
            <button
              key={`thumbnail-${index}`}
              onClick={() => setSelectedIndex(index)}
              aria-label={`View image ${index + 1}`}
              className={`relative aspect-square rounded-md overflow-hidden transition-all duration-200 ${
                selectedIndex === index
                  ? 'ring-2 ring-primary ring-offset-1'
                  : 'hover:opacity-75 hover:scale-105'
              } w-12 sm:w-14 md:w-16 lg:w-14`}
            >
              <Image
                src={image.url}
                alt={image.altText || `Product image ${index + 1}`}
                fill
                className="object-contain cursor-pointer"
                sizes="(max-width: 768px) 10vw, 8vw"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Product Image */}
      <div className="flex flex-col items-center space-y-4 order-1 lg:order-2">
        {images.length > 0 ? (
          <div className="relative group aspect-square w-[80vw] sm:w-96 md:w-[28rem] lg:w-[32rem]">
            <Image
              src={coverImage.url}
              alt={coverImage.altText || "Alt text not defined"}
              fill
              className="object-contain rounded-sm"
              priority
              sizes="(max-width: 768px) 90vw, 50vw"
            />
            {/* Left Arrow */}
            <button 
              aria-label="Previous Image"
              onClick={prevImage} 
              className="
                flex items-center justify-center
                absolute left-2 top-1/2 transform -translate-y-1/2
                bg-gray-500 text-white font-bold p-2 rounded-full w-8 h-8 md:w-12 md:h-12
                opacity-0 group-hover:opacity-70
                transition-opacity duration-300 hover:opacity-100
                cursor-pointer"
            >
              &#8592;
            </button>
            {/* Right Arrow */}
            <button 
              aria-label="Next Image"
              onClick={nextImage} 
              className="
                flex items-center justify-center
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
          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center w-[80vw] sm:w-96 md:w-[28rem] lg:w-[32rem]">
            <span className="text-gray-400">No Image Available</span>
          </div>
        )}
        
        {/* Image Counter */}
        <div className="text-center text-sm text-muted-foreground">
          {selectedIndex + 1} of {images.length}
        </div>
      </div>
    </div>
  )
};