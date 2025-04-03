import { deleteDiaryAction } from '@/action/diary/deleteDiaryAction';
import CreateCommentForm from '@/components/auth/CreateCommentForm';
import CommentCard from '@/components/global/(comment)/CommentCard';
import { getUserData } from '@/utils/clerk';
import { getRelativeTime } from '@/utils/helper';
import { Comments, supabase } from '@/utils/supabase';
import { ArrowLeft, Calendar, Edit, Ellipsis, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const { email, avatar } = await getUserData();

  const { data, error } = await supabase
    .from('diary')
    .select()
    .eq('id', id)
    .single();

  const isCurrentUser = data.email === email;
  if (error) return <p>Error fetching diary</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pb-16">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-5 blur-sm"></div>

      <div className="relative container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/"
            className="group flex items-center text-gray-400 hover:text-amber-300">
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Journal
          </Link>
        </div>

        <header className="mb-8">
          <div className="flex justify-between items-start">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500 leading-tight">
              {data.title}
            </h1>

            <div className="dropdown dropdown-left px-4">
              <div tabIndex={0} role="button" className="cursor-pointer">
                <Ellipsis
                  width={14}
                  className="text-gray-400 hover:text-amber-300"
                />
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-slate-800 rounded-lg z-1 w-40 px-4 space-y-2">
                {isCurrentUser && (
                  <>
                    <Link
                      className="flex items-center gap-2"
                      href={`/diary/${id}/edit`}>
                      <Edit width={16} /> Edit
                    </Link>
                    <form action={deleteDiaryAction}>
                      <input type="hidden" name="id" value={id} />
                      <button
                        type="submit"
                        className="flex items-center gap-2 text-red-500 cursor-pointer">
                        <Trash2 width={16} /> Delete
                      </button>
                    </form>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <Image
              src={data?.avatar as string}
              width={50}
              height={50}
              alt="profile"
              className="size-10 rounded-full bg-primary"
            />
            <div>
              <p className="font-serif text-base text-amber-300/90">
                {data.email}
              </p>
              <div className="flex items-center text-xs text-gray-400 mt-0.5">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{getRelativeTime(data.created_at || '')}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-white/5 backdrop-blur-lg backdrop-filter p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"></div>
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"></div>

          <div className="relative z-10">
            <p className="text-gray-300 font-light leading-relaxed whitespace-pre-line">
              {data.content}
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">
              Comments
            </h2>
            <span className="text-sm text-gray-400">
              {data?.comments?.length ? data?.comments?.length : 0} comments
            </span>
          </div>

          <div className="space-y-4">
            {data?.comments?.map((comment: Comments) => (
              <CommentCard
                key={comment.comment_id}
                avatar={comment.avatar as string}
                content={comment.content}
                createdAt={getRelativeTime(comment.created_at as string)}
                email={comment.email as string}
              />
            ))}
          </div>

          <div className="mt-8">
            <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-white/5 backdrop-blur-md backdrop-filter p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>

              <div className="flex gap-3">
                <Image
                  src={avatar as string}
                  width={50}
                  height={50}
                  alt="profile"
                  className="size-10 rounded-full bg-primary"
                />
                <CreateCommentForm diary_id={data.id} title={data.title} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
