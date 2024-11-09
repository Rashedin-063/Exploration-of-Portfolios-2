import type { Metadata } from "next";
import {Inter} from "next/font/google"
import "./globals.css";
import { ThemeProvider } from "@/providers/provider";

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Modern and minimalistic portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className}  antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
