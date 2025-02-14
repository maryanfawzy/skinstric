import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center h-screen bg-gray-100 overflow-hidden">
      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl md:text-8xl font-bold text-black text-center relative"
      >
        Sophisticated <br />
        <span className="underline decoration-black">Skincare</span>
      </motion.h1>

      {/* Let's Begin Button */}
      <Link
        to="/introduction"
        className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
      >
        <div className="border border-gray-400 p-2 flex items-center">
          LET'S BEGIN <span className="ml-2">▶</span>
        </div>
      </Link>
    </section>
  );
};

export default Hero;