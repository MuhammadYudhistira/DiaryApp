'use client';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

const NavbarButton = (): React.ReactElement => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <p>Please wait...</p>;

  return isSignedIn ? (
    <div className="flex items-center gap-4">
      <Link href={'/dashboard'}>Create Diary</Link>
      <Link href={'/dashboard/my-diary'}>My Diary</Link>
      <Link href={'/dashboard/my-comment'}>My Comment</Link>
      <UserButton />
    </div>
  ) : (
    <Link href={'/sign-in'}>Sign In</Link>
  );
};

export default NavbarButton;
