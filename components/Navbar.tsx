"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, UserCircle, LogOut } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Skills", href: "#skills" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, login, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-white/10 shadow-lg"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="#home" className="flex items-center space-x-3 group shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/50 group-hover:scale-105 transition-transform shrink-0">
              <img src="/profile.jpg" alt="Satyam Verma" className="w-full h-full object-cover" />
            </div>
            <span className="font-heading font-black text-lg sm:text-xl lg:text-2xl tracking-[0.05em] sm:tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-purple-500 drop-shadow-md whitespace-nowrap">
              SATYAM VERMA
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-end space-x-4 lg:space-x-6 xl:space-x-8 md:w-auto ml-auto">
            {links.map((link) => (
               <Link
                 key={link.name}
                 href={link.href}
                 className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
               >
                 {link.name}
                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
               </Link>
            ))}
            {isAdmin && (
              <Link 
                href="/admin" 
                className="px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/25 text-primary rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all outline-none"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Admin Panel
              </Link>
            )}
            <Link
              href="#contact"
              className="px-5 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold shadow-lg shadow-primary/20 active:scale-95 transition-all hover:brightness-110"
            >
              Hire Me
            </Link>
            {user ? (
               <button onClick={() => logout()} className="text-white/70 hover:text-white transition-colors p-2" title="Sign out">
                 <LogOut className="w-5 h-5" />
               </button>
            ) : (
               <button onClick={() => login()} className="text-white/70 hover:text-white transition-colors p-2" title="Sign in as Admin">
                 <UserCircle className="w-5 h-5" />
               </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {user ? (
               <button onClick={() => logout()} className="text-white/70 hover:text-white transition-colors p-2" title="Sign out">
                 <LogOut className="w-5 h-5" />
               </button>
            ) : (
               <button onClick={() => login()} className="text-white/70 hover:text-white transition-colors p-2" title="Sign in as Admin">
                 <UserCircle className="w-5 h-5" />
               </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-primary transition-colors p-2"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-white/70 hover:text-white hover:pl-2 transition-all block"
                >
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-primary/10 border border-primary/25 text-primary font-semibold mt-2"
                >
                  Admin dashboard
                </Link>
              )}
              <Link
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-primary text-black font-semibold mt-4"
              >
                Let's Talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
