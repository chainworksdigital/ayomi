"use client"; // Mark this as a Client Component

import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/app/components/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/app/components/Footer"), { ssr: false });


export default function LayoutWrapper({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
