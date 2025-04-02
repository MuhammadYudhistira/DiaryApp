import { editDiaryAction } from '@/action/diary/editDiaryAction';
import { supabase } from '@/utils/supabase';
import React from 'react';

type EditDiaryFormProps = {
  id: string;
};

const EditDiaryForm = async ({ id }: EditDiaryFormProps) => {
  const { data, error } = await supabase
    .from('diary')
    .select('*')
    .eq('id', id)
    .single();

  console.log('🚀 ~ EditDiaryForm ~ data:', data);
  if (error) <p>Error Fetching Data</p>;

  return (
    <form
      action={editDiaryAction}
      className="flex flex-col gap-4 max-w-xl mx-auto">
      <textarea
        name="content"
        placeholder="Insert your diary"
        className="textarea w-full h-52 p-4 text-lg"
        defaultValue={data?.content}
      />
      <input type="hidden" value={id} name="id" />
      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default EditDiaryForm;
