"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import the Lottie component
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import workshop_animation from "../../../public/animations/workshop.json";

export default function WorkshopPage() {
  // Webinar data, loading, and countdown timer state
  const [webinarData, setWebinarData] = useState({
    videoLink: "",
    webinarDate: new Date("2025-06-01T10:00:00"), // Fallback date
  });
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Form state and submission status
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [submitStatus, setSubmitStatus] = useState("");

  // Helper: Calculate remaining time
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

  // Fetch webinar data from API
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

  // Form change handler
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("Submitting...");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("Failed to submit form");
      }
      setSubmitStatus("Submitted successfully!");
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("Submission failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black pt-22 pb-12 mt-4 px-4">
      <div className="max-w-7xl mx-auto bg-gray-800/90 backdrop-blur-md rounded-xl shadow-2xl p-8 pb-15">
        {/* Top Section: Seminar Text & Countdown Timer */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b mb-4 border-gray-600 pb-6 mb-8">
          {/* Left: Seminar Text */}
          <motion.div
            className="md:w-1/2 text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              Free Lightning Webinar
            </h1>
            <p className="text-xl text-gray-300">
              Experience the electrifying trends in AI &amp; ML. Discover how lightning-fast insights are shaping our future.
            </p>
          </motion.div>
          {/* Right: Countdown Timer */}
          <motion.div
            className="md:w-1/2 mt-6 md:mt-0 flex justify-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="bg-gray-700 rounded-lg px-6 py-4 shadow-md">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Starts In:
              </h3>
              <div className="flex space-x-4 text-3xl font-mono text-white">
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
          {/* Left Column: Video */}
          <div className="flex-1">
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
          </div>

          {/* Right Column: Registration Form with Lottie Animation Below */}
          <motion.div
            className="flex-1 relative overflow-hidden rounded-lg shadow-lg bg-gray-900 flex flex-col"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center text-white">
                Register for Webinar
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border border-blue-500 bg-gray-800 px-4 py-2 shadow-sm transition duration-200 ease-in-out focus:bg-gray-200 focus:text-black focus:border-blue-400 focus:ring-blue-400"
                    />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border border-blue-500 bg-gray-800 px-4 py-2 shadow-sm transition duration-200 ease-in-out focus:bg-gray-200 focus:text-black focus:border-blue-400 focus:ring-blue-400"
                    />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                    Phone (WhatsApp)
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border border-blue-500 bg-gray-800 px-4 py-2 shadow-sm transition duration-200 ease-in-out focus:bg-gray-200 focus:text-black focus:border-blue-400 focus:ring-blue-400"
                  
                  />
                </div>
                <button
                  type="submit"
                  className="mt-1 block w-full rounded-md border border-blue-500 bg-gray-800 px-4 py-2 shadow-sm transition duration-200 ease-in-out focus:bg-gray-200 focus:text-black focus:border-blue-400 focus:ring-blue-400"
                  >
                  Submit
                </button>
              </form>
              {submitStatus && (
                <p className="mt-4 text-center text-sm font-medium text-white">
                  {submitStatus}
                </p>
              )}
            </div>
            {/* Lottie Animation Below the Form */}
            <motion.div
              className="w-full h-48 md:h-56 mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Lottie animationData={workshop_animation} loop className="w-full h-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
