import { supabase } from '@/utils/supabase';
import React from 'react';
import { Comments } from '../../../utils/supabase';
import Image from 'next/image';

type ParamsProps = {
  diary_id: number;
};

const CommentList = async ({ diary_id }: ParamsProps) => {
  const { data, error } = await supabase
    .from('diary')
    .select('comments')
    .eq('id', diary_id)
    .single();

  if (error) {
    console.log(error);
    return <p>Error fetching comments</p>;
  }

  if (!data?.comments?.length) {
    return <p className="text-center">No comments yet</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {data?.comments?.map((comment: Comments) => {
        return (
          <div
            className="card card-body card-bordered ml-4 bg-base-300 p-4 "
            key={comment.comment_id}>
            <Image
              src={comment.avatar as string}
              alt="profile"
              width={50}
              height={50}
              className="rounded-full bg-primary"
            />
            <p>{comment.email}</p>
            <p>{comment.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
