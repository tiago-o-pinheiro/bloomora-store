"use client";

import { useState } from "react";
import { Product } from "@/lib/types/product.type";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ImageGallery = ({ images }: { images: Product["images"] }) => {
  const [loading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  console.log(loading);
  return (
    <div className="space-y-4">
      <Image
        src={images[currentImage]}
        alt={`Image ${currentImage + 1}`}
        className={cn(
          "object-cover w-full min-h-[300px] rounded-sm transition-all",
          loading ? "opacity-0" : "opacity-100"
        )}
        width={1000}
        height={1000}
        onLoad={() => setIsLoading(false)}
      />
      <div>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={cn("w-24 h-24 p-1 border rounded-sm", {
              "border-gray-200": currentImage === index,
              "border-transparent": currentImage !== index,
            })}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={cn(
                "object-cover w-full h-full rounded-sm transition-all",
                loading ? "opacity-0" : "opacity-100"
              )}
              width={150}
              height={150}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
