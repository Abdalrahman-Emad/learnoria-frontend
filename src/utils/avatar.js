/**
 * Get a valid avatar URL for the user.
 * @param {Object} user - User object containing avatar info
 * @param {string} fallback - Optional fallback image URL
 * @returns {string} - Valid avatar URL or fallback
 */
export const getAvatarSrc = (user, fallback = "/placeholder.svg") => {
  // No avatar provided
  if (!user?.avatar) return fallback;

  const url = user.avatar.trim();

  // Already a full URL (Cloudinary or other CDN) - return as-is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Relative path - shouldn't happen with Cloudinary, but handle legacy cases
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
    "https://learnoria-backend-production.up.railway.app";

  return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
};

/**
 * Get user initials for fallback avatar
 * @param {Object} user - User object containing name
 * @returns {string} - User initials
 */
export const getUserInitials = (user) => {
  if (!user?.name) return "U";
  
  return user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2); // Limit to 2 characters
};