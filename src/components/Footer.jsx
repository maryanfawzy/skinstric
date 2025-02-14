import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-black text-white py-10"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center">
        {/* Footer Left - Logo */}
        <div className="text-xl font-bold uppercase">
          SKINSTRIC
        </div>

        {/* Footer Middle - Links */}
        <div className="flex space-x-6 text-sm text-gray-400 mt-6 md:mt-0">
          <a href="/" className="hover:text-white transition">Home</a>
          <a href="/about" className="hover:text-white transition">About</a>
          <a href="/services" className="hover:text-white transition">Services</a>
          <a href="/contact" className="hover:text-white transition">Contact</a>
        </div>

        {/* Footer Right - Copyright */}
        <div className="text-gray-500 text-sm mt-6 md:mt-0">
          © {new Date().getFullYear()} Skinstric. All Rights Reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
