import Link from "next/link";
import {
  TerminalSquare,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";


export function Footer() {
  return (
    <footer className="relative bg-[#050505] pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link
              href="#home"
              className="flex items-center space-x-2 group mb-6 inline-flex"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/50 group-hover:scale-105 transition-transform">
                <img src="/profile.jpg" alt="Satyam Verma" className="w-full h-full object-cover" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tighter text-white">
                Satyam<span className="text-gradient">.verma</span>
              </span>
            </Link>
            <p className="text-white/50 max-w-sm mb-6">
              Building the Future with AI-Powered Creativity. From local cyber
              cafe services to global AI web solutions.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-primary/20 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-primary/20 transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-primary/20 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-primary/20 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#home"
                  className="text-white/50 hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-white/50 hover:text-primary transition-colors"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-white/50 hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#portfolio"
                  className="text-white/50 hover:text-primary transition-colors"
                >
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">
              Services
            </h4>
            <ul className="space-y-3">
              <li>
                <span className="text-white/50 cursor-default">
                  AI Websites
                </span>
              </li>
              <li>
                <span className="text-white/50 cursor-default">
                  Video Editing
                </span>
              </li>
              <li>
                <span className="text-white/50 cursor-default">
                  Graphic Design
                </span>
              </li>
              <li>
                <span className="text-white/50 cursor-default">Cyber Cafe</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© {new Date().getFullYear()} Satyam Verma. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
