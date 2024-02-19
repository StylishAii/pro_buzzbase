import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BUZZ BASE",
    short_name: "BUZZ BASE",
    description:
      "野球の個人成績を記録して、チーム内外の友達とランキング形式で成績を共有することができるアプリです。",
    start_url: "/",
    display: "standalone",
    background_color: "#2E2E2E",
    theme_color: "#e08e0a",
    icons: [
      {
        src: "/icon/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/icon/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/icon/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
