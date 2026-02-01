import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    const getTimeline = async () => {
      const { data } = await axios.get(
        "https://api.sivram.in/api/v1/timeline/getall",
        { withCredentials: true }
      );
      setTimeline(data.timelines);
    };
    getTimeline();
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
                MY <span className="text-gray-500">JOURNEY</span>
              </h2>
              <div className="mt-4 h-1 w-20 bg-gradient-to-r from-gray-500 to-transparent"></div>
            </div>

            <div className="relative space-y-8">
              {timeline.map((item, index) => (
                <div key={item._id} className="relative pl-8 md:pl-32">
                  {/* Timeline line */}
                  <div className="absolute left-3 md:left-16 top-0 h-full w-0.5 bg-gradient-to-b from-gray-800 via-gray-600 to-transparent"></div>

                  {/* Timeline dot */}
                  <div className="absolute left-2 md:left-[60px] top-7 w-4 h-4">
                    <div className="w-3 h-3 bg-gray-600 rounded-full border-4 border-[#1a1a1a]"></div>
                  </div>

                  {/* Content */}
                  <div className="group relative bg-gradient-to-br from-[#2a2a2a] to-[#232323] rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Date badge */}
                    <div className="absolute -left-24 top-6 hidden md:block">
                      <span className="text-sm text-gray-400 bg-[#1a1a1a] px-3 py-1 rounded-full border border-gray-800">
                        {item.timeline.from} - {item.timeline.to || 'Present'}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-medium text-white group-hover:text-gray-200 transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-sm text-gray-400 md:hidden">
                          {item.timeline.from} - {item.timeline.to || 'Present'}
                        </span>
                      </div>

                      <p className="text-gray-400 leading-relaxed">
                        {item.description}
                      </p>

                      {item.technologies && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {item.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="text-xs px-2 py-1 bg-gray-800/50 text-gray-400 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mt-4"
                        >
                          Learn more
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      )}
                    </div>
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

export default Timeline;