import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all ${
        scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-black uppercase">
          SKINSTRIC
        </a>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-10 text-black font-medium text-sm">
          <li><a href="/" className="hover:text-gray-500 transition">Home</a></li>
          <li><a href="/about" className="hover:text-gray-500 transition">About</a></li>
          <li><a href="/services" className="hover:text-gray-500 transition">Services</a></li>
          <li><a href="/contact" className="hover:text-gray-500 transition">Contact</a></li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;