'use server';

import { supabase } from '@/utils/supabase';
import { redirect } from 'next/navigation';

export const deleteDiaryAction = async (formData: FormData) => {
  'use server';

  const id = formData.get('id') as string;

  try {
    await supabase.from('diary').delete().eq('id', id);
  } catch (error) {
    console.error('Error Deleting diary:', error);
    return;
  }

  redirect('/dashboard/my-diary');
};
