// "use client";

// import { useState, useEffect } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { api } from "@/lib/apiClient";
// import { Button } from "@/components/styles/ui/button";
// import { toast } from "react-hot-toast";
// import { Star } from "lucide-react";
// import { useAuthStore } from "@/store/useAuthStore";

// export default function CourseReviewsWithEnroll({ course }) {
//   const queryClient = useQueryClient();
//   const [page, setPage] = useState(1);
  
//   // Get auth state from your store
//   const { user, isAuthenticated, loading: authLoading } = useAuthStore();

//   // 🟢 Fetch reviews with pagination
//   const { 
//     data: reviewsData, 
//     isLoading: reviewsLoading,
//     error: reviewsError 
//   } = useQuery({
//     queryKey: ["course-reviews", course.id, page],
//     queryFn: () => api.get(`/courses/${course.id}/reviews?page=${page}`),
//     enabled: !!course.id,
//   });

//   // 🟢 Fetch enrollments only if user is authenticated
//   const { data: enrollments, isLoading: enrollmentsLoading } = useQuery({
//     queryKey: ["my-enrollments"],
//     queryFn: () => api.get("/my-enrollments"),
//     enabled: isAuthenticated,
//   });

//   // Check if enrolled
//   const isEnrolled = enrollments?.data?.some((en) => en.course_id === course.id);
  
//   // Check if completed
//   const hasCompleted = enrollments?.data?.some(
//     (en) => en.course_id === course.id && en.status === "completed"
//   );

//   // 🟢 Enroll mutation
//   const enrollMutation = useMutation({
//     mutationFn: () => api.post(`/courses/${course.id}/enroll`),
//     onSuccess: () => {
//       toast.success("Enrolled successfully!");
//       queryClient.invalidateQueries(["my-enrollments"]);
//     },
//     onError: (error) => {
//       toast.error(error.message || "Failed to enroll in this course");
//     },
//   });

//   // 🟢 Add Review mutation
//   const addReviewMutation = useMutation({
//     mutationFn: (data) => api.post(`/courses/${course.id}/reviews`, data),
//     onSuccess: () => {
//       toast.success("Review added!");
//       queryClient.invalidateQueries(["course-reviews", course.id]);
//       setPage(1);
//     },
//     onError: (error) => {
//       toast.error(error.message || "Failed to add review");
//     },
//   });

//   // 🟢 Update Review mutation
//   const updateReviewMutation = useMutation({
//     mutationFn: ({ reviewId, data }) => api.put(`/reviews/${reviewId}`, data),
//     onSuccess: () => {
//       toast.success("Review updated!");
//       queryClient.invalidateQueries(["course-reviews", course.id]);
//     },
//     onError: (error) => {
//       toast.error(error.message || "Failed to update review");
//     },
//   });

//   // 🟢 Delete Review mutation
//   const deleteReviewMutation = useMutation({
//     mutationFn: (reviewId) => api.delete(`/reviews/${reviewId}`),
//     onSuccess: () => {
//       toast.success("Review deleted!");
//       queryClient.invalidateQueries(["course-reviews", course.id]);
//     },
//     onError: (error) => {
//       toast.error(error.message || "Failed to delete review");
//     },
//   });

//   // 🟡 Handle Add Review form submit
//   const handleReviewSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const rating = parseInt(formData.get("rating"));
//     const comment = formData.get("comment").trim();

//     addReviewMutation.mutate({ rating, comment });
//     e.target.reset();
//   };

//   // 🟡 Handle Update Review
//   const handleUpdateReview = (reviewId, currentRating, currentComment) => {
//     const newRating = prompt("Enter new rating (1-5):", currentRating);
//     if (!newRating || isNaN(newRating) || newRating < 1 || newRating > 5) {
//       toast.error("Please enter a valid rating between 1 and 5");
//       return;
//     }
    
//     const newComment = prompt("Enter new comment:", currentComment);
//     if (newComment === null) return; // User cancelled
    
//     updateReviewMutation.mutate({
//       reviewId,
//       data: { 
//         rating: parseInt(newRating), 
//         comment: newComment.trim()
//       }
//     });
//   };

//   if (reviewsError) {
//     return <div className="text-red-600 p-4">Error loading reviews: {reviewsError.message}</div>;
//   }

//   // Show loading state while checking auth
//   if (authLoading) {
//     return <div className="p-4">Checking authentication...</div>;
//   }

//   return (
//     <div className="mt-10">
//       {/* ================== Enroll Section ================== */}
//       {isAuthenticated ? (
//         !isEnrolled ? (
//           <Button
//             onClick={() => enrollMutation.mutate()}
//             disabled={enrollMutation.isLoading || enrollmentsLoading}
//             className="mb-4"
//           >
//             {enrollMutation.isLoading ? "Enrolling..." : "Enroll in this course"}
//           </Button>
//         ) : (
//           <p className="text-green-600 font-medium mb-4">✅ You are enrolled in this course</p>
//         )
//       ) : (
//         <p className="text-blue-600 font-medium mb-4">
//           Please log in to enroll in this course
//         </p>
//       )}

//       {/* ================== Add Review Section ================== */}
//       {isAuthenticated && hasCompleted && (
//         <form
//           onSubmit={handleReviewSubmit}
//           className="border p-4 rounded-md mb-6 bg-gray-50"
//         >
//           <h3 className="font-semibold mb-3 text-lg">Leave a Review</h3>
//           <div className="mb-3">
//             <label htmlFor="rating" className="block mb-1 font-medium">Rating</label>
//             <select 
//               id="rating"
//               name="rating" 
//               className="border p-2 rounded w-full" 
//               required
//               defaultValue=""
//             >
//               <option value="" disabled>Select rating</option>
//               {[5, 4, 3, 2, 1].map((r) => (
//                 <option key={r} value={r}>
//                   {r} {r === 1 ? 'Star' : 'Stars'}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="mb-3">
//             <label htmlFor="comment" className="block mb-1 font-medium">Review</label>
//             <textarea
//               id="comment"
//               name="comment"
//               placeholder="Share your experience with this course..."
//               className="border p-2 rounded w-full"
//               rows={4}
//               required
//             />
//           </div>
//           <Button 
//             type="submit" 
//             disabled={addReviewMutation.isLoading}
//             className="w-full sm:w-auto"
//           >
//             {addReviewMutation.isLoading ? "Submitting..." : "Submit Review"}
//           </Button>
//         </form>
//       )}

//       {/* ================== Reviews Section ================== */}
//       <h2 className="text-xl font-bold mb-4">
//         Reviews ({reviewsData?.meta?.total || 0})
//       </h2>
      
//       {reviewsLoading ? (
//         <div className="flex justify-center py-8">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {reviewsData?.data?.length > 0 ? (
//             reviewsData.data.map((review) => (
//               <div
//                 key={review.id}
//                 className="border rounded-md p-4 bg-white shadow-sm"
//               >
//                 <div className="flex justify-between items-start mb-3">
//                   <div className="flex items-center gap-2">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         size={16}
//                         className={
//                           i < review.rating 
//                             ? "text-yellow-500 fill-yellow-500" 
//                             : "text-gray-300"
//                         }
//                       />
//                     ))}
//                     <span className="text-sm text-gray-600 font-medium">
//                       {review.user?.name || "Anonymous"}
//                     </span>
//                   </div>
//                   <span className="text-xs text-gray-500">
//                     {new Date(review.created_at).toLocaleDateString()}
//                   </span>
//                 </div>
                
//                 <p className="text-gray-700 mb-3">{review.comment}</p>
                
//                 {/* Actions only if this is current user's review */}
//                 {review.is_owner && (
//                   <div className="flex gap-2 pt-2 border-t">
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       onClick={() => handleUpdateReview(
//                         review.id, 
//                         review.rating, 
//                         review.comment
//                       )}
//                       disabled={updateReviewMutation.isLoading}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="destructive"
//                       onClick={() => {
//                         if (confirm("Are you sure you want to delete this review?")) {
//                           deleteReviewMutation.mutate(review.id);
//                         }
//                       }}
//                       disabled={deleteReviewMutation.isLoading}
//                     >
//                       Delete
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-8 text-gray-500 border rounded-md bg-gray-50">
//               <p>No reviews yet for this course.</p>
//               {isAuthenticated && !hasCompleted && isEnrolled && (
//                 <p className="text-sm mt-2">Complete the course to leave a review!</p>
//               )}
//             </div>
//           )}
//         </div>
//       )}

//       {/* ================== Pagination ================== */}
//       {reviewsData?.meta && reviewsData.meta.last_page > 1 && (
//         <div className="flex justify-between items-center mt-6">
//           <Button
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             disabled={page === 1 || reviewsLoading}
//             variant="outline"
//           >
//             Previous
//           </Button>
          
//           <span className="text-sm text-gray-600">
//             Page {reviewsData.meta.current_page} of {reviewsData.meta.last_page}
//           </span>
          
//           <Button
//             onClick={() => setPage((p) => p + 1)}
//             disabled={page === reviewsData.meta.last_page || reviewsLoading}
//             variant="outline"
//           >
//             Next
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }