import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center h-screen bg-gray-100 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-50">
        <img src="" alt="" className="w-full h-full object-cover" />
      </div>

      {/* Animated Heading */}
      <motion.h1
        initial={{ x: 0 }}
        // animate={{ x: isHovered ? -100 : 0 }} // Move left on hover

        animate={{ x: isHovered ? (window.innerWidth > 768 ? -100 : -50) : 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl md:text-8xl font-bold text-black text-center relative max-md:text-4xl max-md:mr-20  max-sm:mr-60 "
      >
        Sophisticated <br />
        <span className="underline decoration-black max-md:text-3xl">
          Skincare
        </span>
      </motion.h1>

      {/* Dynamic Dotted Border */}

      <div className="absolute bottom-10 w-full px-10 max-w-7xl flex justify-between text-gray-700 text-sm md:text-base max-md:mr-8 max-md:max-w-2xl max-md:justify-start max-sm:hidden">
        <p className="w-1/6 font-semibold">
          Premium Custom Skincare For <br /> Faces With Sophisticated Needs
        </p>
        <p className="w-1/6 text-center ">
          Proprietary Algorithms For <br /> Effective Formula Design
        </p>
        <p className="w-1/6 text-center">
          Complete Control over <br /> Skincare Ingredients
        </p>
        <p className="w-1/6 text-center ">
          Expert clinical <br /> diagnostics + guidance
        </p>
        <p className="w-1/6 text-center max-md:hidden">
          Fully Customizable <br /> from Scratch
        </p>
        <p className="w-1/6 text-right max-md:hidden">
          FDA / TGA Approved <br /> Compound Pharmacies
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute left-10 top-50% transform -translate-y-1/2 text-gray-500 text-xs max-md:hidden"
      >
        <div
          className="border border-gray-400 pt-2 pb-2 pl-1 pr-1 flex items-center relative z-10    "
          style={{ marginLeft: "-35px", marginBottom: "5px" }}
        >
          <span className="mr-1">◀</span> CLINICAL RESEARCH
        </div>

        {/* Adjusted Left Dotted Border (Moved 50% Left) */}
        <div
          className="absolute w-[250px] h-[250px] border border-dotted border-gray-400 rotate-45 "
          style={{
            left: "-155%",
            top: "-280%",
            transform: "translateY(-50%)rotate:45",
          }}
        />
      </motion.div>

      {/* Right Side Dotted Border */}
      <motion.div
        className="absolute w-[250px] h-[250px] border border-dotted border-gray-400  "
        initial={{ opacity: 1, scale: 1, rotate: 45 }}
        animate={{
          opacity: isHovered ? 1 : 0.8,
          scale: isHovered ? 1.2 : 1,
          rotate: 45,
        }}
        transition={{ duration: 0.5 }}
        style={{
          right: window.innerWidth < 768 ? "-21%" : "-10%",
          top: window.innerWidth < 768 ? "30%" : "30%",
          transform: "translateY(-50%) rotate(45deg)",
        }}

        // style={{ right:"-10%", top: "30%", transform: "translateY(-50%) rotate(45deg)" }}
      >
        {/* Additional Dotted Borders on Hover */}
        {isHovered && (
          <>
            <motion.div
              className="absolute w-full h-full border border-dotted border-gray-400 "
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ opacity: 1, scale: 1.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
            <motion.div
              className="absolute w-full h-full border border-dotted border-gray-400  "
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1.6 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </>
        )}

        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -0 }}
            animate={{ opacity: 0, x: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute left-10 top-50% transform -translate-y-1/2 text-gray-500  max-sm:hidden"
          >
            <div
              className="border border-gray-400 p-2 flex items-center relative z-10  "
              style={{ marginLeft: "-100px" }}
            >
              <span className="mr-3">◀</span> CLINICAL RESEARCH
            </div>

            {/* Adjusted Left Dotted Border (Moved 50% Left) */}
            <div
              className="absolute w-[250px] h-[250px] border border-dotted border-gray-400 rotate-45"
              style={{
                left: "-50%",
                top: "30%",
                transform: "translateY(-50%)rotate:45",
              }}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Hoverable "Let's Begin" Button */}
      <Link
        to="/introduction"
        className="absolute right-5 top-[48%] transform -translate-y-1/2 text-gray-500 text-sm "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="border border-gray-400 p-2 flex items-center w-55 ">
          LET'S BEGIN <span className="ml-2">▶</span>
        </div>
      </Link>
    </section>
  );
};

export default Hero;
