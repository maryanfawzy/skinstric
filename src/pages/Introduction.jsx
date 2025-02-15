import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const Introduction = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", location: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1 && formData.name.trim() === "") return;
    if (step === 2 && formData.location.trim() === "") return;
    setStep(step + 1);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-16 py-20 overflow-hidden">
      {/* Top Left Text */}
      <div className="absolute top-10 left-10 text-black text-sm md:text-base">
        <p className="font-semibold">SKINSTRIC</p>
        <p className="mt-2">TO START ANALYSIS</p>
      </div>

      {/* Back Button */}
      {step > 1 && (
        <button
          onClick={() => setStep(step - 1)}
          className="absolute bottom-10 left-10 text-black flex items-center space-x-2"
        >
          <div className="border border-black p-2 flex items-center">
            ◀ <span className="ml-2">BACK</span>
          </div>
        </button>
      )}

      {/* Title Section */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <p className="text-gray-500 uppercase tracking-wide text-sm">CLICK TO TYPE</p>
        <h1 className="text-5xl md:text- font-semibold text-black mt-4">
          Intrduce your self
        </h1>

         {/* Input Field  */}
      <motion.div
        key={`input-${step}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 1 }}
        transition={{ duration: 10}}
        className="absolute top-[62%] right-[26%] transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md"
      >
        <input
          type="text"
          placeholder= 'Enter Your Name'
          onChange={handleChange}
          className="w-full bg-transparent border-b-2 border-black text-center text-4xl font-semibold p-2 focus:outline-none max-w-xs "
        />
      </motion.div>
      </motion.div>

     

      {/* Animated Rotating Dotted Borders */}
      <motion.div
        className="absolute w-[400px] h-[400px] border border-dotted border-gray-400 rotate-45"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, rotate: 360 }}
        transition={{ duration: 29, repeat: Infinity, ease:'linear' }}
      ></motion.div>
      <motion.div
        className="absolute w-[500px] h-[500px] border border-dotted border-gray-500 rotate-45"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      ></motion.div>
      <motion.div
        className="absolute w-[600px] h-[600px] border border-dotted border-gray-400 rotate-45"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
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
    </div>
  );
};

export default Introduction;











// import { motion } from "framer-motion";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// const Introduction = () => {
//   const [step, setStep] = useState(1);
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
//     <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-16 py-20 overflow-hidden">
//       {/* Top Left Text */}
//       <div className="absolute top-10 left-10 text-black text-sm md:text-base font-semibold">
//         <p>SKINSTRIC</p>
//         <p>TO START ANALYSIS</p>
//       </div>

     

// export default Introduction;























// import { motion } from "framer-motion";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// const Introduction = () => {
//   const [step, setStep] = useState(1);
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
//     <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-16 py-20 overflow-hidden">
//       {/* Top Left Text */}
//       <div className="absolute top-10 left-10 text-black text-sm md:text-base">
//         <p className="font-semibold">SKINSTRIC</p>
//         <p className="mt-2">TO START ANALYSIS</p>
//       </div>

//       {/* Back Button */}
//       {step > 1 && (
//         <button
//           onClick={() => setStep(step - 1)}
//           className="absolute bottom-10 left-10 text-black flex items-center space-x-2"
//         >
//           <div className="border border-black p-2 flex items-center">
//             ◀ <span className="ml-2">BACK</span>
//           </div>
//         </button>
//       )}

//       {/* Title Section */}
//       <motion.div
//         key={step}
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="text-center"
//       >
//         <p className="text-gray-500 uppercase tracking-wide text-sm">CLICK TO TYPE</p>
//         <h1 className="text-5xl md:text-7xl font-semibold text-black mt-4">
//           {step === 1 ? "Introduce yourself" : "Where are you from?"}
//         </h1>
//       </motion.div>

//       {/* Input Field - Positioned Exactly */}
//       <motion.div
//         key={`input-${step}`}
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1.2 }}
//         className="absolute top-[58%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md"
//       >
//         <input
//           type="text"
//           name={step === 1 ? "name" : "location"}
//           placeholder={step === 1 ? "Enter your name" : "Enter your location"}
//           value={step === 1 ? formData.name : formData.location}
//           onChange={handleChange}
//           className="w-full bg-transparent border-b-2 border-black text-center text-4xl font-semibold p-2 focus:outline-none"
//         />
//       </motion.div>

//       {/* Proceed Button */}
//       {step < 2 && (
//         <button
//           onClick={handleNext}
//           className="absolute bottom-10 right-10 text-black flex items-center space-x-2"
//         >
//           <div className="border border-black p-2 flex items-center">
//             <span className="mr-2">PROCEED</span> ▶
//           </div>
//         </button>
//       )}
//     </div>
//   );
// };

// export default Introduction;




// import { motion } from "framer-motion";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// const Introduction = () => {
//   const [step, setStep] = useState(1);
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
//     <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-16 py-20 overflow-hidden">
//       {/* Top Left Text */}
//       <div className="absolute top-10 left-10 text-black text-sm md:text-base">
//         <p className="font-semibold">SKINSTRIC</p>
//         <p className="mt-2">TO START ANALYSIS</p>
//       </div>

//       {/* Back Button */}
//       {step > 1 && (
//         <button
//           onClick={() => setStep(step - 1)}
//           className="absolute bottom-10 left-10 text-black flex items-center space-x-2"
//         >
//           <div className="border border-black p-2 flex items-center">
//             ◀ <span className="ml-2">BACK</span>
//           </div>
//         </button>
//       )}

//       {/* Title Section */}
//       <motion.div
//         key={step}
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="text-center"
//       >
//         <p className="text-gray-500 uppercase tracking-wide text-sm">CLICK TO TYPE</p>
//         <h1 className="text-5xl md:text-7xl font-semibold text-black mt-4">
//           {step === 1 ? "Introduce yourself" : "Where are you from?"}
//         </h1>
//       </motion.div>

//       {/* Input Field - Positioned Exactly */}
//       <motion.div
//         key={`input-${step}`}
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1.2 }}
//         className="absolute top-[62%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md"
//       >
//         <input
//           type="text"
//           name={step === 1 ? "name" : "location"}
//           placeholder={step === 1 ? "Enter your name" : "Enter your location"}
//           value={step === 1 ? formData.name : formData.location}
//           onChange={handleChange}
//           className="w-full bg-transparent border-b-2 border-black text-center text-4xl font-semibold p-2 focus:outline-none"
//         />
//       </motion.div>

//       {/* Animated Rotating Dotted Borders */}
//       <motion.div
//         className="absolute w-[400px] h-[400px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: 360 }}
//         transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//       ></motion.div>
//       <motion.div
//         className="absolute w-[500px] h-[500px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: -360 }}
//         transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//       ></motion.div>
//       <motion.div
//         className="absolute w-[600px] h-[600px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: 360 }}
//         transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//       ></motion.div>

//       {/* Proceed Button */}
//       {step < 2 && (
//         <button
//           onClick={handleNext}
//           className="absolute bottom-10 right-10 text-black flex items-center space-x-2"
//         >
//           <div className="border border-black p-2 flex items-center">
//             <span className="mr-2">PROCEED</span> ▶
//           </div>
//         </button>
//       )}
//     </div>
//   );
// };

// export default Introduction;






//  import { motion } from "framer-motion";
//  import { useState } from "react";
//  import { Link } from "react-router-dom";

//  const Introduction = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({ name: "", location: "" });

//   const handleChange = (e) => {
//      setFormData({ ...formData, [e.target.name]: e.target.value });
//    };

//  const handleNext = () => {
//      if (step === 1 && formData.name.trim() === "") return;
//      if (step === 2 && formData.location.trim() === "") return;
//     setStep(step + 1);
//    };

//    return (
//      <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-16 py-20 overflow-hidden">
//        {/* Top Left Text */}
//        <div className="absolute top-10 left-10 text-black text-sm md:text-base">
//          <p className="font-semibold">SKINSTRIC</p>
//          <p className="mt-2">TO START ANALYSIS</p>
// </div>

//        {/* Back Button */}
//        {step > 1 && (
//          <button
//           onClick={() => setStep(step - 1)}
//           className="absolute bottom-10 left-10 text-black flex items-center space-x-2"
//         >
//           <div className="border border-black p-2 flex items-center">
//             ◀ <span className="ml-2">BACK</span>
//           </div>
//         </button>
//       )}

//       {/* Title Section */}
//       <motion.div
//         key={step}
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="text-center"
//       >
//         <p className="text-gray-500 uppercase tracking-wide text-sm">CLICK TO TYPE</p>
//         <h1 className="text-5xl md:text-7xl font-semibold text-black mt-4">
//           {step === 1 ? "Introduce yourself" : "Where are you from?"}
//         </h1>
//       </motion.div>

//       {/* Input Field - Positioned Exactly */}
//       <motion.div
//         key={`input-${step}`}
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1.2 }}
//         className="absolute top-[62%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md"
//       >
//         <input
//           type="text"
//           name={step === 1 ? "name" : "location"}
//           placeholder={step === 1 ? "Enter your name" : "Enter your location"}
//           value={step === 1 ? formData.name : formData.location}
//           onChange={handleChange}
//           className="w-full bg-transparent border-b-2 border-black text-center text-4xl font-semibold p-2 focus:outline-none"
//         />
//       </motion.div>

//       {/* Animated Rotating Dotted Borders */}
//       <motion.div
//         className="absolute w-[400px] h-[400px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: 360 }}
//         transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//       ></motion.div>
//       <motion.div
//         className="absolute w-[500px] h-[500px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: -360 }}
//         transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//       ></motion.div>
//       <motion.div
//         className="absolute w-[600px] h-[600px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: 360 }}
//         transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//       ></motion.div>

//       {/* Proceed Button */}
//       {step < 2 && (
//         <button
//           onClick={handleNext}
//           className="absolute bottom-10 right-10 text-black flex items-center space-x-2"
//         >
//           <div className="border border-black p-2 flex items-center">
//             <span className="mr-2">PROCEED</span> ▶
//           </div>
//         </button>
//       )}
//     </div>
//   );
// };

// export default Introduction;




// import { motion } from "framer-motion";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// const Introduction = () => {
//   const [step, setStep] = useState(1);
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
//     <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-16 py-20 overflow-hidden">
//       {/* Top Left Text */}
//       <div className="absolute top-10 left-10 text-black text-sm md:text-base">
//         <p className="font-semibold">SKINSTRIC</p>
//         <p className="mt-2">TO START ANALYSIS</p>
//       </div>

//       {/* Back Button */}
//       {step > 1 && (
//         <button
//           onClick={() => setStep(step - 1)}
//           className="absolute bottom-10 left-10 text-black flex items-center space-x-2"
//         >
//           <div className="border border-black p-2 flex items-center">
//             ◀ <span className="ml-2">BACK</span>
//           </div>
//         </button>
//       )}

//       {/* Title Section */}
//       <motion.div
//         key={step}
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="text-center"
//       >
//         <p className="text-gray-500 uppercase tracking-wide text-sm">CLICK TO TYPE</p>
//         <h1 className="text-5xl md:text- font-semibold text-black mt-4">
//           Intrduce your self
//         </h1>
//       </motion.div>

//       {/* Input Field  */}
//       <motion.div
//         key={`input-${step}`}
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 1 }}
//         transition={{ duration: 10}}
//         className="absolute top-[62%] right-[26%] transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md"
//       >
//         <input
//           type="text"
//           placeholder= 'Enter Your Name'
//           onChange={handleChange}
//           className="w-full bg-transparent border-b-2 border-black text-center text-4xl font-semibold p-2 focus:outline-none max-w-xs "
//         />
//       </motion.div>

//       {/* Animated Rotating Dotted Borders */}
//       <motion.div
//         className="absolute w-[400px] h-[400px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: 360 }}
//         transition={{ duration: 29, repeat: Infinity, ease:'linear' }}
//       ></motion.div>
//       <motion.div
//         className="absolute w-[500px] h-[500px] border border-dotted border-gray-500 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: -360 }}
//         transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
//       ></motion.div>
//       <motion.div
//         className="absolute w-[600px] h-[600px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: 360 }}
//         transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
//       ></motion.div>

//       {/* Proceed Button */}
//       {step < 2 && (
//         <button
//           onClick={handleNext}
//           className="absolute bottom-10 right-10 text-black flex items-center space-x-2"
//         >
//           <div className="border border-black p-2 flex items-center">
//             <span className="mr-2">PROCEED</span> ▶
//           </div>
//         </button>
//       )}
//     </div>
//   );
// };

// export default Introduction;




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



//     <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-16 py-20 overflow-hidden">
//           {/* Top Left Text */}
//           <div className="absolute top-10 left-10 text-black text-sm md:text-base font-semibold">
//              <p>SKINSTRIC</p>
//             <p>TO START ANALYSIS</p>
//           </div>

// <div>
    // <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-16 py-20">
      {/* Back Button */}
      //  {step > 1 && (
      //    <button
      //      onClick={() => setStep(step - 1)}
      //      className="absolute bottom-10 left-10 text-black flex items-center space-x-2"
      //    >
      //      <div className="border border-black p-2 flex items-center">
      //       ◀ <span className="ml-2">BACK</span>
      //      </div>
      //    </button>
      //  )}

      // {/* Title Section */}
      // <motion.div
      //   key={step} // This ensures animations restart on step change
      //   initial={{ opacity: 0, y: 50 }}
      //   animate={{ opacity: 1, y: 0 }}
      //   transition={{ duration: 1 }}
      //   className="text-center text-lg"
      // >
      //   <p className="text-gray-500 uppercase tracking-wide text-sm">CLICK TO TYPE</p>
      //   <h1 className="text-xl md:text-xl font-bold text-black mt-4">
      //     {step === 1 ? "Introduce yourself" : "Where are you from?"}
      //   </h1>
      // </motion.div>

      {/* Input Field */}
      // <motion.div
        // key={`input-${step}`}
        // initial={{ opacity: 0, y: 50 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 1.2 }}
        // className="mt-8 w-full max-w-md"
      //   type="text"
      //   placeholder= 'Enter Your Name'
      //   onChange={handleChange}
      //   className="w-full bg-transparent border-b-2 border-black text-center text-4xl font-semibold p-2 focus:outline-none max-w-xs "

      // >
      //   <input
      //     type="text"
      //     name={step === 1 ? "name" : "location"}
      //     placeholder={step === 1 ? "Enter your name" : "Enter your location"}
      //     value={step === 1 ? formData.name : formData.location}
      //     onChange={handleChange}
      //     className="w-full bg-transparent border-black text-center text-2xl p-2 focus:outline-none  max-sm:text-xl"
      //   />
      // </motion.div>



      {/* <motion.div
        className="absolute w-[400px] h-[400px] border border-dotted border-gray-400 rotate-45"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, rotate: 360 }}
        transition={{ duration: 29, repeat: Infinity, ease:'linear' }}
      ></motion.div>
      <motion.div
        className="absolute w-[500px] h-[500px] border border-dotted border-gray-500 rotate-45"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      ></motion.div>
      <motion.div
        className="absolute w-[600px] h-[600px] border border-dotted border-gray-400 rotate-45"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      ></motion.div> */}











      {/* Proceed Button */}
      // {step < 2 && (
      //   <button
      //     onClick={handleNext}
      //     className="absolute bottom-10 right-10 text-black flex items-center space-x-2 "
      //   >
      //     <div className="border border-black p-2 flex items-center ">
      //       <span className="mr-2">PROCEED</span> ▶
      //     </div>
      //   </button>
      // )}

      {/* Start Analysis Button  */}
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



