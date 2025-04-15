import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import { ReduxProvider } from "@/providers/ReduxProvider";
import PageHeader from "@/components/PageHeader";
import Page from "@/components/Page";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Viz Met",
  description: "Viz Met",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <Layout>
            <PageHeader />
            <Page className="py-6">{children}</Page>
          </Layout>
        </ReduxProvider>
      </body>
    </html>
  );
}
