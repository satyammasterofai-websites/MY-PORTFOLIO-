"use client";

import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Ramesh Trading Co.",
    role: "Local Business Owner",
    text: "Satyam created an amazing website for our business. Affordable, fast, and highly professional. Our online inquiries have doubled.",
    rating: 5,
  },
  {
    name: "Sneha Sharma",
    role: "Content Creator",
    text: "Very creative designer with fast delivery and modern ideas. His video editing skills for my reels are top-notch and exactly what I needed.",
    rating: 5,
  },
  {
    name: "Modern Public School",
    role: "Administration",
    text: "He handled our school's admission posters and social media beautifully. Highly recommended for any school or institute.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="text-lg text-white/60">
            What local businesses and creators say about my work.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 rounded-3xl border border-white/5 relative bg-gradient-to-b from-white/[0.02] to-transparent"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5" />

              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>

              <p className="text-white/80 leading-relaxed mb-8 italic">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-black border-2 border-background">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white leading-tight">
                    {review.name}
                  </h4>
                  <p className="text-xs text-white/50">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
