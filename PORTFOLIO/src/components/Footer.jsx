const Footer = () => {
  return (
    <div className="py-4 text-center text-gray-400 border-t border-gray-800">
      <p className="flex items-center justify-center gap-1 text-base">
        Made with 
        <svg 
          className="w-4 h-4 text-red-500 hover:text-red-400 transition-colors" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        by Your Name
      </p>
      <p className="text-base">&copy; {new Date().getFullYear()} All rights reserved.</p>
    </div>
  );
};

export default Footer; 