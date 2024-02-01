import EditPartner from '@/components/Admin/partners/EditPartner';

const Page = ({ params: { id } }) => {
  return <EditPartner partnerId={id} />;
};

export default Page;
