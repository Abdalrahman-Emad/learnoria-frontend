import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

export function useCities() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: () => apiClient("/cities"),
    staleTime: 1000 * 60 * 60, // ساعة
  });
}
// import { useQuery } from "@tanstack/react-query";
// import { api } from "@/lib/apiClient"; // Use the api helper

// export function useCities() {
//   return useQuery({
//     queryKey: ["cities"],
//     queryFn: async () => {
//       const res = await api.get("/cities");
//       return res?.data || res;
//     },
//     staleTime: 1000 * 60 * 60,
//     cacheTime: 1000 * 60 * 60 * 2,
//     refetchOnWindowFocus: false,
//     retry: 1,
//   });
// }
// // import { useQuery } from "@tanstack/react-query";
// // import { apiClient } from "@/lib/apiClient";

// // // ==========================================
// // // 🏙️ Fetch All Cities
// // // ==========================================
// // /**
// //  * Hook to fetch all available cities
// //  * Cities are static data that rarely change, so we cache aggressively
// //  * 
// //  * @returns {Object} Query result with cities array
// //  */
// // export function useCities() {
// //   return useQuery({
// //     queryKey: ["cities"],

// //     queryFn: async () => {
// //       const response = await apiClient("/cities");
      
// //       // ✅ Handle different response structures
// //       // Some APIs return { data: [...] }, others return [...] directly
// //       if (Array.isArray(response)) {
// //         return response;
// //       }
      
// //       if (response?.data && Array.isArray(response.data)) {
// //         return response.data;
// //       }
      
// //       // ✅ Invalid response structure
// //       console.error("Unexpected cities API response:", response);
// //       throw new Error("Invalid cities data structure");
// //     },

// //     // ✅ Cities rarely change, cache for 24 hours
// //     staleTime: 1000 * 60 * 60 * 24, // 24 hours
    
// //     // ✅ Keep in memory for 48 hours (updated from deprecated cacheTime)
// //     gcTime: 1000 * 60 * 60 * 48, // 48 hours
    
// //     // ✅ Never refetch on window focus (cities don't change)
// //     refetchOnWindowFocus: false,
    
// //     // ✅ Retry twice on failure (network issues are common)
// //     retry: 2,
    
// //     // ✅ Add retry delay
// //     retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

// //     // ✅ Transform response to ensure consistent structure
// //     select: (data) => {
// //       // Ensure each city has required fields
// //       return data.map(city => ({
// //         id: city.id,
// //         name: city.name || city.city_name || "Unknown City",
// //         // Add any other consistent fields your app expects
// //         ...city
// //       }));
// //     },
// //   });
// // }