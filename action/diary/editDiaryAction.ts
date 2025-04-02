'use server';

import { supabase } from '@/utils/supabase';
import { redirect } from 'next/navigation';

export const editDiaryAction = async (formData: FormData) => {
  'use server';

  const id = formData.get('id') as string;
  const content = formData.get('content') as string;

  console.log('🚀 ~ editDiaryAction ~ content:', content);

  try {
    await supabase.from('diary').update({ content: content }).eq('id', id);
  } catch (error) {
    console.error('Error Deleting diary:', error);
    return;
  }

  redirect('/dashboard/my-diary');
};
