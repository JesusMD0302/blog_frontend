import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Theme from "@/context/ThemeProvider";
import MainLayout from "@/layouts/MainLayout";
import Navbar from "@/components/Nav/Navbar";
import Providers from "./Providers";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Blog",
  description: "Blog made with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <Theme>
            <MainLayout>
              <Navbar />
              {children}
            </MainLayout>
          </Theme>
        </Providers>
      </body>
    </html>
  );
}
