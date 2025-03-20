"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamically import the Lottie component
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import workshop_animation from "../../../public/animations/workshop.json";

export default function WorkshopPage() {
  // Webinar data state
  const [webinarData, setWebinarData] = useState({
    videoLink: "",
    webinarDate: new Date("2025-04-01T10:00:00"), // Fallback date
  });
  const [loading, setLoading] = useState(true);
  const [videoError, setVideoError] = useState(false); // Track if the video fails

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate remaining time
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

  // Fetch webinar data from our API route
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

  // Update the countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(webinarData.webinarDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [webinarData.webinarDate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Column: Video Section */}
        <motion.div
          className="md:w-1/3 flex items-center justify-center p-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
        >
          <div className="w-full h-64 md:h-full bg-black flex items-center justify-center">
            {loading ? (
              <span className="text-white text-center px-4">Loading...</span>
            ) : videoError || !webinarData.videoLink ? (
              // Fallback Video if YouTube fails
              <video
                src="/videos/fallback.mp4"
                controls
                autoPlay
                className="w-full h-full"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              // YouTube Embed
              <iframe
                src={webinarData.videoLink}
                title="Webinar Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                onError={() => setVideoError(true)} // Trigger fallback if video fails
              />
            )}
          </div>
        </motion.div>

        {/* Middle Column: Lottie Animation */}
        <motion.div
          className="md:w-1/3 flex items-center justify-center p-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
        >
          <Lottie
            animationData={workshop_animation}
            loop={true}
            className="w-full h-64 md:h-full"
          />
        </motion.div>

        {/* Right Column: Course Info, Countdown, Registration */}
        <motion.div
          className="md:w-1/3 flex flex-col justify-center p-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Free Webinar Seminar
          </h2>
          <p className="mb-6 text-gray-600">
            Join our free webinar to explore trends in AI & ML, discover how
            these fields are shaping the world, and learn how to secure a
            rewarding career. Engage with our IIT Bombay alumnus instructor and
            expand your knowledge in an interactive session.
          </p>

          {/* Countdown Timer */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700">
              Webinar starts in:
            </h3>
            <div className="flex space-x-4 text-lg font-mono text-gray-800 mt-2">
              <span>{timeLeft.days}d</span>
              <span>{timeLeft.hours}h</span>
              <span>{timeLeft.minutes}m</span>
              <span>{timeLeft.seconds}s</span>
            </div>
          </div>

          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            {/* Register Button */}
            <button className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700 transition">
              <a
                href="https://forms.gle/deZVQqdt9n6yZE177"
                target="_blank"
                rel="noopener noreferrer"
              >
                Register Now
              </a>
            </button>
          </motion.div>

          {/* WhatsApp QR Code + Link */}
          <motion.div
            className="mt-8 p-4 border border-green-300 rounded-md bg-green-50 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Join Our WhatsApp Group
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Scan the QR code or click the link to stay updated on webinar
              details!
            </p>
            <div className="flex flex-col items-center">
              <Image
                src="/images/Ayomi_whatsapp.png"
                alt="WhatsApp Group QR Code"
                width={150}
                height={150}
                className="mb-2"
              />
              <a
                href="https://chat.whatsapp.com/KOCTAdvOQmfCeKRTvz6lxL"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 underline"
              >
                Join via Link
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
