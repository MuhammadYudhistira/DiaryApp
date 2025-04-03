import Image from 'next/image';
import React from 'react';

type CommentCardProps = {
  avatar: string;
  email: string;
  createdAt: string;
  content: string;
};

const CommentCard = ({
  avatar,
  email,
  createdAt,
  content,
}: CommentCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-white/5 backdrop-blur-sm backdrop-filter p-4 shadow-sm hover:shadow-amber-500/5 transition-shadow duration-300">
      <div className="flex gap-3">
        <Image
          src={avatar}
          width={50}
          height={50}
          alt="profile"
          className="size-10 rounded-full bg-primary"
        />
        <div className="flex-1">
          <div className="flex items-baseline justify-between mb-1">
            <h4 className="font-serif text-sm text-amber-300/90">{email}</h4>
            <span className="text-xs text-gray-500">{createdAt}</span>
          </div>
          <p className="text-gray-300 text-sm">{content}</p>
        </div>
      </div>

      {/* Subtle gold line at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
    </div>
  );
};

export default CommentCard;
