'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/susaf', icon: HomeIcon },
  { name: 'Stakeholders', href: '/susaf/stakeholders', icon: HomeIcon },
  { name: 'Example questionnaire', href: '/susaf/questionnaire/developers', icon: HomeIcon },
  { name: 'Chain of effects', href: '/susaf/chain_of_effects', icon: HomeIcon },
  { name: 'Ranking impacts', href: '/susaf/ranking_impacts', icon: HomeIcon },
  { name: 'Example assign action', href: '/susaf/assign?id=12', icon: HomeIcon },
  { name: 'Final actions', href: '/susaf/actions', icon: HomeIcon },

];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <p className='text-center'>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
