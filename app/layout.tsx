import "./globals.css";

import { Nunito } from "next/font/google";
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

export const metadata = {
  title: "TDEElicious 🔥",
  description:
    "Calculate your Total Daily Energy Expenditure with a delicious twist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${nunito.className} h-full bg-orange-50`}>
        {children}
      </body>
    </html>
  );
}
