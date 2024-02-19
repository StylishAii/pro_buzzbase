import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@app/providers";
import NavigationMenu from "@app/components/header/NavigationMenu";
import { AuthProvider } from "@app/contexts/useAuthContext";
import { notoSansJP } from "@app/font";
import Footer from "@app/components/footer/Footer";

const siteName = "BUZZ BASE 野球の個人成績を記録してランキングで共有";
const description =
  "野球の個人成績を記録して、チーム内外の友達とランキング形式で成績を共有することができるアプリです。";
const url = "https://buzzbase.jp";

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_METADATA_BASE_URL}`),
  title: {
    default: "BUZZ BASE | 野球の個人記録をランキング形式で共有",
    template: `%s - ${siteName}`,
  },
  description,
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    locale: "ja_JP",
    type: "website",
  },
  alternates: {
    canonical: url,
  },
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
      <body className={`${notoSansJP.className} bg-main text-white h-full`}>
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
