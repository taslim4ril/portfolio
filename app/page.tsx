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
      <main className="relative z-10">
        <Hero />
        <Projects />
        <About />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
