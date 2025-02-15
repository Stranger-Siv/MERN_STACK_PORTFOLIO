import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    const getMySkills = async () => {
      const { data } = await axios.get(
        "https://mern-stack-portfolio-2puo.onrender.com/api/v1/skill/getall",
        { withCredentials: true }
      );
      setSkills(data.skills);
    };
    getMySkills();
  }, []);

  return (
    <section className="relative bg-[#1a1a1a] py-10">
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
                MY <span className="text-gray-500">SKILLS</span>
              </h2>
              <div className="mt-4 h-1 w-20 bg-gradient-to-r from-gray-500 to-transparent"></div>
            </div>
            
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              Technologies and tools I've worked with on my journey as a developer.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {skills.map((skill) => (
                <div 
                  key={skill._id}
                  className="group relative bg-gradient-to-br from-[#2a2a2a] to-[#232323] rounded-lg overflow-hidden hover:from-[#323232] hover:to-[#282828] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="aspect-square p-4 flex flex-col items-center justify-center border border-gray-800/50 rounded-lg backdrop-blur-sm">
                    <img
                      src={skill.svg?.url}
                      alt={skill.title}
                      className="h-8 w-auto mb-3 transition-transform duration-300 group-hover:scale-110"
                    />
                    <h3 className="text-center text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                      {skill.title}
                    </h3>
                    {skill.description && (
                      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                        <p className="text-xs text-gray-300 text-center">
                          {skill.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;