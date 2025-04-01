import { motion, AnimatePresence } from "framer-motion";

const MobileMenu = ({ navItems, active, renderNavLink, isOpen, setIsOpen }) => {
  // Function to close the menu after 0.5 seconds
  const handleCloseWithDelay = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        // Overlay covering the screen; clicking it closes the menu.
        <div
          className="fixed inset-0 z-50"
          onClick={handleCloseWithDelay}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            // Prevent clicks from bubbling up.
            onClick={(e) => e.stopPropagation()}
            className="md:hidden bg-black bg-opacity-90 absolute top-full left-0 w-full py-4 flex flex-col items-center space-y-4"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                onClick={handleCloseWithDelay}
              >
                {renderNavLink(item)}
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
