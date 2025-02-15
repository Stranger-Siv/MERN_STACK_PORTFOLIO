import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Hero from "./sub-components/Hero";
import About from "./sub-components/About";
import Skills from "./sub-components/Skills";
import Timeline from "./sub-components/Timeline";
import Portfolio from "./sub-components/Portfolio";
import Apps from "./sub-components/Apps";
import Contact from "./sub-components/Contact";

const Home = () => {
  return (
    <ThemeProvider defaultTheme="dark" forcedTheme="dark">
      <div className="min-h-screen bg-[#1a1a1a] text-white">
        <Navbar />
        <main className="pt-20">
          <Hero />
          <div className="space-y-24">
            <section id="about">
              <About />
            </section>
            <section id="skills">
              <Skills />
            </section>
            <section id="experience">
              <Timeline />
            </section>
            <section id="portfolio">
              <Portfolio />
            </section>
            <section id="tools">
              <Apps />
            </section>
            <section id="contact">
              <Contact />
            </section>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Home;