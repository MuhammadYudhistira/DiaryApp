'use server';

import { getUserData } from '@/utils/clerk';
import { Comments, supabase } from '@/utils/supabase';
import { randomUUID } from 'crypto';
import { redirect } from 'next/navigation';

export const createCommentAction = async (formData: FormData) => {
  const content = formData.get('content') as string;
  const diary_id = formData.get('diary_id')
    ? Number(formData.get('diary_id'))
    : undefined;
  const title = formData.get('title') as string;
  const comment_id = randomUUID();
  const created_at = new Date().toISOString();

  const { avatar, email, username } = await getUserData();

  if (email === undefined) {
    return redirect('/sign-in');
  }

  const data: Comments = {
    comment_id,
    avatar,
    email,
    username,
    content,
    created_at,
    title,
    diary_id,
  };

  const getComment = await supabase
    .from('diary')
    .select('comments')
    .eq('id', diary_id)
    .single();
  console.log('🚀 ~ createCommentAction ~ getComment:', getComment);

  const existingComments: Array<Comments> = getComment.data?.comments || [];

  const newComment = [...existingComments, data];

  await supabase
    .from('diary')
    .update({ comments: newComment })
    .eq('id', diary_id);

  redirect(`/diary/${diary_id}`);
};
