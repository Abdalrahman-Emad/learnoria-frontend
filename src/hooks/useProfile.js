"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";

export function useProfile() {
  const { user, fetchProfile, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editData, setEditData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("personal");

  // ✅ Fetch profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        await fetchProfile();
      } catch (err) {
        toast.error("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, [fetchProfile]);

  // ✅ Sync editData when user updates
  useEffect(() => {
    if (user) setEditData({ ...user });
  }, [user]);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...user });
    toast.info("Changes cancelled");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        name: editData.name,
        email: editData.email,
        phone: editData.phone,
        city: editData.city,
        bio: editData.bio,
      };
      await updateProfile(payload);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      if (err.errors) {
        Object.values(err.errors).forEach((messages) =>
          toast.error(messages.join(", "))
        );
      } else {
        toast.error(err.message || "Failed to update profile");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      await updateProfile(formData);
      await fetchProfile();
      toast.success("Avatar updated successfully");
    } catch (error) {
      toast.error(error.message || "Failed to upload avatar");
    } finally {
      setIsUploading(false);
    }
  };

  return {
    user,
    editData,
    isEditing,
    isSaving,
    isUploading,
    isLoading,
    activeTab,
    setActiveTab,
    handleEdit,
    handleCancel,
    handleSave,
    handleInputChange,
    handleAvatarUpload,
  };
}
