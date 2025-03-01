"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import jitendrasir from "../../../public/images/jitendrasir.png"
const About = () => {
  return (
    <section
      id="about-section"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-20 py-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white"
    >
      {/* Title Section */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400"
      >
        Meet Your Instructor
      </motion.h2>

      {/* Two Column Layout */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-16">
        {/* Left Side: Instructor Profile */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="md:w-1/2 flex flex-col items-center md:items-start"
        >
          <Image 
            src= {jitendrasir} // Replace with uploaded instructor image
            alt="Instructor Image"
            width={320}
            height={320}
            className="rounded-lg shadow-lg border-4 border-green-400"
          />
          <h3 className="text-2xl md:text-3xl font-bold mt-6 text-green-400">Your Instructor - IIT Bombay Alumnus</h3>
          <p className="text-md md:text-lg mt-4 text-gray-300 text-justify">
            With a strong academic background from IIT Bombay and years of experience in AI & Machine Learning, your instructor is dedicated to helping students master AI, ML, and Data Science through hands-on training and real-world projects.
          </p>
        </motion.div>

        {/* Right Side: Course Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="md:w-1/2 text-justify"
        >
          <p className="text-lg md:text-xl mb-6">
          "This AYOMI AI institute is designed and developed under the guidance of the IITian <b><u>"Jitendra Sadangi"</u></b> from IIT Bombay, who was also part of the International Mathematics Olympiad UK 2024 program as an Invigilator and holds IIT JAM AIR 7 Rank. He is also awarded with the Most Prominent Contributors to Innovation February 2023 Award, endorsed by the World Innovation Congress. He has 10+ years of experience."
          </p>

          <ul className="list-none space-y-4 text-md md:text-lg">
            <li>✅ Learn **AI, ML & Data Science** with step-by-step guidance</li>
            <li>✅ Work on **real-world projects** & hands-on labs</li>
            <li>✅ **Industry-ready skills** – Resume preparation & interview guidance</li>
            <li>✅ **Live & interactive sessions** with Q&A and practical applications</li>
          </ul>

          <div className="mt-8 flex justify-center md:justify-start">
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#courses"
              className="inline-block bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 rounded-lg transition-all"
            >
              Explore Courses
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
