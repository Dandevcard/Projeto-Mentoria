
import { Link } from "react-router-dom";
import { Container, Section, Button } from "@/components/ui-components";
import { FeaturedMentors } from "@/components/FeaturedMentors";
import { MainLayout } from "@/layouts/MainLayout";

const Hero = () => (
  <Section hero className="bg-gradient-to-b from-background to-accent/5">
    <Container>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="max-w-2xl animate-fade-up">
          <h1 className="mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Find the perfect mentor to guide your journey
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connect with experienced professionals who can help you grow your skills,
            advance your career, and achieve your goals.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/mentors">
              <Button size="lg">Browse Mentors</Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg">Become a Mentor</Button>
            </Link>
          </div>
        </div>
        <div className="w-full max-w-md lg:w-1/2 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20"></div>
            <div className="relative bg-card rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop"
                alt="Mentorship session"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  </Section>
);

const HowItWorks = () => (
  <Section className="bg-muted/30">
    <Container>
      <div className="text-center mb-12">
        <h2 className="mb-2">How It Works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our platform makes it easy to connect with mentors in just a few simple steps
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            step: "1",
            title: "Find a Mentor",
            description: "Browse our curated list of experienced mentors across various fields."
          },
          {
            step: "2",
            title: "Schedule a Session",
            description: "Choose a time that works for you and send a request to the mentor."
          },
          {
            step: "3",
            title: "Grow Together",
            description: "Connect, learn, and advance your skills through personalized guidance."
          }
        ].map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center text-center p-6 rounded-xl bg-card shadow-sm border animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold mb-4">
              {item.step}
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </Container>
  </Section>
);

const AreasOfExpertise = () => (
  <Section>
    <Container>
      <div className="text-center mb-12">
        <h2 className="mb-2">Areas of Expertise</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our mentors specialize in a wide range of fields to help you succeed
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[
          "Software Development",
          "Product Management",
          "UX/UI Design",
          "Data Science",
          "Marketing",
          "Business Strategy",
          "Leadership",
          "Career Coaching"
        ].map((area, index) => (
          <div 
            key={index} 
            className="p-4 border rounded-lg text-center hover:border-primary hover:bg-primary/5 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <p className="font-medium">{area}</p>
          </div>
        ))}
      </div>
    </Container>
  </Section>
);

const CtaSection = () => (
  <Section className="bg-gradient-to-r from-primary/10 to-secondary/10">
    <Container>
      <div className="text-center max-w-3xl mx-auto animate-fade-up">
        <h2 className="mb-4">Ready to accelerate your growth?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join thousands of professionals who are advancing their careers with personalized mentorship
        </p>
        <Link to="/signup">
          <Button size="lg">Get Started Today</Button>
        </Link>
      </div>
    </Container>
  </Section>
);

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <HowItWorks />
      <FeaturedMentors />
      <AreasOfExpertise />
      <CtaSection />
    </MainLayout>
  );
};

export default Index;
