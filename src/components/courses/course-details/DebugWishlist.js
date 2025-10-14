// src/components/DebugWishlist.js
"use client";

import { useEffect } from "react";
import { api } from "@/lib/apiClient";

export default function DebugWishlist() {
  useEffect(() => {
    const debugApiCall = async () => {
      try {
        console.log("Making direct API call to /wishlist...");
        const response = await api.get("/wishlist");
        console.log("Direct API response:", response);
        console.log("Response.wishlist:", response?.wishlist);
        console.log("Response.data:", response?.data);
        console.log("Response.data.wishlist:", response?.data?.wishlist);
      } catch (error) {
        console.error("Direct API error:", error);
      }
    };
    
    debugApiCall();
  }, []);

  return null;
}