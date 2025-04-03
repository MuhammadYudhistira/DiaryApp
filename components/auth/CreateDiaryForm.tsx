import { createDiaryAction } from '@/action/createDiaryAction';
import { getUserData } from '@/utils/clerk';
import Image from 'next/image';
import React from 'react';

const CreateDiaryForm = async () => {
  const user = await getUserData();

  return (
    <form
      action={createDiaryAction}
      className="flex flex-col gap-4 mx-auto p-4 rounded-md space-y-6">
      <div className="flex flex-col items-center mb-8">
        <div className="h-16 w-16 shadow-md mb-3">
          <Image
            className="rounded-full"
            src={user?.avatar as string}
            alt={'profile'}
            width={100}
            height={100}
          />
        </div>
        <h2 className="font-serif text-xl text-amber-300/90">{user.email}</h2>
      </div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-base">Title</legend>
        <input
          type="text"
          name="title"
          className="input w-full border-white/15 bg-[#202734] py-2 rounded-xl focus:outline-none"
          placeholder="Enter a title for your diary entry
"
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-base">Content</legend>
        <textarea
          name="content"
          className="textarea w-full h-52 border-white/15 bg-[#202734] py-2 rounded-xl focus:outline-none"
          placeholder="Write your diary entry here..."
        />
      </fieldset>
      <button type="submit" className="btn bg-amber-400 text-black rounded-xl">
        Create Diary
      </button>
    </form>
  );
};

export default CreateDiaryForm;
