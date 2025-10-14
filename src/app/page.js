"use client"

import { memo } from "react"
import HeroSection from "@/app/components/HeroSection"
import TopRatedCourses from "@/app/components/TopRatedCourses"
import RecentlyAddedCourses from "@/app/components/RecentlyAddedCourses"
import { useAllCourses} from "@/hooks/useCourses"

const Home = memo(() => {
  const { data: courses = [], isLoading } = useAllCourses({})

  return (
    <div className="min-h-screen">
      <HeroSection />

      <div className="space-y-0">
        <TopRatedCourses courses={courses} isLoading={isLoading} minRating={4.0} maxItems={12} />
        <RecentlyAddedCourses courses={courses} isLoading={isLoading} maxItems={12} />
      </div>
    </div>
  )
})

Home.displayName = "Home"

export default Home
