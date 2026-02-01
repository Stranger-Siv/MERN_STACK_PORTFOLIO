import { FileText } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { getApiBase } from "@/lib/api";

const Hero = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        `${getApiBase()}/api/v1/user/me/portfolio`,
        { withCredentials: true }
      );
      setUser(data.user);
    };
    getMyProfile();
  }, []);

  return (
    <section className="pt-20 pb-16 md:pt-24 md:pb-20 text-center">
      <div className="mb-10">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-500 to-transparent mb-2" aria-hidden />
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
            Hi, I&apos;m {user.fullName}
            <span className="inline-block ml-2 animate-bounce" aria-hidden>👋</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg">BTech in Computer Science & Engineering</p>
          <div className="w-16 h-0.5 bg-gradient-to-l from-transparent via-gray-500 to-transparent mt-2" aria-hidden />
        </div>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium max-w-4xl mx-auto leading-[1.1] tracking-tight mb-6 px-4">
        Passionate about <span className="text-gray-500">building</span> and{" "}
        <span className="text-gray-500">learning</span> through projects
      </h1>

      <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 px-4">
        Building Kaam247 — a hyperlocal, offline task-based marketplace
      </p>

      {user?.resume?.url && (
        <div className="mb-14">
          <Link to={user.resume.url} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2 rounded-lg border-gray-600 hover:border-gray-500 hover:bg-white/5 transition-colors">
              <FileText className="w-4 h-4" />
              View Resume
            </Button>
          </Link>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 items-center mb-16 px-4" aria-label="Tech stack">
        {[
          { icon: "⚛️", name: "React" },
          { icon: "🚀", name: "Node.js" },
          { icon: "🎨", name: "Tailwind" },
          { icon: "🌿", name: "MongoDB" },
          { icon: "⚡", name: "Express" },
        ].map(({ icon, name }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-800/40 border border-gray-800/60 hover:border-gray-700 hover:bg-gray-800/60 transition-all duration-300"
          >
            <span className="text-2xl" aria-hidden>{icon}</span>
            <span className="text-sm text-gray-400">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;