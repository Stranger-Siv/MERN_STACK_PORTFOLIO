import {
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  FileText,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { API_BASE } from "@/lib/api";

const Hero = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        `${API_BASE}/api/v1/user/me/portfolio`,
        { withCredentials: true }
      );
      setUser(data.user);
    };
    getMyProfile();
  }, []);

  return (
    <section className="pt-16 text-center">
      <div className="mb-8">
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-1 bg-gradient-to-r from-gray-500 to-transparent mb-4"></div>
          <h2 className="text-2xl md:text-3xl font-medium">
            Hi, I'm {user.fullName}
            <span className="inline-block ml-2 animate-bounce">👋</span>
          </h2>
          <p className="text-gray-400">BTech Final Year Student in Computer Science & Engineering</p>
          <div className="w-16 h-1 bg-gradient-to-l from-gray-500 to-transparent mt-4"></div>
        </div>
      </div>

      <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium max-w-4xl mx-auto leading-tight mb-8">
        Passionate about <span className="text-gray-500">building</span> and{" "}
        <span className="text-gray-500">learning</span> through projects
      </h1>

      <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
        Building my startup Kaam247 — transforming ideas into reality through code
      </p>

      {user?.resume?.url && (
        <div className="mb-10">
          <Link to={user.resume.url} target="_blank">
            <Button variant="outline" className="gap-2">
              <FileText className="w-4 h-4" />
              View Resume
            </Button>
          </Link>
        </div>
      )}

      {/* Animated Tech Stack */}
      <div className="flex flex-wrap justify-center gap-6 items-center mb-16">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-gray-800/50 flex items-center justify-center">
            <span className="text-2xl">⚛️</span>
          </div>
          <span className="text-sm text-gray-400">React</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-gray-800/50 flex items-center justify-center">
            <span className="text-2xl">🚀</span>
          </div>
          <span className="text-sm text-gray-400">Node.js</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-gray-800/50 flex items-center justify-center">
            <span className="text-2xl">🎨</span>
          </div>
          <span className="text-sm text-gray-400">Tailwind</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-gray-800/50 flex items-center justify-center">
            <span className="text-2xl">🌿</span>
          </div>
          <span className="text-sm text-gray-400">MongoDB</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-gray-800/50 flex items-center justify-center">
            <span className="text-2xl">⚡</span>
          </div>
          <span className="text-sm text-gray-400">Express</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;