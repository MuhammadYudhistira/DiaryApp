import CreateDiaryForm from '@/components/auth/CreateDiaryForm';
import Wrapper from '@/components/global/Wrapper';
import React from 'react';

const page = () => {
  return (
    <Wrapper>
      <div className="relative overflow-hidden rounded-xl max-w-xl mx-auto border border-gray-800 bg-white/5 backdrop-blur-lg backdrop-filter p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"></div>

        <div className="relative z-10">
          <CreateDiaryForm />
        </div>
      </div>
    </Wrapper>
  );
};

export default page;
