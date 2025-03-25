
import { useState } from "react";
import { Container, Section } from "@/components/ui-components";
import { MainLayout } from "@/layouts/MainLayout";
import { MentorSearchBar } from "@/components/mentors/MentorSearch";
import { FiltersCard } from "@/components/mentors/MentorFilters";
import { MentorList } from "@/components/mentors/MentorList";
import { ALL_MENTORS, areas, experiences } from "@/components/mentors/MentorData";

const Mentors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [selectedExperience, setSelectedExperience] = useState("All Experience");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAreaChange = (area: string) => {
    setSelectedArea(area);
  };

  const handleExperienceChange = (experience: string) => {
    setSelectedExperience(experience);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedArea("All Areas");
    setSelectedExperience("All Experience");
  };

  const hasActiveFilters = 
    selectedArea !== "All Areas" || 
    selectedExperience !== "All Experience" || 
    searchTerm !== "";

  const filteredMentors = ALL_MENTORS.filter((mentor) => {
    const matchesSearch = mentor.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) || mentor.miniBio
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    const matchesArea = selectedArea === "All Areas" || mentor.area === selectedArea;
    
    const matchesExperience = 
      selectedExperience === "All Experience" ||
      (selectedExperience === "1-3 years" && (mentor.experience.includes("1") || mentor.experience.includes("2") || mentor.experience.includes("3"))) ||
      (selectedExperience === "4-7 years" && (mentor.experience.includes("4") || mentor.experience.includes("5") || mentor.experience.includes("6") || mentor.experience.includes("7"))) ||
      (selectedExperience === "8+ years" && (mentor.experience.includes("8") || mentor.experience.includes("9") || mentor.experience.includes("10") || mentor.experience.includes("+")));

    return matchesSearch && matchesArea && matchesExperience;
  });

  return (
    <MainLayout>
      <Section className="pt-10">
        <Container>
          <div className="mb-10">
            <h1 className="mb-4">Find Your Mentor</h1>
            <p className="text-muted-foreground max-w-2xl">
              Browse our curated list of experienced mentors across various fields.
              Filter by expertise, experience level, or search by name.
            </p>
          </div>

          <MentorSearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearch}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            hasActiveFilters={hasActiveFilters}
            onResetFilters={resetFilters}
          />

          {showFilters && (
            <FiltersCard
              areas={areas}
              experiences={experiences}
              selectedArea={selectedArea}
              selectedExperience={selectedExperience}
              onAreaChange={handleAreaChange}
              onExperienceChange={handleExperienceChange}
            />
          )}

          <MentorList 
            mentors={filteredMentors} 
            onResetFilters={resetFilters} 
          />
        </Container>
      </Section>
    </MainLayout>
  );
};

export default Mentors;
