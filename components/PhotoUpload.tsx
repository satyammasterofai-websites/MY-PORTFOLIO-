"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, Link2, PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function PhotoUpload({ onUploadSuccess }: { onUploadSuccess: () => void }) {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Websites");
  const [uploading, setUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!link.trim() || !title.trim()) return;

    setUploading(true);
    try {
      await addDoc(collection(db, "portfolio"), {
        title,
        category,
        link,
        createdAt: new Date().toISOString(),
      });

      setUploading(false);
      setLink("");
      setTitle("");
      setIsOpen(false);
      onUploadSuccess();
    } catch (error) {
      console.error("Error saving document:", error);
      setUploading(false);
      alert("Error saving document");
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors font-medium border border-white/20 shadow-lg"
      >
        <PlusCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Add Project Link</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#020617] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                ✕
              </button>
              
              <h3 className="text-2xl font-heading font-bold text-white mb-6">Add Project</h3>
              
              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Title</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    maxLength={30}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50 transition-colors [&>option]:bg-slate-900"
                  >
                    <option value="Websites">Websites</option>
                    <option value="Posters">Posters</option>
                    <option value="Video editing">Video editing</option>
                    <option value="INVITATIONS CARDS">INVITATIONS CARDS</option>
                    <option value="AI Art">AI Art</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Project Link (URL)</label>
                  <div className="relative">
                    <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input 
                      type="url" 
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      required
                      placeholder="https://..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={uploading || !link.trim() || !title.trim()}
                  className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-bold shadow-lg shadow-primary/20 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-6 transition-all"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Uploading...
                    </>
                  ) : "Add to Portfolio"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
