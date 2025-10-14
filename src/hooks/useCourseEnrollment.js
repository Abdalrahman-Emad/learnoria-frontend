// // src/hooks/useCourseEnrollment.js
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { api } from "@/lib/apiClient";
// import { useAuthStore } from "@/store/useAuthStore";

// export const useCourseEnrollment = (courseId) => {
//   const { isAuthenticated } = useAuthStore();
  
//   // Get user enrollments
//   const { data: enrollmentsData, isLoading, error, refetch } = useQuery({
//     queryKey: ["my-enrollments"],
//     queryFn: () => api.get("/my-enrollments"),
//     enabled: isAuthenticated,
//     select: (res) => res.enrollments || [] // ✅ اشتغل على response النهائي
//   });

//   // Check if user is enrolled in this course
//   const enrollment = enrollmentsData?.find((en) => {
//     const enrolledCourseId = en.course?.id || en.course_id;
//     return enrolledCourseId == courseId;
//   });

//   const isEnrolled = !!enrollment;
//   const hasCompleted = enrollment?.status === "completed";
//   const isCurrentlyEnrolled = enrollment?.status === "enrolled";

//   return {
//     isEnrolled,
//     hasCompleted,
//     isCurrentlyEnrolled,
//     enrollment,
//     enrollmentsData, // ✅ بترجع array جاهزة
//     isLoading,
//     error,
//     refetch,
//   };
// };

// export const useEnrollCourse = (courseId) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: () => api.post(`/courses/${courseId}/enroll`),
//     onSuccess: (data) => {
//       queryClient.invalidateQueries(["my-enrollments"]);
//       if (data.enrollment) {
//         queryClient.setQueryData(["my-enrollments"], (oldData) => {
//           const existing = oldData || [];
//           const exists = existing.some(
//             (en) => (en.course?.id || en.course_id) == courseId
//           );
//           if (!exists) {
//             return [...existing, data.enrollment];
//           }
//           return oldData;
//         });
//       }
//     },
//     onError: (error) => {
//       console.error("Enrollment failed:", error);
//     },
//   });
// };

// export const useReviewPermission = (courseId) => {
//   const { hasCompleted, isLoading } = useCourseEnrollment(courseId);
//   const canReview = hasCompleted && !isLoading;
//   return { canReview, isLoading };
// };


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/apiClient";
import { useAuthStore } from "@/store/useAuthStore";

export const useCourseEnrollment = (courseId) => {
  const { isAuthenticated } = useAuthStore();
  
  const { 
    data: enrollmentsData, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ["my-enrollments"],
    queryFn: async () => {
      const res = await api.get("/my-enrollments");
      return res?.enrollments || [];
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 دقائق
    cacheTime: 1000 * 60 * 10, // 10 دقائق
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const enrollment = enrollmentsData?.find((en) => {
    const enrolledCourseId = en.course?.id || en.course_id;
    return enrolledCourseId == courseId;
  });

  const isEnrolled = !!enrollment;
  const hasCompleted = enrollment?.status === "completed";
  const isCurrentlyEnrolled = enrollment?.status === "enrolled";

  return {
    isEnrolled,
    hasCompleted,
    isCurrentlyEnrolled,
    enrollment,
    enrollmentsData,
    isLoading,
    error,
    refetch,
  };
};

export const useEnrollCourse = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await api.post(`/courses/${courseId}/enroll`),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["my-enrollments"]);
      if (data.enrollment) {
        queryClient.setQueryData(["my-enrollments"], (oldData = []) => {
          const exists = oldData.some(
            (en) => (en.course?.id || en.course_id) == courseId
          );
          if (!exists) return [...oldData, data.enrollment];
          return oldData;
        });
      }
    },
    onError: (error) => console.error("Enrollment failed:", error),
  });
};

export const useReviewPermission = (courseId) => {
  const { hasCompleted, isLoading } = useCourseEnrollment(courseId);
  const canReview = hasCompleted && !isLoading;
  return { canReview, isLoading };
};
