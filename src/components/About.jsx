import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 md:px-16 py-20">
      {/* About Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-bold text-black text-center mb-10"
      >
        The Science Behind <br />
        <span className="underline decoration-black">Custom Skincare</span>
      </motion.h2>

      {/* About Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl">
        {/* Left Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-gray-700 text-lg leading-relaxed"
        >
          <p>
            Skinstric provides **premium skincare solutions** backed by **clinical research**.
            Our formulations are tailored to meet the **unique needs** of every individual,
            ensuring **maximum effectiveness** and **skin health**.
          </p>
          <br />
          <p>
            Using **proprietary AI-driven algorithms**, we analyze skin profiles to deliver
            **customized skincare formulas**. Our commitment to **science and quality**
            guarantees FDA / TGA approved **compound solutions**.
          </p>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <img
            src="/images/about-image.png" // Add your image here
            alt="Custom Skincare"
            className="w-full max-w-lg rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
