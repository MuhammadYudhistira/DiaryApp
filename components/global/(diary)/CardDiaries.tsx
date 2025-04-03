import React from 'react';
import PostContent from './PostContent';
import { supabase } from '@/utils/supabase';
import { getRelativeTime } from '@/utils/helper';
import { getUserData } from '@/utils/clerk';
import Link from 'next/link';

const CardDiaries = async ({
  page,
}: {
  page: string;
}): Promise<React.ReactNode> => {
  const { email } = await getUserData();

  const postsPerPage = 9; // Number of posts per page
  const currentPage = parseInt(page);

  const { data, count, error } = await supabase
    .from('diary')
    .select('*', { count: 'exact', head: false }) // Fetch data + count total
    .order('created_at', { ascending: false })
    .range((currentPage - 1) * postsPerPage, currentPage * postsPerPage - 1);

  const totalPage = count ? Math.max(1, Math.ceil(count / postsPerPage)) : 0;

  if (error) return <p>{error.message}</p>;

  if (data.length === 0)
    return <p className="text-center text-xl">No diaries found</p>;

  return (
    <section className="">
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((diary) => {
          return (
            <PostContent
              key={diary.id}
              id={diary.id}
              title={diary.title}
              username={diary.username}
              email={diary.email}
              content={diary.content}
              avatar={diary.avatar}
              currentUser={email as string}
              createdAt={getRelativeTime(diary.created_at || '')}
              commentTotal={diary?.comments?.length}
            />
          );
        })}
      </div>
      {totalPage === 1 ? null : (
        <div className="join w-full justify-center mt-4">
          {Array.from({ length: totalPage }, (_, index) => (
            <Link
              key={index + 1}
              className={`join-item btn btn-md ${
                currentPage == index + 1 ? ' btn-primary' : ''
              }`}
              href={`?page=${index + 1}`}>
              {index + 1}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default CardDiaries;
