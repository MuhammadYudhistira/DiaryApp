import CardDiaries from '@/components/global/(diary)/CardDiaries';
import Wrapper from '@/components/global/Wrapper';
import { redirect } from 'next/navigation';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { page } = searchParams;

  if (page === undefined) {
    redirect('/?page=1');
  }

  return (
    <main>
      <Wrapper title="For Your Page">
        <CardDiaries page={Array.isArray(page) ? page[0] : page} />
      </Wrapper>
    </main>
  );
}
