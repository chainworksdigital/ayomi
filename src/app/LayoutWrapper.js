"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Lenis from "@studio-freight/lenis";

// Dynamic import to avoid SSR issues
const Navbar = dynamic(() => import("@/app/components/Navbar/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/app/components/Footer"), { ssr: false });

export default function LayoutWrapper({ children }) {
  const lenisRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const lenis = new Lenis({
      duration: 2.5,
      easing: (t) => 1 - Math.pow(1 - t, 4),
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
