// // src/hooks/useRecentlyAddedCourses.js
// import { useQuery } from "@tanstack/react-query";
// import { apiClient } from "@/lib/apiClient";

// export function useRecentlyAddedCourses() {
//   return useQuery({
//     queryKey: ["recently-added-courses"],
//     queryFn: () => apiClient("/courses?sort=recent"),
//   });
// }
