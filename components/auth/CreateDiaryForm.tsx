import { createDiaryAction } from '@/action/createDiaryAction';
import React from 'react';

const CreateDiaryForm = () => {
  return (
    <form
      action={createDiaryAction}
      className="flex flex-col gap-4 max-w-xl mx-auto">
      <textarea
        name="content"
        placeholder="Insert your diary"
        className="textarea w-full h-52 p-4 text-lg"
      />
      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default CreateDiaryForm;
