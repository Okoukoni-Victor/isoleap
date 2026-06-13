import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Isoleap — Skills that move organizations forward",
  description:
    "Isoleap designs and delivers hands-on digital and AI skills training for corporate teams, built on the instructional depth of Tech4Dev.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plusJakartaSans.variable} antialiased`}
    >
      <body>
        <Header />

        {/*
          Netlify Forms detection — this hidden form tells Netlify to register
          the "discovery-call" form at build time. Do not remove it.
          The actual submission happens via fetch() in DiscoveryCallModal.tsx.
        */}
        <form
          name="discovery-call"
          data-netlify="true"
          hidden
          aria-hidden="true"
        >
          <input type="text" name="full-name" />
          <input type="email" name="work-email" />
          <input type="text" name="organization" />
          <input type="text" name="job-title" />
          <input type="text" name="sector" />
          <input type="text" name="team-size" />
          <textarea name="message" />
          <input type="text" name="referral" />
        </form>

        {children}
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
