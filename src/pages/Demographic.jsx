import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeaderIntroduction from "../components/HeaderIntroduction";
import { useEffect } from "react";






const Demographic = () => {
  useEffect(() => {
    return () => {
      console.log("🚀 Clearing all stored data when leaving the Demographics Page...");
      localStorage.removeItem("aiAnalysis"); // Clear API response
      localStorage.removeItem("capturedPhoto"); // Clear the captured photo
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-16 py-20">
      {/* Header */}
      <HeaderIntroduction />

      {/* Title Section */}
      <div className="text-left w-full max-w-5xl">
        <p className="text-gray-500 uppercase tracking-wide text-sm">A.I. ANALYSIS</p>
        <h1 className="text-5xl md:text-7xl font-semibold text-black mt-2">DEMOGRAPHICS</h1>
        <p className="text-gray-500 text-lg mt-2">PREDICTED RACE & AGE</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-wrap justify-between items-center w-full max-w-5xl mt-10">
        {/* Left - Race, Age, Gender */}
        <div className="w-1/4 bg-gray-100 p-6 rounded-lg">
          <div className="mb-4 bg-black text-white p-4 rounded-lg">
            <p className="text-sm font-semibold">RACE</p>
            <p className="text-lg">BLACK</p>
          </div>
          <div className="mb-4 bg-gray-200 p-4 rounded-lg">
            <p className="text-sm font-semibold">AGE</p>
            <p className="text-lg">3-9</p>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg">
            <p className="text-sm font-semibold">GENDER</p>
            <p className="text-lg">MALE</p>
          </div>
        </div>

        {/* Center - Circular Confidence */}
        <div className="w-1/3 flex justify-center">
          <motion.div
            className="relative w-48 h-48 flex items-center justify-center bg-gray-100 rounded-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          >
            <svg className="w-48 h-48 transform -rotate-90">
              <circle cx="50%" cy="50%" r="40%" stroke="lightgray" strokeWidth="8" fill="none" />
              <motion.circle
                cx="50%" cy="50%"
                r="40%"
                stroke="black"
                strokeWidth="8"
                fill="none"
                strokeDasharray="251.2"
                strokeDashoffset="25"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 25 }}
                transition={{ duration: 2 }}
              />
            </svg>
            <span className="absolute text-3xl font-bold">91%</span>
          </motion.div>
        </div>

        {/* Right - A.I. Confidence Chart */}
        <div className="w-1/3 bg-gray-100 p-6 rounded-lg">
          <p className="text-sm font-semibold">A.I. CONFIDENCE</p>
          <div className="mt-4">
            {[
              { label: "Black", value: 91.4 },
              { label: "East Asian", value: 6.3 },
              { label: "South Asian", value: 1.3 },
              { label: "Southeast Asian", value: 0.3 },
              { label: "Middle Eastern", value: 0.2 },
              { label: "White", value: 0.2 },
              { label: "Latino Hispanic", value: 0.2 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between my-1">
                <p className="text-sm">{item.label}</p>
                <div className="w-28 h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
                <p className="text-sm">{item.value}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <Link
        to="/select"
        className="absolute bottom-10 left-10 text-black flex items-center space-x-2"
      >
        <div className="border border-black p-2 flex items-center">
          ◀ <span className="ml-2">BACK</span>
        </div>
      </Link>
    </div>
  );
};

export default Demographic;
