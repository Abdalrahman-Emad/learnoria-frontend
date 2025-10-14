"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/apiClient";

export function useRelatedCourses(courseId) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) return;

    async function fetchRelatedCourses() {
      try {
        setLoading(true);
        setError(null);

        const data = await api.get(`/courses/${courseId}/related`);
        setCourses(data.data || []); // Laravel resource collections بترجع تحت data
      } catch (err) {
        setError(err.message || "Failed to fetch related courses");
      } finally {
        setLoading(false);
      }
    }

    fetchRelatedCourses();
  }, [courseId]);

  return { courses, loading, error };
}
