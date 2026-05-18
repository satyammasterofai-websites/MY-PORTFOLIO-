import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Satyam Verma | AI Digital Creator & Cyber Cafe Expert",
  description:
    "AI-Powered Websites, Video Editing, Posters, Branding, Automation & Digital Services for Modern Businesses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "dark scroll-smooth",
        inter.variable,
        spaceGrotesk.variable,
      )}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-background font-sans antialiased overflow-x-hidden"
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
