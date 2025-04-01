"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { usePathname } from "next/navigation";
import { Link as ScrollLink } from "react-scroll";
import NextLink from "next/link";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

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
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      let currentSection = "home";
      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const sectionTop =
            section.getBoundingClientRect().top + window.scrollY - 120;
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

  const renderNavLink = (item) => {
    const linkClasses = `cursor-pointer transition-all duration-300 ${
      active === item.id
        ? "text-green-400 font-semibold border-b-2 border-green-400"
        : "text-white border-b-2 border-transparent hover:border-green-400"
    }`;
    if (pathname === "/") {
      return (
        <ScrollLink
          to={item.id}
          spy={true}
          smooth={true}
          offset={-80}
          duration={800}
          onClick={() => setActive(item.id)}
          className={linkClasses}
        >
          {item.name}
        </ScrollLink>
      );
    } else {
      return (
        <NextLink
          href={`/#${item.id}`}
          onClick={() => setActive(item.id)}
          className={linkClasses}
        >
          {item.name}
        </NextLink>
      );
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed w-full top-0 left-0 z-50 bg-gradient-to-r from-black via-gray-900 to-black bg-opacity-90 backdrop-blur-lg shadow-lg"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.h1
          whileHover={{ scale: 1.1 }}
          className="text-3xl font-extrabold text-green-400 tracking-wide cursor-pointer"
        >
          <NextLink href="/#Home">
            AYOMI
          </NextLink>
        </motion.h1>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <DesktopMenu
            navItems={navItems}
            active={active}
            renderNavLink={renderNavLink}
          />
          <NextLink
            href="https://www.instagram.com/ayomi_aitraining/"
            legacyBehavior
          >
            <a>
              <div className="p-1 rounded-full bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500">
                <SiInstagram size={20} color="white" />
              </div>
            </a>
          </NextLink>
        </div>
        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden space-x-4">
          <NextLink
            href="https://www.instagram.com/ayomi_aitraining/"
            legacyBehavior
          >
            <a>
              <div className="p-1 rounded-full bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500">
                <SiInstagram size={20} color="white" />
              </div>
            </a>
          </NextLink>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      <MobileMenu
        navItems={navItems}
        active={active}
        renderNavLink={renderNavLink}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </motion.nav>
  );
};

export default Navbar;
