import PublicProvider from '@/providers/provider-public-route';

export default function AdminLayout({ children }) {
  return <PublicProvider>{children}</PublicProvider>;
}
