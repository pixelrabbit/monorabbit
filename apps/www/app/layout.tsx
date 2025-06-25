import type { Metadata } from "next";
import { Roboto, Sour_Gummy } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400"],
  subsets: ['latin'],
});

const sourGummy = Sour_Gummy({
  variable: "--font-gummy",
  weight: ["800"],
  style: ['italic'],
  subsets: ['latin'],
});


export const metadata: Metadata = {
  title: "pixelrabbit - Austin based frontend developer and aspiring illustrator",
  description: "TK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const navItems = {
    "Developer": "#developer",
    "Illustrator": "#illustrator",
    "Person": "#about"
  }

  return (
    <html lang="en">
      <body
        className={`${roboto.variable}  antialiased m-0`}
      >
        <div className={`${sourGummy.className} h-90 overflow-hidden text-slate-800 pb-4 bg-abstract`}>
          <div className="max-w-7xl px-4 m-auto flex h-full justify-between items-end">
            <div className={`self-end`}>
              <h1 className={`text-5xl sm:text-8xl tracking-tight`}>PiXELRABBiT</h1>
              <p className="sm:text-2xl">He's just this developer, you know...</p>
            </div>
            <nav className="text-2xl">
              <ul className="flex gap-8">
                {Object.entries(navItems).map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="px-3 py-1 transition-colors rounded-xl border text-slate-950 border-slate-950 hover:border-white hover:text-white">{label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className="max-w-7xl px-4 m-auto py-4">{children}</div>
      </body>
    </html>
  );
}
