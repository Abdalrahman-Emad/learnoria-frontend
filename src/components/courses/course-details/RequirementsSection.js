import { BookOpen } from "lucide-react";

export default function RequirementsSection({ course }) {
  const requirements = course.requirements || [];

  if (requirements.length === 0) return null;

  return (
    <div className="bg-card rounded-2xl shadow-sm p-8 border border-border">
      <div className="flex items-center mb-6">
        <BookOpen className="h-7 w-7 text-blue-primary mr-3" />
        <h2 className="text-2xl font-bold text-foreground">Course Requirements</h2>
      </div>
      <div className="space-y-3">
        {requirements.map((requirement, index) => (
          <div
            key={index}
            className="flex items-start p-3 rounded-lg bg-blue-lighter border border-blue-light hover:bg-blue-light transition-colors duration-300 group"
          >
            <div className="w-2 h-2 bg-blue-primary rounded-full mr-3 flex-shrink-0 mt-2 group-hover:scale-125 transition-transform duration-300"></div>
            <span className="text-foreground">{requirement}</span>
          </div>
        ))}
      </div>
    </div>
  );
}