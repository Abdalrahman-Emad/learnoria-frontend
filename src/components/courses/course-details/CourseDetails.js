"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { useWishlist } from "@/hooks/useWishlist";
import CourseHeader from "@/components/courses/course-details/CourseHeader";
import CourseHero from "@/components/courses/course-details/CourseHero";
import CourseHeaderSection from "@/components/courses/course-details/CourseHeaderSection";
import CourseStats from "@/components/courses/course-details/CourseStats";
import LearningSection from "@/components/courses/course-details/LearningSection";
import RequirementsSection from "@/components/courses/course-details/RequirementsSection";
import CourseContent from "@/components/courses/course-details/CourseContent";
import InstructorsSection from "@/components/courses/course-details/InstructorsSection";
import CourseSidebar from "@/components/courses/course-details/CourseSidebar";
import LoadingState from "@/components/courses/course-details/LoadingState";
import ErrorState from "@/components/courses/course-details/ErrorState";
import CourseReviews from "@/components/courses/course-details/CourseReviews";
import MoreFromProvider from "@/components/courses/course-details/MoreFromProvider"; // ✅ ضفناها

export default function CourseDetails({ id }) {
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState({});

  // ✅ جلب بيانات الكورس
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const res = await apiClient(`/courses/${id}`);
      return res;
    },
    enabled: !!id,
    retry: 1,
  });

  const course = data?.data;

  const {
    wishlist,
    loading: wishlistLoading,
    isWishlisted,
    toggleWishlist,
  } = useWishlist(id);

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  if (isLoading) return <LoadingState />;

  if (isError || !course) {
    return (
      <ErrorState
        router={router}
        errorMessage={error?.message || "Failed to load course details"}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CourseHeader
        course={course}
        router={router}
        isWishlisted={isWishlisted}
        toggleWishlist={toggleWishlist}
        wishlistLoading={wishlistLoading}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <CourseHero course={course} />
              <CourseHeaderSection
                course={course}
                isWishlisted={isWishlisted}
                toggleWishlist={toggleWishlist}
                wishlistLoading={wishlistLoading}
              />
              <CourseStats course={course} />
              <LearningSection course={course} />
              <RequirementsSection course={course} />
              <CourseContent
                course={course}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
              />
              <InstructorsSection course={course} />
              <CourseReviews course={course} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <CourseSidebar
                course={course}
                isWishlisted={isWishlisted}
                toggleWishlist={toggleWishlist}
                wishlistLoading={wishlistLoading}
              />
            </div>
          </div>
          {/* ✅ More From Provider */}
          <MoreFromProvider
            courseId={course.id}
            providerName={course.provider?.name}
          />
        </div>
      </div>
    </div>
  );
}
