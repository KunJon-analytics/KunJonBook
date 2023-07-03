import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ApolloWrapper } from "@/lib/apollo-provider";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KunJonBook - Feed",
  description: "Newsfeed of all your friends on KunJonBook",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
