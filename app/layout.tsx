import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@app/providers";
import NavigationMenu from "@app/components/header/NavigationMenu";
import { AuthProvider } from "@app/contexts/useAuthContext";
import { inter, notoSansJP } from "@app/font";
import Footer from "@app/components/footer/Footer";

export const metadata: Metadata = {
  title: "BUZZ BASE - 野球の個人記録をランキング形式で共有",
  description: "野球の個人成績を記録して、チーム内外の友達とランキング形式で成績を共有することができるアプリです。",
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
            {children}
            <NavigationMenu />
            <Footer />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
