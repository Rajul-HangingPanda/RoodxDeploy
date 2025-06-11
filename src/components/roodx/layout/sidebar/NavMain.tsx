'use client';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
// i18n
import { useTranslations } from 'next-intl';

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
}

interface Props {
  items: NavItem[];
}

export function NavMain({ items }: Props) {
  const t = useTranslations('Sidebar');
  return (
    <nav className="flex flex-col gap-2 p-4">
      {items.map((item) => (
        <Link
          key={item.url}
          href={item.url}
          className={cn(
            'flex items-center gap-4 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
            item.isActive
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          )}
        >
          <item.icon className="w-5 h-5" />
          <span>{t(item.title)}</span>
        </Link>
      ))}
    </nav>
  );
}

export default NavMain; 