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
      degree: "Pendidikan Profesi Guru (PPG) Pra-Jabatan",
      school: "Universitas Katolik Widya Mandala Surabaya",
      period: "Januari 2024 - Desember 2024",
      description: "Saya berhasil memimpin koordinasi program pengabdian kepada masyarakat yang dilaksanakan di SMP Kristen YBPK 4 Surabaya dengan fokus utama pada pemberdayaan komunitas pendidikan secara menyeluruh. Selain itu, saya sukses memimpin tim dalam menyelenggarakan acara Gelar Karya di Universitas Katolik Widya Mandala Surabaya, mulai dari perencanaan strategis hingga pelaksanaan, memastikan setiap tahap berjalan dengan lancar dan berdampak. Dalam kolaborasi dengan guru matematika SMPN 37 Surabaya, saya melakukan penelitian mendalam mengenai computational thinking serta merancang strategi inovatif untuk meningkatkan kemampuan siswa dalam bidang tersebut. Lebih dari itu, saya telah berhasil menulis dan menerbitkan tiga artikel ilmiah di jurnal nasional terakreditasi, memberikan kontribusi nyata terhadap pengembangan ilmu pengetahuan dan praktik pendidikan yang berkualitas."
    },
    {
      id: "edu-2",
      degree: "Sarjana Pendidikan Matematika",
      school: "Universitas Madura",
      period: "SEPTEMBER 2019 – Agustus 2023",
      description: "Selama menempuh pendidikan, saya aktif berperan dalam organisasi kemahasiswaan dengan turut merancang dan melaksanakan program kerja strategis. Salah satu pencapaian penting saya adalah mengembangkan sistem otomatisasi untuk Olimpiade Matematika Madura, yang berhasil mengoptimalkan proses mulai dari pendaftaran hingga penilaian, sehingga efisiensi waktu meningkat secara signifikan. Untuk memastikan pemanfaatan sistem berjalan maksimal, saya memimpin pelatihan bagi anggota organisasi, yang menghasilkan peningkatan kemampuan teknis hingga 60%. Saya juga berkontribusi dalam penyusunan dokumen akreditasi program studi yang berhasil memperoleh status akreditasi ‘Baik Sekali’. Komitmen saya terhadap keunggulan akademik terbukti lewat penulisan dan publikasi karya ilmiah di jurnal nasional terakreditasi, yang memperkuat kontribusi saya terhadap perkembangan ilmu pengetahuan. Selain itu, saya berpartisipasi dalam Olimpiade Mahasiswa Nasional yang diselenggarakan oleh Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi, yang semakin mengasah kemampuan analitis dan pemecahan masalah saya secara signifikan."
    }
  ];

  // Experience data
  const experience = [
    {
      position: "IT Support",
      company: "SDIT AL HAROMAIN",
      period: "2022 - 2024",
      description: "Saya berhasil mengelola proyek migrasi infrastruktur IT yang meningkatkan kinerja sistem sebesar 40%. Selain itu, saya memasang dan mengonfigurasi teknologi virtualisasi yang meningkatkan pemanfaatan server hingga 30%. Dengan menerapkan proses dukungan IT internal yang baru, saya berhasil mengurangi waktu downtime secara keseluruhan sebesar 30%. Selain itu, saya juga menangani pembaruan perangkat keras secara rutin, yang berdampak pada penurunan kegagalan hardware sebesar 15%."
    },
    {
      position: "Kordinator Divisi Kesekretariatan",
      company: "Himpunan Mahasiswa Prodi Pendidikan Matematika (HIMATIKA) Universitas Madura",
      period: "2020 - 2022",
      description: "Dengan memperkenalkan sistem manajemen dokumen otomatis, saya meningkatkan efisiensi proses administrasi olimpiade matematika sebesar 60%. Selain itu, saya mengembangkan dan mengimplementasikan sistem pengarsipan pendaftaran peserta yang efisien, sehingga mengurangi waktu pencarian dokumen hingga 75%. Untuk lebih meningkatkan produktivitas organisasi, saya mengadakan pelatihan internal yang bertujuan meningkatkan keterampilan administrasi anggota tim, yang menghasilkan peningkatan produktivitas keseluruhan sebesar 65%."
    },
    {
      position: "Staf Administrasi",
      company: "Kantor Kepada Desa Tlontoraja Pamekasan",
      period: "2020 - 2021",
      description: "Saya bertanggung jawab atas aktivitas administrasi harian, termasuk pengarsipan, pengelolaan data, dan penyusunan laporan, serta mengelola komunikasi internal dan eksternal secara efektif melalui penanganan telepon dan email. Selain itu, saya mengatur agenda dan jadwal rapat menggunakan Google Calendar, yang berhasil meningkatkan kehadiran rapat hingga 45%."
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

    const debouncedScroll = debounce(handleScroll, 70);
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
            <TruncatedText 
              text={item.description} 
              id={item.id} 
              maxWords={item.position ? 25 : 58} // 25 kata untuk experience, 58 untuk education
            />
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
                    item={{ ...exp, id: `exp-${index}` }} // tambahkan id untuk kontrol TruncatedText
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