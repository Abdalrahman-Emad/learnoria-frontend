"use client";

import { Play } from "lucide-react";
import CourseImage from "../../styles/CourseImage"; // adjust path as needed

export default function CourseHero({ course }) {
  console.log("image url:", course.image);
  
  const overlayContent = (
    <>
      {/* Dark overlay with play button */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <button className="bg-background/95 hover:bg-background text-blue-primary rounded-full p-6 transition-all duration-300 hover:scale-110 shadow-2xl group">
          <Play className="h-8 w-8 ml-1 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Level badge */}
      <div className="absolute top-4 right-4">
        <span className="bg-blue-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-semibold shadow-md capitalize">
          {course.level}
        </span>
      </div>
    </>
  );

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg">
      <CourseImage
        src={course.image}
        alt={course.title}
        priority
        aspectRatio="aspect-video"
        className="bg-gradient-to-br from-blue-primary to-blue-secondary"
        sizes="(max-width: 768px) 100vw, 900px"
        showOverlay={true}
        overlayContent={overlayContent}
      />
      
    </div>
  );
}