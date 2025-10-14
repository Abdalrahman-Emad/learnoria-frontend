// src/hooks/useFields.js
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

export function useFields() {
  return useQuery({
    queryKey: ["fields"],
    queryFn: () => apiClient("/fields"),
    staleTime: 1000 * 60 * 60, 
  });
}
