import CommentItem from '@/components/global/(comment)/CommentItem';
import { getUserData } from '@/utils/clerk';
import { getRelativeTime } from '@/utils/helper';
import { Comments, supabase } from '@/utils/supabase';
import React from 'react';

const page = async (): Promise<React.ReactNode> => {
  const { email } = await getUserData();

  const { data, error } = await supabase
    .from('diary')
    .select('comments')
    .order('created_at', { ascending: false });

  if (error) return <p>Error fetching diaries</p>;

  const userComments = data
    .map(
      (item) =>
        item.comments?.filter(
          (comment: { email: string | undefined }) => comment.email === email
        ) || []
    ) // Ambil komentar sesuai email
    .flat(); // Menggabungkan hasil menjadi satu array

  if (data.length === 0)
    return <p className="text-center text-xl">No diaries found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pb-16">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-5 blur-sm"></div>

      <div className="relative container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500 mb-6">
            Your Comments
          </h1>
        </header>

        <div className="space-y-4">
          {userComments.length > 0 ? (
            userComments?.map((comment: Comments) => (
              <CommentItem
                key={comment.comment_id}
                avatar={comment.avatar as string}
                content={comment.content}
                createdAt={getRelativeTime(comment.created_at as string)}
                email={comment.email as string}
                id={String(comment?.diary_id || '')}
                title={comment.title}
                comment_id={comment.comment_id as string}
              />
            ))
          ) : (
            <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-white/5 backdrop-blur-lg backdrop-filter p-8 text-center">
              <p className="text-gray-400">No comments found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
