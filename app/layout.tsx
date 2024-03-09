import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@app/providers";
import NavigationMenu from "@app/components/header/NavigationMenu";
import { AuthProvider } from "@app/contexts/useAuthContext";
import { notoSansJP } from "@app/font";
import Footer from "@app/components/footer/Footer";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { UserProvider } from "@app/contexts/userContext";

const siteName = "BUZZ BASE 野球の個人成績をランキング形式で共有できるアプリ";
const description =
  "「BUZZ BASE」は、野球の試合結果や個人の打率や防御率などの個人成績を記録することができ、チーム内外の野球友達とグループを作成することで、個人成績をランキングで共有することができるアプリです。友達と打率や打点数・防御率や奪三振率などの成績をランキングで比較することができます。";
const url = "https://buzzbase.jp";

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_METADATA_BASE_URL}`),
  title: {
    default: "BUZZ BASE | 野球の個人成績をランキング形式で共有できるアプリ",
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
          <UserProvider>
            <Providers>
              {children}
              <NavigationMenu />
              <Footer />
            </Providers>
          </UserProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
