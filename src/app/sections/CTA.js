"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import Lottie to prevent SSR hydration mismatch
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Correct animation import (direct path from public)
import blockchainAnimation from "/animations/Card-Animation4.json"; 

const CTA = () => {
  return (
    <section
      id="cta-section"
      className="relative flex flex-col items-center justify-center min-h-screen px-6 md:px-20 py-16 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white overflow-hidden"
    >
      {/* Floating Background Glow */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-green-400/20 rounded-full blur-[180px] opacity-40"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      ></motion.div>

      <motion.div
        className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[150px] opacity-40"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      ></motion.div>

      {/* CTA Content */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl">
        {/* Left Side - Text & Button */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400"
          >
            Ready to Elevate Your Career?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-300 max-w-lg mt-6"
          >
            Join our AI, ML, and Data Science programs and gain hands-on experience from industry experts.
            Take your first step towards an exciting career in technology!
          </motion.p>

          {/* Enroll Now Button */}
          <motion.a
            href="#enrollment-form"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-8 px-8 py-4 text-lg md:text-xl font-semibold bg-green-500 hover:bg-green-400 text-black rounded-xl shadow-lg transition-all duration-300 hover:shadow-green-400/50"
          >
            Enroll Now 🚀
          </motion.a>
        </div>

        {/* Right Side - Lottie Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="w-64 md:w-96"
        >
          <Lottie animationData={blockchainAnimation} loop={true} />
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
