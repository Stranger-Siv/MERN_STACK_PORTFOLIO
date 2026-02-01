import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { getApiBase } from "@/lib/api";
import { Button } from "@/components/ui/button";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ProjectView = () => {
  const [project, setProject] = useState({
    title: "",
    description: "",
    technologies: "",
    stack: "",
    gitRepoLink: "",
    deployed: "",
    projectLink: "",
    projectBanner: "",
  });

  const { id } = useParams();
  const navigateTo = useNavigate();

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    const getProject = async () => {
      try {
        const { data } = await axios.get(
          `${getApiBase()}/api/v1/project/get/${id}`,
          { withCredentials: true }
        );
        setProject(data.project);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getProject();
  }, [id]);

  const descriptionList = project.description.split(". ");
  const technologiesList = project.technologies.split(", ");

  return (
    <section className="relative bg-[#1a1a1a] min-h-screen py-16">
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
            {/* Header with Return Button */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div className="flex flex-col items-start">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider mb-4 md:mb-0">
                  PROJECT <span className="text-gray-500">DETAILS</span>
                </h2>
                <div className="mt-4 h-1 w-20 bg-gradient-to-r from-gray-500 to-transparent"></div>
              </div>
              <Button
                onClick={() => navigateTo("/")}
                className="bg-[#232323] hover:bg-[#2a2a2a] text-white px-6 mt-6 md:mt-0"
              >
                Return Home
              </Button>
            </div>

            {/* Project Banner */}
            <div className="bg-gradient-to-br from-[#2a2a2a] to-[#232323] p-2 rounded-lg overflow-hidden">
              <img
                src={project.projectBanner?.url || "/avatarHolder.jpg"}
                alt={project.title}
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Project Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-[#2a2a2a] to-[#232323] p-8 rounded-lg">
                  <h3 className="text-xl font-medium mb-4">Description</h3>
                  <ul className="space-y-3">
                    {descriptionList.map((item, index) => (
                      <li key={index} className="flex items-start text-gray-300">
                        <span className="text-gray-500 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-[#2a2a2a] to-[#232323] p-8 rounded-lg">
                  <h3 className="text-xl font-medium mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {technologiesList.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#1a1a1a] text-gray-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-[#2a2a2a] to-[#232323] p-8 rounded-lg">
                  <h3 className="text-xl font-medium mb-4">Project Details</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-gray-400 mb-2">Stack</h4>
                      <p className="text-gray-300">{project.stack}</p>
                    </div>
                    <div>
                      <h4 className="text-gray-400 mb-2">Project Deployed</h4>
                      <p className="text-gray-300">{project.deployed}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#2a2a2a] to-[#232323] p-8 rounded-lg">
                  <h3 className="text-xl font-medium mb-4">Project Links</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-gray-400 mb-2">Repository</h4>
                      <a
                        href={project.gitRepoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors break-all group"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        {project.gitRepoLink}
                        <svg
                          className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                    <div>
                      <h4 className="text-gray-400 mb-2">Live Demo</h4>
                      <a
                        href={project.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors break-all group"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.218 19l-1.782-1.75 5.25-5.25-5.25-5.25 1.782-1.75 6.968 7-6.968 7z" />
                        </svg>
                        {project.projectLink}
                        <svg
                          className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectView;