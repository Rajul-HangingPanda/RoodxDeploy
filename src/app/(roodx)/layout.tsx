'use client';
// Hooks
import useDirection from '@/hooks/useDirection';
// Components
import AuthGuard from '@/components/authGuard';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
// Pages
import SiteHeader from '@/components/roodx/layout/header/Header';
import SidebarLeft from '@/components/roodx/layout/sidebar/SidebarLeft';
import Breadcrumbs from '@/components/roodx/layout/Breadcrumbs';
import SidebarRight from '@/components/roodx/layout/sidebar/SidebarRight';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isRTL } = useDirection();
  return (
    <AuthGuard>
      <div className="[--header-height:calc(--spacing(12))]">
        <SidebarProvider className="flex flex-col">
          <SiteHeader />
          <div className="flex flex-1">
            <SidebarLeft side={isRTL ? 'right' : 'left'} />
            <SidebarInset>
              <Breadcrumbs />
              <div className="flex flex-col flex-1 w-full p-4 pt-0 mx-auto transition-shadow max-w-7xl">{children}</div>
            </SidebarInset>
            <SidebarRight side={!isRTL ? 'right' : 'left'} />
          </div>
        </SidebarProvider>
      </div>
    </AuthGuard>
  );
}
