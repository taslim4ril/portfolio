import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhatIDo from "@/components/WhatIDo";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Writing from "@/components/Writing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Intro />
      <Nav />
      <main className="relative">
        <Hero />
        <WhatIDo />
        {/* Scrolls up and over the pinned What-I-Do section. Solid background
            so it never shows through, and a higher stacking order. The -200vh
            pull times its arrival to the exact moment What-I-Do reaches full
            zoom, so covering + zoom-out happen together - no static hold once
            the section is in full view, it just keeps moving. */}
        <div className="relative z-10 bg-background lg:-mt-[200vh]">
          <Projects />
          <About />
          <Writing />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}
