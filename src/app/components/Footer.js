"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import Map component to prevent SSR issues
const Map = dynamic(() => import("./Map"), { ssr: false });

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-white py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section - Contact Details */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <h2 className="text-3xl font-bold text-green-400">AYOMI IT SERVICES AND TRAINING CENTER</h2>
          <p className="text-lg text-gray-300 mt-2">Secure Your Future in AI & Data Science</p>

          {/* Address */}
          <div className="mt-4">
            <p className="flex items-center text-gray-400">
              📍 <span className="ml-2">Office No 9, Nal Stop, Apex Colony, Erandwane, Pune - 411004</span>
            </p>
            <p className="flex items-center text-gray-400 mt-2">
              📞 <span className="ml-2">For Assistance:+91 87883 52103</span>
            </p>
            <p className="flex items-center text-gray-400 mt-2">
              📞 <span className="ml-2">Front Desk: +91 878-8352103</span>
            </p>
          </div>
        </motion.div>

        {/* Right Section - Embedded Google Map */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-8 md:mt-0 w-full md:w-96 h-56 rounded-lg overflow-hidden shadow-lg"
        >
          <Map />
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-500 text-sm mt-6">
        © {new Date().getFullYear()} Ayomi IT Services. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
