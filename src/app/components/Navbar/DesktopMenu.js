import { motion } from "framer-motion";

const DesktopMenu = ({ navItems, active, renderNavLink }) => {
  return (
    <ul className="hidden md:flex space-x-8 text-lg font-medium">
      {navItems.map((item, index) => (
        <motion.li key={index}>
          {renderNavLink(item)}
        </motion.li>
      ))}
    </ul>
  );
};

export default DesktopMenu;
