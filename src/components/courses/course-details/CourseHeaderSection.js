"use client";

import { Calendar, Award, MapPin, Globe, Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/styles/ui/button";
import { useWishlistStore } from "@/store/wishlistStore";
import { toast } from "react-hot-toast";


export default function CourseHeaderSection({ course }) {
  const { isWishlisted, toggleWishlist, loading } = useWishlistStore();
  const displayPrice = course.pricing?.current_price || course.discounted_price || course.price;

  return (
    <div className="bg-card rounded-2xl shadow-sm p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
        {course.title}
      </h1>
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        {course.description}
      </p>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center text-foreground/80 bg-muted px-4 py-2 rounded-lg">
          <Calendar className="h-5 w-5 mr-2 text-blue-primary" />
          <span className="font-medium">
            Starts: {new Date(course.start_date).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center text-foreground/80 bg-muted px-4 py-2 rounded-lg">
          <Award className="h-5 w-5 mr-2 text-blue-primary" />
          <span className="font-medium">{course.field}</span>
        </div>
        <div className="flex items-center text-foreground/80 bg-muted px-4 py-2 rounded-lg">
          <MapPin className="h-5 w-5 mr-2 text-blue-primary" />
          <span className="font-medium">{course.city}</span>
        </div>
        <div className="flex items-center text-foreground/80 bg-muted px-4 py-2 rounded-lg">
          <Globe className="h-5 w-5 mr-2 text-blue-primary" />
          <span className="font-medium capitalize">{course.language}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button className="px-8 py-3 rounded-lg font-semibold text-lg h-auto">
          Enroll Now - ${displayPrice}
        </Button>

        {/* ✅ Wishlist Button */}
        <Button
          onClick={() => toggleWishlist(course.id)}
          disabled={loading}
          variant={isWishlisted(course.id) ? "" : "outline"}
          className="px-6 py-3 rounded-lg font-medium h-auto flex items-center gap-2"
        >
          <Bookmark
            className="h-5 w-5"
            fill={isWishlisted(course.id) ? "currentColor" : "none"}
          />
          {loading ? "Loading..." : (isWishlisted(course.id) ? "Wishlisted" : "Add to Wishlist")}
        </Button>


<Button
  variant="outline"
  className="px-5 py-3 rounded-lg font-medium h-auto flex items-center gap-2"
  onClick={() => {
    const shareData = {
      title: course.title,
      text: course.description || "Check out this course!",
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (navigator.share) {
      navigator.share(shareData).catch((err) =>
        console.error("Error sharing:", err)
      );
    } else if (navigator.clipboard) {
      navigator.clipboard
        .writeText(shareData.url)
        .then(() => toast.success("🔗 Link copied to clipboard!"))
        .catch((err) => {
          console.error("Clipboard error:", err);
          toast.error("❌ Failed to copy link");
        });
    } else {
      toast.error("Sharing not supported on this device.");
    }
  }}
>
  <Share2 className="h-5 w-5" />
  Share
</Button>
      </div>
    </div>
  );
}