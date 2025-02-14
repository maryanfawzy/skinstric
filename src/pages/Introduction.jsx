import { motion } from "framer-motion";
import { useState } from "react";

const Introduction = () => {
  const [step, setStep] = useState(1); // Track which step the user is on
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
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-16 py-20">
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
        key={step} // This ensures animations restart on step change
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <p className="text-gray-500 uppercase tracking-wide text-sm">CLICK TO TYPE</p>
        <h1 className="text-6xl md:text-8xl font-bold text-black mt-4">
          {step === 1 ? "Introduce yourself" : "Where are you from?"}
        </h1>
      </motion.div>

      {/* Input Field */}
      <motion.div
        key={`input-${step}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="mt-8 w-full max-w-md"
      >
        <input
          type="text"
          name={step === 1 ? "name" : "location"}
          placeholder={step === 1 ? "Enter your name" : "Enter your location"}
          value={step === 1 ? formData.name : formData.location}
          onChange={handleChange}
          className="w-full bg-transparent border-b-2 border-black text-center text-2xl p-2 focus:outline-none"
        />
      </motion.div>

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

      {/* Start Analysis Button (Final Step) */}
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
