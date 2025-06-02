import "./globals.css";
import Navigation from "./components/Navigation";




export const metadata = {
  title: "Mayra D'Light",
  description: "Mayra D'Light App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen pb-20">
        {children}
        <Navigation/>
      </body>
    </html>
  );
}
