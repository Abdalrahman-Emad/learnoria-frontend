import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/Header";
// import { AuthProvider } from "@/components/auth/AuthProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import { Toaster } from "react-hot-toast"; // <-- أضفنا Toaster

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Learnoria - Discover Your Perfect Learning Journey",
  description:
    "Connect with top-rated courses and expert instructors. Transform your skills with personalized learning experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="antialiased font-sans">
        <QueryProvider>
          {/* <AuthProvider> */}
            <Header />
            <main className="min-h-screen">{children}</main>
            {/* Toaster لإظهار التنبيهات في أعلى الصفحة */}
            <Toaster position="top-right" />
          {/* </AuthProvider> */}
        </QueryProvider>
      </body>
    </html>
  );
}
