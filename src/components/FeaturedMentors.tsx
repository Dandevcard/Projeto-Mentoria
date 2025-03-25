
import { useState, useEffect } from "react";
import { Container, Section } from "./ui-components";
import { MentorCard, MentorProps } from "./MentorCard";

// Placeholder data for featured mentors
const FEATURED_MENTORS: MentorProps[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    area: "Software Development",
    experience: "10+ years",
    hourlyRate: 85,
    linkedinUrl: "https://linkedin.com",
    miniBio: "Senior software architect specializing in scalable applications. Former tech lead at Google and Amazon.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "David Chen",
    area: "Product Management",
    experience: "8+ years",
    hourlyRate: 75,
    linkedinUrl: "https://linkedin.com",
    miniBio: "Product leader with experience at startups and Fortune 500 companies. Passionate about user-centered design.",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Priya Patel",
    area: "UX Design",
    experience: "7+ years",
    hourlyRate: 70,
    linkedinUrl: "https://linkedin.com",
    miniBio: "UX/UI designer with a focus on creating intuitive and accessible experiences. Previously at Adobe and Microsoft.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop",
  },
];

export function FeaturedMentors() {
  return (
    <Section>
      <Container>
        <div className="mb-10 text-center">
          <h2 className="mb-2">Featured Mentors</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with our top-rated mentors who are ready to help you achieve your goals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_MENTORS.map((mentor) => (
            <div key={mentor.id} className="animate-fade-up" style={{ animationDelay: `${mentor.id * 100}ms` }}>
              <MentorCard mentor={mentor} featured={true} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
