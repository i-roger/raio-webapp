import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import React from 'react';


import PopupModalDonation from "../components/PopupModalDonation";
import TabBar from "../components/tabbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raio Laranja",
  description: "Desenvolvido por Matheus Roger 2025.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-br">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8817598114486469" crossOrigin="anonymous"/>
        <meta name="google-adsense-account" content="ca-pub-8817598114486469"/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <TabBar/>
        <SpeedInsights/>
        <PopupModalDonation/>

      </body>
    </html>
  );
}
