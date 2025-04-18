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
  title: "pixelrabbit - Austin based frontend developer and aspriing illustrator",
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
        <div className={`${sourGummy.className} h-90 bg-lime-500 overflow-hidden text-slate-700 pb-4`}>
          <div className="max-w-7xl px-4 m-auto flex h-full justify-between items-end">
            <div className={`self-end `}>
              <h1 className={`text-5xl sm:text-7xl`}>PIXELRABBIT</h1>
              <p>Well, he's just this developer, you know...</p>
            </div>
            <nav className="flex gap-8 text-2xl">
              {Object.entries(navItems).map(([label, href]) => (
                <a key={label} href={href}>{label}</a>
              ))}
            </nav>
          </div>
        </div>
        <div className="max-w-7xl px-4 m-auto py-4">{children}</div>
      </body>
    </html>
  );
}
