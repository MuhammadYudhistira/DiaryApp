import EditDiaryForm from '@/components/auth/EditDiaryForm';
import Wrapper from '@/components/global/Wrapper';
import React from 'react';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  return (
    <Wrapper title="Edit Diary">
      <EditDiaryForm id={id} />
    </Wrapper>
  );
}
