import { Target, CheckCircle } from "lucide-react";

export default function LearningSection({ course }) {
  const learningOutcomes = course.learning_outcomes || [];

  if (learningOutcomes.length === 0) return null;

  return (
    <div className="bg-card rounded-2xl shadow-sm p-8 border border-border">
      <div className="flex items-center mb-6">
        <Target className="h-7 w-7 text-blue-primary mr-3" />
        <h2 className="text-2xl font-bold text-foreground">What You&apos;ll Learn</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {learningOutcomes.map((outcome, index) => (
          <div
            key={index}
            className="flex items-start p-4 rounded-lg bg-blue-lighter border border-blue-light hover:bg-blue-light transition-colors duration-300 group"
          >
            <CheckCircle className="w-5 h-5 text-blue-primary mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-foreground">{outcome}</span>
          </div>
        ))}
      </div>
    </div>
  );
}