import './globals.css';
import Providers from '@/components/Providers';

export const metadata = {
  title: 'Мiсто для мiстян',
  description: 'Мiсто для мiстян',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray/5 text-gray/100">
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
