"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes"; // Para manejo dinámico de temas

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} relative h-full w-full bg-slate-950`}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            {/* Fondo personalizado */}
            <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            
            {/* Contenido */}
            <div>{children}</div>
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
