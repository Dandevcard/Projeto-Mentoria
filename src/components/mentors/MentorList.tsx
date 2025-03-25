
import React from "react";
import { Button } from "@/components/ui-components";
import { MentorCard, MentorProps } from "@/components/MentorCard";

interface MentorListProps {
  mentors: MentorProps[];
  onResetFilters: () => void;
}

export function MentorList({ mentors, onResetFilters }: MentorListProps) {
  if (mentors.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No mentors found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search criteria or filters
        </p>
        <Button variant="outline" onClick={onResetFilters} className="mt-4">
          Reset Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mentors.map((mentor, index) => (
        <div 
          key={mentor.id} 
          className="animate-fade-up" 
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <MentorCard mentor={mentor} />
        </div>
      ))}
    </div>
  );
}
