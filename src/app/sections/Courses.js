"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import dataScienceAnimation from "../../../public/animations/Card-Animation1.json";
import aiMlAnimation from "../../../public/animations/Card-Animation2.json";
import blockchainAnimation from "../../../public/animations/Card-Animation3.json";

const courses = [
  {
    id: "data-science",
    title: "Data Science",
    description:
      "Master data science with hands-on projects, Python, R, and real-world data analysis techniques.",
    animationData: dataScienceAnimation,
    syllabusLink: "https://drive.google.com/file/d/1G2YV6Hr_HjunKLXOwS5leqL_bgTHgYGt/view",
  },
  {
    id: "ai-ml",
    title: "AI & ML",
    description:
      "Learn Artificial Intelligence & Machine Learning with real-world AI applications.",
    animationData: aiMlAnimation,
    syllabusLink: "https://drive.google.com/file/d/1G2YV6Hr_HjunKLXOwS5leqL_bgTHgYGt/view",
  },
  {
    id: "blockchain",
    title: "Blockchain",
    description:
      "Dive into blockchain development, smart contracts, decentralized apps, and cryptocurrency fundamentals.",
    animationData: blockchainAnimation,
    syllabusLink: "https://drive.google.com/file/d/1G2YV6Hr_HjunKLXOwS5leqL_bgTHgYGt/view",
  },
];

const Courses = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-20 py-12 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400"
      >
        Our Courses
      </motion.h2>

      {/* Course Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-7xl">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="relative bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 p-8 text-center flex flex-col items-center w-full md:w-[350px] xl:w-[400px] h-auto md:h-[520px] border border-gray-700 hover:border-green-400 hover:shadow-green-400/30"
          >
            {/* Lottie Animation */}
            <div className="w-48 h-48 md:w-56 md:h-56 xl:w-60 xl:h-60 mb-6 bg-gray-800 rounded-xl flex items-center justify-center shadow-lg shadow-black/30">
              <Lottie animationData={course.animationData} loop={true} />
            </div>

            {/* Course Title */}
            <h3 className="text-2xl font-bold text-green-400">{course.title}</h3>

            {/* Course Description */}
            <p className="text-md text-gray-300 mt-3 text-justify px-6 leading-relaxed">
              {course.description}
            </p>

            {/* Download Syllabus Button */}
            <motion.a
              whileHover={{ scale: 1.1 }}
              href={course.syllabusLink}
              download
              className="mt-6 inline-block bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-green-500/50"
            >
              Download Syllabus
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
