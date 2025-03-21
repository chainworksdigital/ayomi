"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import the Lottie component
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import workshop_animation from "../../../public/animations/workshop.json";

export default function WorkshopPage() {
  // State for webinar data, loading, and countdown timer
  const [webinarData, setWebinarData] = useState({
    videoLink: "",
    webinarDate: new Date("2025-04-01T10:00:00"), // Fallback date
  });
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Helper function: Calculate remaining time
  const calculateTimeLeft = (targetDate) => {
    const difference = targetDate - new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  // Fetch webinar data from your API (if needed for countdown or other elements)
  useEffect(() => {
    async function fetchWebinarData() {
      try {
        const res = await fetch("/api/webinar");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setWebinarData({
          videoLink: data.videoLink,
          webinarDate: new Date(data.webinarDate),
        });
      } catch (error) {
        console.error("Error fetching webinar data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWebinarData();
  }, []);

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(webinarData.webinarDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [webinarData.webinarDate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 pt-18 px-4">
      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-md rounded-xl shadow-2xl p-8 pb-15">
        {/* Top Section: Text on Left & Timer on Right */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-300 pb-6 mb-8">
          {/* Left: Seminar Text */}
          <motion.div
            className="md:w-1/2 text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Free Webinar Seminar
            </h1>
            <p className="text-xl text-gray-700">
              Join our free webinar to explore trends in AI &amp; ML, discover how
              these fields are shaping the world, and learn how to secure a rewarding
              career.
            </p>
          </motion.div>
          {/* Right: Countdown Timer */}
          <motion.div
            className="md:w-1/2 mt-6 md:mt-0 flex justify-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="bg-gray-100 rounded-lg px-6 py-4 shadow-md">
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                Starts In:
              </h3>
              <div className="flex space-x-4 text-3xl font-mono text-gray-800">
                <span>{timeLeft.days}d</span>
                <span>{timeLeft.hours}h</span>
                <span>{timeLeft.minutes}m</span>
                <span>{timeLeft.seconds}s</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Two-Column Layout */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: Offline Video & Animation */}
          <div className="flex-1 space-y-6">
            {/* Video Section – Only Offline Video in Portrait */}
            <motion.div
  className="relative w-full max-w-[360px] aspect-[9/16] mx-auto overflow-hidden rounded-lg shadow-lg bg-black"
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  <video
    controls
    autoPlay
    className="absolute inset-0 w-full h-full object-contain"
    poster="/images/video_placeholder.png"
  >
    <source src="/VIDEOS/webinar.MP4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</motion.div>
{/* Lottie Animation */}
            <motion.div
              className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg shadow-lg bg-white flex items-center justify-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Lottie
                animationData={workshop_animation}
                loop={true}
                className="w-full h-full"
              />
            </motion.div>
          </div>

          {/* Right Column: WhatsApp Join Section & Google Form */}
          <motion.div
            className="flex-1 relative overflow-hidden rounded-lg shadow-lg bg-white flex flex-col"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* WhatsApp Join Section with QR Code */}
            <div className="p-8 text-center border-b border-gray-300">
              <h2 className="text-2xl font-bold mb-4">
                Want to join our WhatsApp group?
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <a
                  href="https://chat.whatsapp.com/KOCTAdvOQmfCeKRTvz6lxL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5"
                >
                  {/* WhatsApp Logo SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 448 512"
                    fill="currentColor"
                  >
                    <path d="M380.9 97.1C339-2.6 237.2-21.2 151.8 20.9c-44.4 20.4-81.9 55-103.2 98.4-21.2 43.4-23.3 93.7-7 137.2L2.3 484.5c-3.6 12.6 8.7 24.7 21.3 21.1L125 446.3c38.4 19.5 81.9 30 127.3 30 85.4 0 187.3-24.1 229.1-130.9 41.9-106.9 15.8-222.8-56.5-278.3zM224 405.3c-37.8 0-74.8-10-107.7-28.8l-7.7-4.5-70.5 27.8 27.8-70.5-4.5-7.7C60.7 300.8 50.7 263.8 50.7 226c0-107.5 87.3-194.8 194.8-194.8S440.3 118.5 440.3 226 353 420.1 224 420.1zM308.3 308.3c-5.2 14.5-26.2 27.1-33.1 28.3-8.6 1.6-16.2 2.3-23.9-2.3-7.7-4.5-31-14.8-59.2-36.4-21.9-17.4-36.7-38.4-41.1-46.1-4.5-7.7-0.5-11.9 3.4-16.2 3.8-3.8 8.6-9.5 12.9-14.3 4.3-4.8 5.8-7.7 8.7-12.9 2.9-5.2 1.5-9.7-0.8-14.3-2.3-4.5-23.1-55.7-31.8-76.2-8.3-18.4-16.8-15.9-23.2-16.2-6.1-0.3-13.2-0.3-20.2-0.3-7.7 0-20.2 2.9-30.9 14.6-10.7 11.7-40.8 39.8-40.8 97 0 57.2 41.8 112.3 47.6 119.9 5.8 7.7 81.6 124.3 197.9 124.3 116.3 0 193.5-114.5 203.4-124.3 9.8-9.8 15.1-19.3 19.5-33.1 4.3-13.8 4.3-25.7 2.9-33.3z" />
                  </svg>
                  Join WhatsApp Group
                </a>
                {/* QR Code Image */}
                <div className="w-32 h-32 md:w-40 md:h-40">
                  <img
                    src="/images/Ayomi_whatsapp.png"
                    alt="WhatsApp QR Code"
                    className="w-full h-full object-contain rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
            {/* Google Form */}
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdDRINBdddoTTZtAUXjJSJvPiAOxrWBfVkg3ZdvmnxnPiExOg/viewform?embedded=true"
              width="100%"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              className="w-full h-[1000px] md:h-[1000px]"
            >
              Loading Form...
            </iframe>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
