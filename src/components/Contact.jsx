import { motion } from "framer-motion";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 md:px-16 py-20">
      {/* Contact Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-bold text-black text-center mb-10"
      >
        Let's <span className="underline decoration-black">Connect</span>
      </motion.h2>

      {/* Contact Form */}
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-lg max-w-lg w-full"
      >
        <div className="mb-4">
          <label className="block text-black font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black font-medium mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition"
        >
          Send Message
        </button>
      </motion.form>
    </section>
  );
};

export default Contact;
