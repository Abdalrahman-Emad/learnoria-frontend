// "use client";

// import { useEnrollCourse, useMyEnrollments } from "@/hooks/useStudentActions";
// import { Button } from "@/components/styles/ui/button";
// import { toast } from "react-hot-toast";

// export default function EnrollButton({ courseId }) {
//   const { data: enrollments, isLoading } = useMyEnrollments();
//   const enrollMutation = useEnrollCourse();

//   if (isLoading) {
//     return <Button disabled>Checking...</Button>;
//   }

//   // نشيك لو الكورس موجود ضمن enrollments
//   const isEnrolled = enrollments?.some(
//     (enrollment) => enrollment.course_id === courseId
//   );

//   const handleEnroll = () => {
//     enrollMutation.mutate(courseId, {
//       onSuccess: () => toast.success("Enrolled successfully!"),
//       onError: () => toast.error("Failed to enroll in this course"),
//     });
//   };

//   return isEnrolled ? (
//     <Button disabled>Already Enrolled</Button>
//   ) : (
//     <Button
//       onClick={handleEnroll}
//       disabled={enrollMutation.isLoading}
//     >
//       {enrollMutation.isLoading ? "Enrolling..." : "Enroll"}
//     </Button>
//   );
// }
