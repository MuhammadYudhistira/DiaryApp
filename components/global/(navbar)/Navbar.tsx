import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import NavbarButton from './NavbarButton';

const Navbar = (): React.ReactElement => {
  return (
    <div className="navbar bg-base-100">
      <div className="container flex mx-auto justify-between items-center">
        <Link href={'/'} className="rounded-full p-2">
          <Image src={'/OD.png'} alt="Logo" width={42} height={42} />
        </Link>
        <NavbarButton />
      </div>
    </div>
  );
};

export default Navbar;
