"use client"; // Mark this as a Client Component

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Lenis from "@studio-freight/lenis";

// Dynamically import components without SSR (for hydration issues)
const Navbar = dynamic(() => import("@/app/components/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/app/components/Footer"), { ssr: false });

export default function LayoutWrapper({ children }) {
  const lenisRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure we're in the client before applying Lenis
  }, []);

  useEffect(() => {
    if (!isClient) return; // Avoid running Lenis during SSR

    const lenis = new Lenis({
      duration: 2.5, // Slows down the scroll effect
      easing: (t) => 1 - Math.pow(1 - t, 4), // Smooth easing function
      smooth: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isClient]);

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
