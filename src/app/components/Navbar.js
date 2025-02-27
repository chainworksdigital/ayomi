"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Courses", id: "courses" },
  { name: "Testimonials", id: "testimonials" },
  { name: "Enroll Now", id: "cta" },
  { name: "Contact", id: "contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");

  // Handle scrolling event to detect active section
  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "home";

      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const sectionTop = section.offsetTop - 120;
          if (window.scrollY >= sectionTop) {
            currentSection = item.id;
          }
        }
      });

      setActive(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed w-full top-0 left-0 z-50 bg-gradient-to-r from-black via-gray-900 to-black bg-opacity-90 backdrop-blur-lg shadow-lg"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.h1
          whileHover={{ scale: 1.1 }}
          className="text-3xl font-extrabold text-green-400 tracking-wide cursor-pointer"
        >
          AYOMI
        </motion.h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium text-white relative">
          {navItems.map((item, index) => (
            <motion.li
              key={index}
              className="relative group transition cursor-pointer"
            >
              <Link
                to={item.id}
                spy={true}
                smooth={true}
                offset={-80}
                duration={800}
                onClick={() => setActive(item.id)}
                className={`relative px-2 transition ${
                  active === item.id ? "text-green-400 font-semibold" : "text-white"
                }`}
              >
                {item.name}
              </Link>
              {/* Dynamic Underline Effect */}
              {active === item.id && (
                <motion.div
                  layoutId="activeNavItem"
                  className="absolute bottom-0 left-0 w-full h-[3px] bg-green-400 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className="md:hidden bg-black bg-opacity-90 text-white absolute top-full left-0 w-full py-4 flex flex-col items-center space-y-4"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                className={`cursor-pointer text-lg font-medium transition ${
                  active === item.id ? "text-green-400 font-semibold" : "text-white"
                }`}
                onClick={() => {
                  setActive(item.id);
                  setIsOpen(false);
                }}
              >
                <Link to={item.id} spy={true} smooth={true} offset={-80} duration={800}>
                  {item.name}
                </Link>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
