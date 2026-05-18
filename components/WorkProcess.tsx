"use client";

import { motion } from "motion/react";
import {
  MessageSquare,
  LayoutTemplate,
  Code,
  RefreshCw,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Client Discussion",
    desc: "Understanding your vision and requirements.",
  },
  {
    icon: LayoutTemplate,
    title: "Planning & Design",
    desc: "Creating mockups and visualizing the solution.",
  },
  {
    icon: Code,
    title: "AI-Powered Dev",
    desc: "Building it extremely fast using modern tools.",
  },
  {
    icon: RefreshCw,
    title: "Revisions",
    desc: "Tweaking everything until it's perfect.",
  },
  {
    icon: CheckCircle,
    title: "Final Delivery",
    desc: "Handover with support and a smile.",
  },
];

export function WorkProcess() {
  return (
    <section className="py-24 relative bg-black/50">
      <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
            How I <span className="text-gradient">Work</span>
          </h2>
          <p className="text-lg text-white/60">
            A streamlined process to ensure lightning-fast delivery.
          </p>
        </div>

        <div className="relative">
          {/* Main Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2"></div>

          <div className="grid lg:grid-cols-5 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative text-center group"
              >
                {/* Connector Line for Mobile */}
                {idx !== steps.length - 1 && (
                  <div className="lg:hidden absolute left-1/2 top-16 w-0.5 h-16 bg-white/10 -translate-x-1/2"></div>
                )}

                <div className="w-16 h-16 mx-auto bg-black border-2 border-white/20 rounded-2xl flex items-center justify-center relative z-10 group-hover:border-primary group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  <step.icon className="w-6 h-6 text-white group-hover:text-primary transition-colors" />

                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-primary text-black text-xs font-bold font-mono rounded-full flex items-center justify-center">
                    {idx + 1}
                  </div>
                </div>

                <div className="mt-6 md:mt-8 bg-white/5 border border-white/5 rounded-xl p-4 relative z-10 glass-card">
                  <h4 className="font-heading font-bold text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-white/50">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
