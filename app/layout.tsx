import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@app/components/header/Header";
import { Providers } from "@app/providers";
import NavigationMenu from "@app/components/header/NavigationMenu";
import { AuthProvider } from "@app/contexts/useAuthContext";
import { inter, notoSansJP } from "@app/font";

export const metadata: Metadata = {
  title: "Buzz Base",
  description: "Generated by create next app",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="h-full">
      <body
        className={`${inter.className} ${notoSansJP.className} bg-main text-white h-full`}
      >
        <AuthProvider>
          <Providers>
            <div className="h-full buzz-dark">
              <Header />
              <main className="h-full">{children}</main>
              <NavigationMenu />
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
