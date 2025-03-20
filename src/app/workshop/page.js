"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import the Lottie component to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
// Import your Lottie animation JSON (adjust the path as needed)
import workshop_animation from '../../../public/animations/workshop.json';

export default function WorkshopPage() {
  // States for dynamic content
  const [videoLink, setVideoLink] = useState('');
  const [webinarDate, setWebinarDate] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch dynamic data from Contentful via the API route
  useEffect(() => {
    fetch('/api/contentful')
      .then((res) => res.json())
      .then((data) => {
        setVideoLink(data.videoLink);
        setWebinarDate(new Date(data.webinarDate));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dynamic content:", err);
        setIsLoading(false);
      });
  }, []);

  // Function to calculate remaining time until the webinar starts
  const calculateTimeLeft = () => {
    if (!webinarDate) return {};
    const difference = webinarDate - new Date();
    let timeObj = {};
    if (difference > 0) {
      timeObj = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeObj = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeObj;
  };

  // Update the countdown every second
  useEffect(() => {
    if (!webinarDate) return;
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [webinarDate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
            {videoLink ? (
              <iframe
                src={videoLink}
                title="Webinar Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            ) : (
              <span className="text-white text-center px-4">
                Video Placeholder
              </span>
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
            Join our free webinar to explore trends in AI & ML, discover how these fields are shaping the world, and learn how to secure a rewarding career.
          </p>

          {/* Countdown Timer */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700">Webinar starts in:</h3>
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
              Scan the QR code or click the link to stay updated on webinar details!
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
