import { motion } from "framer-motion";
import { useState } from "react";
import HeaderIntroduction from "../components/HeaderIntroduction";

const Introduction = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", location: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1 && formData.name.trim() === "") return;
    if (step === 2 && formData.location.trim() === "") return;
    setStep(step + 1);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-16 py-20">
      <HeaderIntroduction />

      {/* Back Button */}
      {step > 1 && (
        <button
          onClick={() => setStep(step - 1)}
          className="absolute bottom-10 left-10 text-black flex items-center space-x-2"
        >
          <div className="border border-black p-2 flex items-center w-32">
            ◀ <span className="ml-5">BACK</span>
          </div>
        </button>
      )}

      {/* Title Section */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center text-lg"
      >
        <p className="text-gray-500 uppercase tracking-wide text-sm">
          CLICK TO TYPE
        </p>
        <h1 className="text-xl md:text-xl font-bold text-black mt-4">
          {step === 1 ? "Introduce yourself" : "Where are you from?"}
        </h1>

        <motion.div className="relative w-full max-w-[250px] bg-transparent border-b-2 border-black text-center text-4xl font-semibold p-2 focus:outline-none z-50 max-md:max-w-[150px] ">
          <input
            type="text"
            name={step === 1 ? "name" : "location"}
            placeholder={step === 1 ? "Enter your name" : "Enter your location"}
            value={step === 1 ? formData.name : formData.location}
            onChange={handleChange}
            className="w-full bg-transparent border-black text-center text-2xl p-2 focus:outline-none max-md:text-xl max-sm:text-sm"
          />
        </motion.div>
      </motion.div>

      {/* Rotating Borders */}
      <motion.div
        className="absolute w-[400px] h-[400px] border border-dotted border-gray-800 rotate-45 max-md:w-[300px] max-md:h-[300px]"
        initial={{ scale: 0.8, rotate: 45 }}
        animate={{ rotate: [45, 405] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      ></motion.div>
      <motion.div
        className="absolute w-[500px] h-[500px] border border-dotted border-gray-600 rotate-45 max-md:w-[375px] max-md:h-[375px]"
        initial={{ scale: 0.8, rotate: 45 }}
        animate={{ rotate: [45, -315] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      ></motion.div>
      <motion.div
        className="absolute w-[600px] h-[600px] border border-dotted border-gray-400 rotate-45 max-md:w-[450px] max-md:h-[450px]"
        initial={{ scale: 0.8, rotate: 45 }}
        animate={{ rotate: [45, 405] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      ></motion.div>

      {/* Proceed Button */}
      {step < 2 && (
        <button
          onClick={handleNext}
          className="absolute bottom-10 right-10 text-black flex items-center space-x-2"
        >
          <div className="border border-black p-2 flex items-center">
            <span className="mr-2">PROCEED</span> ▶
          </div>
        </button>
      )}

      {/* Start Analysis Button */}
      {step === 2 && (
        <button
          onClick={() => console.log("Submitting data:", formData)}
          className="absolute bottom-10 right-10 text-black flex items-center space-x-2"
        >
          <div className="border border-black p-2 flex items-center">
            <span className="mr-2">START ANALYSIS</span> ▶
          </div>
        </button>
      )}
    </div>
  );
};

export default Introduction;

// import { motion } from "framer-motion";
// import { div } from "framer-motion/client";
// import { useState } from "react";
// import HeaderIntroduction from "../components/HeaderIntroduction";

// const Introduction = () => {
//   const [step, setStep] = useState(1); // Track which step the user is on
//   const [formData, setFormData] = useState({ name: "", location: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleNext = () => {
//     if (step === 1 && formData.name.trim() === "") return;
//     if (step === 2 && formData.location.trim() === "") return;
//     setStep(step + 1);
//   };

//   return (

//     <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-16 py-20">
//       {/* Back Button */}
//       {step > 1 && (
//         <button
//           onClick={() => setStep(step - 1)}
//           className="absolute bottom-10 left-10 text-black flex items-center space-x-2"
//         >
//           <div className="border border-black p-2 flex items-center w-32">
//             ◀ <span className="ml-5">BACK</span>
//           </div>
//         </button>
//       )}

//       {/* Title Section */}
//       <motion.div
//         key={step} // This ensures animations restart on step change
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="text-center text-lg"
//       >
//         <p className="text-gray-500 uppercase tracking-wide text-sm">
//           CLICK TO TYPE
//         </p>
//         <h1 className="text-xl md:text-xl font-bold text-black mt-4">
//           {step === 1 ? "Introduce yourself" : "Where are you from?"}
//         </h1>

//         <motion.div
//           type="text"
//           placeholder="Enter Your Name"
//           onChange={handleChange}
//           className=" relative w-full max-w-[250px] bg-transparent border-b-2 border-black text-center text-4xl font-semibold p-2 focus:outline-none z-50 max-md:max-w-[150px] "
//         >
//           <input
//             type="text"
//             name={step === 1 ? "name" : "location"}
//             placeholder={step === 1 ? "Enter your name" : "Enter your location"}
//             value={step === 1 ? formData.name : formData.location}
//             onChange={handleChange}
//             className="w-full bg-transparent border-black text-center text-2xl p-2 focus:outline-none  max-sm:text-xl"
//           />
//         </motion.div>
//       </motion.div>

//       <motion.div
//         className="absolute w-[400px] h-[400px] border border-dotted border-gray-800 rotate-45 max-md:w-[300px] max-md:h-[300px]"
//         initial={{ scale: 0.8, rotate: 45 }}
//         animate={{ rotate: [45, 405] }}
//         transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
//       ></motion.div>
//       <motion.div
//         className="absolute w-[500px] h-[500px] border border-dotted border-gray-600 rotate-45 max-md:w-[375px] max-md:h-[375px]"
//         initial={{ scale: 0.8, rotate: 45 }}
//         animate={{ rotate: [45, -315] }}
//         transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
//       ></motion.div>
//       <motion.div
//         className="absolute w-[600px] h-[600px] border border-dotted border-gray-400 rotate-45 max-md:w-[450px] max-md:h-[450px]"
//         initial={{ scale: 0.8, rotate: 45 }}
//         animate={{ rotate: [45, 405] }}
//         transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
//       ></motion.div>

//       {/* Proceed Button */}
//       {step < 2 && (
//         <button
//           onClick={handleNext}
//           className="absolute bottom-10 right-10 text-black flex items-center space-x-2 "
//         >
//           <div className="border border-black p-2 flex items-center ">
//             <span className="mr-2">PROCEED</span> ▶
//           </div>
//         </button>
//       )}

//       {/* Start Analysis Button  */}
//       {step === 2 && (
//         <button
//           onClick={() => console.log("Submitting data:", formData)}
//           className="absolute bottom-10 right-10 text-black flex items-center space-x-2"
//         >
//           <div className="border border-black p-2 flex items-center">
//             <span className="mr-2">START ANALYSIS</span> ▶
//           </div>
//         </button>
//       )}
//     </div>
//   );
// };

// export default Introduction;
