// // src/hooks/useCourseReviews.js
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { api } from "@/lib/apiClient";

// export const useCourseReviews = (courseId, page = 1) => {
//   return useQuery({
//     queryKey: ["course-reviews", courseId, page],
//     queryFn: () => api.get(`/courses/${courseId}/reviews?page=${page}`),
//     enabled: !!courseId,
//     keepPreviousData: true,
//   });
// };

// export const useAddReview = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: ({ courseId, data }) => 
//       api.post(`/courses/${courseId}/reviews`, data),
//     onSuccess: (_, variables) => {
//       queryClient.invalidateQueries(["course-reviews", variables.courseId]);
//     },
//   });
// };

// export const useUpdateReview = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: ({ reviewId, data }) => 
//       api.put(`/reviews/${reviewId}`, data),
//     onSuccess: () => {
//       // We invalidate all course reviews as we don't know the courseId here
//       queryClient.invalidateQueries(["course-reviews"]);
//     },
//   });
// };

// export const useDeleteReview = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: (reviewId) => api.delete(`/reviews/${reviewId}`),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["course-reviews"]);
//     },
//   });
// };


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/apiClient";

// ======================
// Fetch reviews for a course (with pagination)
// ======================
export const useCourseReviews = (courseId, page = 1) => {
  return useQuery({
    queryKey: ["course-reviews", courseId, page],
    queryFn: async () => {
      if (!courseId) return [];
      const res = await api.get(`/courses/${courseId}/reviews?page=${page}`);
      return res?.data || [];
    },
    enabled: !!courseId,
    keepPreviousData: true,         // ✅ حافظ على البيانات القديمة أثناء التحميل
    staleTime: 1000 * 60,           // ✅ بيانات تبقى صالحة لمدة دقيقة
    cacheTime: 1000 * 60 * 5,       // ✅ ابقيها في cache 5 دقائق
    refetchOnWindowFocus: false,    // ✅ منع refetch عند العودة للنافذة
    retry: 1,                        // ✅ محاولة واحدة فقط عند فشل الطلب
  });
};

// ======================
// Add a new review
// ======================
export const useAddReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ courseId, data }) => await api.post(`/courses/${courseId}/reviews`, data),
    onSuccess: (_, variables) => {
      // ✅ بعد إضافة review، نحدث cache الخاص بالكورس
      queryClient.invalidateQueries(["course-reviews", variables.courseId]);
    },
  });
};

// ======================
// Update a review
// ======================
export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ reviewId, data }) => await api.put(`/reviews/${reviewId}`, data),
    onSuccess: () => {
      // ✅ نجدد جميع course reviews لأنه ممكن نحتاج refresh للكورس كله
      queryClient.invalidateQueries(["course-reviews"]);
    },
  });
};

// ======================
// Delete a review
// ======================
export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (reviewId) => await api.delete(`/reviews/${reviewId}`),
    onSuccess: () => {
      // ✅ بعد الحذف نجدد cache لكل course reviews
      queryClient.invalidateQueries(["course-reviews"]);
    },
  });
};
