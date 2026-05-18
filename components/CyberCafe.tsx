"use client";

import { motion } from "motion/react";
import {
  FileText,
  Ticket,
  FileBadge,
  Printer,
  Fingerprint,
  GraduationCap,
  Briefcase,
  Monitor,
} from "lucide-react";

const cafeServices = [
  {
    icon: FileText,
    title: "Online Services",
    items: [
      "Scholarship Forms",
      "Government Apps",
      "Exam Forms",
      "Job Applications",
    ],
  },
  {
    icon: Ticket,
    title: "Ticket Booking",
    items: [
      "Train Tickets",
      "Bus Tickets",
      "Flight Bookings",
      "Tatkal Support",
    ],
  },
  {
    icon: FileBadge,
    title: "Resume Services",
    items: [
      "Professional CVs",
      "Student Resumes",
      "Modern Formatting",
      "Cover Letters",
    ],
  },
  {
    icon: Printer,
    title: "Print & Docs",
    items: [
      "Color Printing",
      "High-res Scanning",
      "PDF Conversion",
      "Lamination",
    ],
  },
  {
    icon: Fingerprint,
    title: "Govt ID Support",
    items: [
      "Aadhaar Updates",
      "PAN Card Forms",
      "Passport Guidance",
      "Verification Work",
    ],
  },
  {
    icon: GraduationCap,
    title: "Student Tasks",
    items: ["Assignments", "Notes to PDF", "Presentations", "Project Covers"],
  },
  {
    icon: Briefcase,
    title: "Business Support",
    items: [
      "Digital Visiting Cards",
      "WhatsApp Setup",
      "Catalogues",
      "Basic GST Info",
    ],
  },
  {
    icon: Monitor,
    title: "PC & Internet",
    items: [
      "File Transfer",
      "Software Install",
      "Internet Access",
      "Troubleshooting",
    ],
  },
];

export function CyberCafe() {
  return (
    <section className="py-24 relative bg-[#0a0a0f]">
      {/* Texture mask background */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-sm font-bold uppercase tracking-wider mb-4">
            Local & Offline
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Cyber Cafe &{" "}
            <span className="text-gradient">Local Digital Services</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Providing fast, reliable, and expert digital assistance for local
            students, businesses, and citizens.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cafeServices.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card p-6 rounded-2xl border-white/5 border-l-secondary/30 border-l-[3px] hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center space-x-3 mb-4 border-b border-white/10 pb-4">
                <service.icon className="w-6 h-6 text-secondary" />
                <h3 className="text-lg font-heading font-semibold text-white">
                  {service.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {service.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm text-white/60 flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-white/20 before:rounded-full before:mr-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
