
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Section, Button, Card, CardContent, Badge, Divider } from "@/components/ui-components";
import { MainLayout } from "@/layouts/MainLayout";
import { MentorProps } from "@/components/MentorCard";
import { Linkedin, Calendar, Clock, CheckCircle } from "lucide-react";

// Placeholder data for mentors (same as in the Mentors page)
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

// Extended mentor data for profile page
interface ExtendedMentorData extends MentorProps {
  fullBio: string;
  skills: string[];
  availability: {
    day: string;
    slots: string[];
  }[];
}

// Placeholder function to simulate API call for mentor details
const getMentorDetails = (id: number): ExtendedMentorData | undefined => {
  const baseMentor = ALL_MENTORS.find(mentor => mentor.id === id);
  
  if (!baseMentor) return undefined;
  
  // Add extra details for the profile page
  return {
    ...baseMentor,
    fullBio: `${baseMentor.miniBio} With over ${baseMentor.experience.replace('+', '')} of experience, I've helped numerous professionals advance their careers and develop their skills. My approach to mentorship focuses on practical advice, actionable feedback, and personalized guidance tailored to your specific goals and challenges.`,
    skills: generateSkills(baseMentor.area),
    availability: [
      {
        day: "Monday",
        slots: ["9:00 AM - 10:00 AM", "2:00 PM - 3:00 PM", "4:00 PM - 5:00 PM"]
      },
      {
        day: "Wednesday",
        slots: ["10:00 AM - 11:00 AM", "1:00 PM - 2:00 PM", "5:00 PM - 6:00 PM"]
      },
      {
        day: "Friday",
        slots: ["9:00 AM - 10:00 AM", "3:00 PM - 4:00 PM"]
      }
    ]
  };
};

// Helper function to generate skills based on area
const generateSkills = (area: string): string[] => {
  const skillSets: Record<string, string[]> = {
    "Software Development": ["JavaScript", "React", "Node.js", "System Design", "Architecture", "Cloud Infrastructure"],
    "Product Management": ["Roadmapping", "User Research", "Agile", "Product Strategy", "Prioritization", "Go-to-Market"],
    "UX Design": ["User Research", "Wireframing", "Prototyping", "Usability Testing", "Information Architecture", "Figma"],
    "Data Science": ["Python", "Machine Learning", "Data Visualization", "Statistical Analysis", "Natural Language Processing", "SQL"],
    "Marketing": ["Growth Marketing", "Content Strategy", "SEO", "Social Media", "Analytics", "Email Campaigns"],
    "Leadership": ["Team Management", "Strategic Planning", "Executive Presence", "Conflict Resolution", "Change Management", "Coaching"],
  };
  
  return skillSets[area] || ["Communication", "Problem Solving", "Critical Thinking"];
};

const MentorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [mentor, setMentor] = useState<ExtendedMentorData | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      // Simulate API call
      const mentorData = getMentorDetails(parseInt(id, 10));
      setMentor(mentorData);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <Section>
          <Container>
            <div className="flex justify-center items-center py-20">
              <div className="animate-pulse">Loading mentor profile...</div>
            </div>
          </Container>
        </Section>
      </MainLayout>
    );
  }

  if (!mentor) {
    return (
      <MainLayout>
        <Section>
          <Container>
            <div className="text-center py-20">
              <h2 className="mb-4">Mentor Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The mentor you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/mentors">
                <Button>Browse All Mentors</Button>
              </Link>
            </div>
          </Container>
        </Section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Section>
        <Container>
          <div className="mb-6">
            <Link to="/mentors" className="text-sm text-primary hover:underline">
              ← Back to Mentors
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-up">
            {/* Mentor Info */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border">
                        <img
                          src={mentor.avatarUrl || "https://via.placeholder.com/200"}
                          alt={mentor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h1 className="text-2xl md:text-3xl font-bold mb-2">{mentor.name}</h1>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge variant="primary">{mentor.area}</Badge>
                            <Badge variant="secondary">{mentor.experience}</Badge>
                          </div>
                        </div>
                        <a
                          href={mentor.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 md:mt-0 inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                        >
                          <Linkedin size={18} className="mr-1" />
                          <span>View LinkedIn</span>
                        </a>
                      </div>
                      
                      <p className="text-lg font-semibold mt-2">
                        ${mentor.hourlyRate}/hour
                      </p>
                      
                      <Divider />
                      
                      <div>
                        <h2 className="text-lg font-semibold mb-3">About Me</h2>
                        <p className="text-muted-foreground">
                          {mentor.fullBio}
                        </p>
                      </div>
                      
                      <Divider />
                      
                      <div>
                        <h2 className="text-lg font-semibold mb-3">Skills & Expertise</h2>
                        <div className="flex flex-wrap gap-2">
                          {mentor.skills.map((skill, index) => (
                            <Badge key={index} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Card */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Book a Session</h2>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-3 flex items-center">
                      <Calendar size={16} className="mr-2" />
                      Select Date
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {mentor.availability.map((avail, index) => (
                        <button
                          key={index}
                          className={`p-2 text-sm border rounded-md text-center transition-all ${
                            selectedDate === avail.day
                              ? "border-primary bg-primary/10 text-primary"
                              : "hover:border-primary/50"
                          }`}
                          onClick={() => setSelectedDate(avail.day)}
                        >
                          {avail.day}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {selectedDate && (
                    <div className="mb-6 animate-fade-in">
                      <h3 className="text-sm font-medium mb-3 flex items-center">
                        <Clock size={16} className="mr-2" />
                        Select Time
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {mentor.availability
                          .find(a => a.day === selectedDate)
                          ?.slots.map((slot, index) => (
                            <button
                              key={index}
                              className={`p-2 text-sm border rounded-md text-center transition-all ${
                                selectedTime === slot
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "hover:border-primary/50"
                              }`}
                              onClick={() => setSelectedTime(slot)}
                            >
                              {slot}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                  
                  <Button
                    className="w-full"
                    disabled={!selectedDate || !selectedTime}
                  >
                    <CheckCircle size={18} className="mr-2" />
                    Request Session
                  </Button>
                  
                  {(!selectedDate || !selectedTime) && (
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Please select a date and time to continue
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </MainLayout>
  );
};

export default MentorProfile;
