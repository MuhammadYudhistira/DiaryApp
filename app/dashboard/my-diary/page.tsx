import PostContent from '@/components/global/(diary)/PostContent';
import Wrapper from '@/components/global/Wrapper';
import { getUserData } from '@/utils/clerk';
import { getRelativeTime } from '@/utils/helper';
import { supabase } from '@/utils/supabase';
import React from 'react';

const page = async (): Promise<React.ReactNode> => {
  const { email } = await getUserData();

  const { data, error } = await supabase
    .from('diary')
    .select()
    .order('created_at', { ascending: false })
    .eq('email', email);

  if (error) return <p>Error fetching diaries</p>;

  if (data.length === 0)
    return <p className="text-center text-xl">No diaries found</p>;

  return (
    <Wrapper title="My Diary">
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((diary) => {
          return (
            <PostContent
              id={diary.id}
              key={diary.id}
              username={diary.username}
              email={diary.email}
              title={diary.title}
              content={diary.content}
              avatar={diary.avatar}
              currentUser={email as string}
              createdAt={getRelativeTime(diary.created_at || '')}
              commentTotal={diary?.comments?.length}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default page;
