import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type PostContentProps = {
  id: string;
  username?: string;
  email?: string;
  content: string;
  avatar: string;
  createdAt: string;
};

const PostContent = ({
  id,
  username,
  email,
  content,
  avatar,
  createdAt,
}: PostContentProps) => {
  return (
    <Link
      href={`/diary/${id}`}
      className="card card-body card-bordered shadow-lg bg-base-300 cursor-pointer duration-300 ease-in-out hover:shadow-xl hover:bg-secondary hover:scale-105 h-56">
      <div className="flex items-center gap-4 mb-2">
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
  );
};

export default PostContent;
