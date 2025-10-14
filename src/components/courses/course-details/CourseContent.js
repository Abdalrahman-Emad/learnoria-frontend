import { Clock, Play, ChevronDown, ChevronUp } from "lucide-react";

export default function CourseContent({ course, expandedSections, toggleSection }) {
  if (!course.sections || course.sections.length === 0) return null;

  return (
    <div className="bg-card rounded-2xl shadow-sm p-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Course Content</h2>
      <div className="space-y-4">
        {course.sections.map((section, index) => (
          <div key={section.id} className="border border-border rounded-xl overflow-hidden">
            <button 
              className="w-full bg-muted p-5 text-left flex items-center justify-between hover:bg-accent transition-colors"
              onClick={() => toggleSection(section.id)}
            >
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Section {index + 1}: {section.title}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>
                    {Math.floor(section.total_duration / 60)}h {section.total_duration % 60}m
                  </span>
                  <span className="mx-2">•</span>
                  <span>{section.lectures_count} lectures</span>
                </div>
              </div>
              {expandedSections[section.id] ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
            
            {expandedSections[section.id] && (
              <div className="p-5 border-t border-border">
                {section.description && (
                  <p className="text-foreground mb-4">{section.description}</p>
                )}
                <div className="space-y-3">
                  {section.lectures.map((lecture) => (
                    <div
                      key={lecture.id}
                      className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors"
                    >
                      <div className="flex items-center">
                        <Play className="h-4 w-4 text-blue-primary mr-3" />
                        <div>
                          <p className="font-medium text-foreground">{lecture.title}</p>
                          {lecture.description && (
                            <p className="text-sm text-muted-foreground mt-1">{lecture.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{lecture.duration_formatted}</span>
                        {lecture.is_free_preview && (
                          <span className="ml-2 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                            Free Preview
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}