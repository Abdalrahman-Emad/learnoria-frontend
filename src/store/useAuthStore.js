// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { apiClient } from "@/lib/apiClient";
// import { toast } from "react-hot-toast";

// // Helpers للتعامل مع cookies
// const setCookie = (name, value, days = 7) => {
//   const expires = new Date(Date.now() + days * 864e5).toUTCString();
//   document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
// };

// const getCookie = (name) => {
//   if (typeof document === "undefined") return null;
//   return document.cookie
//     .split("; ")
//     .find((row) => row.startsWith(name + "="))
//     ?.split("=")[1];
// };

// const deleteCookie = (name) => {
//   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
// };

// export const useAuthStore = create(
//   persist(
//     (set, get) => ({
//       user: null,
//       loading: false,
//       isAuthenticated: false,

//       setUser: (user) =>
//         set({
//           user,
//           isAuthenticated: !!user,
//         }),

//       setLoading: (loading) => set({ loading }),

//       // ✅ تسجيل الدخول
//       login: async (email, password) => {
//         set({ loading: true });
//         try {
//           const data = await apiClient("/login", {
//             method: "POST",
//             body: { email, password },
//           });

//           const userData = {
//             ...data.user,
//             token: data.token,
//             avatar: data.user.avatar,
//           };

//           // تخزين البيانات في Zustand
//           set({
//             user: userData,
//             isAuthenticated: true,
//             loading: false,
//           });

//           // ✅ احفظ التوكين في cookies
//           if (typeof window !== "undefined") {
//             setCookie("auth-token", data.token);
//           }

//           return userData;
//         } catch (error) {
//           set({ loading: false });

//           // ✅ هنا بقى نحدد الأخطاء ونظهرها للـ user
//           if (error.status === 422 && error.errors?.email) {
//             toast.error(error.errors.email[0]); // من Laravel
//           } else if (error.status === 401) {
//             toast.error("Invalid email or password");
//           } else if (error.status === 429) {
//             toast.error("Too many login attempts. Please try again later");
//           } else {
//             toast.error(error.message || "Something went wrong");
//           }

//           throw error;
//         }
//       },

//       // ✅ تسجيل مستخدم جديد
//       register: async (formData) => {
//         set({ loading: true });
//         try {
//           const data = await apiClient("/register", {
//             method: "POST",
//             body: formData,
//             isFormData: formData instanceof FormData,
//           });

//           const userData = {
//             ...data.user,
//             token: data.token,
//             avatar: data.user.avatar,
//           };

//           set({
//             user: userData,
//             isAuthenticated: true,
//             loading: false,
//           });

//           if (typeof window !== "undefined") {
//             setCookie("auth-token", data.token);
//           }

//           return userData;
//         } catch (error) {
//           set({ loading: false });
//           if (error.status === 422 && error.errors) {
//             const validationError = new Error("Validation failed");
//             validationError.errors = error.errors;
//             throw validationError;
//           } else if (error.status === 409) {
//             throw new Error("Email already exists");
//           }
//           throw error;
//         }
//       },

//       // ✅ تسجيل الخروج
//       // ✅ تسجيل الخروج
//       logout: async () => {
//         set({ loading: true });
//         try {
//           await apiClient("/logout", { method: "POST" });
//         } catch (error) {
//           console.warn("Logout API call failed:", error);
//         } finally {
//           set({
//             user: null,
//             isAuthenticated: false,
//             loading: false,
//           });

//           if (typeof window !== "undefined") {
//             deleteCookie("auth-token");
//             sessionStorage.clear();

//             // 🟢 Clear wishlist بعد تسجيل الخروج
//             import("@/store/wishlistStore").then((module) => {
//               module.useWishlistStore.getState().clearWishlist();
//             });
//           }
//         }
//       },

//       // ✅ جلب البروفايل
//       fetchProfile: async () => {
//         if (get().loading) return;

//         const token =
//           typeof window !== "undefined" ? getCookie("auth-token") : null;

//         if (!token) {
//           set({ user: null, isAuthenticated: false, loading: false });
//           return;
//         }

//         set({ loading: true });
//         try {
//           const data = await apiClient("/profile");
//           const userData = {
//             ...data.data,
//             token,
//             avatar: data.data.avatar,
//           };

//           set({
//             user: userData,
//             isAuthenticated: true,
//             loading: false,
//           });

//           return userData;
//         } catch (error) {
//           console.warn("Failed to fetch profile:", error);
//           set({
//             user: null,
//             isAuthenticated: false,
//             loading: false,
//           });

//           if (typeof window !== "undefined") {
//             deleteCookie("auth-token");
//           }
//           throw error;
//         }
//       },

//       // ✅ تحديث البروفايل
//       updateProfile: async (payload) => {
//         set({ loading: true });
//         try {
//           let data;

//           if (payload instanceof FormData) {
//             if (!payload.has("_method")) {
//               payload.append("_method", "PUT");
//             }
//             data = await apiClient("/profile", {
//               method: "POST",
//               body: payload,
//               isFormData: true,
//             });
//           } else {
//             data = await apiClient("/profile", {
//               method: "PUT",
//               body: payload,
//             });
//           }

//           const userData = {
//             ...get().user,
//             ...data.data,
//           };

//           set({
//             user: userData,
//             loading: false,
//           });

//           toast.success("Profile updated successfully");
//           return userData;
//         } catch (error) {
//           set({ loading: false });
//           if (error.status === 422 && error.errors) {
//             const validationError = new Error("Validation failed");
//             validationError.errors = error.errors;
//             throw validationError;
//           }
//           toast.error(error.message || "Failed to update profile");
//           throw error;
//         }
//       },

//       // ✅ التحقق من وجود جلسة
//       checkAuth: () => {
//         const { user, isAuthenticated } = get();
//         const token =
//           typeof window !== "undefined" ? getCookie("auth-token") : null;

//         return isAuthenticated && user && token;
//       },

//       // ✅ تهيئة السيشن عند أول تحميل
//       initializeAuth: async () => {
//         const token =
//           typeof window !== "undefined" ? getCookie("auth-token") : null;
//         if (token && !get().user) {
//           try {
//             const userData = await get().fetchProfile();
//             return userData;
//           } catch (error) {
//             console.warn("Failed to initialize auth:", error);
//             if (typeof window !== "undefined") {
//               deleteCookie("auth-token");
//             }
//             set({ user: null, isAuthenticated: false, loading: false });
//             return null;
//           }
//         } else {
//           set({ loading: false });
//           return get().user || null;
//         }
//       },
//     }),
//     {
//       name: "auth-storage",
//       partialize: (state) => ({
//         user: state.user,
//         isAuthenticated: state.isAuthenticated,
//       }),
//     }
//   )
// );








// store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { apiClient } from "@/lib/apiClient";
import { toast } from "react-hot-toast";

// 🔹 Helper للتعامل مع errors
const handleAuthError = (error) => {
  if (error.status === 422 && error.errors?.email) {
    toast.error(error.errors.email[0]);
  } else if (error.status === 401) {
    toast.error("Invalid email or password");
  } else if (error.status === 429) {
    toast.error("Too many login attempts. Please try again later");
  } else if (error.errors) {
    Object.values(error.errors).flat().forEach((msg) => toast.error(msg));
  } else {
    toast.error(error.message || "Something went wrong");
  }
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setLoading: (loading) => set({ loading }),

      // ✅ تسجيل الدخول
      login: async (email, password) => {
        set({ loading: true });
        try {
          const data = await apiClient("/login", {
            method: "POST",
            body: { email, password },
          });

          const userData = { ...data.user, token: data.token };
          set({
            user: userData,
            isAuthenticated: true,
            loading: false,
          });

          Cookies.set("auth-token", data.token, { sameSite: "Lax", expires: 7 });

          return userData;
        } catch (error) {
          set({ loading: false });
          handleAuthError(error);
          throw error;
        }
      },

      // ✅ تسجيل مستخدم جديد
      register: async (formData) => {
        set({ loading: true });
        try {
          const data = await apiClient("/register", {
            method: "POST",
            body: formData,
            isFormData: formData instanceof FormData,
          });

          const userData = { ...data.user, token: data.token };
          set({
            user: userData,
            isAuthenticated: true,
            loading: false,
          });

          Cookies.set("auth-token", data.token, { sameSite: "Lax", expires: 7 });
          return userData;
        } catch (error) {
          set({ loading: false });
          handleAuthError(error);
          throw error;
        }
      },

      // ✅ تسجيل الخروج
      logout: async () => {
        set({ loading: true });
        try {
          await apiClient("/logout", { method: "POST" });
        } catch (error) {
          console.warn("Logout API call failed:", error);
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
          });
          Cookies.remove("auth-token");

          // 🔹 خلي wishlist نفسها تتابع auth state وتفضي نفسها
          import("@/store/wishlistStore").then((module) => {
            module.useWishlistStore.getState().clearWishlist();
          });
        }
      },

      // ✅ جلب البروفايل
      fetchProfile: async () => {
        const token = Cookies.get("auth-token");
        if (!token) {
          set({ user: null, isAuthenticated: false });
          return;
        }

        set({ loading: true });
        try {
          const data = await apiClient("/profile");
          const userData = { ...data.data, token };

          set({
            user: userData,
            isAuthenticated: true,
            loading: false,
          });

          return userData;
        } catch (error) {
          console.warn("Failed to fetch profile:", error);
          set({ user: null, isAuthenticated: false, loading: false });
          Cookies.remove("auth-token");
          throw error;
        }
      },

      // ✅ تحديث البروفايل
      updateProfile: async (payload) => {
        set({ loading: true });
        try {
          let data;
          if (payload instanceof FormData) {
            if (!payload.has("_method")) payload.append("_method", "PUT");
            data = await apiClient("/profile", {
              method: "POST",
              body: payload,
              isFormData: true,
            });
          } else {
            data = await apiClient("/profile", {
              method: "PUT",
              body: payload,
            });
          }

          const userData = { ...get().user, ...data.data };
          set({ user: userData, loading: false });

          toast.success("Profile updated successfully");
          return userData;
        } catch (error) {
          set({ loading: false });
          handleAuthError(error);
          throw error;
        }
      },

      // ✅ التحقق من وجود جلسة
      checkAuth: () => {
        const token = Cookies.get("auth-token");
        return !!(get().user && token);
      },

      // ✅ تهيئة السيشن
      initializeAuth: async () => {
        const token = Cookies.get("auth-token");
        if (token && !get().user) {
          try {
            return await get().fetchProfile();
          } catch {
            Cookies.remove("auth-token");
            set({ user: null, isAuthenticated: false, loading: false });
            return null;
          }
        } else {
          set({ loading: false });
          return get().user || null;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
