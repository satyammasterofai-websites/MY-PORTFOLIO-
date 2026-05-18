"use client";

import { motion } from "motion/react";
import { Code, PenTool, Video, Cpu, Printer } from "lucide-react";

const skillCategories = [
  {
    title: "Technical Skills",
    icon: Code,
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
    skills: [
      "Frontend Website Development",
      "Responsive Website Design",
      "Firebase Auth & Database",
      "GitHub Deployment",
      "Netlify & Vercel Hosting",
      "Landing Page Design",
      "Basic SEO & Web Optimization",
    ],
  },
  {
    title: "Creative Designs",
    icon: PenTool,
    color: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30",
    skills: [
      "Canva & PicsArt Editing",
      "Poster & Thumbnail Design",
      "Festival & Ad Graphics",
      "Branding Design",
      "WhatsApp Catalog Design",
      "AI Image Generation",
    ],
  },
  {
    title: "Video Editing",
    icon: Video,
    color: "from-red-500/20 to-orange-500/20",
    border: "border-red-500/30",
    skills: [
      "Instagram Reels & YouTube",
      "Promotional & Ads",
      "Cinematic Edits",
      "Short-form Content",
      "AI Generated Videos",
    ],
  },
  {
    title: "AI & Automation",
    icon: Cpu,
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
    skills: [
      "Prompt Engineering",
      "ChatGPT Workflow",
      "AI Content Creation",
      "WhatsApp Automation",
      "Social Media Automation",
      "Smart Business Workflow",
    ],
  },
  {
    title: "Cyber Cafe",
    icon: Printer,
    color: "from-yellow-500/20 to-amber-500/20",
    border: "border-yellow-500/30",
    skills: [
      "Online Form Filling",
      "Resume Designing",
      "Document Editing & PDF",
      "Printing & Scanning",
      "Govt Portal Assistance",
      "Ticket Booking Support",
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative bg-black/50">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4"
          >
            My <span className="text-gradient">Arsenal</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/60"
          >
            A comprehensive toolkit blending modern coding, creative design, and
            local digital services.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`glass-card p-8 rounded-2xl border ${category.border} bg-gradient-to-br ${category.color} hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all`}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div
                  className={`p-3 rounded-xl bg-black/50 border ${category.border}`}
                >
                  <category.icon className="w-6 h-6 text-white/90" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-white">
                  {category.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {category.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-start space-x-2">
                    <span className="w-4 h-4 mt-1 rounded-full border border-white/20 flex items-center justify-center bg-black/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
                    </span>
                    <span className="text-sm text-white/70">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
