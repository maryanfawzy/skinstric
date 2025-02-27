





import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import HeaderIntroduction from "../components/HeaderIntroduction";
import { useNavigate } from "react-router-dom";
const API_URL = "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne";

const Introduction = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    // Load saved data from localStorage (if available)
    return {
      name: localStorage.getItem("name") || "",
      location: localStorage.getItem("location") || "",
    };
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Save form data to localStorage on every change
    localStorage.setItem("name", formData.name);
    localStorage.setItem("location", formData.location);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1 && formData.name.trim() === "") return;
    if (step === 2 && formData.location.trim() === "") return;
    setStep(step + 1);
  };



  const handleSubmit = async () => {
    setLoading(true);
    setError("");
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const responseData = await response.json(); // Try to parse JSON response
      console.log("API Response:", responseData);
  
      if (!response.ok) {
        throw new Error(`API Error: ${responseData.message || "Unknown error"}`);
      }
  
      console.log("Data submitted successfully:", formData);
      alert("Data submitted successfully!");
  
      // Clear localStorage after successful submission
      localStorage.removeItem("name");
      localStorage.removeItem("location");
      navigate("/result");
  
    } catch (err) {
      console.error("Error submitting data:", err);
      setError("Error submitting data. Please try again.");
    } finally {
      setLoading(false);
    }
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

        <motion.div className="relative w-full max-w-[250px] bg-transparent border-b-2 border-black text-center text-4xl font-semibold p-2 focus:outline-none z-50 max-md:max-w-[150px]">
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
          onClick={handleSubmit}
          disabled={loading}
          className="absolute bottom-10 right-10 text-black flex items-center space-x-2"
        >
          <div className="border border-black p-2 flex items-center">
            {loading ? <span className="mr-2">LOADING...</span> : <span className="mr-2">START ANALYSIS</span>} ▶
          </div>
        </button>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Introduction;





