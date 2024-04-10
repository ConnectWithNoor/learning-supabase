import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.css";
import Navbar from "@/components/shared/navbar/navbar";
import ModalsProvider from "@/components/providers/modals-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learning Supabase",
  description: "ConnectWithNoor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <ModalsProvider>
            <Navbar />
            {children}
          </ModalsProvider>
        </main>
      </body>
    </html>
  );
}
