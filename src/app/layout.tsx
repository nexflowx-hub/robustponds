import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#C52023",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://robustponds.shop'),
  title: {
    default: "Robustponds® | Equipamentos Frigoríficos Industriais",
    template: "%s | Robustponds®",
  },
  description:
    "Especialistas em portas frigoríficas, painéis isotérmicos, cortinas de lamelas, guarda-rail e revestimentos higiénicos. Soluções à medida para câmaras frias. B2B industrial equipment.",
  keywords: [
    "robustponds",
    "portas frigoríficas",
    "portas frigorificas",
    "painéis isotérmicos",
    "painéis isotermicos",
    "câmaras frias",
    "camaras frias",
    "guarda rail",
    "cortina lamelas",
    "cortina de lamelas",
    "refrigeração industrial",
    "refrigeracao industrial",
    "revestimentos higiénicos",
    "revestimentos higienicos",
    "equipamentos frigoríficos",
    "portas deslizantes",
    "portas pivotantes",
    "portas rápidas",
    "B2B",
    "industrial refrigeration",
  ],
  authors: [{ name: "Robustponds®", url: "https://robustponds.shop" }],
  creator: "Robustponds®",
  publisher: "Robustponds®",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://robustponds.shop",
    siteName: "Robustponds®",
    title: "Robustponds® | Equipamentos Frigoríficos Industriais",
    description:
      "Portas frigoríficas, painéis isotérmicos, cortinas de lamelas e revestimentos higiénicos. Soluções à medida para câmaras frias.",
    images: [
      {
        url: "/logo-robustponds.png",
        width: 500,
        height: 231,
        alt: "Robustponds® - Equipamentos Frigoríficos Industriais",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robustponds® | Equipamentos Frigoríficos Industriais",
    description:
      "Portas frigoríficas, painéis isotérmicos, cortinas de lamelas e revestimentos higiénicos.",
    images: ["/logo-robustponds.png"],
  },
  alternates: {
    canonical: "https://robustponds.shop",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "85x231", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Robustponds®",
              url: "https://robustponds.shop",
              logo: "https://robustponds.shop/logo-robustponds.png",
              description:
                "Especialistas em equipamentos frigoríficos industriais — portas frigoríficas, painéis isotérmicos, cortinas de lamelas, guarda-rail e revestimentos higiénicos.",
              telephone: "+351261963343",
              email: "orcamentos@robustponds.pt",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Zona Industrial, Apartado 123",
                addressLocality: "Torres Vedras",
                postalCode: "2560-000",
                addressCountry: "PT",
              },
              sameAs: [],
              areaServed: {
                "@type": "Country",
                name: "Portugal",
              },
              industry: "Industrial Refrigeration Equipment",
              knowsAbout: [
                "Portas Frigoríficas",
                "Painéis Isotérmicos",
                "Cortinas de Lamelas",
                "Guarda-Rail",
                "Revestimentos Higiénicos",
                "Câmaras Frias",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Robustponds®",
              url: "https://robustponds.shop",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://robustponds.shop/?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
