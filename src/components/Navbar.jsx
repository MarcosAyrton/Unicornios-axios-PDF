import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  const Path = (props) => (
    <motion.path fill="transparent" strokeWidth="3" stroke="hsl(0, 0%, 100%)" strokeLinecap="round" {...props} />
  );

  const MenuToggle = ({ toggle, isOpen }) => (
    <button
      onClick={toggle}
      className="flex items-center justify-center h-6 w-6 py-3"
      style={{
        outline: "none",
        border: "none",
        cursor: "pointer",
        background: "transparent",
      }}
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
          initial={false}
          animate={isOpen ? "open" : "closed"}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          initial={false}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
          initial={false}
          animate={isOpen ? "open" : "closed"}
        />
      </svg>
    </button>
  );

  return (
    <motion.div
      animate={{ width: isOpen ? 200 : 60 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-800 text-white h-screen flex flex-col py-4"
    >
      <nav className="flex flex-col items-start pl-4 gap-4">
        <MenuToggle toggle={toggleNavbar} isOpen={isOpen} />
        <Link to="/" className="flex items-center">
          <i className="pi pi-home text-xl py-3"></i>
          <AnimatePresence>
            {isOpen && (
              <motion.span
                className="ml-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                Inicio
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <Link to="/productos" className="flex items-center">
          <i className="pi pi-box text-xl py-3"></i>
          <AnimatePresence>
            {isOpen && (
              <motion.span
                className="ml-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                Productos
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <Link to="/unicornios" className="flex items-center">
          <i className="pi pi-star text-xl py-3"></i>
          <AnimatePresence>
            {isOpen && (
              <motion.span
                className="ml-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                Unicornios
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </nav>
    </motion.div>
  );
};

export default Navbar;
