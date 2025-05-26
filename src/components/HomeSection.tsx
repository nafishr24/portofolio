import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Typewriter } from 'react-simple-typewriter';
import { Button } from "@/components/ui/button";

// Debounce helper function
function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const HomeSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationElements = useRef<HTMLElement[]>([]);
  const hasAnimated = useRef(false);
  const animationDelay = 200;

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      // Initialize elements on first run
      if (animationElements.current.length === 0) {
        animationElements.current = Array.from(
          sectionRef.current.querySelectorAll('[data-animate]')
        ) as HTMLElement[];
        
        // Set initial state
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

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="min-h-screen flex items-center pt-16 scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <h1 
                data-animate
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900"
              >
                Hello, I'm{" "}
                <span className="font-bold text-[#0e1079]">
                    Moh. Nafis Husen R.
                </span>
              </h1>
              
              <h2 
                data-animate
                className="text-xl md:text-3xl text-gray-600"
              >
                I'm a{" "}
                <span className="font-bold text-[#0a6181]">
                  <Typewriter
                    words={[
                      'Math Tutor',
                      'Web Developer',
                      'Data Scientist'
                    ]}
                    loop={Infinity}
                    cursor
                    cursorStyle="|"
                    typeSpeed={120}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </span>
              </h2>
              
              <p 
                data-animate
                className="text-lg text-gray-700 leading-relaxed"
              >
                Welcome to my portfolio! Empowering learning through mathematics, building solutions through code, and uncovering insights through data.
              </p>

              {/* Expandable Content */}
              <div 
                data-animate
                className={`overflow-hidden transition-all duration-500 ${
                  isExpanded ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="space-y-4 pt-4">
                  <p className="text-gray-700">
                    With years of experience in teaching mathematics, I've helped students not only improve their academic performance but also build confidence in logical thinking and problem-solving. As a web developer, I design and build clean, responsive, and user-friendly web applications tailored to real-world needs — from small business websites to dynamic, data-driven platforms. As a data scientist, I transform raw data into meaningful insights through statistical analysis, machine learning, and data visualization — enabling smarter decisions and impactful results. My work is driven by curiosity, creativity, and a strong desire to bridge the gap between technology and human understanding.
                  </p>
                </div>
              </div>

              <Button
                data-animate
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold" 
              >
                {isExpanded ? (
                  <>
                    Show Less
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Click to More
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Right Content - Profile Picture */}
          <div 
            data-animate
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl ring-1 ring-white/30">
                <img
                  src={`${import.meta.env.BASE_URL}images/p2.png`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add these styles to your global CSS or Tailwind config */}
      <style jsx global>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-slide-up {
          animation: fadeSlideUp 0.6s ease-out forwards;
        }
        .opacity-0 {
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default HomeSection;