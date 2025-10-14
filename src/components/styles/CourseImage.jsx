"use client";

import Image from "next/image";
import { useState, memo } from "react";
import { ImageIcon } from "lucide-react";

const CourseImage = memo(
  ({
    src,
    alt = "Course image",
    className = "",
    priority = false,
    sizes = "(max-width: 768px) 100vw, 300px",
    fill = true,
    width,
    height,
    aspectRatio = "aspect-video",
    showOverlay = false,
    overlayContent = null,
  }) => {
    const getImageSrc = () => {
      if (!src) return "/course-placeholder.jpg";

      // لو الرابط كامل (Cloudinary أو أي http/https) نرجعه كما هو
      if (src.startsWith("http://") || src.startsWith("https://")) {
        return src.trim();
      }

      // لو مش كامل، نضيفه لعنوان الباك اند المناسب حسب البيئة
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "";
      return `${backendUrl.replace(/\/$/, "")}/images/${src.replace(/^\//, "")}`;
    };

    const initialSrc = getImageSrc();
    const [imgSrc, setImgSrc] = useState(initialSrc);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
      console.error("Image failed to load:", imgSrc);
      setHasError(true);
      setIsLoading(false);
      setImgSrc("/course-image-unavailable.jpg");
    };

    const handleLoad = () => {
      setIsLoading(false);
      setHasError(false);
    };

    return (
      <div
        className={`relative overflow-hidden bg-slate-100 ${aspectRatio} ${className}`}
      >
        {/* Loading shimmer */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse z-10">
            <ImageIcon className="h-8 w-8 text-slate-400" />
          </div>
        )}

        <Image
          src={imgSrc}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          priority={priority}
          sizes={sizes}
          onError={handleError}
          onLoad={handleLoad}
          className={`object-cover transition-all duration-500 ${
            isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100"
          } ${hasError ? "opacity-75" : ""}`}
        />

        {/* Optional overlay */}
        {showOverlay && overlayContent && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            {overlayContent}
          </div>
        )}
      </div>
    );
  }
);

CourseImage.displayName = "CourseImage";
export default CourseImage;
