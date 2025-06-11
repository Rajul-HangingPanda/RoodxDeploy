'use client';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export function NavUserStories() {
  const user = useAppSelector((state: RootState) => state.user.user);

  if (!user) return null;

  return (
    <div className="flex items-center gap-4 p-4 overflow-x-auto">
      <Link href={`/${user.username}`} className="flex flex-col items-center gap-2">
        <Avatar className="w-16 h-16 border-2 border-primary">
          <AvatarImage src={user.avatar || '/images/default-avatar.png'} alt={user.username} />
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{user.username}</span>
      </Link>
    </div>
  );
} 