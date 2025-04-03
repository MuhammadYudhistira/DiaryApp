import CardDiaries from '@/components/global/(diary)/CardDiaries';
import Wrapper from '@/components/global/Wrapper';
import { redirect } from 'next/navigation';

export default async function Home(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
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
