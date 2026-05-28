"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Delivery time varies by project. Simple posters or basic edits take 48 hours. A complete business website or branding kit typically takes 1-2 weeks depending on your requirements and feedback speed.",
  },
  {
    question: "Do you provide revisions?",
    answer:
      "Yes! Every project includes a set number of revisions (usually 2-3 depending on the package) to ensure you are 100% satisfied with the final result.",
  },
  {
    question: "Can you create AI-based content?",
    answer:
      "Absolutely. I specialize in using top-tier AI tools for generating unique images, cinematic video scenes, and professional ad copy to give your brand a futuristic edge.",
  },
  {
    question: "Do you build mobile-friendly websites?",
    answer:
      "Yes, all websites I develop are fully responsive. They are designed 'mobile-first' to ensure they look stunning and function perfectly on phones, tablets, and desktops.",
  },
  {
    question: "Do you help with hosting and domains?",
    answer:
      "Yes. For website projects, I assist with purchasing domains and setting up secure hosting (like Vercel, Netlify, or Firebase) so your site is fast and reliable.",
  },
  {
    question: "Can local businesses contact directly on WhatsApp?",
    answer:
      "Yes! I strongly encourage local clients to reach out via WhatsApp for fast communication, document sharing, and instant updates.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [customFaqs, setCustomFaqs] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "custom_faqs"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const parsed = snapshot.docs.map(doc => ({
        id: doc.id,
        isCustom: true,
        ...doc.data()
      }));
      setCustomFaqs(parsed);
    }, (error) => {
      console.warn("Could not fetch custom FAQs:", error);
    });
    return () => unsubscribe();
  }, []);

  const allFaqs = [...customFaqs, ...faqs];

  return (
    <section className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-white/60">
            Got questions? I've got answers.
          </p>
        </div>

        <div className="space-y-4">
          {allFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={faq.id || faq.question || idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "glass-card border rounded-2xl overflow-hidden transition-colors",
                  isOpen ? "border-primary/50" : "border-white/10",
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between font-heading text-left"
                >
                  <span
                    className={cn(
                      "text-lg font-medium",
                      isOpen ? "text-primary" : "text-white",
                    )}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 transition-transform duration-300",
                      isOpen ? "rotate-180 text-primary" : "text-white/40",
                    )}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-white/60 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
