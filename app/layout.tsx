import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/data";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

// Inter is the fallback while PP Neue Montreal (self-hosted, see
// public/fonts/README) loads or if its files aren't present yet.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://taslim-abdul.framer.website"),
  title: `${site.name} — ${site.role}`,
  description: site.subhead,
  keywords: [
    "UI/UX Designer",
    "Product Designer",
    "Taslim Abdulkadir",
    "Lagos",
    "Nigeria",
    "Portfolio",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.subhead,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.subhead,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} antialiased`}
    >
      <body className="grain min-h-dvh">
        <SmoothScroll />
        <CustomCursor />
        {children}
        {/* Soft blur along the bottom edge (~half an inch) so content
            dissolves as it scrolls out. Uses Tailwind's backdrop-blur — a
            hand-written backdrop-filter gets stripped by the CSS pipeline. */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-12"
        >
          {/* Blur only — no tint, so it stays fully transparent. */}
          <div className="absolute inset-0 backdrop-blur-md [mask-image:linear-gradient(to_bottom,transparent_0%,black_70%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_70%)]" />
        </div>
      </body>
    </html>
  );
}
