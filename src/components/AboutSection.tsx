import React, { useEffect, useRef } from 'react';
import { Code, Palette, Rocket, Heart } from 'lucide-react';

// Debounce helper function
function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const AboutSection = () => {
  const skills = [
    { icon: Code, title: 'Development', desc: 'Membangun Aplikasi Web Full-Stack dengan Teknologi Terkini' },
    { icon: Palette, title: 'Design', desc: 'Merancang UI yang Menawan dan Mudah Digunakan' },
    { icon: Rocket, title: 'Innovation', desc: 'Rutin Mengeksplorasi Teknologi dan Cara Baru untuk Memecahkan Masalah' },
    { icon: Heart, title: 'Passion', desc: 'Berfokus pada Penciptaan Pengalaman Digital yang Penuh Makna' },
  ];

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
      id="about" 
      ref={sectionRef}
      className="overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-20 bg-gray-50 backdrop-blur-sm scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            data-animate
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            About <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div 
            data-animate
            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-sky-600 mx-auto rounded-full"
          ></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 
              data-animate
              className="text-2xl font-semibold text-gray-900 mb-6"
            >
              Menciptakan Pengalaman Digital yang Bermakna
            </h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              {[
                "Saya lulus dengan gelar Sarjana Pendidikan Matematika dari Universitas Madua. Setelah menyelesaikan studi sarjana, saya melanjutkan perjalanan akademik saya di Universitas Katolik Widya Mandala Surabaya. Selama masa kuliah, saya aktif terlibat dalam berbagai organisasi kemahasiswaan. Saya pernah dipercaya sebagai ketua panitia dalam sebuah program kerja, membantu menyusun dokumen penting untuk akreditasi program studi, serta menjabat sebagai koordinator divisi kesekretariatan yang bertanggung jawab atas pengelolaan data administratif dan organisasi.",
                "Pengalaman-pengalaman tersebut menumbuhkan ketertarikan saya pada analisis data dan data science, seiring dengan keterlibatan saya dalam mengelola dan menginterpretasikan data secara bermakna. Didukung oleh latar belakang akademik di bidang matematika, saya juga telah terlibat dalam berbagai proyek pengembangan web, baik secara individu maupun dalam tim. Perjalanan ini semakin memperkuat semangat saya dalam dunia pemrograman dan membangun solusi digital. Saat ini, saya aktif sebagai tutor matematika, web developer, dan data scientist — didorong oleh semangat belajar tanpa henti dan keinginan untuk memberikan dampak melalui pendidikan, teknologi, dan data."
              ].map((text, index) => (
                <p 
                  key={index} 
                  data-animate
                  className=""
                >
                  {text}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {['Laravel','React', 'TypeScript', 'Node.js', 'Python', 'MySQL'].map((tech) => (
                <span
                  key={tech}
                  data-animate
                  className="px-4 py-2 bg-gradient-to-r from-blue-100 to-sky-100 text-blue-700 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.title}
                data-animate
                className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg flex items-center justify-center mb-4">
                  <skill.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{skill.title}</h4>
                <p className="text-gray-600 text-sm">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;