// import { useQuery } from "@tanstack/react-query";
// import { api } from "@/lib/apiClient";

// export function useTopRatedCourses() {
//   return useQuery({
//     queryKey: ["top-rated-courses"],
//     queryFn: async () => {
//       try {
//         const res = await api.get("/courses?sort=rating");
        
//         console.log("API Response:", res);
        
//         // Your Postman shows the structure is: { data: [], links: {}, meta: {} }
//         // So we need to access res.data to get the courses array
//         const coursesData = res.data || [];
        
        
        
//         // Transform the courses data
//         return coursesData.map(course => ({
//           ...course,
//           average_rating: course.ratings?.average_rating || 0,
//           reviews_count: course.ratings?.reviews_count || 0,
//           reviews_avg_rating: course.ratings?.average_rating || 0,
//           ratings: course.ratings || {
//             average_rating: 0,
//             reviews_count: 0,
//             rating_breakdown: []
//           }
//         }));
        
//       } catch (error) {
//         console.error("Error fetching top rated courses:", error);
//         throw error;
//       }
//     },
//   });
// }