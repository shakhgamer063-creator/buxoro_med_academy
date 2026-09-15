import React, { useMemo, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Admissions from "./components/Admissions.jsx";
import Stats from "./components/Stats.jsx";
import Courses from "./components/Courses.jsx";
import CourseDetailModal from "./components/CourseDetailModal.jsx";
import ParentVideos from "./components/ParentVideos.jsx";
import Results from "./components/Results.jsx";
import Gallery from "./components/Gallery.jsx";
import Teachers from "./components/Teachers.jsx";
import WhyUs from "./components/WhyUs.jsx";
import Process from "./components/Process.jsx";
import RegistrationForm from "./components/RegistrationForm.jsx";
import SuccessModal from "./components/SuccessModal.jsx";
import Branches from "./components/Branches.jsx";
import FAQ from "./components/FAQ.jsx";
import BottomCTA from "./components/BottomCTA.jsx";
import Footer from "./components/Footer.jsx";
import { useContent } from "./context/ContentContext.jsx";
import { NAV_LINKS } from "./data/defaultContent.js";
import { scrollToId } from "./utils/scroll.js";

export default function App() {
  const { content } = useContent();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [prefill, setPrefill] = useState(null);

  // Bo'sh bo'limlar sahifada chizilmaydi — menyuda ham ko'rinmasin
  const links = useMemo(() => {
    const has = {
      hero: true,
      aloqa: true,
      qabul: (content.admissions?.items || []).length > 0,
      kurslar: (content.courses?.items || []).length > 0,
      tilaklar: (content.parentVideos?.items || []).filter((v) => v.src).length > 0,
      lavhalar: (content.gallery?.items || []).filter((g) => g.src).length > 0,
      ustozlar: (content.teachers?.items || []).length > 0,
      natijalar: (content.results?.items || []).length > 0,
      filiallar: (content.branches?.items || []).length > 0,
    };
    return NAV_LINKS.filter((l) => has[l.id] !== false);
  }, [content]);

  const goRegister = (courseTitle) => {
    setPrefill({ course: courseTitle || "" });
    scrollToId("aloqa");
  };

  return (
    <div className="font-sans text-slate-900 bg-white overflow-x-hidden">
      <Navbar links={links} onRegisterClick={() => scrollToId("aloqa")} />
      <Hero onRegisterClick={() => scrollToId("aloqa")} />
      <Admissions />
      <Stats />
      <Courses onOpenCourse={setSelectedCourse} />
      <ParentVideos />
      <Results />
      <Gallery />
      <Teachers />
      <WhyUs />
      <Process />
      <RegistrationForm prefill={prefill} onSuccess={() => setShowSuccess(true)} />
      <Branches />
      <FAQ />
      <BottomCTA onRegisterClick={() => scrollToId("aloqa")} />
      <Footer links={links} />

      <CourseDetailModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onRegister={goRegister}
      />
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </div>
  );
}
