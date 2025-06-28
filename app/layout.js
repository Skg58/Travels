import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Sessionwrapper from "@/components/sessionwrapper";
import { Toaster } from "@/components/ui/sonner"
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Sessionwrapper>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          <div className="">
            {children}
          </div>
          <Toaster />
          <Footer />
          <Script src="https://cdn.lordicon.com/lordicon.js"></Script>
        </body>
      </Sessionwrapper>
    </html>
  );
}