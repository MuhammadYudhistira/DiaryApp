import CardDiaries from '@/components/global/(diary)/CardDiaries';
import Wrapper from '@/components/global/Wrapper';

export default function Home() {
  return (
    <main>
      <Wrapper title="For Your Page">
        <CardDiaries />
      </Wrapper>
    </main>
  );
}
