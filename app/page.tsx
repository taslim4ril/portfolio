import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
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
        {/* Scrolls up and over the pinned hero. Solid background so the hero
            never shows through, and a higher stacking order than the hero. */}
        <div className="relative z-10 bg-background">
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
