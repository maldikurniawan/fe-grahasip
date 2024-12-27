import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "GRAHASIP",
  description: "GRAHASIP adalah perusahaan IT yang bergerak di bidang pengembangan perangkat lunak dan jasa IT lainnya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body>
        <ReduxProvider>
          <Providers>{children}</Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
