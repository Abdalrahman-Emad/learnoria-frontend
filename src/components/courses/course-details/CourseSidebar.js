// "use client";

// import {
//   Play,
//   Bookmark,
//   Clock,
//   BookOpen,
//   Trophy,
//   Download,
//   Award,
//   Globe,
//   MessageCircle,
// } from "lucide-react";
// import { Button } from "@/components/styles/ui/button";
// import { useWishlistStore } from "@/store/wishlistStore";
// import Image from "next/image";

// export default function CourseSidebar({ course }) {
//   const { isWishlisted, toggleWishlist, loading } = useWishlistStore();
//   const displayPrice =
//     course.pricing?.current_price || course.discounted_price || course.price;
//   const originalPrice = course.pricing?.original_price || course.price;
//   const discountPercentage =
//     course.pricing?.discount_percentage ||
//     (originalPrice && displayPrice && originalPrice !== displayPrice
//       ? Math.round((1 - displayPrice / originalPrice) * 100)
//       : 0);

//   return (
//     <div className="sticky top-24 space-y-6">
//       <div className="bg-card rounded-2xl border border-border overflow-hidden">
//         {/* 🎥 Course Preview */}
//         <div className="aspect-video bg-gradient-to-br from-blue-primary to-blue-secondary relative">
//           <Image
//             src={
//               course.image ||
//               `/placeholder.svg?height=250&width=400&text=${encodeURIComponent(
//                 course.title
//               )}`
//             }
//             alt={course.title}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
//             <button className="bg-background/95 hover:bg-background text-blue-primary rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-md">
//               <Play className="h-5 w-5 ml-0.5" />
//             </button>
//           </div>
//         </div>

//         {/* 💰 Price + CTA */}
//         <div className="p-6">
//           <div className="text-center mb-5">
//             <div className="flex items-center justify-center mb-2">
//               {discountPercentage > 0 && (
//                 <span className="text-lg text-muted-foreground line-through mr-2">
//                   ${originalPrice}
//                 </span>
//               )}
//               <div className="text-2xl font-bold text-foreground">
//                 ${displayPrice}
//               </div>
//             </div>
//             {discountPercentage > 0 && (
//               <div className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold mb-2 inline-block">
//                 {discountPercentage}% OFF
//               </div>
//             )}
//             <p className="text-muted-foreground text-sm">
//               Full lifetime access
//             </p>
//           </div>

//           {/* ✅ Actions */}
//           <div className="space-y-3 mb-5">
//             <Button className="w-full py-3 px-6 rounded-lg font-semibold text-lg h-auto">
//               Enroll Now
//             </Button>
//             <Button
//               onClick={() => toggleWishlist(course.id)}
//               disabled={loading}
//               variant={isWishlisted(course.id) ? "default" : "outline"}
//               className="w-full px-6 py-3 rounded-lg font-semibold h-auto flex items-center gap-2"
//             >
//               <Bookmark
//                 className="h-5 w-5"
//                 fill={isWishlisted(course.id) ? "currentColor" : "none"}
//               />
//               {loading
//                 ? "Loading..."
//                 : isWishlisted(course.id)
//                 ? "Wishlisted"
//                 : "Add to Wishlist"}
//             </Button>
//           </div>
//           <div className="text-center text-xs text-muted-foreground mb-5">
//             30-day money-back guarantee
//           </div>

//           {/* 📚 Course Includes */}
//           <div className="border-t border-border pt-5 space-y-3">
//             <h4 className="font-semibold text-foreground mb-2">
//               This course includes:
//             </h4>
//             <div className="space-y-2 text-sm">
//               <div className="flex items-center">
//                 <Clock className="h-4 w-4 mr-2 text-blue-primary" />
//                 <span className="text-foreground/80">
//                   {course.course_includes?.duration_hours ||
//                     Math.round(course.total_duration / 60)}{" "}
//                   hours on-demand video
//                 </span>
//               </div>
//               <div className="flex items-center">
//                 <BookOpen className="h-4 w-4 mr-2 text-blue-primary" />
//                 <span className="text-foreground/80">
//                   {course.course_includes?.total_lectures ||
//                     course.sections?.reduce(
//                       (acc, section) => acc + section.lectures_count,
//                       0
//                     ) ||
//                     0}{" "}
//                   lectures
//                 </span>
//               </div>
//               <div className="flex items-center">
//                 <Trophy className="h-4 w-4 mr-2 text-blue-primary" />
//                 <span className="text-foreground/80">
//                   {course.course_includes?.total_projects || 0} projects
//                 </span>
//               </div>
//               <div className="flex items-center">
//                 <Download className="h-4 w-4 mr-2 text-blue-primary" />
//                 <span className="text-foreground/80">
//                   Downloadable resources
//                 </span>
//               </div>
//               <div className="flex items-center">
//                 <Award className="h-4 w-4 mr-2 text-blue-primary" />
//                 <span className="text-foreground/80">
//                   {course.course_includes?.certificate
//                     ? "Certificate of completion"
//                     : "Course completion badge"}
//                 </span>
//               </div>
//               <div className="flex items-center">
//                 <Globe className="h-4 w-4 mr-2 text-blue-primary" />
//                 <span className="text-foreground/80">Full lifetime access</span>
//               </div>
//               <div className="flex items-center">
//                 <MessageCircle className="h-4 w-4 mr-2 text-blue-primary" />
//                 <span className="text-foreground/80">
//                   Access on mobile and desktop
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 🎯 Bottom CTA */}
//       <div className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 rounded-2xl p-6 text-center shadow-md border border-indigo-100">
//         <h3 className="text-xl font-bold text-blue-600 mb-3">
//           Ready to Start Learning?
//         </h3>

//         <p className="text-gray-600 text-sm mb-4">
//           Join{" "}
//           <span className="font-semibold text-indigo-600">
//             {course.enrolled_students_count}
//           </span>{" "}
//           students already enrolled
//         </p>

//         <div className="text-2xl font-extrabold text-gray-900 mb-3">
//           ${displayPrice}
//         </div>

//         {course.pricing?.active_coupon && (
//           <p className="text-xs text-green-700 bg-green-50 px-3 py-1 inline-block rounded-full">
//             Use code{" "}
//             <span className="font-bold">
//               {course.pricing.active_coupon.code}
//             </span>{" "}
//             for <span className="font-semibold">{discountPercentage}%</span> off
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import {
  Play,
  Bookmark,
  Clock,
  BookOpen,
  Trophy,
  Download,
  Award,
  Globe,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/styles/ui/button";
import { useWishlistStore } from "@/store/wishlistStore";
import Image from "next/image";

export default function CourseSidebar({ course }) {
  const { isWishlisted, toggleWishlist, loading } = useWishlistStore();

  const displayPrice =
    course.pricing?.current_price || course.discounted_price || course.price;
  const originalPrice = course.pricing?.original_price || course.price;

  const discountPercentage =
    course.pricing?.discount_percentage ||
    (originalPrice && displayPrice && originalPrice !== displayPrice
      ? Math.round((1 - displayPrice / originalPrice) * 100)
      : 0);

  return (
    <div className="sticky top-24 space-y-6">
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* 🎥 Course Preview */}
        <div className="aspect-video bg-gradient-to-br from-blue-primary to-blue-secondary relative rounded-2xl overflow-hidden">
          <Image
            src={
              course.image ||
              `/placeholder.svg?height=250&width=400&text=${encodeURIComponent(
                course.title
              )}`
            }
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
            priority
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <button className="bg-background/95 hover:bg-background text-blue-primary rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-md">
              <Play className="h-5 w-5 ml-0.5" />
            </button>
          </div>
        </div>

        {/* 💰 Price + CTA */}
        <div className="p-6">
          <div className="text-center mb-5">
            <div className="flex items-center justify-center mb-2">
              {discountPercentage > 0 && (
                <span className="text-lg text-muted-foreground line-through mr-2">
                  ${originalPrice}
                </span>
              )}
              <div className="text-2xl font-bold text-foreground">
                ${displayPrice}
              </div>
            </div>
            {discountPercentage > 0 && (
              <div className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold mb-2 inline-block">
                {discountPercentage}% OFF
              </div>
            )}
            <p className="text-muted-foreground text-sm">
              Full lifetime access
            </p>
          </div>

          {/* ✅ Actions */}
          <div className="space-y-3 mb-5">
            <Button className="w-full py-3 px-6 rounded-lg font-semibold text-lg h-auto">
              Enroll Now
            </Button>
            <Button
              onClick={() => toggleWishlist(course.id)}
              disabled={loading}
              variant={isWishlisted(course.id) ? "default" : "outline"}
              className="w-full px-6 py-3 rounded-lg font-semibold h-auto flex items-center gap-2"
            >
              <Bookmark
                className="h-5 w-5"
                fill={isWishlisted(course.id) ? "currentColor" : "none"}
              />
              {loading
                ? "Loading..."
                : isWishlisted(course.id)
                ? "Wishlisted"
                : "Add to Wishlist"}
            </Button>
          </div>
          <div className="text-center text-xs text-muted-foreground mb-5">
            30-day money-back guarantee
          </div>

          {/* 📚 Course Includes */}
          <div className="border-t border-border pt-5 space-y-3">
            <h4 className="font-semibold text-foreground mb-2">
              This course includes:
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-blue-primary" />
                <span className="text-foreground/80">
                  {course.course_includes?.duration_hours ||
                    Math.round(course.total_duration / 60)}{" "}
                  hours on-demand video
                </span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-blue-primary" />
                <span className="text-foreground/80">
                  {course.course_includes?.total_lectures ||
                    course.sections?.reduce(
                      (acc, section) => acc + section.lectures_count,
                      0
                    ) ||
                    0}{" "}
                  lectures
                </span>
              </div>
              <div className="flex items-center">
                <Trophy className="h-4 w-4 mr-2 text-blue-primary" />
                <span className="text-foreground/80">
                  {course.course_includes?.total_projects || 0} projects
                </span>
              </div>
              <div className="flex items-center">
                <Download className="h-4 w-4 mr-2 text-blue-primary" />
                <span className="text-foreground/80">
                  Downloadable resources
                </span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-2 text-blue-primary" />
                <span className="text-foreground/80">
                  {course.course_includes?.certificate
                    ? "Certificate of completion"
                    : "Course completion badge"}
                </span>
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2 text-blue-primary" />
                <span className="text-foreground/80">Full lifetime access</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-2 text-blue-primary" />
                <span className="text-foreground/80">
                  Access on mobile and desktop
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🎯 Bottom CTA */}
      <div className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 rounded-2xl p-6 text-center shadow-md border border-indigo-100">
        <h3 className="text-xl font-bold text-blue-600 mb-3">
          Ready to Start Learning?
        </h3>

        <p className="text-gray-600 text-sm mb-4">
          Join{" "}
          <span className="font-semibold text-indigo-600">
            {course.enrolled_students_count}
          </span>{" "}
          students already enrolled
        </p>

        <div className="text-2xl font-extrabold text-gray-900 mb-3">
          ${displayPrice}
        </div>

        {course.pricing?.active_coupon && (
          <p className="text-xs text-green-700 bg-green-50 px-3 py-1 inline-block rounded-full">
            Use code{" "}
            <span className="font-bold">
              {course.pricing.active_coupon.code}
            </span>{" "}
            for <span className="font-semibold">{discountPercentage}%</span> off
          </p>
        )}
      </div>
    </div>
  );
}
