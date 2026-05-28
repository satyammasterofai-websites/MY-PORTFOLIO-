"use client";

import { motion } from "motion/react";
import { Bot, Code2, MonitorPlay, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


const roles = [
  "Website Developer",
  "AI Creator",
  "Graphic Designer",
  "Video Editor",
  "Automation Expert",
  "Cyber Cafe Specialist",
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-secondary/10 blur-[150px]"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 flex flex-col items-center w-full"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-white/80">
              Everything Digital You Need — In One Place
            </span>
          </div>

          <div className="space-y-6 flex flex-col items-center w-full">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/10 neon-glow shadow-2xl">
              <img src="/profile.jpg" alt="Satyam Verma" className="w-full h-full object-cover" />
            </div>
            
            <span className="text-2xl md:text-3xl font-heading font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-primary to-purple-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              My Portfolio
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] tracking-tight mt-4">
              Transform Your Business Into a{" "}
              <br className="hidden sm:block" />
              <span className="text-gradient">Powerful Digital Brand</span>
            </h1>

            <div className="h-10 flex items-center justify-center w-full mt-2">
              <span className="text-xl sm:text-2xl text-white/60 font-mono flex items-center">
                I am a{" "}
                <span className="text-primary font-bold ml-2">
                  {"<"}
                  {roles[roleIndex]}
                  {"/>"}
                </span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="ml-1 w-3 h-6 bg-primary inline-block"
                />
              </span>
            </div>

            <p className="text-lg text-white/60 max-w-xl leading-relaxed mx-auto">
              AI-Powered Websites, Video Editing, Posters, Branding,
              Automation & Digital Services for Modern Businesses. Let&apos;s build
              the future together.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 justify-center">
            <Link
              href="#contact"
              className="px-8 py-4 rounded-xl bg-primary text-black font-semibold hover:bg-white transition-all transform hover:scale-105 neon-glow"
            >
              Hire Me Now
            </Link>
            <Link
              href="#services"
              className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all flex items-center"
            >
              View Services
            </Link>
          </div>

          <div className="flex justify-center gap-8 md:gap-16 pt-12 border-t border-white/10 w-full max-w-2xl mx-auto">
            <div>
              <h4 className="text-3xl font-bold font-heading text-white">
                50+
              </h4>
              <p className="text-sm text-white/50 mt-1">Creative Designs</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold font-heading text-white">
                Fast
              </h4>
              <p className="text-sm text-white/50 mt-1">Delivery Time</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold font-heading text-white">
                AI
              </h4>
              <p className="text-sm text-white/50 mt-1">Powered Workflow</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
