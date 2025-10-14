import CourseDetails from "@/components/courses/course-details/CourseDetails"

export default async function CourseDetailPage({ params }) {
  const { id } = await params; // ✅ لازم await هنا
  return <CourseDetails id={id} />
}

// Optional: Generate metadata for the page
export async function generateMetadata({ params }) {
  const { id } = await params; // ✅ نفس الكلام هنا
  return {
    title: `Course ${id} Details`,
    description: "View detailed information about this course",
  }
}
