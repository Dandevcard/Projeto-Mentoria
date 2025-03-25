
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "./ui-components";
import { Linkedin } from "lucide-react";

export interface MentorProps {
  id: number;
  name: string;
  area: string;
  experience: string;
  hourlyRate: number;
  linkedinUrl: string;
  miniBio: string;
  avatarUrl: string;
}

interface MentorCardProps {
  mentor: MentorProps;
  featured?: boolean;
}

export function MentorCard({ mentor, featured = false }: MentorCardProps) {
  return (
    <Card 
      className={cn(
        "overflow-hidden",
        featured && "border-primary/20"
      )}
      glassmorphism={featured}
    >
      <CardHeader className="pb-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="h-14 w-14 rounded-full overflow-hidden border">
                <img 
                  src={mentor.avatarUrl || "https://via.placeholder.com/100"} 
                  alt={mentor.name}
                  className="h-full w-full object-cover"
                />
              </div>
              {featured && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium px-1.5 py-0.5 rounded-full">
                  Featured
                </span>
              )}
            </div>
            <div>
              <CardTitle>{mentor.name}</CardTitle>
              <div className="flex items-center mt-1">
                <Badge variant="primary" className="mr-2">
                  {mentor.area}
                </Badge>
                <Badge variant="secondary">
                  {mentor.experience}
                </Badge>
              </div>
            </div>
          </div>
          <a 
            href={mentor.linkedinUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
            aria-label="LinkedIn profile"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </CardHeader>
      <CardContent className="mt-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {mentor.miniBio}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm font-semibold">
            ${mentor.hourlyRate}/hour
          </span>
          <Link to={`/mentors/${mentor.id}`}>
            <Button size="sm">View Profile</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

// Import required utilities
import { cn } from "@/lib/utils";
