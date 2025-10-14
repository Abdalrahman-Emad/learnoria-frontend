"use client";

import { Loader2, Calendar } from "lucide-react";
import { Badge } from "@/components/styles/ui/badge";
import { useCourseEnrollment } from "@/hooks/useCourseEnrollment";
import CourseCard from "@/components/styles/CourseCard";

export default function EnrollmentPageClient({ initialEnrollments }) {
  const { enrollmentsData = initialEnrollments, isLoading, error } = useCourseEnrollment();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );

  if (error)
    return (
      <p className="text-red-500 text-center py-16">
        Failed to load enrollments.
      </p>
    );

  if (!enrollmentsData?.length)
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">No enrollments found.</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Enrollments</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollmentsData.map((enrollment) => (
          <div
            key={enrollment.id}
            className="relative group hover:scale-105 transition-transform duration-300"
          >
            {/* Course Card */}
            <CourseCard course={enrollment.course} />

            {/* Status Badge */}
            <div className="absolute top-52 right-3 z-10">
              <Badge
                className={`${
                  enrollment.status === "completed"
                    ? "bg-green-100 text-green-700 border-green-200"
                    : enrollment.status === "pending"
                    ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                    : "bg-blue-100 text-blue-700 border-blue-200"
                }`}
              >
                {enrollment.status}
              </Badge>
            </div>

            {/* Enrolled Date overlay */}
            <div className="absolute top-3 left-3 bg-white/90 px-2 py-0.5 rounded text-xs text-gray-700 shadow-sm flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(enrollment.enrolled_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
