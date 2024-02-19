import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@app/providers";
import NavigationMenu from "@app/components/header/NavigationMenu";
import { AuthProvider } from "@app/contexts/useAuthContext";
import { notoSansJP } from "@app/font";
import Footer from "@app/components/footer/Footer";
import Script from "next/script";

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
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
      <meta name="apple-mobile-web-app-title" content="BUZZ BASE" />
      <meta name="application-name" content="BUZZ BASE" />
      <Script
        async
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-47TWJXXWMF"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
 
           gtag('config', 'G-47TWJXXWMF');
           `,
        }}
      />
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
