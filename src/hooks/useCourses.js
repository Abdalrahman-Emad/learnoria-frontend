// // import { useQuery } from "@tanstack/react-query";
// // import { apiClient } from "@/lib/apiClient";

// // export function useCourses(filters = {}) {
// //   return useQuery({
// //     queryKey: ["courses", filters],
// //     queryFn: async () => {
// //       const query = new URLSearchParams(filters).toString();
// //       const res = await apiClient(`/courses?${query}`);
// //       return res.data; // يجب أن يكون API يرجع array أو object { data, meta }
// //     },
// //     keepPreviousData: true,
// //   });
// // }


// import { useQuery } from "@tanstack/react-query";
// import { apiClient } from "@/lib/apiClient";

// export function useAllCourses(filters = {}) {
//   return useQuery({
//     queryKey: ["all-courses", filters],
//     queryFn: async () => {
//       let allCourses = [];
//       let page = 1;
//       let lastPage = 1;

//       do {
//         const query = new URLSearchParams({ ...filters, page, per_page: 15 }).toString();
//         const res = await apiClient(`/courses?${query}`);
//         if (!res.data) throw new Error("Invalid response from server");
//         allCourses = [...allCourses, ...res.data];
//         lastPage = res.meta?.last_page || 1;
//         page++;
//       } while (page <= lastPage);

//       return allCourses;
//     },
//     keepPreviousData: true,
//   });
// }



import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

export function useAllCourses(filters = {}) {
  return useQuery({
    queryKey: ["all-courses", filters],
    queryFn: async () => {
      let allCourses = [];
      let page = 1;
      let lastPage = 1;
      const DEV_MODE = process.env.NODE_ENV === "development";
      const perPage = DEV_MODE ? 15 : 15; // بدل 5
      const maxPages = Infinity; // بدل 1

      do {
        const query = new URLSearchParams({
          ...filters,
          page,
          per_page: perPage,
        }).toString();
        const res = await apiClient(`/courses?${query}`);
        if (!Array.isArray(res.data))
          throw new Error("Invalid response from server");

        allCourses.push(...res.data);
        lastPage = res.meta?.last_page || 1;
        page++;
      } while (page <= lastPage && page <= maxPages);

      return allCourses;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60, // 1 دقيقة
    cacheTime: 1000 * 60 * 5, // 5 دقائق
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
