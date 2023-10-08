import localFont from "next/font/local";
import Providers from "@/components/Providers";
import "./globals.css";

const myFont = localFont({
  src: "../public/fonts/NewMexika.ttf",
  display: "swap",
});

export const metadata = {
  title: "Мiсто для мiстян",
  description: "Мiсто для мiстян",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.className}>
      <body className="bg-gray/5 text-gray/100">
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
