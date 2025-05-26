import { GraduationCap, Briefcase, Calendar } from "lucide-react";
import React, { useEffect, useRef } from "react";

// Debounce helper function
function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const ResumeSection = () => {
  // Education data
  const education = [
    {
      degree: "Master of Computer Science",
      school: "Stanford University",
      period: "2018 - 2020",
      description: "Specialized in Machine Learning and Software Engineering. Graduated Magna Cum Laude."
    },
    {
      degree: "Bachelor of Computer Science",
      school: "University of California, Berkeley",
      period: "2014 - 2018",
      description: "Focus on Web Development and Database Systems. Dean's List for 4 consecutive semesters."
    }
  ];

  // Experience data
  const experience = [
    {
      position: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      period: "2021 - Present",
      description: "Lead development of enterprise web applications using React, Node.js, and AWS. Mentor junior developers and architect scalable solutions."
    },
    {
      position: "Full Stack Developer",
      company: "StartupXYZ",
      period: "2020 - 2021",
      description: "Developed and maintained multiple client projects using modern web technologies. Improved application performance by 40%."
    },
    {
      position: "Frontend Developer",
      company: "Digital Agency Inc",
      period: "2018 - 2020",
      description: "Created responsive web applications and collaborated with design teams to implement pixel-perfect UI/UX designs."
    },
    {
      position: "Junior Developer Intern",
      company: "Local Web Studio",
      period: "2017 - 2018",
      description: "Assisted in development of small business websites and learned industry best practices."
    }
  ];

  // Refs for animation control
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationDelay = 200;
  const animationElements = useRef<HTMLElement[]>([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      // Initialize elements on first run
      if (animationElements.current.length === 0) {
        animationElements.current = Array.from(
          sectionRef.current.querySelectorAll('[data-animate]')
        ) as HTMLElement[];
        
        // Set initial hidden state
        animationElements.current.forEach(el => {
          el.classList.add('opacity-0');
        });
      }

      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.1; // 10% buffer
      const sectionRect = sectionRef.current.getBoundingClientRect();

      // Check if section is entering viewport
      const isSectionVisible = 
        sectionRect.top < viewportHeight - triggerPoint && 
        sectionRect.bottom > triggerPoint;

      // Only trigger if section is visible and hasn't animated yet
      if (isSectionVisible && !hasAnimated.current) {
        animationElements.current.forEach((el, index) => {
          setTimeout(() => {
            el.classList.remove('opacity-0');
            el.classList.add('animate-fade-slide-up');
          }, index * animationDelay);
        });
        hasAnimated.current = true;
      } 
      // Reset when section completely leaves viewport
      else if (sectionRect.bottom < 0 || sectionRect.top > viewportHeight) {
        hasAnimated.current = false;
        animationElements.current.forEach(el => {
          el.classList.remove('animate-fade-slide-up');
          el.classList.add('opacity-0');
        });
      }
    };

    // Add scroll listener with debounce
    const debouncedScroll = debounce(handleScroll, 50);
    window.addEventListener('scroll', debouncedScroll);
    
    // Trigger initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', debouncedScroll);
  }, []);

  // TimelineItem component
  const TimelineItem = ({ item, icon: Icon, isLast }: {
    item: any;
    icon: React.ComponentType<{ className?: string }>;
    isLast: boolean;
  }) => (
    <div className="relative">
      {/* Garis vertikal - dipindahkan ke atas dan ditambahkan z-index */}
      {!isLast && (
        <div 
          className="absolute left-5 top-10 w-0.5 h-full bg-black -z-10" 
          data-animate
          style={{ zIndex: -1 }}
        ></div>
      )}

      <div className="flex items-center mb-4" data-animate>
        <div className="flex-shrink-0 w-10 h-10 !bg-blue-600 rounded-full flex items-center justify-center z-10">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {item.degree || item.position}
          </h3>
          <p className="text-blue-600 font-medium">
            {item.school || item.company}
          </p>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            {item.period}
          </div>
        </div>
      </div>
      <div className="ml-14 pb-8" data-animate>
        <p className="text-gray-700">{item.description}</p>
      </div>
    </div>
  );

  return (
    <section 
      id="resume" 
      ref={sectionRef}
      className="py-20 bg-[#e7f4fe] backdrop-blur-sm scroll-mt-16"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            data-animate
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            My Resume
          </h2>
          <div 
            data-animate
            className="w-24 h-1 bg-blue-600 mx-auto"
          ></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education Column */}
          <div>
            <h3 
              data-animate
              className="text-2xl font-bold text-gray-900 mb-8 flex items-center"
            >
              <GraduationCap className="mr-3 h-6 w-6 text-blue-600" />
              Education
            </h3>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <TimelineItem
                  key={`edu-${index}`}
                  item={edu}
                  icon={GraduationCap}
                  isLast={index === education.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Experience Column */}
          <div>
            <h3 
              data-animate
              className="text-2xl font-bold text-gray-900 mb-8 flex items-center"
            >
              <Briefcase className="mr-3 h-6 w-6 text-blue-600" />
              Experience
            </h3>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <TimelineItem
                  key={`exp-${index}`}
                  item={exp}
                  icon={Briefcase}
                  isLast={index === experience.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;