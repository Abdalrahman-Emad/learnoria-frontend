import { MapPin, Phone, Mail, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Utility to generate avatar bg colors from your theme
const avatarColors = [
  "bg-blue-light text-blue-primary",
  "bg-blue-lighter text-blue-primary",
  "bg-blue-accent text-white",
  "bg-blue-secondary text-white",
];

const getAvatarStyle = (name = "U") => {
  const index = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
};

export default function InstructorsSection({ course }) {
  // Use instructors array if available, otherwise use primary_instructor or provider
  const instructors =
    course.instructors?.length > 0
      ? course.instructors
      : course.primary_instructor
      ? [course.primary_instructor]
      : course.provider
      ? [course.provider]
      : [];

  if (instructors.length === 0) return null;

  return (
    <div className="bg-card rounded-2xl p-8 border border-border">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Meet Your Instructors
      </h2>
      <div className="space-y-6">
        {instructors.map((instructor, index) => (
          <InstructorCard
            key={instructor.id || index}
            instructor={instructor}
          />
        ))}
      </div>
    </div>
  );
}

function InstructorCard({ instructor }) {
  const avatarStyle = getAvatarStyle(instructor.name);

  return (
    <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 p-6 bg-muted rounded-xl border border-border">
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
        {instructor.image || instructor.avatar ? (
          <Image
            src={instructor.image || instructor.avatar}
            alt={instructor.name}
            className="w-full h-full object-cover rounded-2xl"
          />
        ) : (
          <div
            className={`w-full h-full rounded-2xl flex items-center justify-center ${avatarStyle}`}
          >
            <span className="text-xl font-bold">
              {instructor.name?.charAt(0) || "I"}
            </span>
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-1">
              {instructor.name}
            </h3>
            {instructor.title && (
              <p className="text-blue-primary font-medium mb-2">
                {instructor.title}
              </p>
            )}
            {instructor.company && (
              <p className="text-muted-foreground text-sm mb-2">
                {instructor.company}
              </p>
            )}
          </div>
          {instructor.linkedin_url && (
            <Link
              href={instructor.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-100 p-1.5 bg-primary hover:text-blue-primary-hover transition-colors duration-200 ml-2 hover:scale-110 transform"
              aria-label={`Visit ${instructor.name}'s LinkedIn profile`}
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          )}{" "}
        </div>
        <p className="text-foreground/80 mb-4 leading-relaxed">
          {instructor.bio}
        </p>
        {instructor.experience && (
          <p className="text-muted-foreground mb-4 text-sm">
            {instructor.experience}
          </p>
        )}
        <div className="flex flex-wrap gap-3 text-sm">
          {instructor.city && (
            <div className="flex items-center text-muted-foreground bg-background px-3 py-1.5 rounded-lg border border-border">
              <MapPin className="h-4 w-4 mr-1.5 text-blue-primary" />
              <span className="font-medium">{instructor.city}</span>
            </div>
          )}
          {instructor.email && (
            <div className="flex items-center text-muted-foreground bg-background px-3 py-1.5 rounded-lg border border-border">
              <Mail className="h-4 w-4 mr-1.5 text-blue-primary" />
              <span className="font-medium">{instructor.email}</span>
            </div>
          )}
          {instructor.phone && (
            <div className="flex items-center text-muted-foreground bg-background px-3 py-1.5 rounded-lg border border-border">
              <Phone className="h-4 w-4 mr-1.5 text-blue-primary" />
              <span className="font-medium">{instructor.phone}</span>
            </div>
          )}
        </div>
        {instructor.expertise && instructor.expertise.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Expertise:</p>
            <div className="flex flex-wrap gap-2">
              {instructor.expertise.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="bg-blue-light text-blue-primary px-2.5 py-1 rounded-full text-xs font-medium border border-blue-light"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
