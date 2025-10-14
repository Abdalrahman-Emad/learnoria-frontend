"use client";

import { useMemo, useRef, memo, useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/styles/ui/button";
import CourseCard from "@/components/styles/CourseCard";
import Link from "next/link";

// Memoized CourseCard wrapper
const EnhancedCourseCard = memo(({ course }) => (
  <div
    className="relative snap-center transform transition-all duration-300 hover:scale-105 flex-shrink-0 w-[320px]"
    tabIndex={0} // keyboard accessibility
  >
    <CourseCard
      course={{
        ...course,
        ratings: course.ratings ?? { average_rating: 0, reviews_count: 0 },
      }}
      lazyLoad
    />
  </div>
));
EnhancedCourseCard.displayName = "EnhancedCourseCard";

const TopRatedCourses = memo(({ courses = [], minRating = 3, maxItems = 18, isLoading = false }) => {
  const scrollRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Map courses to include rating & review count
  const mappedCourses = useMemo(() => {
    if (!courses || !courses.length) return [];
    return courses.map(course => ({
      ...course,
      ratings: course.ratings ?? { average_rating: 0, reviews_count: 0 },
    }));
  }, [courses]);

  // Filter & sort by rating and reviews
  const sortedCourses = useMemo(() => {
    return mappedCourses
      .filter(course => Number(course.ratings.average_rating) >= minRating)
      .sort((a, b) => {
        const ratingDiff = Number(b.ratings.average_rating) - Number(a.ratings.average_rating);
        if (ratingDiff !== 0) return ratingDiff;
        return (b.ratings.reviews_count || 0) - (a.ratings.reviews_count || 0);
      })
      .slice(0, maxItems);
  }, [mappedCourses, minRating, maxItems]);

  // Scroll function with debounce
  const scrollByWidth = useCallback((direction) => {
    if (!scrollRef.current || scrollTimeoutRef.current) return;
    const container = scrollRef.current;
    const firstCard = container.firstChild;
    const cardWidth = firstCard?.clientWidth || 340;
    const scrollAmount = cardWidth + 24;

    container.scrollBy({ left: direction === "right" ? scrollAmount : -scrollAmount, behavior: "smooth" });
    scrollTimeoutRef.current = setTimeout(() => {
      scrollTimeoutRef.current = null;
    }, 400);
  }, []);

  const scrollLeft = useCallback(() => scrollByWidth("left"), [scrollByWidth]);
  const scrollRight = useCallback(() => scrollByWidth("right"), [scrollByWidth]);

  // Update arrow visibility
  const updateScrollState = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  }, []);

  useEffect(() => {
    const timer = setTimeout(updateScrollState, 100);
    const container = scrollRef.current;
    container?.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      clearTimeout(timer);
      container?.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [updateScrollState, sortedCourses]);

  const LoadingSkeleton = () => (
    <div className="flex gap-6 overflow-hidden" aria-busy={isLoading}>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="min-w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden flex-shrink-0">
          <div className="h-48 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
          <div className="p-6 space-y-4">
            <div className="h-4 bg-slate-200 rounded animate-pulse" />
            <div className="h-6 bg-slate-200 rounded animate-pulse w-3/4" />
            <div className="space-y-2">
              <div className="h-3 bg-slate-200 rounded animate-pulse" />
              <div className="h-3 bg-slate-200 rounded animate-pulse w-5/6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-1">Top Rated Courses</h2>
              <p className="text-slate-600">Discover our highest-rated learning experiences</p>
            </div>
          </div>

          {/* Arrow Buttons */}
          {sortedCourses.length > 3 && (
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className="h-10 w-10 p-0 rounded-full border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={scrollRight}
                disabled={!canScrollRight}
                className="h-10 w-10 p-0 rounded-full border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : sortedCourses.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
              <TrendingUp className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No Top-Rated Courses Yet</h3>
            <p className="text-slate-500">Check back soon for highly-rated courses from our community.</p>
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 pl-4 pr-4 md:pl-12 md:pr-12 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {sortedCourses.map(course => (
              <EnhancedCourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {sortedCourses.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="bg-white hover:bg-blue-50 border-blue-200 text-blue-600 hover:text-blue-700">
              <Link href="/courses?sort=rating" className="flex items-center justify-center gap-2">
                View All Top Rated Courses
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
});

TopRatedCourses.displayName = "TopRatedCourses";
export default TopRatedCourses;
