import EditPartner from '@/components/admin-panel/partners/edit-partner';

export default function Page({ params: { id } }) {
  return <EditPartner partnerId={id} />;
}
