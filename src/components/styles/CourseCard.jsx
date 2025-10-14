"use client";

import { Card, CardHeader, CardContent, CardFooter } from "@/components/styles/ui/card";
import { Badge } from "@/components/styles/ui/badge";
import { Star, Building, Clock, Users } from "lucide-react";
import Link from "next/link";
import { memo, useMemo } from "react";
import CourseImage from "./CourseImage";

const CourseCard = memo(({ course, href, className = "" }) => {
  const rating = Number(course.ratings?.average_rating ?? 0);
  const reviewsCount = Number(course.ratings?.reviews_count ?? 0);
  const cardHref = href || `/courses/${course.id}`;

  const stars = useMemo(() => {
    const starsArr = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starsArr.push(<Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        starsArr.push(
          <div key={i} className="relative h-4 w-4">
            <Star className="h-4 w-4 text-gray-300 absolute" />
            <div className="overflow-hidden w-1/2">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        );
      } else {
        starsArr.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }

    return starsArr;
  }, [rating]);

  return (
    <Link href={cardHref} className={`block h-full group ${className}`}>
      <Card className="flex flex-col h-full cursor-pointer transition-transform duration-300 ease-in-out shadow-lg hover:shadow-xl hover:-translate-y-1 border border-slate-200 bg-slate-100 overflow-hidden rounded-xl">
        {/* Course Image */}
        <div className="relative h-40 sm:h-48 overflow-hidden">
          <CourseImage
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            priority={false}
          />
          {/* Price Badge */}
          <div className="absolute top-3 right-3">
            <Badge className="bg-white/90 text-slate-800 font-semibold shadow-md backdrop-blur-sm">
              ${course.price}
            </Badge>
          </div>
          {/* Field Badge */}
          {course.field && (
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-blue-500/90 text-white font-medium">
                {course.field}
              </Badge>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="flex flex-col flex-1 p-4">
          <CardHeader className="p-0 mb-2 flex flex-col justify-between min-h-[4.5rem]">
            <div className="flex items-center gap-2 mb-2">
              <Building className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                {course.provider?.name ?? "Unknown Provider"}
              </span>
            </div>
            <h3 className="font-semibold text-base sm:text-lg text-slate-800 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
              {course.title}
            </h3>
          </CardHeader>

          <CardContent className="flex-1 p-0 mb-2">
            <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
              {course.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
              {course.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{course.duration} hours</span>
                </div>
              )}
              {course.enrolled_students_count > 0 && (
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{course.enrolled_students_count} students</span>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="mt-auto flex flex-wrap items-center justify-between border-t border-slate-100 p-4 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">{stars}</div>
              <span className="text-sm font-medium text-slate-700">{rating.toFixed(1)}</span>
              <span className="text-xs text-slate-500">
                ({reviewsCount} {reviewsCount === 1 ? "review" : "reviews"})
              </span>
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
});

CourseCard.displayName = "CourseCard";

export default CourseCard;
