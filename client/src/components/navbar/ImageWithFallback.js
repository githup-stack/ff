import React, { useState } from "react";
import { assets } from "../../assets/assets.js";

const ImageWithFallback = ({
  src,
  alt,
  category = "food",
  className = "w-full h-full object-cover",
}) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Xác định ảnh placeholder dựa trên category
  const getFallbackImage = () => {
    switch (category.toLowerCase()) {
      case "food":
        return assets.foodPlaceholder;
      case "drink":
        return assets.drinkPlaceholder;
      case "dessert":
        return assets.dessertPlaceholder;
      default:
        return assets.foodPlaceholder;
    }
  };

  const handleImageError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative h-48 overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
          <div className="text-gray-400 text-xs">Đang tải...</div>
        </div>
      )}

      <img
        src={isError ? getFallbackImage() : src}
        alt={alt}
        className={className}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
        style={{ display: isLoading ? "none" : "block" }}
      />
    </div>
  );
};

export default ImageWithFallback;
