import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [secretStep, setSecretStep] = useState(0);
  const secretTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (secretTimeoutRef.current) clearTimeout(secretTimeoutRef.current);
    };
  }, []);

  const onSecretS = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (secretTimeoutRef.current) clearTimeout(secretTimeoutRef.current);
    setSecretStep(1);
    secretTimeoutRef.current = setTimeout(() => setSecretStep(0), 5000);
  };

  const onSecretP = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (secretTimeoutRef.current) clearTimeout(secretTimeoutRef.current);
    secretTimeoutRef.current = null;
    if (secretStep === 1) {
      setSecretStep(0);
      window.location.href = typeof window !== "undefined" && window.__DASHBOARD_URL__
        ? window.__DASHBOARD_URL__
        : "https://dashboard.sivram.in";
    } else {
      setSecretStep(0);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-[#1a1a1a]/95 backdrop-blur-sm py-4'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo — secret: tap/click S then P (initials) within 5s → dashboard; works on phone too */}
          <Link to="/" className="text-xl font-bold text-white inline-flex items-center">
            <span onClick={onSecretS} className="cursor-default py-2 px-0.5 -my-1 min-h-[44px] min-w-[28px] inline-flex items-center justify-center touch-manipulation select-none">S</span>ivram{" "}
            <span onClick={onSecretP} className="cursor-default py-2 px-0.5 -my-1 min-h-[44px] min-w-[28px] inline-flex items-center justify-center touch-manipulation select-none">P</span>radhan
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
              About
            </a>
            <a href="#skills" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
              Skills
            </a>
            <a href="#experience" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
              Experience
            </a>
            <a href="#portfolio" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
              Work
            </a>
            <a href="#contact" className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium transition-colors">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-[#232323] rounded-lg overflow-hidden">
            <div className="flex flex-col space-y-2 p-4">
              <a
                href="#about"
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#skills"
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Skills
              </a>
              <a
                href="#experience"
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Experience
              </a>
              <a
                href="#portfolio"
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Work
              </a>
              <a
                href="#contact"
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 