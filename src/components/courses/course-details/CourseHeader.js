import { ArrowLeft, Heart, Share2 } from "lucide-react";

export default function CourseHeader({
  course,
  router,
  isWishlisted,
  toggleWishlist,
}) {
  return (
    <header className="bg-card shadow-sm py-4 sticky top-0 z-10 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200 p-2 rounded-lg hover:bg-accent"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="hidden md:block text-sm text-muted-foreground">
              <span className="text-muted-foreground/70">Courses</span>
              <span className="mx-2">/</span>
              <span className="text-muted-foreground">{course.field}</span>
              <span className="mx-2">/</span>
              <span className="text-foreground font-medium truncate max-w-xs">
                {course.title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
