import { editDiaryAction } from '@/action/diary/editDiaryAction';
import { supabase } from '@/utils/supabase';
import Image from 'next/image';
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

  if (error) <p>Error Fetching Data</p>;

  return (
    <form
      action={editDiaryAction}
      className="flex flex-col gap-4 mx-auto p-4 rounded-md space-y-6">
      <div className="flex flex-col items-center mb-8">
        <div className="h-16 w-16 shadow-md mb-3">
          <Image
            className="rounded-full"
            src={data?.avatar as string}
            alt={'profile'}
            width={100}
            height={100}
          />
        </div>
        <h2 className="font-serif text-xl text-amber-300/90">{data.email}</h2>
      </div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-base">Title</legend>
        <input
          type="text"
          name="title"
          className="input w-full border-white/15 bg-[#202734] py-2 rounded-xl focus:outline-none"
          placeholder="Enter a title for your diary entry"
          defaultValue={data?.title}
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-base">Content</legend>
        <textarea
          name="content"
          defaultValue={data?.content}
          className="textarea w-full h-52 border-white/15 bg-[#202734] py-2 rounded-xl focus:outline-none"
          placeholder="Write your diary entry here..."
        />
      </fieldset>
      <input name="id" type="hidden" value={data?.id} />
      <button type="submit" className="btn bg-amber-400 text-black rounded-xl">
        Edit Diary
      </button>
    </form>
  );
};

export default EditDiaryForm;
