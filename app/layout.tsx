"use client";

import "./globals.css";
import { Providers } from "./providers";
import { rubik } from "./fonts";
import { Header } from "./components/Header/Header";
import { Button } from "@chakra-ui/react";
import { Footer } from "./components/Footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rubik.variable} antialiased`}>
      <body style={{ backgroundColor: "#fff8f1" }}>
        <Header />
        <Providers>{children}</Providers>
        <Button
          background="#ff922c"
          rounded="25%"
          size="lg"
          variant="solid"
          padding="10px"
          position="absolute"
          right="0"
          left="0"
          marginInline="auto"
          width='fit-content'
          bottom='-10%'
          fontWeight='bold'
          color='white'
        >
          Order Now
        </Button>
        <Footer />
      </body>
    </html>
  );
}
