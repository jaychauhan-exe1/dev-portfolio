import { Cabin_Sketch, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import PageTransition from "@/components/PageTransition";
import { CatCursorWrapper } from "@/components/ui/CatCursorWrapper";
import { constructMetadata } from "@/lib/metadata";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const cabinSketch = Cabin_Sketch({
  variable: "--font-cabin-sketch",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })()
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Jay Singh Chauhan",
              "alternateName": "Jay Chauhan",
              "url": "https://jaysinghchauhan.com",
              "image": "https://jaysinghchauhan.com/me.webp",
              "sameAs": [
                "https://github.com/jaychauhan-exe1",
                "https://www.instagram.com/acionystudios/",
                "https://dribbble.com/jaychauhanexe"
              ],
              "jobTitle": "Full Stack Product Engineer",
              "worksFor": {
                "@type": "Organization",
                "name": "Aciony Studios"
              },
              "description": "Full stack product engineer and designer specializing in scalable digital solutions.",
              "knowsAbout": [
                "Full Stack Development",
                "UI/UX Design",
                "Product Engineering",
                "Next.js",
                "React",
                "TypeScript"
              ],
              "knowsLanguage": ["English", "Hindi"]
            })
          }}
        />
      </head>
      <body className={`${dmSans.className} ${cabinSketch.variable} antialiased w-full min-h-screen [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#808080] [&::-webkit-scrollbar-thumb]:rounded-none`} style={{ background: '#008080', margin: 0, padding: 0, overflow: 'auto' }}>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LQHZVXJREJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-LQHZVXJREJ');
          `}
        </Script>
        <PageTransition>
          {children}
        </PageTransition>
        <Navbar />
        <CatCursorWrapper variant="black" />
      </body>
    </html>
  );
}
