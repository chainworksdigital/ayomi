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
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.727933177561!2d73.82710397519396!3d18.49900328259427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfba2a8ef21f%3A0x7e90f5c72db2b3f3!2sNal%20Stop%2C%20Erandwane%2C%20Pune%2C%20Maharashtra%20411004!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
