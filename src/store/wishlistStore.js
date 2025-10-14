// // stores/wishlistStore.js
// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { api } from "@/lib/apiClient";
// import { toast } from "react-hot-toast";
// import { useAuthStore } from "@/store/useAuthStore"; // ✅ استدعيت authStore عشان التشيك على الـ user

// export const useWishlistStore = create(
//   persist(
//     (set, get) => ({
//       wishlistItems: [],
//       loading: false,

//       // ✅ Check if course is in wishlist
//       isWishlisted: (courseId) => {
//         return get().wishlistItems.some((item) => item.id === courseId);
//       },

//       // ✅ Fetch all wishlist items from server
//       fetchWishlist: async () => {
//         set({ loading: true });
//         try {
//           const user = useAuthStore.getState().user; // ✅ تشيك على user
//           if (!user) {
//             set({ wishlistItems: [], loading: false });
//             return;
//           }

//           const res = await api.get("/wishlist");
//           const items =
//             res?.data?.wishlist || res?.wishlist || res?.data || [];

//           set({ wishlistItems: items, loading: false });
//         } catch (error) {
//           console.error("Failed to fetch wishlist:", error);
//           toast.error("Failed to load wishlist");
//           set({ loading: false });
//         }
//       },

//       // ✅ Add course to wishlist
//       addToWishlist: async (courseId) => {
//         set({ loading: true });
//         try {
//           const user = useAuthStore.getState().user;
//           if (!user) {
//             toast.error("You must be logged in to add to wishlist");
//             set({ loading: false });
//             return;
//           }

//           await api.post(`/wishlist/courses/${courseId}`);
//           toast.success("Added to wishlist");

//           await get().fetchWishlist();
//         } catch (error) {
//           console.error("Failed to add to wishlist:", error);
//           toast.error(error?.response?.data?.message || "Failed to add");
//         } finally {
//           set({ loading: false });
//         }
//       },

//       // ✅ Remove course from wishlist
//       removeFromWishlist: async (courseId) => {
//         set({ loading: true });
//         try {
//           const user = useAuthStore.getState().user;
//           if (!user) {
//             toast.error("You must be logged in to remove from wishlist");
//             set({ loading: false });
//             return;
//           }

//           await api.delete(`/wishlist/courses/${courseId}`);
//           toast.success("Removed from wishlist");

//           set((state) => ({
//             wishlistItems: state.wishlistItems.filter(
//               (item) => item.id !== courseId
//             ),
//             loading: false,
//           }));
//         } catch (error) {
//           console.error("Failed to remove from wishlist:", error);
//           toast.error(error?.response?.data?.message || "Failed to remove");
//           set({ loading: false });
//         }
//       },

//       // ✅ Toggle wishlist
//       toggleWishlist: async (courseId) => {
//         if (get().isWishlisted(courseId)) {
//           await get().removeFromWishlist(courseId);
//         } else {
//           await get().addToWishlist(courseId);
//         }
//       },

//       // ✅ Clear wishlist (هتنادي عليها بعد الـ logout)
//       clearWishlist: async () => {
//         set({ loading: true });
//         try {
//           const user = useAuthStore.getState().user;
//           if (!user) {
//             set({ wishlistItems: [], loading: false });
//             return;
//           }

//           await api.delete("/wishlist/clear");
//           toast.success("Wishlist cleared");
//           set({ wishlistItems: [], loading: false });
//         } catch (error) {
//           console.error("Failed to clear wishlist:", error);
//           toast.error("Failed to clear wishlist");
//           set({ loading: false });
//         }
//       },
//     }),
//     {
//       name: "wishlist-storage", // localStorage key
//     }
//   )
// );

// stores/wishlistStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/lib/apiClient";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";

// 🔹 Helper للتعامل مع errors
const handleWishlistError = (error, fallbackMsg = "Something went wrong") => {
  console.error("Wishlist error:", error);
  const message =
    error?.response?.data?.message ||
    error?.message ||
    fallbackMsg;
  toast.error(message);
};

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlistItems: [],
      loading: false,

      // ✅ Check if course is in wishlist
      isWishlisted: (courseId) =>
        get().wishlistItems.some((item) => item?.id === courseId),

      // ✅ Reset wishlist locally (يستخدم في logout)
      resetWishlist: () => set({ wishlistItems: [], loading: false }),

      // ✅ Fetch all wishlist items from server
      fetchWishlist: async () => {
        const user = useAuthStore.getState().user;
        if (!user) {
          get().resetWishlist();
          return;
        }

        set({ loading: true });
        try {
          const res = await api.get("/wishlist");
          // فلترة أي null أو عنصر ملوش id
          const items =
            res?.data?.wishlist ||
            res?.wishlist ||
            res?.data ||
            [];

          const cleanItems = items
            .filter((item) => item && (item.id || item.course_id)) // حذف null
            .map((item) => ({
              ...item,
              id: item.id ?? item.course_id, // ضمان وجود id統一
            }));

          set({ wishlistItems: cleanItems, loading: false });
        } catch (error) {
          handleWishlistError(error, "Failed to load wishlist");
          set({ loading: false });
        }
      },

      // ✅ Add course to wishlist
      addToWishlist: async (courseId) => {
        const user = useAuthStore.getState().user;
        if (!user) {
          toast.error("You must be logged in to add to wishlist");
          return;
        }

        set({ loading: true });
        try {
          const res = await api.post(`/wishlist/courses/${courseId}`);
          toast.success("Added to wishlist");

          // Update locally
          const newItem = res?.data?.wishlistItem || { id: courseId };
          set((state) => ({
            wishlistItems: [
              ...state.wishlistItems.filter((item) => item?.id !== courseId),
              newItem,
            ],
            loading: false,
          }));
        } catch (error) {
          handleWishlistError(error, "Failed to add to wishlist");
          set({ loading: false });
        }
      },

      // ✅ Remove course from wishlist
      removeFromWishlist: async (courseId) => {
        const user = useAuthStore.getState().user;
        if (!user) {
          toast.error("You must be logged in to remove from wishlist");
          return;
        }

        set({ loading: true });
        try {
          await api.delete(`/wishlist/courses/${courseId}`);
          toast.success("Removed from wishlist");

          set((state) => ({
            wishlistItems: state.wishlistItems.filter(
              (item) => item?.id !== courseId
            ),
            loading: false,
          }));
        } catch (error) {
          handleWishlistError(error, "Failed to remove from wishlist");
          set({ loading: false });
        }
      },

      // ✅ Toggle wishlist
      toggleWishlist: async (courseId) => {
        if (get().isWishlisted(courseId)) {
          await get().removeFromWishlist(courseId);
        } else {
          await get().addToWishlist(courseId);
        }
      },

      // ✅ Clear wishlist from server
      clearWishlist: async () => {
        const user = useAuthStore.getState().user;
        if (!user) {
          get().resetWishlist();
          return;
        }

        set({ loading: true });
        try {
          await api.delete("/wishlist/clear");
          toast.success("Wishlist cleared");
          get().resetWishlist();
        } catch (error) {
          handleWishlistError(error, "Failed to clear wishlist");
          set({ loading: false });
        }
      },
    }),
    {
      name: "wishlist-storage", // localStorage key
    }
  )
);

// 🔹 Sync مع الـ authStore → امسح الـ wishlist أوتوماتيك عند logout
useAuthStore.subscribe((state) => {
  if (!state.isAuthenticated) {
    useWishlistStore.getState().resetWishlist();
  }
});
