import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import "../../satoshi.css";
import { ThemeProvider } from "../utils/theme-context";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500"],
});

const satoshiFontFamily = "Satoshi-Variable, Satoshi-Regular, Satoshi-Medium, Satoshi-Bold, Satoshi-Black, system-ui, -apple-system, sans-serif";

export const metadata: Metadata = {
  title: "Anushka Punukollu",
  description: "my personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} antialiased`}
        style={{ 
          fontFamily: satoshiFontFamily,
          backgroundColor: 'var(--color-background, #fafafa)',
          color: 'var(--color-foreground, #000000)'
        }}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}