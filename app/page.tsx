import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Services } from "@/components/Services";
import { CyberCafe } from "@/components/CyberCafe";
import { Portfolio } from "@/components/Portfolio";
import { WorkProcess } from "@/components/WorkProcess";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Chatbot } from "@/components/Chatbot";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <CyberCafe />
        <WorkProcess />
        <Portfolio />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      
      {/* Placed below the footer as requested */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-start py-8 px-4 sm:px-8 lg:px-16 bg-[#020617] border-t border-white/5 gap-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 shadow-xl shrink-0">
          <img 
            src="/profile.png" 
            alt="Satyam Verma" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center h-24">
          <span className="text-xl md:text-2xl font-heading font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-primary to-purple-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            My Portfolio
          </span>
        </div>
      </div>

      <FloatingWhatsApp />
      <Chatbot />
    </>
  );
}
