// // src/components/course/DebugEnrollment.jsx
// "use client";

// import { useCourseEnrollment } from "@/hooks/useCourseEnrollment";
// import { useAuthStore } from "@/store/useAuthStore";

// export default function DebugEnrollment({ courseId }) {
//   const { user, isAuthenticated } = useAuthStore();
//   const { isEnrolled, hasCompleted, enrollment, isLoading, error } = useCourseEnrollment(courseId);

//   if (!isAuthenticated) return <div>Not authenticated</div>;
//   if (isLoading) return <div>Loading enrollment data...</div>;

//   return (
//     <div className="p-4 border rounded-md bg-gray-50 mt-4">
//       <h3 className="font-bold mb-2">Debug Enrollment Status</h3>
//       <pre className="text-sm">
//         {JSON.stringify({
//           userId: user?.id,
//           courseId,
//           isAuthenticated,
//           isEnrolled,
//           hasCompleted,
//           enrollment, // This will show the full enrollment object
//           error: error?.message
//         }, null, 2)}
//       </pre>
//     </div>
//   );
// }