import './globals.css';

export const metadata = {
  title: 'Мiсто для мiстян',
  description: 'Мiсто для мiстян',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray/5">{children}</body>
    </html>
  );
}
