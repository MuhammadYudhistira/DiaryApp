'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  ChevronRight,
  Edit,
  Ellipsis,
  MessageCircle,
  Share,
  Trash2,
} from 'lucide-react';
import { deleteDiaryAction } from '@/action/diary/deleteDiaryAction';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { truncateWords } from '../../../utils/helper';

type PostContentProps = {
  id: string;
  title: string;
  username?: string;
  email?: string;
  content: string;
  avatar: string;
  createdAt: string;
  currentUser: string;
  commentTotal?: number;
};

const PostContent = ({
  id,
  username,
  email,
  content,
  avatar,
  createdAt,
  currentUser,
  commentTotal,
  title,
}: PostContentProps) => {
  const isCurrentUser = currentUser === email;

  const pathname = usePathname();

  const handleCopy = () => {
    const fullUrl = `${window.location.origin}${pathname}diary/${id}`;
    navigator.clipboard.writeText(fullUrl);
    toast.info('Link copied to clipboard');
  };

  return (
    <div className="p-4 rounded-lg h-full overflow-hidden border-0 bg-white/5 backdrop-blur-md backdrop-filter hover:bg-white/10 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(255,215,0,0.1)]">
      <div className="flex flex-row gap-4 justify-between items-center">
        <div className="flex gap-3 items-start">
          <Image
            src={avatar}
            width={50}
            height={50}
            alt="profile"
            className="size-10 rounded-full bg-primary"
          />
          <p className="font-medium text-[#c09f30] text-sm flex flex-col justify-between items-start">
            {username || email}
            <span className="text-xs text-gray-500">{createdAt}</span>
          </p>
        </div>
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
            <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleCopy}>
              <Share width={16} /> Share
            </button>
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
      <div className="px-1 space-y-5 mt-4">
        <p className="text-xl font-bold">{title}</p>
        <p className="text-base text-gray-300 min-h-24">
          {truncateWords(content, 30)}
        </p>
        <Link
          href={`/diary/${id}`}
          className="text-sm font-medium text-[#c09f30] hover:text-[#ffd23f] flex items-start gap-4 max-w-max">
          Read More <ChevronRight width={16} />
        </Link>
        <p className="flex items-center gap-1 hover:text-primary mt-2 max-w-max">
          <MessageCircle width={16} />
          {commentTotal}
        </p>
      </div>
    </div>
  );
};

export default PostContent;
