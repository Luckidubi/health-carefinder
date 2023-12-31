import Navbar from "@/components/Navbar";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";


import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import FirebaseAppWrapper from "@/lib/firebase";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Carefinder",
  description: "A web app for finding nearby hospitals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FirebaseAppWrapper>

        <Navbar />
        <Toaster />
        <div className="min-h-screen">

        {children}
        </div>
        <Footer />
        </FirebaseAppWrapper>
      </body>
    </html>
  );
}
