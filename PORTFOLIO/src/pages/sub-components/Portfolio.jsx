import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        `${API_BASE}/api/v1/project/getall`,
        { withCredentials: true }
      );
      setProjects(data.projects);
    };
    getMyProjects();
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

      <div className="max-w-6xl mx-auto px-4 py-20">
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
                MY <span className="text-gray-500">WORK</span>
              </h2>
              <div className="mt-4 h-1 w-20 bg-gradient-to-r from-gray-500 to-transparent"></div>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              Selected projects that showcase my passion for web development
              and design. Each project represents a unique challenge and solution.
            </p>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {(viewAll ? projects : projects.slice(0, 6)).map((project) => (
                <Link
                  to={`/project/${project._id}`}
                  key={project._id}
                  className="group relative aspect-video overflow-hidden bg-[#232323] rounded-lg"
                >
                  <img
                    src={project.projectBanner?.url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                    <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-400 text-center line-clamp-2">
                      {project.description?.split('.')[0]}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {projects.length > 6 && (
              <div className="flex justify-center">
                <button
                  onClick={() => setViewAll(!viewAll)}
                  className="mt-8 px-8 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {viewAll ? "Show Less" : "View All Projects"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
