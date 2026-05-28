"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, MessageSquare, Send, Loader2, CheckCircle2 } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "@/lib/firebase";

export function Contact() {
  const [name, setName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [service, setService] = useState("AI Website Development");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !emailOrPhone.trim() || !message.trim()) return;

    setLoading(true);
    setSuccess(false);

    try {
      await addDoc(collection(db, "contact_messages"), {
        name,
        emailOrPhone,
        service,
        message,
        createdAt: new Date().toISOString()
      });

      setSuccess(true);
      setName("");
      setEmailOrPhone("");
      setMessage("");
      setService("AI Website Development");
    } catch (error) {
      console.error("Error submitting contact inquiry:", error);
      try {
        handleFirestoreError(error, OperationType.WRITE, "contact_messages");
      } catch (err) {
        alert("Could not deliver inquiry. Database permissions might be missing or insufficient.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 relative bg-black/50 overflow-hidden"
    >
      <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      {/* Background glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6">
              Let's Build the <span className="text-gradient">Future</span>
            </h2>
            <p className="text-lg text-white/60 mb-12 max-w-md">
              Whether you need a cutting-edge AI website, a full branding
              package, or local digital services, I'm here to help.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 group-hover:neon-glow transition-all">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1 uppercase tracking-wider font-mono">
                    Call / WhatsApp
                  </p>
                  <p className="text-2xl font-bold font-heading text-white">
                    +91 94564 11569
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center shrink-0 group-hover:shadow-[0_0_15px_rgba(217,70,239,0.5)] transition-all">
                  <Mail className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1 uppercase tracking-wider font-mono">
                    Email Address
                  </p>
                  <p className="text-xl font-bold font-heading text-white">
                    satyammasterofai@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1 uppercase tracking-wider font-mono">
                    Location
                  </p>
                  <p className="text-lg text-white">
                    Uttar Pradesh, India
                    <br />
                    <span className="text-sm text-white/40">
                      Available for Remote Work Globally
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <a
                href="https://wa.me/919456411569"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 lg:flex-none flex items-center justify-center space-x-2 px-6 py-4 rounded-xl bg-[#25D366] text-black font-semibold hover:bg-white transition-all transform hover:-translate-y-1"
              >
                <MessageSquare className="w-5 h-5" />
                <span>WhatsApp Chat</span>
              </a>
              <a
                href="mailto:satyammasterofai@gmail.com"
                className="flex-1 lg:flex-none flex items-center justify-center space-x-2 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all transform hover:-translate-y-1"
              >
                <Mail className="w-5 h-5" />
                <span>Send Email</span>
              </a>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-3xl border border-white/10"
          >
            <h3 className="text-2xl font-bold font-heading mb-6 text-white flex items-center justify-between">
              <span>Send a Message</span>
              {success && (
                <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded flex items-center gap-1 font-sans">
                  <CheckCircle2 className="w-3 h-3" /> Sent!
                </span>
              )}
            </h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-2">
                  Email or Phone
                </label>
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans"
                  placeholder="john@example.com / +91XXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-2">
                  Which service do you need?
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all cursor-pointer font-sans [&>option]:bg-[#0c0d12]"
                >
                  <option value="AI Website Development">AI Website Development</option>
                  <option value="Graphic Design & Posters">Graphic Design & Posters</option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="Local Cyber Cafe Service">Local Cyber Cafe Service</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none font-sans"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity active:scale-[0.98] transition-transform cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    <span>Delivering...</span>
                  </>
                ) : (
                  <>
                    <span>Send Inquiry</span>
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
