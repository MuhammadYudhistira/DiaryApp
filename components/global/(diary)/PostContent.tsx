import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Edit, Ellipsis, Share, Trash2 } from 'lucide-react';
import { deleteDiaryAction } from '@/action/diary/deleteDiaryAction';

type PostContentProps = {
  id: string;
  username?: string;
  email?: string;
  content: string;
  avatar: string;
  createdAt: string;
  currentUser: string;
};

const PostContent = ({
  id,
  username,
  email,
  content,
  avatar,
  createdAt,
  currentUser,
}: PostContentProps) => {
  const isCurrentUser = currentUser === email;

  return (
    <div className="card card-body shadow-lg bg-base-300 cursor-pointer duration-300 ease-in-out hover:shadow-xl hover:bg-secondary hover:scale-105">
      <div className="dropdown dropdown-left ml-auto p-0">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-xs btn-ghost p-0 m-0">
          <Ellipsis />
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content bg-base-300 rounded-box z-1 w-52 px-4 border space-y-4">
          <Link
            className="flex items-center gap-2 hover:bg-secondary rounded-md"
            href={`#`}>
            <Share width={16} /> Share
          </Link>
          {isCurrentUser && (
            <>
              <Link
                className="flex items-center gap-2 hover:bg-secondary rounded-md"
                href={`/diary/${id}/edit`}>
                <Edit width={16} /> Edit
              </Link>
              <form action={deleteDiaryAction}>
                <input type="hidden" name="id" value={id} />
                <button
                  type="submit"
                  className="flex items-center gap-2 text-red-500 hover:bg-secondary rounded-md cursor-pointer">
                  <Trash2 width={16} /> Delete
                </button>
              </form>
            </>
          )}
        </ul>
      </div>
      <Link
        href={`/diary/${id}`}
        className="flex flex-col items-start gap-4 mb-2">
        <div className="flex gap-4 items-center">
          <Image
            src={avatar}
            width={50}
            height={50}
            alt="profile"
            className="size-10 rounded-full bg-primary"
          />
          <p className="font-semibold text-lg flex flex-col justify-between items-start">
            {username || email} <span className="text-xs">{createdAt}</span>
          </p>
        </div>
        <p className="overflow-y-auto text-base">{content}</p>
      </Link>
    </div>
  );
};

export default PostContent;
