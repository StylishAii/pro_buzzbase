import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@app/components/header/Header";
import { Providers } from "@app/providers";
import NavigationMenu from "@app/components/header/NavigationMenu";
import { AuthProvider } from "@app/contexts/useAuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Buzz Base",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-main text-white`}>
        <AuthProvider>
          <Providers>
            <Header />
            {children}
            <NavigationMenu />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
