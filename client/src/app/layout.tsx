import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./context/authContext";
import { AnnouncementContextProvider } from "./context/announcementContext";
import { ReportContextProvider } from "./context/reportContext";
import { LoadingProvider } from "./context/bookingLoadingContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TABS",
  description: "Tembusu Abbey Booking System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthContextProvider>
      <AnnouncementContextProvider>
      <ReportContextProvider>
        <LoadingProvider>
          <body className={inter.className}>{children}</body>
        </LoadingProvider>
      </ReportContextProvider>
      </AnnouncementContextProvider>
      </AuthContextProvider>
    </html>
  );
}
