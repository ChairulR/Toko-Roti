import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mayra D'Light",
  description: "Mayra D'Light App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Navigation/>
      </body>
    </html>
  );
}
