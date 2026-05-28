"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc 
} from "firebase/firestore";
import { 
  ShieldAlert, 
  Lock, 
  UserCircle, 
  ArrowLeft,
  Mail, 
  Phone, 
  FolderGit2, 
  Plus, 
  Trash2, 
  HelpCircle, 
  MessageSquare,
  Sparkles,
  DollarSign,
  Settings,
  X,
  PlusCircle,
  FileCheck2,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink,
  Crown
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

// Types
type ContactMessage = {
  id: string;
  name: string;
  emailOrPhone: string;
  service: string;
  message: string;
  createdAt: string;
};

type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  link: string;
  createdAt: string;
};

type CustomService = {
  id: string;
  title: string;
  desc: string;
  category: string;
  badge?: string;
  benefit: string;
  createdAt: string;
};

type CustomFAQ = {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
};

type CustomPricing = {
  id: string;
  name: string;
  desc: string;
  price: string;
  duration: string;
  features: string; // Comma separated
  popular: boolean;
  createdAt: string;
};

export default function AdminPage() {
  const { user, isAdmin, login, logout, loading: authLoading } = useAuth();
  
  // Tab control
  const [activeTab, setActiveTab] = useState<"inquiries" | "portfolio" | "services" | "faqs" | "pricing">("inquiries");

  // State arrays for collections
  const [inquiries, setInquiries] = useState<ContactMessage[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [services, setServices] = useState<CustomService[]>([]);
  const [faqs, setFaqs] = useState<CustomFAQ[]>([]);
  const [pricingPlans, setPricingPlans] = useState<CustomPricing[]>([]);

  // Loading indicator states
  const [loadingStates, setLoadingStates] = useState({
    inquiries: true,
    portfolio: true,
    services: true,
    faqs: true,
    pricing: true,
  });

  // Modals / forms toggle states
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  // Form Fields
  const [portForm, setPortForm] = useState({ title: "", category: "Websites", link: "" });
  const [serviceForm, setServiceForm] = useState({ title: "", desc: "", category: "AI Services", badge: "", benefit: "" });
  const [faqForm, setFaqForm] = useState({ question: "", answer: "" });
  const [pricingForm, setPricingForm] = useState({ name: "", desc: "", price: "₹", duration: "/project", features: "", popular: false });

  const [saving, setSaving] = useState(false);

  // Listeners
  useEffect(() => {
    if (!isAdmin) return;

    // 1. Inquiries
    const qInq = query(collection(db, "contact_messages"), orderBy("createdAt", "desc"));
    const unsubInq = onSnapshot(qInq, (snapshot) => {
      setInquiries(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as ContactMessage)));
      setLoadingStates(prev => ({ ...prev, inquiries: false }));
    }, () => setLoadingStates(prev => ({ ...prev, inquiries: false })));

    // 2. Portfolio Items
    const qPort = query(collection(db, "portfolio"), orderBy("createdAt", "desc"));
    const unsubPort = onSnapshot(qPort, (snapshot) => {
      setPortfolioItems(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as PortfolioItem)));
      setLoadingStates(prev => ({ ...prev, portfolio: false }));
    }, () => setLoadingStates(prev => ({ ...prev, portfolio: false })));

    // 3. Custom Services
    const qSrv = query(collection(db, "custom_services"), orderBy("createdAt", "desc"));
    const unsubSrv = onSnapshot(qSrv, (snapshot) => {
      setServices(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CustomService)));
      setLoadingStates(prev => ({ ...prev, services: false }));
    }, () => setLoadingStates(prev => ({ ...prev, services: false })));

    // 4. Custom FAQs
    const qFaq = query(collection(db, "custom_faqs"), orderBy("createdAt", "desc"));
    const unsubFaq = onSnapshot(qFaq, (snapshot) => {
      setFaqs(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CustomFAQ)));
      setLoadingStates(prev => ({ ...prev, faqs: false }));
    }, () => setLoadingStates(prev => ({ ...prev, faqs: false })));

    // 5. Pricing Plans
    const qPric = query(collection(db, "custom_pricing"), orderBy("createdAt", "desc"));
    const unsubPric = onSnapshot(qPric, (snapshot) => {
      setPricingPlans(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CustomPricing)));
      setLoadingStates(prev => ({ ...prev, pricing: false }));
    }, () => setLoadingStates(prev => ({ ...prev, pricing: false })));

    return () => {
      unsubInq();
      unsubPort();
      unsubSrv();
      unsubFaq();
      unsubPric();
    };
  }, [isAdmin]);

  // Operations: Deletes
  const handleDelete = async (collectionName: string, id: string) => {
    if (!confirm("Are you sure you want to delete this item? This action is irreversible.")) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (err) {
      console.error(`Error deleting from ${collectionName}:`, err);
      alert("Error deleting item! Check Firestore permissions and login state.");
    }
  };

  // Operations: Saves
  const handleAddPortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!portForm.title || !portForm.link) return;
    setSaving(true);
    try {
      await addDoc(collection(db, "portfolio"), {
        ...portForm,
        createdAt: new Date().toISOString()
      });
      setPortForm({ title: "", category: "Websites", link: "" });
      setIsPortfolioModalOpen(false);
    } catch (err) {
      alert("Add failed! Check rules/permissions.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title || !serviceForm.desc || !serviceForm.benefit) return;
    setSaving(true);
    try {
      const payload: any = {
        title: serviceForm.title,
        desc: serviceForm.desc,
        category: serviceForm.category,
        benefit: serviceForm.benefit,
        createdAt: new Date().toISOString()
      };
      if (serviceForm.badge.trim()) {
        payload.badge = serviceForm.badge;
      }
      await addDoc(collection(db, "custom_services"), payload);
      setServiceForm({ title: "", desc: "", category: "AI Services", badge: "", benefit: "" });
      setIsServiceModalOpen(false);
    } catch (err) {
      alert("Add failed! Check rules/permissions.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question || !faqForm.answer) return;
    setSaving(true);
    try {
      await addDoc(collection(db, "custom_faqs"), {
        ...faqForm,
        createdAt: new Date().toISOString()
      });
      setFaqForm({ question: "", answer: "" });
      setIsFaqModalOpen(false);
    } catch (err) {
      alert("Add failed! Check rules/permissions.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddPricing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pricingForm.name || !pricingForm.price || !pricingForm.features) return;
    setSaving(true);
    try {
      await addDoc(collection(db, "custom_pricing"), {
        ...pricingForm,
        createdAt: new Date().toISOString()
      });
      setPricingForm({ name: "", desc: "", price: "₹", duration: "/project", features: "", popular: false });
      setIsPricingModalOpen(false);
    } catch (err) {
      alert("Add failed! Check rules/permissions.");
    } finally {
      setSaving(false);
    }
  };

  // Guard for authorization
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white font-sans">
        <div className="text-center">
          <div className="w-16 h-16 border-t-2 border-b-2 border-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60 tracking-wider font-mono">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center font-sans p-6 relative overflow-hidden">
        {/* Subtle decorative orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="w-full max-w-lg glass-card border border-white/5 rounded-3xl p-8 text-center relative z-15 backdrop-blur-xl shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
              <Lock className="w-8 h-8 animate-pulse" />
            </div>
          </div>
          <h1 className="text-3xl font-heading font-black tracking-tight mb-2 uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-amber-400">
            Access Restricted
          </h1>
          <p className="text-sm font-mono text-amber-400/80 mb-6 bg-amber-400/5 py-1 px-3 rounded-full border border-amber-400/10 inline-block">
            Satyam Verma Admin Portal Only
          </p>
          <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            This module is reserved exclusively for the system owner (**satyammasterofai@gmail.com**) to add, modify, and delete website portfolio, pricing, services, and FAQ items dynamically.
          </p>

          <div className="space-y-4">
            {user ? (
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl mb-4 text-left">
                <span className="text-xs text-white/40 block uppercase tracking-wider font-mono">Logged in as:</span>
                <span className="text-sm font-bold text-white block truncate">{user.email}</span>
                <span className="text-xs text-red-400 block mt-1">This email does not have admin permissions.</span>
              </div>
            ) : null}

            {user ? (
              <button 
                onClick={() => logout()}
                className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all"
              >
                Sign Out of This Account
              </button>
            ) : (
              <button 
                onClick={() => login()}
                className="w-full flex items-center justify-center space-x-3 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-primary/10"
              >
                <Crown className="w-5 h-5 text-yellow-300" />
                <span>Verify Admin Identity</span>
              </button>
            )}

            <Link 
              href="/"
              className="inline-flex items-center space-x-2 text-sm text-white/40 hover:text-white transition-colors mt-6 py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans flex flex-col">
      {/* Top Admin Header */}
      <header className="border-b border-white/5 bg-[#090d22]/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/50 shadow-lg">
                <img src="/profile.png" alt="Satyam Verma" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-tr from-yellow-500 to-amber-300 rounded-full flex items-center justify-center text-black shadow-md border border-[#020617]">
                <Crown className="w-3 h-3 text-black fill-current" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-heading font-black tracking-wider flex items-center gap-1.5 uppercase">
                <span>Admin Panel</span>
                <span className="text-[10px] bg-primary/20 text-primary border border-primary/30 px-1.5 py-0.5 rounded leading-none">V2</span>
              </h1>
              <p className="text-xs text-white/50">Managing satyammasterofai@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <Link 
              href="/"
              className="flex items-center space-x-2 p-2 px-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>View Main Website</span>
            </Link>
            <button 
              onClick={() => logout()}
              className="flex items-center space-x-2 p-2 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all border border-red-500/15 text-sm"
              title="Sign out of admin"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="lg:w-64 xl:w-72 shrink-0 flex flex-col gap-3">
          <div className="glass-card border border-white/5 p-4 rounded-2xl">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block mb-3 pl-2">System Collections</span>
            <nav className="flex flex-col gap-1.5">
              {[
                { id: "inquiries", label: "Inquiry Inbox", count: inquiries.length, icon: MessageSquare, theme: "from-cyan-500/20 text-cyan-400 border-cyan-500/30" },
                { id: "portfolio", label: "Portfolio Items", count: portfolioItems.length, icon: FolderGit2, theme: "from-primary/20 text-primary border-primary/30" },
                { id: "services", label: "Custom Services", count: services.length, icon: Sparkles, theme: "from-purple-500/20 text-purple-400 border-purple-500/30" },
                { id: "faqs", label: "Digital FAQs", count: faqs.length, icon: HelpCircle, theme: "from-rose-500/20 text-rose-400 border-rose-500/30" },
                { id: "pricing", label: "Custom Pricing", count: pricingPlans.length, icon: DollarSign, theme: "from-amber-500/20 text-amber-400 border-amber-500/30" },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={cn(
                      "flex items-center justify-between p-3.5 rounded-xl text-sm font-medium transition-all group border text-left cursor-pointer",
                      isSelected 
                        ? `bg-gradient-to-r ${item.theme} border-current/[0.15]` 
                        : "bg-white/[0.01] hover:bg-white/[0.03] border-transparent text-white/60 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-md font-mono",
                      isSelected ? "bg-black/30 border border-white/10" : "bg-white/5"
                    )}>
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick status card */}
          <div className="glass-card border border-white/5 p-5 rounded-2xl bg-[#090d22]/40">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block mb-2">Live Sync Status</span>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white/50">Database:</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Enterprise
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white/50">Auth Domain:</span>
                <span className="text-white/80 max-w-[120px] truncate" title="my-portfolio-satyam.firebaseapp.com">my-portfolio...</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white/50">Host Server:</span>
                <span className="text-cyan-400">Cloud Run</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Dynamic Detail Content Panel */}
        <section className="flex-1 min-w-0 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: INBOX INQUIRIES */}
            {activeTab === "inquiries" && (
              <motion.div
                key="inquiries"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white font-heading">
                      Customer Inquiry Inbox
                    </h2>
                    <p className="text-xs text-white/50 mt-1">
                      Real-time inquiries received from prospective clients via the website contact form
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 py-1 px-3 rounded-full shrink-0 h-fit">
                    {inquiries.length} Messages Received
                  </span>
                </div>

                {loadingStates.inquiries ? (
                  <div className="py-20 text-center text-white/40 font-mono">Loading dynamic messages...</div>
                ) : inquiries.length === 0 ? (
                  <div className="glass-card border border-white/5 p-12 text-center rounded-2xl">
                    <MessageSquare className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/70 font-bold mb-1">Inquiry Inbox is Empty</p>
                    <p className="text-white/40 text-sm max-w-sm mx-auto">When prospective clients send you queries via the contact form on your home screen, they will appear securely here!</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {inquiries.map((inq) => (
                      <div 
                        key={inq.id}
                        className="glass-card border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] p-6 rounded-2xl flex flex-col md:flex-row gap-4 justify-between"
                      >
                        <div className="space-y-4 flex-1">
                          <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-sm font-bold text-white bg-white/5 px-2.5 py-1 rounded-md">
                              {inq.name}
                            </span>
                            <span className="text-xs bg-primary/10 border border-primary/20 text-primary py-0.5 px-2 rounded">
                              {inq.service}
                            </span>
                            <span className="text-[10px] font-mono text-white/40 flex items-center gap-1 ml-auto md:ml-0">
                              <Calendar className="w-3 h-3" /> {new Date(inq.createdAt).toLocaleString()}
                            </span>
                          </div>

                          <div className="space-y-2 text-sm text-white/70">
                            <div className="flex items-center gap-2 font-mono text-xs text-white/50">
                              <span className="text-white">Contact:</span> {inq.emailOrPhone}
                            </div>
                            <blockquote className="bg-[#050711] border-l-2 border-primary/50 text-white pl-4 py-2 italic rounded-r-lg font-sans leading-relaxed whitespace-pre-wrap">
                              "{inq.message}"
                            </blockquote>
                          </div>
                        </div>

                        <div className="self-end md:self-start shrink-0">
                          <button
                            onClick={() => handleDelete("contact_messages", inq.id)}
                            className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 rounded-xl transition-all"
                            title="Delete Inquiry Message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 2: PORTFOLIO ITEMS */}
            {activeTab === "portfolio" && (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white font-heading">
                      Dynamic Porfolio Manager
                    </h2>
                    <p className="text-xs text-white/50 mt-1">
                      Configure custom works/projects. These display live in the "Portfolio" section of your home screen.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsPortfolioModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-primary text-black font-semibold rounded-xl text-sm transition-all hover:scale-102 active:scale-98"
                  >
                    <Plus className="w-4 h-4" /> Add Custom Project
                  </button>
                </div>

                {loadingStates.portfolio ? (
                  <div className="py-20 text-center text-white/40 font-mono">Loading custom portfolio items...</div>
                ) : portfolioItems.length === 0 ? (
                  <div className="glass-card border border-white/5 p-12 text-center rounded-2xl bg-white/[0.01]">
                    <FolderGit2 className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/70 font-bold mb-1">No Custom Projects Registered</p>
                    <p className="text-white/40 text-sm max-w-sm mx-auto mb-6">You're currently showing the pre-configured default portfolio. Register a custom project using the button to feature your works.</p>
                    <button
                      onClick={() => setIsPortfolioModalOpen(true)}
                      className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2"
                    >
                      <PlusCircle className="w-4 h-4" /> Register First Project
                    </button>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {portfolioItems.map((item) => (
                      <div 
                        key={item.id}
                        className="glass-card border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent p-5 rounded-2xl flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded font-bold uppercase">
                              {item.category}
                            </span>
                            <span className="text-[9px] text-white/30 font-mono">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white mt-3 font-heading line-clamp-1">
                            {item.title}
                          </h3>
                        </div>

                        <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                          {item.link ? (
                            <a 
                              href={item.link} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-xs text-primary hover:text-white flex items-center gap-1 font-semibold"
                            >
                              <ExternalLink className="w-3.5 h-3.5" /> Visit Live
                            </a>
                          ) : (
                            <span className="text-xs text-white/30">No Link</span>
                          )}
                          <button
                            onClick={() => handleDelete("portfolio", item.id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                            title="Delete custom Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 3: CUSTOM SERVICES */}
            {activeTab === "services" && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white font-heading">
                      Dynamic Service Editor
                    </h2>
                    <p className="text-xs text-white/50 mt-1">
                      Append bespoke service offerings. These will merge automatically in the service grids on the frontpage.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsServiceModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-primary text-black font-semibold rounded-xl text-sm transition-all hover:scale-102 active:scale-98"
                  >
                    <Plus className="w-4 h-4" /> Add Bespoke Service
                  </button>
                </div>

                {loadingStates.services ? (
                  <div className="py-20 text-center text-white/40 font-mono">Loading custom services...</div>
                ) : services.length === 0 ? (
                  <div className="glass-card border border-white/5 p-12 text-center rounded-2xl bg-white/[0.01]">
                    <Sparkles className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/70 font-bold mb-1">No Custom Service Registered</p>
                    <p className="text-white/40 text-sm max-w-sm mx-auto mb-6">Your frontend is currently reflecting standard core offerings (AI development, Graphics, Resumes). Feel free to introduce additional features.</p>
                    <button
                      onClick={() => setIsServiceModalOpen(true)}
                      className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2"
                    >
                      <PlusCircle className="w-4 h-4" /> Register New Offering
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {services.map((srv) => (
                      <div 
                        key={srv.id}
                        className="glass-card border border-white/5 bg-[#0a0c1a]/40 p-5 rounded-2xl flex justify-between gap-4"
                      >
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-bold text-white font-heading">{srv.title}</span>
                            <span className="text-xs bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2 py-0.5 rounded uppercase font-mono font-bold">
                              {srv.category}
                            </span>
                            {srv.badge && (
                              <span className="text-[10px] bg-cyan-400/15 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-400/20">
                                {srv.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-white/60">{srv.desc}</p>
                          <div className="text-xs font-mono text-white/40 flex items-center gap-1.5 pt-2">
                            <span className="text-primary font-bold">Benefit Tag:</span>
                            <span className="italic">"{srv.benefit}"</span>
                          </div>
                        </div>

                        <div className="self-center">
                          <button
                            onClick={() => handleDelete("custom_services", srv.id)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/15 rounded-lg transition-all"
                            title="Delete custom service"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 4: FAQS */}
            {activeTab === "faqs" && (
              <motion.div
                key="faqs"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white font-heading">
                      Dynamic FAQ Manager
                    </h2>
                    <p className="text-xs text-white/50 mt-1">
                      Post additional helper answers to help clients understand your working practices and support.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsFaqModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-primary text-black font-semibold rounded-xl text-sm transition-all hover:scale-102 active:scale-98"
                  >
                    <Plus className="w-4 h-4" /> Add Custom FAQ
                  </button>
                </div>

                {loadingStates.faqs ? (
                  <div className="py-20 text-center text-white/40 font-mono">Loading custom FAQs...</div>
                ) : faqs.length === 0 ? (
                  <div className="glass-card border border-white/5 p-12 text-center rounded-2xl bg-white/[0.01]">
                    <HelpCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/70 font-bold mb-1">No Custom FAQs Submitted</p>
                    <p className="text-white/40 text-sm max-w-sm mx-auto mb-6">Your page displays rich default inquiries. Supplement this section with answers directly tailored to your local client pipeline.</p>
                    <button
                      onClick={() => setIsFaqModalOpen(true)}
                      className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2"
                    >
                      <PlusCircle className="w-4 h-4" /> Register New FAQ
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {faqs.map((faq) => (
                      <div 
                        key={faq.id}
                        className="glass-card border border-white/5 bg-[#0a0c1a]/40 p-5 rounded-2xl flex justify-between gap-4"
                      >
                        <div className="space-y-2 flex-1">
                          <h3 className="text-base font-bold text-primary font-heading">
                            Q: {faq.question}
                          </h3>
                          <p className="text-sm text-white/70 bg-[#020511] p-3 rounded-xl border border-white/5 whitespace-pre-wrap leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>

                        <div className="self-start">
                          <button
                            onClick={() => handleDelete("custom_faqs", faq.id)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/15 rounded-lg transition-all"
                            title="Delete custom FAQ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 5: PRICING */}
            {activeTab === "pricing" && (
              <motion.div
                key="pricing"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white font-heading">
                      Dynamic Pricing Manager
                    </h2>
                    <p className="text-xs text-white/50 mt-1">
                      Customize dynamic tiers and packages that highlight your cost and offerings list on the showcase page.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsPricingModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-primary text-black font-semibold rounded-xl text-sm transition-all hover:scale-102 active:scale-98"
                  >
                    <Plus className="w-4 h-4" /> Add Pricing Package
                  </button>
                </div>

                {loadingStates.pricing ? (
                  <div className="py-20 text-center text-white/40 font-mono">Loading custom pricing...</div>
                ) : pricingPlans.length === 0 ? (
                  <div className="glass-card border border-white/5 p-12 text-center rounded-2xl bg-white/[0.01]">
                    <DollarSign className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/70 font-bold mb-1">No Custom Tiers Set</p>
                    <p className="text-white/40 text-sm max-w-sm mx-auto mb-6">Display customized packages. If none are live, the portal defaults to your elegant Indian Rupee standard tiers (Starter, Business, Premium AI).</p>
                    <button
                      onClick={() => setIsPricingModalOpen(true)}
                      className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2"
                    >
                      <PlusCircle className="w-4 h-4" /> Configure Custom Pricing
                    </button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {pricingPlans.map((plan) => (
                      <div 
                        key={plan.id}
                        className={cn(
                          "glass-card p-6 rounded-2xl flex flex-col justify-between border relative bg-[#0a0c1a]/30",
                          plan.popular ? "border-primary/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]" : "border-white/5"
                        )}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-3">
                            <div>
                              <h3 className="text-lg font-bold text-white font-heading">{plan.name}</h3>
                              <p className="text-xs text-white/50">{plan.desc}</p>
                            </div>
                            {plan.popular && (
                              <span className="text-[9px] bg-primary text-black font-bold uppercase py-0.5 px-2 rounded-full font-sans tracking-wide">
                                Popular
                              </span>
                            )}
                          </div>

                          <div className="my-4 font-heading">
                            <span className="text-2xl font-bold text-white">{plan.price}</span>
                            <span className="text-xs text-white/40 ml-1">{plan.duration}</span>
                          </div>

                          <div className="space-y-2 mt-4">
                            <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Bullet Features:</span>
                            <ul className="space-y-1.5 pl-2">
                              {plan.features.split(",").map((feat, i) => (
                                <li key={i} className="text-xs text-white/70 flex items-center gap-1.5 font-sans">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary/80"></span>
                                  {feat.trim()}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex justify-end mt-6">
                          <button
                            onClick={() => handleDelete("custom_pricing", plan.id)}
                            className="p-2 hover:bg-red-500/15 text-red-400 hover:text-red-300 rounded-lg transition-all border border-transparent hover:border-red-500/10"
                            title="Delete custom plan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </section>
      </main>

      {/* ------------------- MODAL WINDOWS FOR CREATIONS ------------------- */}
      
      {/* 1. PORTFOLIO MODAL */}
      <AnimatePresence>
        {isPortfolioModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0c0d1b] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
            >
              <button 
                onClick={() => setIsPortfolioModalOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-primary" /> New Portfolio Item
              </h3>
              
              <form onSubmit={handleAddPortfolio} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-1.5">Project Title</label>
                  <input 
                    type="text" 
                    required
                    value={portForm.title}
                    onChange={(e) => setPortForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors"
                    placeholder="e.g. Dynamic Restaurant Web App"
                    maxLength={100}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-1.5">Category</label>
                  <select 
                    value={portForm.category}
                    onChange={(e) => setPortForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-[#070814] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors cursor-pointer"
                  >
                    <option value="Websites">Websites</option>
                    <option value="Posters">Posters</option>
                    <option value="Video editing">Video editing</option>
                    <option value="INVITATIONS CARDS">INVITATIONS CARDS</option>
                    <option value="AI Art">AI Art</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-1.5">Destination Link (URL)</label>
                  <input 
                    type="url" 
                    required
                    value={portForm.link}
                    onChange={(e) => setPortForm(prev => ({ ...prev, link: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors"
                    placeholder="https://..."
                    maxLength={500}
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsPortfolioModalOpen(false)}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-sm transition-all border border-white/5"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={saving}
                    className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/10 transition-all flex items-center justify-center"
                  >
                    {saving ? "Registering..." : "Add Project"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. CUSTOM SERVICE MODAL */}
      <AnimatePresence>
        {isServiceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0c0d1b] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
            >
              <button 
                onClick={() => setIsServiceModalOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> New Customized Service
              </h3>
              
              <form onSubmit={handleAddService} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-1.5">Service Title</label>
                  <input 
                    type="text" 
                    required
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors"
                    placeholder="e.g. Custom Telegram Automation"
                    maxLength={100}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-1.5">Categorization</label>
                  <select 
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-[#070814] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors cursor-pointer"
                  >
                    <option value="AI Services">AI Services</option>
                    <option value="Design Services">Design Services</option>
                    <option value="Video Services">Video Services</option>
                    <option value="Cyber Cafe Services">Cyber Cafe Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-1.5">Offer Description</label>
                  <textarea 
                    required
                    rows={3}
                    value={serviceForm.desc}
                    onChange={(e) => setServiceForm(prev => ({ ...prev, desc: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors resize-none"
                    placeholder="Describe what customers get and how it delivers value..."
                    maxLength={1000}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-1.5">Optional Badge</label>
                    <input 
                      type="text" 
                      value={serviceForm.badge}
                      onChange={(e) => setServiceForm(prev => ({ ...prev, badge: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors"
                      placeholder="e.g. Popular, Hot"
                      maxLength={50}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-1.5">Key Benefit</label>
                    <input 
                      type="text" 
                      required
                      value={serviceForm.benefit}
                      onChange={(e) => setServiceForm(prev => ({ ...prev, benefit: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors"
                      placeholder="e.g. Max 24h Setup"
                      maxLength={100}
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsServiceModalOpen(false)}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-sm transition-all border border-white/5"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={saving}
                    className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/10 transition-all flex items-center justify-center"
                  >
                    {saving ? "Registering..." : "Add Service"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. CUSTOM FAQ MODAL */}
      <AnimatePresence>
        {isFaqModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0c0d1b] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
            >
              <button 
                onClick={() => setIsFaqModalOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" /> New FAQ Item
              </h3>
              
              <form onSubmit={handleAddFaq} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-1.5">Question text</label>
                  <input 
                    type="text" 
                    required
                    value={faqForm.question}
                    onChange={(e) => setFaqForm(prev => ({ ...prev, question: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors"
                    placeholder="e.g. Do you accept international wire?"
                    maxLength={500}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-1.5">Answer response</label>
                  <textarea 
                    required
                    rows={4}
                    value={faqForm.answer}
                    onChange={(e) => setFaqForm(prev => ({ ...prev, answer: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors resize-none"
                    placeholder="Describe fully..."
                    maxLength={2000}
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsFaqModalOpen(false)}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-sm transition-all border border-white/5"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={saving}
                    className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/10 transition-all flex items-center justify-center"
                  >
                    {saving ? "Registering..." : "Add FAQ"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. CUSTOM PRICING MODAL */}
      <AnimatePresence>
        {isPricingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0c0d1b] border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative"
            >
              <button 
                onClick={() => setIsPricingModalOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" /> New Pricing Package
              </h3>
              
              <form onSubmit={handleAddPricing} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-1.5">Package Name</label>
                    <input 
                      type="text" 
                      required
                      value={pricingForm.name}
                      onChange={(e) => setPricingForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors"
                      placeholder="e.g. Pro Premium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-1.5">Display Price</label>
                    <input 
                      type="text" 
                      required
                      value={pricingForm.price}
                      onChange={(e) => setPricingForm(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors"
                      placeholder="e.g. ₹9,999"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-1.5">Price Duration</label>
                    <input 
                      type="text" 
                      required
                      value={pricingForm.duration}
                      onChange={(e) => setPricingForm(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors"
                      placeholder="e.g. /project"
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <input 
                      type="checkbox" 
                      id="popular-pricing-cb"
                      checked={pricingForm.popular}
                      onChange={(e) => setPricingForm(prev => ({ ...prev, popular: e.target.checked }))}
                      className="w-4 h-4 rounded text-primary focus:ring-primary/50 cursor-pointer accent-primary"
                    />
                    <label htmlFor="popular-pricing-cb" className="text-sm font-medium text-white/80 cursor-pointer">Highlight as Most Popular</label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-1.5">Description Summary</label>
                  <input 
                    type="text" 
                    value={pricingForm.desc}
                    onChange={(e) => setPricingForm(prev => ({ ...prev, desc: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors"
                    placeholder="e.g. For large agencies requiring bespoke automated pipelines."
                    maxLength={500}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-1.5">Features / Bullet List (Comma-Separated)</label>
                  <textarea 
                    required
                    rows={3}
                    value={pricingForm.features}
                    onChange={(e) => setPricingForm(prev => ({ ...prev, features: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors resize-none"
                    placeholder="Simple SEO Setup, 5 Custom Revisions, Custom CMS"
                    maxLength={2000}
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsPricingModalOpen(false)}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-sm transition-all border border-white/5"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={saving}
                    className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/10 transition-all flex items-center justify-center"
                  >
                    {saving ? "Registering..." : "Add Package"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
