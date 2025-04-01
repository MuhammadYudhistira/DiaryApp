import React from 'react';
import PostContent from './PostContent';
import { supabase } from '@/utils/supabase';
import { getRelativeTime } from '@/utils/helper';

const CardDiaries = async (): Promise<React.ReactNode> => {
  const { data, error } = await supabase
    .from('diary')
    .select()
    .order('created_at', { ascending: false });

  if (error) return <p>Error fetching diaries</p>;

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((diary) => {
        return (
          <PostContent
            key={diary.id}
            id={diary.id}
            username={diary.username}
            email={diary.email}
            content={diary.content}
            avatar={diary.avatar}
            createdAt={getRelativeTime(diary.created_at || '')}
          />
        );
      })}
    </div>
  );
};

export default CardDiaries;
