"use client"

import { useSearchParams } from "next/navigation"
// import { useCourses } from "@/hooks/useCourses"
import { useAllCourses } from "@/hooks/useCourses";

import CourseCard from "@/components/styles/CourseCard"
import { useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/styles/ui/button"
import Link from "next/link"

// Reusable Skeleton Card
const CourseCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
    <div className="h-40 bg-gray-200 rounded mb-4"></div>
    <div className="h-4 bg-gray-200 rounded mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
  </div>
)

// Badge component for filters
const FilterBadge = ({ label, colorClass }) => (
  <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>{label}</span>
)

export default function SearchPage() {
  const searchParams = useSearchParams()
  const cityParam = searchParams.get("city") || ""
  const fieldParam = searchParams.get("field") || ""

  const searchFilters = useMemo(() => ({ city: cityParam, field: fieldParam }), [cityParam, fieldParam])

  const { data: courses = [], isLoading, error } = useAllCourses(searchFilters)

  if (error) {
    return (
      <div className="text-center py-16" aria-live="polite">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-semibold mb-2 text-black">Error loading courses</h2>
        <p className="text-gray-600">Please try again later</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="h-12 bg-gray-200 rounded-md animate-pulse mx-auto max-w-md mb-4"></div>
          <div className="flex justify-center gap-4 flex-wrap">
            {cityParam && <div className="h-8 bg-gray-200 rounded-full animate-pulse w-24"></div>}
            {fieldParam && <div className="h-8 bg-gray-200 rounded-full animate-pulse w-24"></div>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {[...Array(8)].map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <section aria-labelledby="search-results-heading">
        <div className="text-center mb-8">
          <h1 id="search-results-heading" className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
            Search Results
          </h1>

          {(cityParam || fieldParam) && (
            <div className="flex justify-center gap-2 flex-wrap">
              {cityParam && <FilterBadge label={`City: ${cityParam}`} colorClass="bg-blue-100 text-blue-800" />}
              {fieldParam && <FilterBadge label={`Field: ${fieldParam}`} colorClass="bg-green-100 text-green-800" />}
            </div>
          )}
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-16" aria-live="polite">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold mb-2 text-black">
              {cityParam || fieldParam ? "No courses found" : "No search criteria provided"}
            </h2>
            <p className="text-gray-600 mb-6">
              {cityParam || fieldParam
                ? "Try adjusting your search criteria"
                : "Please provide a city or field to search"
              }
            </p>
            <Button asChild>
              <Link href="/courses" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Browse All Courses
              </Link>
            </Button>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-6">
              Found {courses.length} course{courses.length !== 1 ? "s" : ""}
            </p>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.3 }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </section>
    </main>
  )
}
