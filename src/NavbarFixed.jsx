import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
  { name: 'Home', href: '#home' },
  { name: 'Transmisiones', href: '#lives' },
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'Talleres', href: '#talleres' },
  { name: 'Bitácora', href: '/bitacora' },
  { name: 'Contacto', href: '#contacto' }
];

const Icons = {
  Menu: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  ),
  X: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  ),
};

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerVariants = {
    scrolled: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      borderBottomColor: "rgba(229, 229, 229, 1)",
      transition: { duration: 0.5 }
    },
    notScrolled: {
      backgroundColor: "transparent",
      boxShadow: "none",
      borderBottomColor: "transparent",
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <motion.header
        className="fixed w-full top-0 z-50 py-6 border-b border-stone-100 backdrop-blur-md"
        variants={headerVariants}
        animate={scrolled ? "scrolled" : "notScrolled"}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="font-serif text-xl tracking-[0.2em] font-bold uppercase z-50 relative">
            <motion.span
              animate={{ color: scrolled ? "#292524" : "#ffffff" }}
              transition={{ duration: 0.5 }}
            >
              Sagrada Ciencia
            </motion.span>
          </a>

          <nav className="hidden md:flex space-x-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[11px] font-bold uppercase tracking-widest relative group"
              >
                <motion.span
                  animate={{ color: scrolled ? "#78716c" : "rgba(255, 255, 255, 0.5)" }}
                  transition={{ duration: 0.5 }}
                >
                  {item.name}
                </motion.span>
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full",
                  scrolled ? "bg-stone-900" : "bg-white"
                )} />
              </a>
            ))}
          </nav>

          <motion.button
            className="md:hidden z-50 p-2"
            style={{ willChange: "transform" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {mobileMenuOpen 
              ? <Icons.X className="w-6 h-6 text-stone-900" /> 
              : <motion.div
                  animate={{ color: scrolled ? "#292524" : "#ffffff" }}
                  transition={{ duration: 0.5 }}
                >
                  <Icons.Menu className="w-6 h-6" />
                </motion.div>
            }
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white flex flex-col justify-center items-center md:hidden"
          >
            <nav className="flex flex-col space-y-8 text-center">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-3xl text-stone-900 hover:text-stone-500 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
