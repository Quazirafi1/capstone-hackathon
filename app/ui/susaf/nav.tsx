import Link from 'next/link';
import NavLinks from '@/app/ui/susaf/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function Nav() {
  return (
    <div className="w-full px-3 py-4">
      <div className="flex justify-left space-x-2 flex-wrap">
        <NavLinks />
      </div>
    </div>
  );
}
