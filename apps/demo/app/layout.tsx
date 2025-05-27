import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demo",
  description: "@clxrity/zip demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        {children}
      </body>
    </html>
  );
}
