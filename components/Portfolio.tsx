"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PhotoUpload } from "./PhotoUpload";
import { useAuth } from "@/lib/auth";

const categories = [
  "All",
  "Websites",
  "Posters",
  "Video editing",
  "INVITATIONS CARDS",
  "AI Art",
];

type Project = {
  id: string;
  title: string;
  category: string;
  link?: string | null;
  isCustom?: boolean;
};

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Modern School Website",
    category: "Websites",
    link: "https://example.com/school",
  },
  {
    id: "2",
    title: "IT Solutions Landing Page",
    category: "Websites",
    link: "https://example.com/it",
  },
  {
    id: "3",
    title: "Festival Marketing Poster",
    category: "Posters",
    link: "https://example.com/poster",
  },
  {
    id: "4",
    title: "Product Promo Video",
    category: "Video editing",
    link: "https://example.com/video",
  },
  {
    id: "5",
    title: "WhatsApp Business Catalog",
    category: "INVITATIONS CARDS",
    link: "https://example.com/catalog",
  },
  {
    id: "6",
    title: "Cyberpunk Cityscape",
    category: "AI Art",
    link: "https://example.com/art",
  },
  {
    id: "7",
    title: "Restaurant Landing Page",
    category: "Websites",
    link: "https://example.com/restaurant",
  },
  {
    id: "8",
    title: "Minimal Logo Concept",
    category: "INVITATIONS CARDS",
    link: "https://example.com/logo",
  },
];

export function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const { isAdmin } = useAuth();

  // Fetch portfolio items from Firestore
  useEffect(() => {
    const q = query(collection(db, "portfolio"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fbProjects = snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        category: doc.data().category,
        link: doc.data().link || null,
        isCustom: true,
      }));
      setProjects([...fbProjects, ...defaultProjects]);
    }, (error) => {
      console.warn("Could not fetch portfolio items. You might need to update Firebase indices or rules:", error);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (!isAdmin) return;
    try {
      await deleteDoc(doc(db, "portfolio", id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const filteredProjects = projects.filter(
    (proj) => filter === "All" || proj.category === filter,
  );

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-lg text-white/60">
              A glimpse into my creative and technical capabilities.
            </p>
          </div>
          {isAdmin && <PhotoUpload onUploadSuccess={() => {}} />}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                filter === cat
                  ? "bg-primary text-black neon-glow"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative glass-card p-6 rounded-2xl overflow-hidden aspect-[4/3] flex flex-col justify-between hover:border-primary/50 transition-colors"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
                }}
              >
                <div>
                  <span className="text-primary font-mono text-xs uppercase mb-2 inline-block px-2 py-1 rounded bg-primary/10">
                    {project.category}
                  </span>
                  <h3 className="text-white text-2xl font-bold font-heading mt-2">
                    {project.title}
                  </h3>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:text-white transition-colors font-medium">
                      <ExternalLink className="w-5 h-5" /> Visit Project
                    </a>
                  ) : (
                    <span className="text-sm text-white/40 italic">No link available</span>
                  )}
                  {isAdmin && project.isCustom && (
                    <button 
                      onClick={() => handleDelete(project.id)}
                      className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-400/10 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
