import { motion } from "framer-motion";

const servicesData = [
  {
    title: "Proprietary Algorithms",
    description: "For effective formula design based on scientific research.",
  },
  {
    title: "Complete Control",
    description: "Over skincare ingredients to ensure customized solutions.",
  },
  {
    title: "Expert Clinical Guidance",
    description: "Diagnostics and personalized recommendations from experts.",
  },
  {
    title: "Fully Customizable",
    description: "Skincare designed from scratch for unique skin needs.",
  },
  {
    title: "FDA / TGA Approved",
    description: "Using only approved compound pharmacies for safety and quality.",
  },
];

const Services = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 md:px-16 py-20">
      {/* Services Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-bold text-black text-center mb-10"
      >
        Our <span className="underline decoration-black">Services</span>
      </motion.h2>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl">
        {servicesData.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.2 }}
            className="p-6 bg-white shadow-lg rounded-lg text-center"
          >
            <h3 className="text-xl font-semibold text-black mb-4">{service.title}</h3>
            <p className="text-gray-700">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
