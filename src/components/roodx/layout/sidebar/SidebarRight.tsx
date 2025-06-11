'use client';
import { usePathname } from 'next/navigation';
// Components
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
// Pages
import { NavMain } from '@/components/roodx/layout/sidebar/NavMain';
import { NavUserStories } from '@/components/roodx/layout/sidebar/NavUserStories';
// Redux
import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
// Icons
import { BriefcaseBusiness, Home, TvMinimalPlay, UserRound } from 'lucide-react';

export default function SidebarRight({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAppSelector((state: RootState) => state.user.user);

  const data = {
    navMain: [
      {
        title: 'home',
        url: '/home',
        icon: Home,
      },
      {
        title: 'job',
        url: '/job',
        icon: BriefcaseBusiness,
      },
      {
        title: 'video',
        url: '/video',
        icon: TvMinimalPlay,
      },
      {
        title: 'profile',
        url: `/${user?.username}`,
        icon: UserRound,
      },
      {
        title: 'chat',
        url: `/chat`,
        icon: UserRound,
      },
    ],
  };

  const pathname = usePathname() as string;
  // Automatically set isActive
  const navMainWithActive = data.navMain.map((item) => ({
    ...item,
    isActive: pathname.startsWith(item.url),
  }));

  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainWithActive} />
        <NavUserStories />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
} 