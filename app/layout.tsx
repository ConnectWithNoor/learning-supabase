import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.css";
import Navbar from "@/components/shared/navbar/navbar";
import ModalProvider from "@/providers/modals-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learning Supabase with Next 14",
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
          <ModalProvider>
            <Navbar />
            {children}
          </ModalProvider>
        </main>
      </body>
    </html>
  );
}
