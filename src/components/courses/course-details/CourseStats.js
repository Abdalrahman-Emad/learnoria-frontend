import { Clock, Users, Star, Trophy } from "lucide-react";

export default function CourseStats({ course }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-card rounded-2xl">
      <div className="text-center">
        <div className="w-14 h-14 bg-blue-light rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Clock className="h-7 w-7 text-blue-primary" />
        </div>
        <p className="text-sm text-muted-foreground mb-1">Duration</p>
        <p className="font-bold text-foreground">
          {course.course_includes?.duration_hours || Math.round(course.total_duration / 60)}h
        </p>
      </div>
      <div className="text-center">
        <div className="w-14 h-14 bg-blue-light rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Users className="h-7 w-7 text-blue-primary" />
        </div>
        <p className="text-sm text-muted-foreground mb-1">Students</p>
        <p className="font-bold text-foreground">
          {course.enrolled_students_count}/{course.max_students}
        </p>
      </div>
      <div className="text-center">
        <div className="w-14 h-14 bg-blue-light rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Star className="h-7 w-7 text-blue-primary" />
        </div>
        <p className="text-sm text-muted-foreground mb-1">Rating</p>
        <p className="font-bold text-foreground">
          {course.ratings?.average_rating || "New"} ({course.ratings?.reviews_count || 0})
        </p>
      </div>
      <div className="text-center">
        <div className="w-14 h-14 bg-blue-light rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Trophy className="h-7 w-7 text-blue-primary" />
        </div>
        <p className="text-sm text-muted-foreground mb-1">Status</p>
        <p className="font-bold text-foreground capitalize">{course.status}</p>
      </div>
    </div>
  );
}