import CreateDiaryForm from '@/components/auth/CreateDiaryForm';
import Wrapper from '@/components/global/Wrapper';
import React from 'react';

const page = () => {
  return (
    <Wrapper title="Dashboard">
      <CreateDiaryForm />
    </Wrapper>
  );
};

export default page;
