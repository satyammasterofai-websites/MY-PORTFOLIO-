"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
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
  FileText,
  Fingerprint,
  FileBadge,
  Printer,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "AI Services",
  "Design Services",
  "Video Services",
  "Cyber Cafe Services",
];

const services = [
  // AI Services
  {
    icon: Globe,
    title: "AI Website Development",
    desc: "Business, portfolios, and e-commerce websites with responsive layouts, modern tech stacks, and AI integrations.",
    category: "AI Services",
    badge: "Trending",
    benefit: "Modern UI & Fast Load",
  },
  {
    icon: Bot,
    title: "Smart AI Automation",
    desc: "Automated WhatsApp business bots, social media auto-replies, and custom lead generation systems.",
    category: "AI Services",
    badge: "Popular",
    benefit: "24/7 Support Setup",
  },
  {
    icon: Sparkles,
    title: "AI Content & Copy",
    desc: "Generate high-converting digital ad copies, blog layouts, and AI-assisted branding visuals.",
    category: "AI Services",
    badge: "New",
    benefit: "Boosts Audience Reach",
  },
  {
    icon: Smartphone,
    title: "App & Portal Dev",
    desc: "Custom web applications, customer portals, and internal business dashboards tailored to your operation.",
    category: "AI Services",
    benefit: "Scalable & Secure Build",
  },

  // Design Services
  {
    icon: Palette,
    title: "Creative Graphic Design",
    desc: "Eye-catching social media flyers, posters, logo concepts, and custom marketing materials.",
    category: "Design Services",
    badge: "Pro",
    benefit: "High-Resolution Output",
  },
  {
    icon: Gift,
    title: "Digital Video Invitations",
    desc: "Elegant and personalized video invitations for weddings, birthdays, anniversaries, and corporate events.",
    category: "Design Services",
    benefit: "Premium Dynamic Formats",
  },
  {
    icon: Share2,
    title: "Brand Management",
    desc: "Comprehensive brand guidelines, typography standards, color palettes, and social media layout kits.",
    category: "Design Services",
    benefit: "Consistent Visual Identity",
  },
  {
    icon: Wrench,
    title: "Website Maintenance",
    desc: "Active bug fixing, speed optimization, regular backups, and seamless web hosting setup or migration.",
    category: "Design Services",
    benefit: "Zero Downtime Assurance",
  },

  // Video Services
  {
    icon: Film,
    title: "Professional Video Editing",
    desc: "Engaging video post-production for Instagram Reels, YouTube videos, and high-impact cinematic projects.",
    category: "Video Services",
    badge: "Most Liked",
    benefit: "Crystal-Clear Sound & Cuts",
  },
  {
    icon: Megaphone,
    title: "Promo & Commercial Ads",
    desc: "High-conversion promo video advertisements optimized to highlight your products, local shops, or online brand.",
    category: "Video Services",
    benefit: "Highly Optimized Ads",
  },

  // Cyber Cafe Services
  {
    icon: FileText,
    title: "Online Admission & Forms",
    desc: "Hassle-free online form submission for scholarships, government vacancies, driving licenses, and college admissions.",
    category: "Cyber Cafe Services",
    badge: "Local Fave",
    benefit: "100% Accurate Checks",
  },
  {
    icon: Fingerprint,
    title: "Govt ID Support & Forms",
    desc: "Dedicated support for Aadhaar card updates, PAN card generation, domicile certificates, and other offline document processes.",
    category: "Cyber Cafe Services",
    benefit: "Fast Processing Support",
  },
  {
    icon: FileBadge,
    title: "Modern Resume Writing",
    desc: "Professional ATS-friendly CV design and modern resume layouts tailored for graduates and professional profiles.",
    category: "Cyber Cafe Services",
    benefit: "PDF & Editable Versions",
  },
  {
    icon: Printer,
    title: "High-Res Prints & Scans",
    desc: "Super-fast color and black-and-white printing, high-DPI document scanning, lamination, and format conversions.",
    category: "Cyber Cafe Services",
    benefit: "Same Day Counter Service",
  },
];

const getCategoryTheme = (category: string) => {
  switch (category) {
    case "AI Services":
      return {
        accent: "text-cyan-400",
        bg: "bg-cyan-500/10",
        border: "group-hover:border-cyan-500/30",
        glow: "from-cyan-500/10 via-transparent to-transparent",
        badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        dot: "bg-cyan-400",
      };
    case "Design Services":
      return {
        accent: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "group-hover:border-purple-500/30",
        glow: "from-purple-500/10 via-transparent to-transparent",
        badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        dot: "bg-purple-400",
      };
    case "Video Services":
      return {
        accent: "text-rose-400",
        bg: "bg-rose-500/10",
        border: "group-hover:border-rose-500/30",
        glow: "from-rose-500/10 via-transparent to-transparent",
        badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        dot: "bg-rose-400",
      };
    case "Cyber Cafe Services":
      return {
        accent: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "group-hover:border-amber-500/30",
        glow: "from-amber-500/10 via-transparent to-transparent",
        badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        dot: "bg-amber-400",
      };
    default:
      return {
        accent: "text-primary",
        bg: "bg-primary/10",
        border: "group-hover:border-primary/30",
        glow: "from-primary/10 via-transparent to-transparent",
        badge: "bg-primary/10 text-primary border-primary/20",
        dot: "bg-primary",
      };
  }
};

const IconMap: Record<string, any> = {
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
  FileText,
  Fingerprint,
  FileBadge,
  Printer,
};

export function Services() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [customServices, setCustomServices] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "custom_services"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const parsed = snapshot.docs.map(doc => ({
        id: doc.id,
        isCustom: true,
        icon: "Sparkles", // Use flat string icon identifiers
        ...doc.data()
      }));
      setCustomServices(parsed);
    }, (error) => {
      console.warn("Could not fetch custom services:", error);
    });
    return () => unsubscribe();
  }, []);

  const allServices = [...customServices, ...services];

  const filteredServices = allServices.filter(
    (srv) => selectedCategory === "All" || srv.category === selectedCategory
  );

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[10%] left-[-10%] w-[30rem] h-[30rem] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[30rem] h-[30rem] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header and Filter Controls */}
        <div className="mb-16 flex flex-col xl:flex-row xl:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-primary/15 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              My Expertise
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
              Premium <span className="text-gradient">Digital Services</span>
            </h2>
            <p className="text-base sm:text-lg text-white/60">
              Transforming ideas into digital reality with cutting-edge AI-powered and custom local solutions.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all relative border overflow-hidden cursor-pointer",
                  selectedCategory === cat
                    ? "text-black border-transparent"
                    : "text-white/60 border-white/5 bg-white/[0.01] hover:text-white hover:bg-white/[0.03]"
                )}
                id={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {selectedCategory === cat && (
                  <motion.div
                    layoutId="activeServiceCategory"
                    className="absolute inset-0 bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Service Grid */}
        <motion.div 
          layout 
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => {
              const theme = getCategoryTheme(service.category);
              const IconComponent = typeof service.icon === "string" ? (IconMap[service.icon] || Sparkles) : (service.icon || Sparkles);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.3 }}
                  key={service.id || service.title}
                  className={cn(
                    "group glass-card p-6 rounded-2xl cursor-pointer border border-white/5 bg-white/[0.02]",
                    "relative overflow-hidden transition-all duration-300 flex flex-col justify-between h-[300px]",
                    theme.border
                  )}
                  whileHover={{ y: -6, scale: 1.01 }}
                  id={`service-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {/* Glowing background gradient tracking hover */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                    theme.glow
                  )}></div>

                  <div>
                    {/* Header: Icon & optional Badge */}
                    <div className="flex items-start justify-between mb-5 relative z-10">
                      <div className={cn("p-3 rounded-xl transition-transform duration-300 group-hover:scale-110", theme.bg)}>
                        <IconComponent className={cn("w-6 h-6", theme.accent)} />
                      </div>
                      {service.badge && (
                        <span className={cn(
                          "px-2 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border relative z-10",
                          theme.badge
                        )}>
                          {service.badge}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-heading font-bold text-white mb-2 relative z-10 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed relative z-10 group-hover:text-white/70 transition-colors">
                      {service.desc}
                    </p>
                  </div>

                  {/* Card Benefit Footer */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
                    <div className="flex items-center space-x-2">
                      <div className={cn("w-1.5 h-1.5 rounded-full", theme.dot)} />
                      <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors font-medium">
                        {service.benefit}
                      </span>
                    </div>
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center border border-white/5 group-hover:border-white/15",
                      "bg-white/[0.01] group-hover:bg-white/[0.04] transition-all"
                    )}>
                      <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

