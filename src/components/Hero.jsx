// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// const Hero = () => {
//   return (
//     <section className="relative flex flex-col items-center justify-center h-screen bg-gray-100 overflow-hidden">
//       {/* Main Heading */}
//       <motion.h1
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="text-6xl md:text-8xl font-bold text-black text-center relative"
//       >
//         Sophisticated <br />
//         <span className="underline decoration-black">Skincare</span>
//       </motion.h1>

//       {/* Let's Begin Button */}
//       <Link
//         to="/introduction"
//         className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
//       >
//         <div className="border border-gray-400 p-2 flex items-center">
//           LET'S BEGIN <span className="ml-2">▶</span>
//         </div>
//       </Link>
//     </section>
//   );
// };

// export default Hero;


// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// const Hero = () => {
//   return (
//     <section className="relative flex flex-col items-center justify-center h-screen bg-gray-100 overflow-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0 flex items-center justify-center opacity-50">
//         <img
//           src="/images/hero-bg.png" // Replace with your background image path
//           alt="Background"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Main Heading */}
//       <motion.h1
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="text-6xl md:text-8xl font-bold text-black text-center relative"
//       >
//         Sophisticated <br />
//         <span className="underline decoration-black">Skincare</span>
//       </motion.h1>

//       {/* Bottom Section (Fixed Layout) */}
//       <div className="absolute bottom-10 w-full px-10 max-w-7xl flex justify-between text-gray-700 text-sm md:text-base">
//         <p className="w-1/6 font-semibold">
//           Premium Custom Skincare For <br /> Faces With Sophisticated Needs
//         </p>
//         <p className="w-1/6 text-center">
//           Proprietary Algorithms For <br /> Effective Formula Design
//         </p>
//         <p className="w-1/6 text-center">
//           Complete Control over <br /> Skincare Ingredients
//         </p>
//         <p className="w-1/6 text-center">
//           Expert clinical <br /> diagnostics + guidance
//         </p>
//         <p className="w-1/6 text-center">
//           Fully Customizable <br /> from Scratch
//         </p>
//         <p className="w-1/6 text-right">
//           FDA / TGA Approved <br /> Compound Pharmacies
//         </p>
//       </div>

//       {/* Left Floating Element */}
//       <motion.div
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 1.2 }}
//         className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
//       >
//         <div className="border border-gray-400 p-2 flex items-center">
//           <span className="mr-2">◀</span> CLINICAL RESEARCH
//         </div>
//       </motion.div>

//       {/* Right Floating "Let's Begin" Button */}
//       <Link
//         to="/introduction"
//         className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
//       >
//         <div className="border border-gray-400 p-2 flex items-center">
//           LET'S BEGIN <span className="ml-2">▶</span>
//         </div>
//       </Link>
//     </section>
//   );
// };

// export default Hero;




import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative flex flex-col items-center justify-center h-screen bg-gray-100 overflow-hidden">
      
      <div className="absolute inset-0 flex items-center justify-center opacity-50">
        <img
          src="/images/hero-bg.png" 
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Animated Heading */}
      <motion.h1
        initial={{ x: 0 }}
        animate={{ x: isHovered ? -100 : 0 }} // Move left on hover
        transition={{ duration: 0.8}}
        className="text-6xl md:text-8xl font-bold text-black text-center relative"
      >
        Sophisticated <br />
        <span className="underline decoration-black">Skincare</span>
      </motion.h1>

      {/* Dynamic Dotted Border */}


      <div className="absolute bottom-10 w-full px-10 max-w-7xl flex justify-between text-gray-700 text-sm md:text-base">
        <p className="w-1/6 font-semibold">
          Premium Custom Skincare For <br /> Faces With Sophisticated Needs
        </p>
        <p className="w-1/6 text-center">
         Proprietary Algorithms For <br /> Effective Formula Design
       </p>
       <p className="w-1/6 text-center">
         Complete Control over <br /> Skincare Ingredients
        </p>
        <p className="w-1/6 text-center">
          Expert clinical <br /> diagnostics + guidance
       </p>
       <p className="w-1/6 text-center">
          Fully Customizable <br /> from Scratch
        </p>
        <p className="w-1/6 text-right">
          FDA / TGA Approved <br /> Compound Pharmacies
        </p>
      </div>


      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
      >
        <div className="border border-gray-400 p-2 flex items-center">
          <span className="mr-2">◀</span> CLINICAL RESEARCH
        </div>
        </motion.div>


      <motion.div
        className="absolute w-[250px] h-[250px] border border-dotted border-gray-400 rotate-90 "
     
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: isHovered ? 1 : 0.8, scale: isHovered ? 1.2 : 1 }}
        transition={{ duration: 0.5 }}
        style={{ right: "-5%", top: "30%", transform: "translateY(-50%) " }}
        // style={{ right: "-1%", top: "40%", clipPath: 'polygon(50% 0, 100% 0, 100% 50%, 50% 100%, 0 100%, 0 50%)' }}
      >
        {/* Additional Dotted Borders on Hover */}
        {isHovered && (
          <>
            <motion.div
              className="absolute w-full h-full border border-dotted border-gray-400"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            ></motion.div>
            <motion.div
              className="absolute w-full h-full border border-dotted border-gray-400"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1.6 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            ></motion.div>
          </>

        )}
        
      </motion.div>

      {/* Hoverable "Let's Begin" Button */}
      <Link
        to="/introduction"
        className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="border border-gray-400 p-2 flex items-center">
          LET'S BEGIN <span className="ml-2">▶</span>
        </div>
      </Link>
    </section>
  );
};

export default Hero;





















// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// const Hero = () => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <section className="relative flex flex-col items-center justify-center h-screen bg-gray-100 overflow-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0 flex items-center justify-center opacity-50">
//         <img
//           src="/images/hero-bg.png" // Replace with your background image path
//           alt="Background"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Animated Heading */}
//       <motion.h1
//         initial={{ x: 0 }}
//         animate={{ x: isHovered ? -100 : 0 }} // Move left on hover
//         transition={{ duration: 0.5 }}
//         className="text-6xl md:text-8xl font-bold text-black text-center relative"
//       >
//         Sophisticated <br />
//         <span className="underline decoration-black">Skincare</span>
//       </motion.h1>

//       {/* Diamond Shape Dotted Border (Static - Half Visible) */}
//       <motion.div
//         className="absolute w-32 h-32 border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 1, scale: 1, clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 50% 50%)" }}
//         animate={{ opacity: 1, scale: 1, clipPath: isHovered ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" : "polygon(50% 0%, 100% 50%, 50% 100%, 50% 50%)" }}
//         transition={{ duration: 0.5 }}
//         style={{ right: "10%", top: "50%", transform: "translateY(-50%)" }}
//       />

//       {/* Expanding Dotted Borders on Hover */}
//       {isHovered && (
//         <>
//           <motion.div
//             className="absolute w-40 h-40 border border-dotted border-gray-400 rotate-45"
//             initial={{ opacity: 0, scale: 1 }}
//             animate={{ opacity: 1, scale: 1.2 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             style={{ right: "10%", top: "50%", transform: "translateY(-50%)" }}
//           />
//           <motion.div
//             className="absolute w-48 h-48 border border-dotted border-gray-400 rotate-45"
//             initial={{ opacity: 0, scale: 1 }}
//             animate={{ opacity: 1, scale: 1.4 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             style={{ right: "10%", top: "50%", transform: "translateY(-50%)" }}
//           />
//         </>
//       )}

//       {/* Hoverable "Take Test" Button */}
//       <Link
//         to="/introduction"
//         className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div className="border border-gray-400 p-2 flex items-center">
//           TAKE TEST <span className="ml-2">▶</span>
//         </div>
//       </Link>
//     </section>
//   );
// };

// export default Hero;

















// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// const Hero = () => {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <section className="relative flex flex-col items-center justify-center h-screen bg-gray-100 overflow-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0 flex items-center justify-center opacity-50">
//         <img
//           src="/images/hero-bg.png" // Replace with your background image path
//           alt="Background"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Animated Heading */}
//       <motion.h1
//         initial={{ x: 0 }}
//         animate={{ x: hovered ? -100 : 0 }} // Move left only on hover
//         transition={{ duration: 0.5 }}
//         className="text-6xl md:text-8xl font-bold text-black text-center relative"
//       >
//         Sophisticated <br />
//         <span className="underline decoration-black">Skincare</span>
//       </motion.h1>

//       {/* Left Static Dotted Diamond */}
//       <div
//         className="absolute w-32 h-32 border border-dotted border-gray-400 rotate-45"
//         style={{ left: "10%", top: "50%", transform: "translateY(-50%)" }}
//       />

//       {/* Right Static Dotted Diamond (Default State) */}
//       <div
//         className="absolute w-32 h-32 border border-dotted border-gray-400 rotate-45"
//         style={{ right: "10%", top: "50%", transform: "translateY(-50%)" }}
//       />

//       {/* Expanding Right Diamonds on Hover */}
//       {hovered && (
//         <>
//           <motion.div
//             className="absolute w-40 h-40 border border-dotted border-gray-400 rotate-45"
//             initial={{ opacity: 0, scale: 1 }}
//             animate={{ opacity: 1, scale: 1.2 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             style={{ right: "10%", top: "50%", transform: "translateY(-50%)" }}
//           />
//           <motion.div
//             className="absolute w-48 h-48 border border-dotted border-gray-400 rotate-45"
//             initial={{ opacity: 0, scale: 1 }}
//             animate={{ opacity: 1, scale: 1.4 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             style={{ right: "10%", top: "50%", transform: "translateY(-50%)" }}
//           />
//         </>
//       )}

//       {/* Hoverable Right Button - "Take Test" */}
//       <Link
//         to="/introduction"
//         className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//       >
//         <div className="border border-gray-400 p-2 flex items-center">
//           TAKE TEST <span className="ml-2">▶</span>
//         </div>
//       </Link>
//     </section>
//   );
// };

// export default Hero;
