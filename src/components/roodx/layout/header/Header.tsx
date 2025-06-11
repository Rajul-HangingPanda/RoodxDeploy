'use client';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/components/ui/sidebar';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const { toggleSidebar } = useSidebar();
  const user = useAppSelector((state: RootState) => state.user.user);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[var(--header-height)] bg-background border-b">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="w-5 h-5" />
          </Button>
          {pathname !== '/' && (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
          )}
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <Link href={`/${user.username}`} className="flex items-center gap-2">
              <Image
                src={user.avatar || '/images/default-avatar.png'}
                alt={user.username}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-medium">{user.username}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
} 