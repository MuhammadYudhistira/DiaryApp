import Wrapper from '@/components/global/Wrapper';
import React from 'react';

const loading = (): React.ReactElement => {
  return (
    <Wrapper title="Loading">
      <p>Please Wait...</p>
    </Wrapper>
  );
};

export default loading;
