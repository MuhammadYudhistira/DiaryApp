'use client';
import { createCommentAction } from '@/action/createCommentAction';
import React, { useRef } from 'react';

type ParamsProps = {
  diary_id: number;
};

const CreateCommentForm = ({ diary_id }: ParamsProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const resetForm = (): void => {
    setTimeout(() => {
      formRef.current?.reset();
    }, 1000);
  };

  return (
    <form
      action={createCommentAction}
      onSubmit={resetForm}
      ref={formRef}
      className="flex flex-col gap-4 max-w-xl mx-auto mt-8">
      <textarea
        name="content"
        placeholder="Add a comment..."
        className="textarea w-full h-52 p-4 text-lg"
      />
      <input type="hidden" name="diary_id" value={diary_id} />
      <button type="submit" className="btn btn-primary">
        Send
      </button>
    </form>
  );
};

export default CreateCommentForm;
