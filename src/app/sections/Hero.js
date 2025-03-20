"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import Lottie to prevent SSR hydration mismatch
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Import AI-Themed Lottie Animation
import aiAnimation from "../../../public/animations/hero-animation2.json"; 

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-transparent to-blue-400/20 blur-3xl opacity-50  "></div>

      {/* Floating AI Animation (Only One) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-72 md:w-96"
      >
        <Lottie animationData={aiAnimation} loop={true} />
      </motion.div>

      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mt-6  "
      >
        <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
          AI Classes
        </h1>
        <p className="text-lg md:text-xl mt-3 text-gray-300">
          Learn AI, Machine Learning, and Data Science with Experts
        </p>

        {/* CTA Button (Fixed Clickability) */}
        <motion.a
          whileHover={{ scale: 1.1 }}
          href="workshop"
          className="inline-block bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 mt-5 rounded-lg transition-all   relative"
        >
          Join Free Workshop
        </motion.a>
      </motion.div>

      {/* Removed Duplicate Animation to Prevent Repeating Image */}
    </section>
  );
};

export default Hero;
