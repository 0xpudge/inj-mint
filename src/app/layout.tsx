import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Inter } from "next/font/google";
import { Provider } from "~/components/provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "INJ | Alpha Hunter",
  description: "INJ | Alpha Hunter",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
