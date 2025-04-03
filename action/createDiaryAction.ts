'use server';

import { getUserData } from '@/utils/clerk';
import { supabase, Diary } from '@/utils/supabase';
import { redirect } from 'next/navigation';

export const createDiaryAction = async (formData: FormData) => {
  const content = formData.get('content') as string;
  const title = formData.get('title') as string;
  const { avatar, email, username } = await getUserData();

  const data: Diary = { title, content, avatar, email, username };

  try {
    await supabase.from('diary').insert(data);
  } catch (error) {
    console.error('Error inserting diary entry:', error);
  }

  redirect('/dashboard/my-diary');
};
