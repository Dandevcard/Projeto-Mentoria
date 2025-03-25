
import React from "react";
import { Badge, Card, CardContent } from "@/components/ui-components";

interface FilterAreaProps {
  areas: string[];
  selectedArea: string;
  onAreaChange: (area: string) => void;
}

export function FilterArea({ areas, selectedArea, onAreaChange }: FilterAreaProps) {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Area of Expertise</h3>
      <div className="flex flex-wrap gap-2">
        {areas.map((area) => (
          <Badge
            key={area}
            variant={selectedArea === area ? "primary" : "outline"}
            className="cursor-pointer transition-all"
            onClick={() => onAreaChange(area)}
          >
            {area}
          </Badge>
        ))}
      </div>
    </div>
  );
}

interface FilterExperienceProps {
  experiences: string[];
  selectedExperience: string;
  onExperienceChange: (experience: string) => void;
}

export function FilterExperience({ 
  experiences, 
  selectedExperience, 
  onExperienceChange 
}: FilterExperienceProps) {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Experience Level</h3>
      <div className="flex flex-wrap gap-2">
        {experiences.map((exp) => (
          <Badge
            key={exp}
            variant={selectedExperience === exp ? "primary" : "outline"}
            className="cursor-pointer transition-all"
            onClick={() => onExperienceChange(exp)}
          >
            {exp}
          </Badge>
        ))}
      </div>
    </div>
  );
}

interface FiltersCardProps {
  areas: string[];
  experiences: string[];
  selectedArea: string;
  selectedExperience: string;
  onAreaChange: (area: string) => void;
  onExperienceChange: (experience: string) => void;
}

export function FiltersCard({
  areas,
  experiences,
  selectedArea,
  selectedExperience,
  onAreaChange,
  onExperienceChange
}: FiltersCardProps) {
  return (
    <Card className="mb-6 animate-fade-down">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FilterArea 
            areas={areas} 
            selectedArea={selectedArea} 
            onAreaChange={onAreaChange} 
          />
          <FilterExperience 
            experiences={experiences} 
            selectedExperience={selectedExperience} 
            onExperienceChange={onExperienceChange} 
          />
        </div>
      </CardContent>
    </Card>
  );
}
