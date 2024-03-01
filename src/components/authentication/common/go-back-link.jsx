import { Button } from '@/components/common';
import Link from 'next/link';

export default function GoBackLink() {
  return (
    <Button
      type="button"
      className="w-[182px] font-source_sans_3 leading-none"
      variant="outlined"
    >
      <Link href="/login">Повернутися</Link>
    </Button>
  );
}
