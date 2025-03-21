"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonialsData = [
  {
    name: "Tejashree Gaidhani",
    location: "Pune, India",
    image: "/images/tejashreeMaam.png",
    feedback:
      "This is one of the best courses designed, perfectly structured for students. As part of the course creation team, I can confidently say that the hands-on learning experience makes it a must for anyone looking to excel in AI & ML.",
    bgColor: "bg-gradient-to-r from-yellow-500 to-yellow-800",
    textColor: "text-yellow-300",
    borderColor: "border-yellow-400",
  },
  {
    name: "Premchand Sadangi",
    location: "Odisha, India",
    image: "/images/sanu.png",
    feedback:
      "I did this course and got a job in AI/ML and Python. The structured approach and real-world projects helped me master the concepts with confidence.",
    bgColor: "bg-gradient-to-r from-green-500 to-green-800",
    textColor: "text-green-300",
    borderColor: "border-green-400",
  },
  {
    name: "Uttara Sawant",
    location: "Pune, India",
    image: "/images/uttara.png",
    feedback:
      "I did this course and secured a job at the same company that designed the curriculum. The industry-relevant projects and expert mentorship played a crucial role in my career transition.",
    bgColor: "bg-gradient-to-r from-blue-500 to-blue-800",
    textColor: "text-blue-300",
    borderColor: "border-blue-400",
  },
  {
    name: "Balu Gayke",
    location: "Mumbai, India",
    image: "/images/balu.png",
    feedback:
      "This course transformed my understanding of AI & ML. The real-world case studies and hands-on approach helped me land my first AI research internship!",
    bgColor: "bg-gradient-to-r from-purple-500 to-purple-800",
    textColor: "text-purple-300",
    borderColor: "border-purple-400",
  },
  {
    name: "Sankalp Racchewar",
    location: "Nanded, India",
    image: "/images/me.png",
    feedback:
      "From beginner to expert, this course guided me through every step. The interactive lessons and practical assignments helped me secure a job as a data analyst.",
    bgColor: "bg-gradient-to-r from-pink-500 to-pink-800",
    textColor: "text-pink-300",
    borderColor: "border-pink-400",
  },
  {
    name: "Snehal Kathale",
    location: "Pune, India",
    image: "/images/snehal.png",
    feedback:
      "This course was a game-changer! The support from mentors and the in-depth content helped me switch careers and become an AI engineer.",
    bgColor: "bg-gradient-to-r from-red-500 to-red-800",
    textColor: "text-red-300",
    borderColor: "border-red-400",
  },
  {
    name: "Harikrishna Boomen",
    location: "Solapur, India",
    image: "/images/hari.png",
    feedback:
      "This program gave me the confidence to work on AI/ML projects from scratch. The mentorship and hands-on experience made all the difference in my learning journey.",
    bgColor: "bg-gradient-to-r from-teal-500 to-teal-800",
    textColor: "text-teal-300",
    borderColor: "border-teal-400",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const totalTestimonials = testimonialsData.length;

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setDirection(1);
      setIndex((prev) => (prev + 1) % totalTestimonials);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setDirection(-1);
      setIndex((prev) => (prev === 0 ? totalTestimonials - 1 : prev - 1));
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction === 1 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, onComplete: () => setIsAnimating(false) },
    },
    exit: (direction) => ({
      x: direction === 1 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-12 bg-gray-900 text-white overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400"
      >
        What Our Students and COO Say
      </motion.h2>

      <div className="relative w-full max-w-6xl h-[600px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              w-[80vw] md:w-[60vw] flex flex-col items-center text-center 
              px-6 py-10 rounded-xl shadow-lg border-4 
              ${testimonialsData[index].bgColor} ${testimonialsData[index].borderColor}`}
            style={{ originX: 0.5, originY: 0.5 }}
          >
            <div className="rounded-full overflow-hidden border-4 shadow-md w-32 h-32 md:w-48 md:h-48">
              <Image
                src={testimonialsData[index].image}
                alt={testimonialsData[index].name}
                width={200}
                height={200}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <p className={`mt-6 text-lg italic ${testimonialsData[index].textColor} text-xl md:text-2xl font-semibold`}>
              "{testimonialsData[index].feedback}"
            </p>
            <h3 className={`mt-4 text-lg md:text-xl font-bold ${testimonialsData[index].textColor}`}>
              {testimonialsData[index].name}
            </h3>
            <p className="text-sm text-gray-300">{testimonialsData[index].location}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-8">
        <button
          onClick={handlePrev}
          className="text-white bg-gray-800 p-3 rounded-full hover:bg-gray-700"
          disabled={isAnimating}
        >
          <ChevronLeft size={30} />
        </button>
        <button
          onClick={handleNext}
          className="text-white bg-gray-800 p-3 rounded-full hover:bg-gray-700"
          disabled={isAnimating}
        >
          <ChevronRight size={30} />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
