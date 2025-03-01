"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Testimonials data with unique styles
const testimonialsData = [
  {
    name: "Tejashree Gaidhani",
    location: "Pune, India",
    image: "/images/tejashreeMaam.png",
    feedback:
      "The AI & ML course was phenomenal! The hands-on projects and in-depth explanations helped me land my dream job in Data Science.",
    bgColor: "bg-gradient-to-r from-yellow-500 to-yellow-800",
    textColor: "text-yellow-300",
    borderColor: "border-yellow-400",
    isFeatured: true, // This will be emphasized
  },
  {
    name: "Prem Sadangi",
    location: "Pune, India",
    image: "/images/sanu.png",
    feedback:
      "I had zero knowledge of AI before joining. The structured learning path and real-world projects gave me confidence in the field!",
    bgColor: "bg-gradient-to-r from-green-500 to-green-800",
    textColor: "text-green-300",
    borderColor: "border-green-400",
  },
  {
    name: "Uttara Sawant",
    location: "Pen, India",
    image: "/images/uttara.png",
    feedback:
      "The best decision I made was enrolling in this course. The interactive sessions and expert mentorship helped me upskill efficiently.",
    bgColor: "bg-gradient-to-r from-blue-500 to-blue-800",
    textColor: "text-blue-300",
    borderColor: "border-blue-400",
  },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  // Ensure hydration issue is avoided by loading data only on mount
  useEffect(() => {
    setTestimonials(testimonialsData);
  }, []);

  return (
    <section
      id="testimonials-section"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-20 py-12 bg-gray-900 text-white overflow-hidden"
    >
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400"
      >
        What Our Students Say
      </motion.h2>

      {/* Testimonials Container */}
      <div className="relative w-full max-w-7xl flex flex-col items-center md:items-start">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name} // ✅ Unique key for hydration fix
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.3 }}
            viewport={{ once: true }}
            className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 p-6 md:p-10 rounded-xl shadow-lg w-full max-w-4xl 
              ${testimonial.bgColor} ${index % 2 === 0 ? "md:ml-0 md:mr-auto" : "md:ml-auto md:mr-0"} mb-8`}
          >
            {/* Testimonial Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.3 }}
              viewport={{ once: true }}
              className={`rounded-full overflow-hidden border-4 shadow-md ${testimonial.borderColor} ${
                testimonial.isFeatured
                  ? "w-44 h-44 md:w-56 md:h-56" // Bigger for featured
                  : "w-32 h-32 md:w-48 md:h-48"
              }`}
            >
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </motion.div>

            {/* Testimonial Content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col text-center md:text-left"
            >
              <p className={`text-lg italic ${testimonial.textColor} text-xl md:text-2xl font-semibold`}>
                "{testimonial.feedback}"
              </p>
              <h3 className={`mt-4 text-lg md:text-xl font-bold ${testimonial.textColor}`}>
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-300">{testimonial.location}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Floating Background Elements for Aesthetic Appeal */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-green-400/10 rounded-full blur-3xl opacity-30"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      ></motion.div>

      <motion.div
        className="absolute bottom-0 right-1/3 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl opacity-30"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      ></motion.div>
    </section>
  );
};

export default Testimonials;
