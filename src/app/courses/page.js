import CoursesList from "@/components/courses/CoursesList"

export default function CoursesPage() {
  return <CoursesList />
}

// Optional: Generate metadata for the page
export async function generateMetadata() {
  return {
    title: "Courses - Explore Our Learning Programs",
    description: "Discover our comprehensive collection of courses designed to help you grow and succeed in your career.",
  }
}
