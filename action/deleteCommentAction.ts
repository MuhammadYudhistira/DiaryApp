'use server';

import { Comments, supabase } from '@/utils/supabase';
import { redirect } from 'next/navigation';

export const deleteCommentAction = async (formData: FormData) => {
  const comment_id = formData.get('comment_id') as string;
  const id = formData.get('diary_id') as string;

  const getComment = await supabase
    .from('diary')
    .select('comments')
    .eq('id', id)
    .single();
  console.log('🚀 ~ createCommentAction ~ getComment:', getComment);

  const existingComments: Array<Comments> = getComment.data?.comments || [];

  const newComment = existingComments.filter((comment) => {
    return comment.comment_id !== comment_id;
  });

  await supabase.from('diary').update({ comments: newComment }).eq('id', id);

  redirect(`/dashboard/my-comment`);
};
