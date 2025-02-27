"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import Lottie to prevent SSR hydration mismatch
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Import Lottie Animation
import blockchainAnimation from "../../../public/animations/Card-Animation5.json";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Message Sent Successfully! ✅");
        setFormData({ name: "", email: "", mobile: "", message: "" });
      } else {
        setStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      setStatus("Server Error ❌");
    }
  };

  return (
    <section
      id="contact-section"
      className="relative flex flex-col items-center justify-center min-h-screen px-6 md:px-20 py-16 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white overflow-hidden"
    >
      {/* Floating Background Glow */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-green-400/20 rounded-full blur-[180px] opacity-40 -z-10"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      ></motion.div>

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400"
      >
        Contact Us
      </motion.h2>

      {/* Contact Form & Animation */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl z-20">
        {/* Lottie Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="w-64 md:w-96"
        >
          <Lottie animationData={blockchainAnimation} loop={true} />
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="relative flex flex-col space-y-6 w-full max-w-lg bg-gray-900/95 p-8 rounded-lg shadow-lg border border-gray-700 z-50"
          onSubmit={handleSubmit}
        >
{/* Name */}
<input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-600 focus:border-green-400 focus:outline-none"
            value={formData.name}
            onChange={handleChange}
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-600 focus:border-green-400 focus:outline-none"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Mobile Number */}
          <input
            type="tel"
            name="mobile"
            placeholder="Your Mobile No"
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-600 focus:border-green-400 focus:outline-none"
            value={formData.mobile}
            onChange={handleChange}
          />

          {/* Message */}
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-600 focus:border-green-400 focus:outline-none"
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          {/* Submit Button */}
          <motion.button whileHover={{ scale: 1.05 }} className="w-full py-3 bg-green-500 hover:bg-green-400 text-black font-semibold rounded-lg transition-all z-50" type="submit">
            Send Message 🚀
          </motion.button>

          {/* Status Message */}
          {status && <p className="text-center text-lg text-green-300 mt-4">{status}</p>}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
