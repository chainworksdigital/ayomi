
import Hero from "@/app/sections/Hero";
import About from "@/app/sections/About";
import Courses from "@/app/sections/Courses";
import Testimonials from "@/app/sections/Testimonials";
import CTA from "@/app/sections/CTA";
import Contact from "@/app/sections/Contact";

export default function Home() {
  return (
    <main>
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="courses">
        <Courses />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="cta">
        <CTA />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}
