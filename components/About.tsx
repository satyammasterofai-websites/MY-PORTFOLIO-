"use client";

import { motion } from "motion/react";
import { Download, TerminalSquare } from "lucide-react";


const expertises = [
  "AI-powered website development",
  "Graphic designing",
  "Video editing",
  "Business branding",
  "Social media content creation",
  "Automation systems",
  "Cyber cafe digital services",
];

const tools = [
  "Canva AI",
  "ChatGPT",
  "Claude",
  "Deep seek",
  "ElevenLabs",
  "Grok Ai",
  "perplexity",
  "Google Ai Studio",
  "Lovable Ai",
  "replit",
  "Picsart",
  "Vercel",
  "Firebase",
  "GitHub",
  "Next.js",
  "AI Studio",
];

export function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative h-full w-full rounded-3xl overflow-hidden glass-card border border-white/10 flex items-center justify-center bg-black/50 group">
                <img src="/profile.jpg" alt="Satyam Verma" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <p className="text-xs font-mono text-white/90 tracking-widest uppercase">
                    Satyam Verma
                  </p>
                </div>
              </div>
            </div>

            {/* Tech stack floating badge */}
            <div className="absolute -bottom-8 -right-8 glass-card p-4 rounded-xl border border-white/10 hidden md:block">
              <p className="text-xs text-white/50 mb-2 uppercase tracking-wider font-mono">
                Core Stack
              </p>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-xs font-bold font-mono">
                  Next
                </div>
                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-xs font-bold font-mono">
                  AI
                </div>
                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-xs font-bold font-mono">
                  TS
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
                About <span className="text-gradient">Satyam Verma</span>
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                I am a young AI-powered digital creator and freelancer helping
                businesses grow online through websites, branding, automation,
                content creation, and modern digital solutions.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-heading font-semibold text-white/90">
                Specialized In:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {expertises.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center space-x-2 text-white/70"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <p className="text-white/60">
                Passionate about using modern AI tools and technology to create
                affordable, premium-quality digital experiences for local
                businesses, startups, creators, schools, and entrepreneurs.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 border border-white/10 text-white/60"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <a
                href="/resume.pdf"
                download="resume.pdf"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white/5 border border-primary/30 text-white hover:bg-primary/20 transition-all font-medium group cursor-pointer"
              >
                <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                <span>Download Resume</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
