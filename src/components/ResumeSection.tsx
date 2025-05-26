import { GraduationCap, Briefcase, Calendar } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

// Debounce helper function
function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const ResumeSection = () => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Education data
  const education = [
    {
      id: "edu-1",
      degree: "Pre-service Teacher Education (PPG Prajabatan) Program",
      school: "Widya Mandala Surabaya Catholic University",
      period: "Januari 2024 - December 2024",
      description: "I have actively coordinated the implementation of a community service program at SMP Kristen YBPK 4 Surabaya, focusing on empowering the educational community. In addition, I successfully led a team in organizing the Gelar Karya event at Widya Mandala Catholic University Surabaya, overseeing all aspects from strategic planning to execution. Collaborating with mathematics teachers at SMPN 37 Surabaya, I conducted research on computational thinking and developed effective strategies to enhance students' skills in this area. Furthermore, I have authored and published three scientific papers in nationally accredited journals, contributing to the advancement of knowledge and educational practices."
    },
    {
      id: "edu-2",
      degree: "Bachelor of Mathematics Education",
      school: "Madura University",
      period: "SEPTEMBER 2019 – AUGUST 2023",
      description: "During my academic journey, I actively participated in a student organization, contributing to the planning and execution of strategic work programs. I developed an automation system for the Madura Mathematics Olympiad, streamlining processes from registration to assessment and significantly improving time efficiency. To ensure the system's effective utilization, I conducted training sessions for student organization members, which resulted in a 60% increase in their technical skills. Additionally, I contributed to the preparation of accreditation documents for the study program, which successfully achieved a 'Very Good' accreditation status. My commitment to academic excellence is also reflected in my authorship and publication of research findings in nationally accredited journals, thereby strengthening both my academic track record and contributions to the field. Furthermore, I participated in the national student olympiad organized by the Ministry of Education, Culture, Research, and Technology, where I enhanced my analytical thinking and problem-solving abilities."
    }
  ];

  // Experience data
  const experience = [
    {
      position: "IT Support Specialist",
      company: "SDIT AL HAROMAIN",
      period: "2022 - 2024",
      description: "I successfully managed an IT infrastructure migration project that improved system performance by 40%. Additionally, I installed and configured virtualization technology, which increased server utilization by 30%. By implementing new internal IT support processes, I reduced overall downtime by 30%. Furthermore, I handled regular hardware updates, leading to a 15% reduction in hardware failures."
    },
    {
      position: "Coordinator of the Secretariat Division",
      company: "Student Association of the Mathematics Education Study Program (HIMATIKA) Madura University ",
      period: "2020 - 2022",
      description: "By introducing an automated document management system, I improved the efficiency of mathematics olympiad administration processes by 60%. Additionally, I developed and implemented an efficient participant registration archiving system, which reduced document retrieval time by 75%. To further enhance organizational productivity, I conducted internal training sessions aimed at improving the administrative skills of team members, resulting in a 65% increase in overall productivity."
    },
    {
      position: "Administration Staff",
      company: "Office of the Village Head of Tlonto Raja",
      period: "2020 - 2021",
      description: "I supported daily administrative activities, including filing, data management, and report preparation, while efficiently handling both internal and external communications by answering phone calls and responding to emails. Additionally, I managed agendas and meeting schedules using Google Calendar, which contributed to a 45% increase in meeting attendance."
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

      if (animationElements.current.length === 0) {
        animationElements.current = Array.from(
          sectionRef.current.querySelectorAll('[data-animate]')
        ) as HTMLElement[];
        
        animationElements.current.forEach(el => {
          el.classList.add('opacity-0');
        });
      }

      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.1;
      const sectionRect = sectionRef.current.getBoundingClientRect();

      const isSectionVisible = 
        sectionRect.top < viewportHeight - triggerPoint && 
        sectionRect.bottom > triggerPoint;

      if (isSectionVisible && !hasAnimated.current) {
        animationElements.current.forEach((el, index) => {
          setTimeout(() => {
            el.classList.remove('opacity-0');
            el.classList.add('animate-fade-slide-up');
          }, index * animationDelay);
        });
        hasAnimated.current = true;
      } 
      else if (sectionRect.bottom < 0 || sectionRect.top > viewportHeight) {
        hasAnimated.current = false;
        animationElements.current.forEach(el => {
          el.classList.remove('animate-fade-slide-up');
          el.classList.add('opacity-0');
        });
      }
    };

    const debouncedScroll = debounce(handleScroll, 50);
    window.addEventListener('scroll', debouncedScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', debouncedScroll);
  }, []);

  const TruncatedText = ({ text, id, maxWords = 50 }: { 
    text: string; 
    id: string;
    maxWords?: number;
  }) => {
    const words = text.split(' ');
    const isExpanded = expandedItems[id] || false;
    const shouldTruncate = words.length > maxWords && !isExpanded;
    
    const displayText = shouldTruncate 
      ? words.slice(0, maxWords).join(' ') + '...'
      : text;

    return (
      <p className="text-gray-700">
        {displayText}
        {words.length > maxWords && (
          <button 
            onClick={() => toggleExpand(id)}
            className="text-blue-600 hover:underline ml-1 focus:outline-none"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </p>
    );
  };

  const TimelineItem = ({ item, icon: Icon, isLast }: {
    item: any;
    icon: React.ComponentType<{ className?: string }>;
    isLast: boolean;
  }) => (
    <div className="relative">
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
        {item.id ? (
          <TruncatedText text={item.description} id={item.id} />
        ) : (
          <p className="text-gray-700">{item.description}</p>
        )}
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
            My {" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent"
            > Resume
            </span>
          </h2>
          <div 
            data-animate
            className="w-24 h-1 bg-blue-600 mx-auto"
          ></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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