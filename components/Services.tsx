"use client";

import { motion } from "motion/react";
import {
  Globe,
  Smartphone,
  Palette,
  Film,
  Gift,
  Megaphone,
  Share2,
  Bot,
  Sparkles,
  Wrench,
  Search,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "AI Website Development",
    desc: "Business, portfolio, and school websites with responsive design and modern tech.",
  },
  {
    icon: Smartphone,
    title: "App Development",
    desc: "Business apps and client management systems tailored for your needs.",
  },
  {
    icon: Palette,
    title: "Graphic Designing",
    desc: "Social media creatives, posters, logos, and WhatsApp catalogs.",
  },
  {
    icon: Film,
    title: "Video Editing",
    desc: "Engaging Instagram reels, YouTube videos, and cinematic edits.",
  },
  {
    icon: Gift,
    title: "Digital Invitations",
    desc: "Animated wedding and birthday video invitations.",
  },
  {
    icon: Megaphone,
    title: "Promo Advertisement",
    desc: "Impactful video ads for products and local shops.",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    desc: "Daily post designing and brand building across platforms.",
  },
  {
    icon: Bot,
    title: "AI Automation",
    desc: "WhatsApp & social media auto-replies and lead systems.",
  },
  {
    icon: Sparkles,
    title: "AI Content Creation",
    desc: "AI-generated visuals and high-quality branding assets.",
  },
  {
    icon: Wrench,
    title: "Website Maintenance",
    desc: "Bug fixing, hosting support, and performance optimization.",
  },
  {
    icon: Search,
    title: "SEO & Business Setup",
    desc: "Google Business setup and local SEO optimization.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 md:flex md:justify-between md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
              Premium <span className="text-gradient">Digital Services</span>
            </h2>
            <p className="text-lg text-white/60">
              Transforming ideas into digital reality with modern AI-powered
              solutions.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 4) * 0.1 }}
              className="group glass-card p-6 rounded-2xl hover:bg-white/[0.03] transition-all cursor-crosshair border-white/5 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <service.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-heading font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
