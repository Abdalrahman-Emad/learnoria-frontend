// "use client";

// import { Card } from "@/components/styles/ui/card";
// import { Badge } from "@/components/styles/ui/badge";
// import { Star, Clock, Users, Building, Share2, Bookmark } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { useMemo, useState } from "react";

// export default function CourseListItem({ course }) {
//   const [saved, setSaved] = useState(false);

//   const rating = Number(course.average_rating || 0);
//   const reviewsCount = course.reviews_count ?? 0;

//   const stars = useMemo(() => {
//     const starsArr = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;

//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         starsArr.push(<Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />);
//       } else if (i === fullStars && hasHalfStar) {
//         starsArr.push(
//           <div key={i} className="relative h-4 w-4">
//             <Star className="h-4 w-4 text-gray-300 absolute" />
//             <div className="overflow-hidden w-1/2">
//               <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
//             </div>
//           </div>
//         );
//       } else {
//         starsArr.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
//       }
//     }
//     return starsArr;
//   }, [rating]);

//   return (
//     <Card className="flex flex-col sm:flex-row gap-4 p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
//       {/* Image */}
//       <div className="relative w-full sm:w-48 h-32 sm:h-auto flex-shrink-0">
//         <Image
//           src={course.image}
//           alt={course.title}
//           fill
//           className="object-cover rounded-md"
//         />
//         {/* Price Badge */}
//         <div className="absolute top-2 right-2">
//           <Badge className="bg-white/90 text-slate-800 font-semibold shadow">
//             ${course.price}
//           </Badge>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="flex-1 flex flex-col justify-between">
//         <div>
//           {/* Provider */}
//           <div className="flex items-center gap-2 mb-2">
//             <Building className="h-4 w-4 text-slate-500" />
//             <span className="text-sm font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
//               {course.provider?.name || "Unknown Provider"}
//             </span>
//           </div>

//           {/* Title */}
//           <Link href={`/courses/${course.id}`}>
//             <h3 className="text-lg font-bold text-slate-800 hover:text-blue-600 transition-colors line-clamp-2">
//               {course.title}
//             </h3>
//           </Link>

//           {/* Description */}
//           <p className="text-sm text-slate-600 line-clamp-3 mt-2">
//             {course.description}
//           </p>

//           {/* Meta */}
//           <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-3">
//             {course.duration && (
//               <div className="flex items-center gap-1">
//                 <Clock className="h-3 w-3" />
//                 <span>{course.duration}</span>
//               </div>
//             )}
//             {course.students_count && (
//               <div className="flex items-center gap-1">
//                 <Users className="h-3 w-3" />
//                 <span>{course.students_count} students</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between mt-4">
//           {/* Rating */}
//           <div className="flex items-center gap-2">
//             <div className="flex">{stars}</div>
//             <span className="text-sm font-medium text-slate-700">
//               {rating.toFixed(1)}
//             </span>
//             <span className="text-xs text-slate-500">
//               ({reviewsCount} {reviewsCount === 1 ? "review" : "reviews"})
//             </span>
//           </div>

//           {/* Actions */}
//           <div className="flex gap-3">
//             <button
//               onClick={() => setSaved(!saved)}
//               className={`p-2 rounded-full transition-colors ${
//                 saved ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500 hover:text-slate-700"
//               }`}
//             >
//               <Bookmark className="h-4 w-4" />
//             </button>
//             <button className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors">
//               <Share2 className="h-4 w-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }
