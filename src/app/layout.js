import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Classes",
  description: "Learn AI, Machine Learning, and Data Science",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
