'use client';
import { createCommentAction } from '@/action/createCommentAction';
import { Send } from 'lucide-react';
import React, { useRef } from 'react';

type ParamsProps = {
  diary_id: number;
  title: string;
};

const CreateCommentForm = ({ diary_id, title }: ParamsProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const resetForm = (): void => {
    setTimeout(() => {
      formRef.current?.reset();
    }, 1000);
  };

  return (
    <form
      className="flex-1"
      action={createCommentAction}
      onSubmit={resetForm}
      ref={formRef}>
      <textarea
        placeholder="Add a comment..."
        name="content"
        className="bg-transparent border-b-2 w-full border-gray-800 focus:border-amber-500/50 resize-none text-gray-300 placeholder:text-gray-500 min-h-[80px] focus:outline-0"
      />
      <input type="hidden" name="diary_id" value={diary_id} />
      <input type="hidden" name="title" value={title} />
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          className="flex items-center justify-between gap-4 cursor-pointer text-sm py-2 px-4 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-medium">
          <Send width={14} /> Send
        </button>
      </div>
    </form>
  );
};

export default CreateCommentForm;
