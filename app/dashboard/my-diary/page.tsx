import PostContent from '@/components/global/(diary)/PostContent';
import Wrapper from '@/components/global/Wrapper';
import { getUserData } from '@/utils/clerk';
import { getRelativeTime } from '@/utils/helper';
import { supabase } from '@/utils/supabase';
import React from 'react';

const page = async (): Promise<React.ReactElement> => {
  const { email } = await getUserData();

  const { data, error } = await supabase
    .from('diary')
    .select()
    .order('created_at', { ascending: false })
    .eq('email', email);

  if (error) return <p>Error fetching diaries</p>;

  return (
    <Wrapper title="My Diary">
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((diary) => {
          return (
            <PostContent
              id={diary.id}
              key={diary.id}
              username={diary.username}
              email={diary.email}
              content={diary.content}
              avatar={diary.avatar}
              createdAt={getRelativeTime(diary.created_at || '')}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default page;
