import { ExternalLink, Trash2 } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { deleteCommentAction } from '@/action/deleteCommentAction';

type CommentItemProps = {
  id: string;
  comment_id: string;
  email: string;
  createdAt: string;
  title: string;
  content: string;
  avatar: string;
};

const CommentItem = ({
  id,
  email,
  createdAt,
  title,
  content,
  avatar,
  comment_id,
}: CommentItemProps) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-white/5 backdrop-blur-lg backdrop-filter hover:bg-white/10 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Image
              src={avatar}
              width={50}
              height={50}
              alt="profile"
              className="size-10 rounded-full bg-primary"
            />
            <div>
              <p className="font-serif text-sm text-amber-300/90">{email}</p>
              <div className="flex items-center text-xs text-gray-400 mt-0.5">
                <span className="text-amber-500/70">{createdAt}</span>
              </div>
            </div>
          </div>
          <form action={deleteCommentAction}>
            <input type="hidden" name="comment_id" value={comment_id} />
            <input type="hidden" name="diary_id" value={id} />
            <button
              type="submit"
              className="size-8 flex items-center justify-center rounded-full cursor-pointer text-gray-500 hover:text-red-400 hover:bg-red-900/20 transition-colors duration-300">
              <Trash2 className="h-4 w-4" />
            </button>
          </form>
        </div>

        <Link href={`/diary/${id}`} className="block mb-3">
          <div className="flex items-center group">
            <h3 className="font-medium text-white group-hover:text-amber-300 transition-colors duration-300">
              {title}
            </h3>
            <ExternalLink className="h-3.5 w-3.5 ml-1.5 text-gray-500 group-hover:text-amber-300 transition-colors duration-300" />
          </div>
        </Link>

        <p className="text-gray-300 text-sm leading-relaxed">{content}</p>
      </div>

      {/* Gold accent line that appears on hover */}
      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-400/30 via-amber-500/50 to-amber-400/30" />
    </div>
  );
};

export default CommentItem;
