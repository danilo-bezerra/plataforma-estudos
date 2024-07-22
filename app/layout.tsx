import "@/app/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";

import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Plataforma de Estudos",
  description:
    "Plataforma de estudos perfeita consumir conteúdos baixados no computador de forma inteligente e organizada.",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "flex flex-col min-h-screen font-sans antialiased ",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class">
          <Header />
          <main className="flex flex-col flex-1 p-6  space-y-8 ">
            {children}
          </main>

          <Footer />

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
