"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useRelatedCourses } from "@/hooks/useRelatedCourses";
import CourseCard from "@/components/styles/CourseCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/styles/ui/button";

export default function MoreFromProvider({ courseId, providerName }) {
  const { courses, loading, error } = useRelatedCourses(courseId);

  // Hooks كلها لازم هنا فوق
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const scroll = useCallback((direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - clientWidth
            : scrollLeft + clientWidth,
        behavior: "smooth",
      });
    }
  }, []);

  const updateScrollState = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    updateScrollState();
    container?.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);
    return () => {
      container?.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, courses]);

  // Gesture handlers
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 75) {
      scroll("right"); // swipe left
    } else if (distance < -75) {
      scroll("left"); // swipe right
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  // 🔽 هنا الشرطية بعد ما خلصنا تعريف الـ hooks
  if (loading) return <p>Loading related courses...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!courses.length) return null;

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            More Courses from{" "}
            <span className="text-blue-600">{providerName}</span>
          </h2>

          {/* Arrow Buttons */}
          {courses.length > 3 && (
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="h-10 w-10 p-0 rounded-full border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="h-10 w-10 p-0 rounded-full border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Courses */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory pb-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {courses.map((course) => (
            <div
              key={course.id}
              className="snap-center flex-shrink-0 w-[280px] md:w-[320px]"
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
