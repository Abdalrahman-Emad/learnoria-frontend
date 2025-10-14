"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/apiClient";

// -------------------- Enrollments --------------------

// Get my enrollments
export const useMyEnrollments = () => {
  return useQuery({
    queryKey: ["my-enrollments"],
    queryFn: () => api.get("/my-enrollments"),
  });
};

// Enroll in a course
export const useEnrollCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId) => api.post(`/courses/${courseId}/enroll`),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-enrollments"]);
    },
  });
};
// -------------------- Reviews --------------------

// Get course reviews (paginated)
export const useCourseReviews = (courseId, page = 1) => {
  return useQuery({
    queryKey: ["course-reviews", courseId, page],
    queryFn: () => api.get(`/courses/${courseId}/reviews?page=${page}`),
    keepPreviousData: true,
  });
};

// Add review
export const useAddReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, data }) =>
      api.post(`/courses/${courseId}/reviews`, data),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries(["course-reviews", courseId]);
    },
  });
};

// Update review
export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewId, data }) => api.put(`/reviews/${reviewId}`, data),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries(["course-reviews", courseId]);
    },
  });
};

// Delete review
export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewId) => api.delete(`/reviews/${reviewId}`),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries(["course-reviews", courseId]);
    },
  });
};
