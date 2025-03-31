"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import Lottie to prevent SSR hydration mismatch
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import dataScienceAnimation from "../../../public/animations/Card-Animation1.json";
import aiMlAnimation from "../../../public/animations/Card-Animation2.json";
import blockchainAnimation from "../../../public/animations/Card-Animation3.json";
// Placeholder animation for new courses
import Automation from "../../../public/animations/Automation";
import Full_stack from "../../../public/animations/fullstackdeveloper.json";
import MERN from "../../../public/animations/MERN.json";

const courses = [
  {
    id: "data-science",
    title: "Data Science",
    description:
      "Master data science with hands-on projects, Python, R, and real-world data analysis techniques.",
    animationData: dataScienceAnimation,
    // syllabusLink:
      // "https://www.canva.com/design/DAGge2fAunw/M2UomxV5SXblr0WL0LRlbw/view?utm_content=DAGge2fAunw&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hdd60e2ba79",
  },
  {
    id: "ai-ml",
    title: "AI & ML",
    description:
      "Learn Artificial Intelligence & Machine Learning with real-world AI applications.",
    animationData: aiMlAnimation,
    // syllabusLink:
      // "https://www.canva.com/design/DAGgfBlC2pI/J3qOy0CNkpEusSYTKeAR2w/view?utm_content=DAGgfBlC2pI&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h8d9d48e939",
  },
  {
    id: "blockchain",
    title: "Blockchain",
    description:
      "Dive into blockchain development, smart contracts, decentralized apps, and cryptocurrency fundamentals.",
    animationData: blockchainAnimation,
  // /  syllabusLink:
    // /  "https://www.canva.com/design/DAGgfGFm7DM/XoeApVUjq5ag1GMRNjCq5w/view?utm_content=DAGgfGFm7DM&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb7537b69c3",
  },
  // New courses without syllabus links
  {
    id: "full-stack-developer",
    title: "Full-stack Developer",
    description:
      "Learn front-end and back-end technologies to build complete web applications.",
    animationData: Full_stack,
  },
  {
    id: "automation-tester",
    title: "Automation Tester",
    description:
      "Master automated testing tools and frameworks for robust software quality assurance.",
    animationData: Automation,
  },
  {
    id: "mern-stack-developer",
    title: "MERN Stack Developer",
    description:
      "Develop full-stack applications using MongoDB, Express, React, and Node.js.",
    animationData: MERN,
  },
  // {
  //   id: "ibm-mainrame",
  //   title: "IBM Mainrame",
  //   description:
  //     "Explore legacy systems and modern approaches in IBM mainframe computing.",
  //   animationData: placeholderAnimation,
  // },
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

            {/* Conditionally render the Download Syllabus Button */}
            {course.syllabusLink && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                target="_blank"
                rel="noopener noreferrer"
                href={course.syllabusLink}
                download
                className="mt-6 inline-block bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-green-500/50"
              >
                View Syllabus
              </motion.a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
