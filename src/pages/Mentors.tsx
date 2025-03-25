
import { useState } from "react";
import { Container, Section, Button, Badge, Card, CardContent } from "@/components/ui-components";
import { MentorCard, MentorProps } from "@/components/MentorCard";
import { MainLayout } from "@/layouts/MainLayout";
import { Search, Filter, X } from "lucide-react";

// Placeholder data for mentors
const ALL_MENTORS: MentorProps[] = [
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
  {
    id: 4,
    name: "Michael Rodriguez",
    area: "Data Science",
    experience: "5+ years",
    hourlyRate: 65,
    linkedinUrl: "https://linkedin.com",
    miniBio: "Data scientist specializing in machine learning and AI. Helping companies leverage data for business insights.",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Emily Wilson",
    area: "Marketing",
    experience: "6+ years",
    hourlyRate: 60,
    linkedinUrl: "https://linkedin.com",
    miniBio: "Digital marketing strategist with expertise in growth hacking and customer acquisition.",
    avatarUrl: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "James Lee",
    area: "Leadership",
    experience: "12+ years",
    hourlyRate: 90,
    linkedinUrl: "https://linkedin.com",
    miniBio: "Executive coach and former CEO helping leaders develop their potential and build high-performing teams.",
    avatarUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=100&auto=format&fit=crop",
  },
];

const areas = [
  "All Areas",
  "Software Development",
  "Product Management",
  "UX Design",
  "Data Science",
  "Marketing",
  "Leadership",
];

const experiences = ["All Experience", "1-3 years", "4-7 years", "8+ years"];

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

  const filteredMentors = ALL_MENTORS.filter((mentor) => {
    const matchesSearch = mentor.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) || mentor.miniBio
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    const matchesArea = selectedArea === "All Areas" || mentor.area === selectedArea;
    
    const matchesExperience = 
      selectedExperience === "All Experience" ||
      (selectedExperience === "1-3 years" && mentor.experience.includes("1") || mentor.experience.includes("2") || mentor.experience.includes("3")) ||
      (selectedExperience === "4-7 years" && mentor.experience.includes("4") || mentor.experience.includes("5") || mentor.experience.includes("6") || mentor.experience.includes("7")) ||
      (selectedExperience === "8+ years" && mentor.experience.includes("8") || mentor.experience.includes("9") || mentor.experience.includes("10") || mentor.experience.includes("+"));

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

          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={18} className="text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search mentors by name or keywords..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex items-center"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} className="mr-2" />
                Filters
              </Button>
              {(selectedArea !== "All Areas" || selectedExperience !== "All Experience" || searchTerm) && (
                <Button variant="ghost" onClick={resetFilters} className="flex items-center">
                  <X size={18} className="mr-2" />
                  Reset
                </Button>
              )}
            </div>
          </div>

          {showFilters && (
            <Card className="mb-6 animate-fade-down">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Area of Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {areas.map((area) => (
                        <Badge
                          key={area}
                          variant={selectedArea === area ? "primary" : "outline"}
                          className="cursor-pointer transition-all"
                          onClick={() => handleAreaChange(area)}
                        >
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-3">Experience Level</h3>
                    <div className="flex flex-wrap gap-2">
                      {experiences.map((exp) => (
                        <Badge
                          key={exp}
                          variant={selectedExperience === exp ? "primary" : "outline"}
                          className="cursor-pointer transition-all"
                          onClick={() => handleExperienceChange(exp)}
                        >
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {filteredMentors.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No mentors found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters
              </p>
              <Button variant="outline" onClick={resetFilters} className="mt-4">
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor, index) => (
                <div 
                  key={mentor.id} 
                  className="animate-fade-up" 
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <MentorCard mentor={mentor} />
                </div>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </MainLayout>
  );
};

export default Mentors;
