import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import HeaderIntroduction from "../components/HeaderIntroduction";

const Select = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-16 py-20">
      {/* Header */}
      <HeaderIntroduction />

      {/* AI Analysis Title */}
      <div className="absolute top-20 left-16">
        <h1 className="text-lg font-bold">A.I. ANALYSIS</h1>
        <p className="text-sm text-gray-500">A.I. has estimated the following.</p>
        <p className="text-sm text-gray-500">Fix estimated information if needed.</p>
      </div>

      {/* Main Selection Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Demographics (Clickable) */}
        <motion.div
          className="bg-gray-100 w-40 h-40 flex items-center justify-center rotate-45 cursor-pointer shadow-lg"
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate("/demographic")}
        >
          <span className="rotate-[-45deg] text-sm font-semibold">Demographics</span>
        </motion.div>

        {/* Cosmetic Concerns */}
        <motion.div
          className="bg-gray-100 w-40 h-40 flex items-center justify-center rotate-45 shadow-lg"
        >
          <span className="rotate-[-45deg] text-sm font-semibold">Cosmetic Concerns</span>
        </motion.div>

        {/* Skin Type Details */}
        <motion.div
          className="bg-gray-100 w-40 h-40 flex items-center justify-center rotate-45 shadow-lg"
        >
          <span className="rotate-[-45deg] text-sm font-semibold">Skin Type Details</span>
        </motion.div>

        {/* Weather */}
        <motion.div
          className="bg-gray-100 w-40 h-40 flex items-center justify-center rotate-45 shadow-lg"
        >
          <span className="rotate-[-45deg] text-sm font-semibold">Weather</span>
        </motion.div>
      </div>

      {/* Back & Home Buttons */}
      <div className="absolute bottom-10 left-10">
        <Link to="/result" className="border border-black p-2 flex items-center">
          ◀ <span className="ml-2">Back</span>
        </Link>
      </div>

      <div className="absolute bottom-10 right-10">
        <Link to="/" className="border border-black p-2 flex items-center">
          <span className="mr-2">Home</span> ▶
        </Link>
      </div>
    </div>
  );
};

export default Select;
