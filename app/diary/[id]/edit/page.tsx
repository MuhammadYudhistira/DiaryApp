import EditDiaryForm from '@/components/auth/EditDiaryForm';
import Wrapper from '@/components/global/Wrapper';
import React from 'react';

type ParamsProps = {
  params: {
    id: string;
  };
};

const page = async ({ params }: ParamsProps) => {
  const { id } = await params;

  return (
    <Wrapper title="Edit Diary">
      <EditDiaryForm id={id} />
    </Wrapper>
  );
};

export default page;
