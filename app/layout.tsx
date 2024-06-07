import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactQueryProvider } from "@/components/react-query-provider";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

import "@/libs/cognito/init";
import "@/libs/cognito/clientInit";
import { Authenticated } from "@/components/authenticated";

import "../libs/font-awesome/init";
import { FloatingNavbar } from "@/components/floating-navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "dyno",
  description: "dynamodb client",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "dark:bg-black")}>
        <Suspense>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {/* {children} */}
              {children}

              <FloatingNavbar />
              {/* <Authenticated>{children}</Authenticated> */}
            </ThemeProvider>
          </ReactQueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
