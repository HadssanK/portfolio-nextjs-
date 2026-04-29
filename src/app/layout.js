
import React from "react";
import { JetBrains_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import ChatbotWidget from "@/components/ChatbotWidget";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800"],
  variable: "--font-jetbrains",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800"],
  variable: "--font-poppins",
});

export const metadata = {
  title: {
    default: "Muhammad Hassan - Software Engineer",
    template: "%s | Muhammad Hassan",
  },
  description: "Created By Muhammad Hassan",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jetbrainsMono.variable} ${poppins.variable}`}
    >
      <body className="font-poppins antialiased transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-right" richColors />
          <ChatbotWidget />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}