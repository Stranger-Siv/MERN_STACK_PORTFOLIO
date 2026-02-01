import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const About = () => {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  return (
    <section className="relative bg-[#1a1a1a] py-16">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              enable: false,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 40,
            },
            opacity: {
              value: 0.1,
            },
            shape: {
              type: ["circle", "star"],
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      <div className="max-w-6xl mx-auto px-4">
        <div className="relative">
          {/* Decorative element */}
          <div className="absolute -left-8 -top-8 w-16 h-16 animate-spin-slow">
            <svg viewBox="0 0 100 100" className="text-gray-500">
              <path
                d="M50,0 a50,50 0 1,1 0,100 a50,50 0 1,1 0,-100"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray="1,14"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="space-y-12">
            <div className="flex flex-col items-start">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider">
                ABOUT <span className="text-gray-500">ME</span>
              </h2>
              <div className="mt-4 h-1 w-20 bg-gradient-to-r from-gray-500 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="relative bg-[#232323] p-8 rounded-lg h-[250px] flex flex-col">
                <div className="mb-6">
                  <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3">Who am I?</h3>
                <p className="text-gray-400 leading-relaxed">
                  I have interests not only in technology but also in movies, series,
                  video games, and cooking. I excel in meeting deadlines for my work.
                </p>
              </div>

              <div className="relative bg-[#232323] p-8 rounded-lg h-[250px] flex flex-col">
                <div className="mb-6">
                  <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3">What I do?</h3>
                <p className="text-gray-400 leading-relaxed">
                  I build modern web applications, focusing on both functionality
                  and aesthetics to deliver exceptional digital solutions.
                </p>
              </div>

              <div className="relative bg-[#232323] p-8 rounded-lg h-[250px] flex flex-col">
                <div className="mb-6">
                  <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3">My Goal</h3>
                <p className="text-gray-400 leading-relaxed">
                  To create innovative digital experiences that make a positive
                  impact while continuously growing as a developer.
                </p>
              </div>
            </div>

            {/* My Startup: Kaam247 */}
            <div className="mt-16">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                My Startup: <span className="text-gray-500">Kaam247</span>
              </h3>
              <div className="mt-4 h-1 w-20 bg-gradient-to-r from-gray-500 to-transparent mb-8"></div>
              <div className="relative bg-[#232323] p-8 md:p-10 rounded-lg">
                <p className="text-gray-400 leading-relaxed space-y-4">
                  <strong className="text-gray-300">Kaam247</strong> is a hyperlocal, offline task-based marketplace.
                  It connects people who need small local tasks done with nearby people willing to do the work.
                  Tasks are short-term, real-world, and limited to a 0–5 km radius.
                  Anyone can post or accept tasks; there is no professional verification or gatekeeping.
                  The platform focuses on &ldquo;helping hand&rdquo; tasks, not expert services.
                  Payments happen directly between users via cash or UPI.
                  Kaam247 earns a small commission on completed tasks.
                  Trust is guided by ratings, not by platform certification.
                  The initial focus is on students, then expands to the public.
                  Unlike Urban Company, Kaam247 finds nearby people, not professionals.
                </p>
                <p className="text-gray-400 leading-relaxed mt-6">
                  Curious to try it?{" "}
                  <a
                    href="https://kaam247.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white underline underline-offset-2 transition-colors"
                  >
                    kaam247.in
                  </a>{" "}
                  — post a task or lend a hand in your neighbourhood.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;