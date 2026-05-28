"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

const plans = [
  {
    name: "Starter",
    desc: "Perfect for students & small local shops.",
    price: "₹999",
    duration: "/project",
    features: [
      "Social Media Posters",
      "Basic Logo Concept",
      "Simple Landing Page (1 page)",
      "Basic Video Editing (1 Reel)",
    ],
    popular: false,
    color: "border-white/10",
  },
  {
    name: "Business",
    desc: "Ideal for growing businesses & creators.",
    price: "₹4,999",
    duration: "/project",
    features: [
      "Professional Website (3-5 pages)",
      "Complete Branding Kit",
      "Social Media Creatives (5 posts)",
      "Google Business Setup",
      "Basic SEO Optimization",
    ],
    popular: true,
    color: "border-primary",
  },
  {
    name: "Premium AI",
    desc: "Advanced solutions for modern agencies.",
    price: "₹9,999+",
    duration: "/project",
    features: [
      "Full Branding & UI/UX Design",
      "Advanced Full-Stack Website",
      "AI Promotional Video",
      "WhatsApp Automation Setup",
      "Premium Hosting Support",
      "Priority 24/7 Support",
    ],
    popular: false,
    color: "border-secondary",
  },
];

export function Pricing() {
  const [customPlans, setCustomPlans] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "custom_pricing"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const parsed = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          desc: data.desc,
          price: data.price,
          duration: data.duration,
          features: typeof data.features === "string" ? data.features.split(",") : data.features,
          popular: data.popular || false,
          color: data.popular ? "border-primary" : "border-white/10",
          isCustom: true
        };
      });
      setCustomPlans(parsed);
    }, (error) => {
      console.warn("Could not fetch custom pricing plans:", error);
    });
    return () => unsubscribe();
  }, []);

  const allPlans = [...customPlans, ...plans];

  return (
    <section id="pricing" className="py-24 relative bg-black/50">
      <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Affordable <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-lg text-white/60">
            Transparent pricing for premium digital solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {allPlans.map((plan, idx) => (
            <motion.div
              key={plan.id || plan.name || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "relative glass-card rounded-3xl p-8 flex flex-col",
                plan.popular
                  ? `border-2 ${plan.color} neon-glow`
                  : `border ${plan.color}`,
                plan.popular && "lg:-translate-y-4", // Pop it out a bit on desktop
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black font-bold uppercase text-xs tracking-wider py-1 px-4 rounded-full flex items-center gap-1 shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                  <Star className="w-3 h-3" /> Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold font-heading text-white">
                {plan.name}
              </h3>
              <p className="text-white/60 mt-2 text-sm h-10">{plan.desc}</p>

              <div className="my-6">
                <span className="text-4xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-white/40 ml-1">{plan.duration}</span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feat: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start text-sm text-white/80"
                  >
                    <Check
                      className={cn(
                        "w-5 h-5 mr-3 shrink-0",
                        plan.popular ? "text-primary" : "text-white/40",
                      )}
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#contact"
                className={cn(
                  "w-full py-4 rounded-xl font-bold text-center transition-all",
                  plan.popular
                    ? "bg-primary text-black hover:bg-white"
                    : "bg-white/5 text-white hover:bg-white/10",
                )}
              >
                Choose {plan.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
