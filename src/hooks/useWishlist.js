// src/hooks/useWishlist.js
"use client";

import { useEffect } from "react";
import { useWishlistStore } from "@/store/wishlistStore";

export function useWishlist(courseId = null) {
  const {
    wishlistItems,
    loading,
    isWishlisted,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
  } = useWishlistStore();

  // ⏳ تحميل الـ Wishlist أول مرة
  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  // ✅ حالة الكورس الحالي (لو مررت courseId)
  const courseIsWishlisted = courseId ? isWishlisted(courseId) : false;

  return {
    wishlist: wishlistItems,
    loading,
    isWishlisted: courseIsWishlisted,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
  };
}
