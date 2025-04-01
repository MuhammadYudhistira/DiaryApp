import CreateCommentForm from '@/components/auth/CreateCommentForm';
import CommentList from '@/components/global/(diary)/CommentList';
import Wrapper from '@/components/global/Wrapper';
import { getRelativeTime } from '@/utils/helper';
import { supabase } from '@/utils/supabase';
import Image from 'next/image';
import React from 'react';

type ParamsProps = {
  params: {
    id: string;
  };
};
const Page = async ({ params }: ParamsProps) => {
  const { id } = await params;

  const { data, error } = await supabase
    .from('diary')
    .select()
    .eq('id', id)
    .single();

  if (error) return <p>Error fetching diary</p>;

  return (
    <Wrapper>
      <>
        <div className="flex flex-col items-center gap-4 mb-2">
          <Image
            src={data.avatar}
            width={200}
            height={200}
            alt="profile"
            className="size-52 rounded-full bg-primary"
          />
          <p className="font-semibold text-2xl flex flex-col justify-between items-center">
            {data.username || data.email}{' '}
            <span className="text-xs">{getRelativeTime(data.created_at)}</span>
          </p>
          <p className="overflow-y-auto text-base">{data.content}</p>
        </div>
        <div className="divider"></div>
        <CommentList diary_id={data.id} />
        <div className="divider"></div>
        <CreateCommentForm diary_id={data.id} />
      </>
    </Wrapper>
  );
};

export default Page;
