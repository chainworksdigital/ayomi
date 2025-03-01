"use client";
import { useEffect, useState } from "react";

const Map = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Only load map on the client side
  }, []);

  if (!isClient) return null; // Prevents rendering on the server

  return (
    <div className="w-full h-full">
      <iframe
        className="w-full h-full rounded-lg"
        loading="lazy"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.433010266127!2d73.82890667607961!3d18.509324582582018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa01c08293752e9c7%3A0x198c381e0bd1c067!2sYanik%20Associates!5e0!3m2!1sen!2sin!4v1740838653076!5m2!1sen!2sin"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
