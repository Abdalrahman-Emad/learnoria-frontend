import EnrollmentPageClient from "@/app/enrollments/EnrollmentPageClient";

// البيانات هنا ممكن تجيبها من السيرفر إذا حابب
export default function EnrollmentsPage() {
  const initialEnrollments = []; // أو fetch من السيرفر
  return <EnrollmentPageClient initialEnrollments={initialEnrollments} />;
}
