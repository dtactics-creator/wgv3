import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Expertise from "@/components/sections/Expertise";
import Properties from "@/components/sections/Properties";
import Why from "@/components/sections/Why";
import Clients from "@/components/sections/Clients";
import Approach from "@/components/sections/Approach";
import Cinematic from "@/components/sections/Cinematic";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Intro />
      <Stats />
      <About />
      <Expertise />
      <Properties />
      <Why />
      <Clients />
      <Approach />
      <Cinematic />
      <Contact />
      <Footer />
    </main>
  );
}
