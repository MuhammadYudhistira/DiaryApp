import EditDiaryForm from '@/components/auth/EditDiaryForm';
import Wrapper from '@/components/global/Wrapper';
import React from 'react';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  return (
    <Wrapper>
      <div className="relative overflow-hidden rounded-xl max-w-xl mx-auto border border-gray-800 bg-white/5 backdrop-blur-lg backdrop-filter p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"></div>

        <div className="relative z-10">
          <EditDiaryForm id={id} />
        </div>
      </div>
    </Wrapper>
  );
}
