
import React from 'react';
import Navbar from '../components/Navbar';
import HomeSection from '../components/HomeSection';
import AboutSection from '../components/AboutSection';
import ResumeSection from '../components/ResumeSection';
import ProjectsSection from '../components/ProjectsSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-5
    0 via-sky-100 to-blue-200">
      <Navbar />
      <main>
        <HomeSection />
        <AboutSection />
        <ResumeSection />
        <ProjectsSection />
      </main>
      <Footer />
      
    </div>
  );
};

export default Index;
