import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ProjectCategory = "All" | "Data Science" | "Web Development";

interface Project {
  id: number;
  title: string;
  image: string;
  description: string | JSX.Element;
  technologies: string[];
  category: "Data Science" | "Web Development";
}

// Debounce helper function
function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  // Refs for animation control
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationDelay = 200;
  const animationElements = useRef<HTMLElement[]>([]);
  const hasAnimated = useRef(false);

  // Scroll animation handler
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      // Initialize elements on first run
      if (animationElements.current.length === 0) {
        animationElements.current = Array.from(sectionRef.current.querySelectorAll("[data-animate]")) as HTMLElement[];

        // Set initial hidden state
        animationElements.current.forEach((el) => {
          el.classList.add("opacity-0");
        });
      }

      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.1; // 10% buffer
      const sectionRect = sectionRef.current.getBoundingClientRect();

      // Check if section is visible in viewport
      const isSectionVisible = sectionRect.top < viewportHeight - triggerPoint && sectionRect.bottom > triggerPoint;

      // Only trigger if section is visible and hasn't animated yet
      if (isSectionVisible && !hasAnimated.current) {
        animationElements.current.forEach((el, index) => {
          setTimeout(() => {
            el.classList.remove("opacity-0");
            el.classList.add("animate-fade-slide-up");
          }, index * animationDelay);
        });
        hasAnimated.current = true;
      }
      // Reset when section completely leaves viewport
      else if (sectionRect.bottom < 0 || sectionRect.top > viewportHeight) {
        hasAnimated.current = false;
        animationElements.current.forEach((el) => {
          el.classList.remove("animate-fade-slide-up");
          el.classList.add("opacity-0");
        });
      }
    };

    // Add scroll listener with debounce
    const debouncedScroll = debounce(handleScroll, 50);
    window.addEventListener("scroll", debouncedScroll);

    // Trigger initial check
    handleScroll();

    return () => window.removeEventListener("scroll", debouncedScroll);
  }, []);

  const allProjects: Project[] = [
    {
      id: 1,
      title: "Birthday Card",
      image: "images/hbd.png",
      description: "A simple digital birthday card created using HTML, CSS, and JavaScript. Features include animated greetings, colorful design, and a festive user experience..",
      technologies: ["HTML5", "CSS", "JavaScript", "LaTex"],
      category: "Web Development",
    },
    {
      id: 2,
      title: "Flight Analytics",
      image: "images/ds1.png",
      description: "This project predicts ticket types for airlines, including economy, premium economy, business, and first class, using machine learning to improve ticket classification and enhance the booking experience.",
      technologies: ["Python", "Scikit Learn", "Seaborn"],
      category: "Data Science",
    },
    {
      id: 3,
      title: "Obesity Prediction",
      image: "images/ds2.png",
      description:
        "This project aims to analyze and classify a person's obesity level based on various health and lifestyle factors. Using a dataset with features such as weight, height, eating habits, exercise routines, and more, this project applies exploratory data analysis (EDA) and several machine learning algorithms to gain deeper insights into obesity.",
      technologies: ["Python", "Scikit Learn", "Seaborn"],
      category: "Data Science",
    },
    {
      id: 4,
      title: "School Website",
      image: "images/sch.png",
      description: (
        <>
          This project is a school website developed for{" "}
          <a href="https://smkn1pasean.sch.id/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors duration-300">
            SMKN 1 Pasean
          </a>{" "}
          to facilitate management and communication between the school, students, and parents. The website includes a homepage, school profile, news and announcements, photo gallery, and dedicated pages for teachers and students. A key
          feature is the New Student Admission System (SPMB), which simplifies the online enrollment process for prospective students. The website was built using HTML, CSS, JavaScript, PHP/Laravel, and a MySQL database to support the
          school’s digitalization efforts and improve communication efficiency.
        </>
      ),
      technologies: ["HTML", "JavaScript", "CSS", "MySQL"],
      category: "Web Development",
    },
  ];

  const categories: ProjectCategory[] = ["All", "Data Science", "Web Development"];

  const filteredProjects = activeCategory === "All" ? allProjects : allProjects.filter((project) => project.category === activeCategory);

  const handleCategoryChange = (category: ProjectCategory) => {
    setActiveCategory(category);
    setCurrentProject(0);
  };

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const current = filteredProjects[currentProject];

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-gray-50 backdrop-blur-sm scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 data-animate className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            My <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent"> Projects</span>
          </h2>
          <div data-animate className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>

          {/* Category Filter */}
          <div data-animate className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => handleCategoryChange(category)}
                variant="ghost"
                className={activeCategory === category ? "bg-[#072664] hover:bg-blue-700 !text-white font-bold" : "bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 font-bold"}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Content */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Project Image Carousel */}
            <div data-animate className="relative group">
              <div className="relative overflow-hidden rounded-xl shadow-xl bg-white">
                <img src={`${import.meta.env.BASE_URL}${current.image}`} alt={current.title} className="w-full h-64 md:h-80 object-cover transition-all duration-500 ease-in-out group-hover:scale-105" />

                {/* Navigation Arrows */}
                {filteredProjects.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between p-4 z-10">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevProject();
                      }}
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white transition-all hover:scale-110 shadow-lg"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextProject();
                      }}
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white transition-all hover:scale-110 shadow-lg"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                )}

                {/* Project Counter */}
                {filteredProjects.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
                    <div className="flex space-x-1.5 bg-black/30 backdrop-blur-sm px-2 py-1.5 rounded-full">
                      {filteredProjects.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentProject(index);
                          }}
                          className={`transition-all ${index === currentProject ? "h-1.5 w-6 bg-white rounded-sm " : "h-1.5 w-1.5 bg-white/50 hover:bg-white/80 rounded-full"}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Project Description */}
            <div data-animate className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{current.title}</h3>

                  <p className="text-gray-700 leading-relaxed mb-6">{current.description}</p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {current.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div data-animate className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
