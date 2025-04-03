'use server';

import { supabase } from '@/utils/supabase';
import { redirect } from 'next/navigation';

export const editDiaryAction = async (formData: FormData) => {
  'use server';

  const id = formData.get('id') as string;
  const content = formData.get('content') as string;
  const title = formData.get('title') as string;

  const data = { content: content, title: title };

  try {
    await supabase.from('diary').update(data).eq('id', id);
  } catch (error) {
    console.error('Error Deleting diary:', error);
    return;
  }

  redirect('/dashboard/my-diary');
};
