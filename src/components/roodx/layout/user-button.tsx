'use client';
import { formattedDate } from '@/lib/formatted-date';
// Hooke
import { useErrorToast } from '@/hooks/useErrorToast';
import useDirection from '@/hooks/useDirection';
// Icons
import { ChevronsUpDown, LogOut } from 'lucide-react';
// Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
// Redux
import { useLogoutMutation } from '@/store/api/router/auth/login.route';
import { toast } from 'sonner';
// i18n
import { useTranslations } from 'next-intl';

function getInitials(firstname?: string, lastname?: string, companyname?: string) {
  const firstInitial = firstname?.[0]?.toUpperCase() ?? '';
  const lastInitial = lastname?.[0]?.toUpperCase() ?? '';
  if (firstInitial || lastInitial) {
    return `${firstInitial}${lastInitial}`;
  }
  if (companyname) {
    return companyname.slice(0, 2).toUpperCase();
  }
  return 'NN';
}

export default function NavUser({ user }: { user: Partial<IUser> }) {
  const t = useTranslations('Auth');
  const tSuccess = useTranslations('Success');
  const { isMobile } = useSidebar();

  const { direction } = useDirection();

  const { showErrorToast } = useErrorToast();
  const initials = getInitials(user.firstname, user.lastname, user.companyname);

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      if (response) {
        toast.success(tSuccess('userLogoutSuccessfully'), {
          description: `${formattedDate}`,
        });
        window.location.href = '/login';
      }
    } catch {
      showErrorToast();
    }
  };

  return (
    <SidebarMenu dir="ltr">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {isMobile ? (
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="w-8 h-8">{user.avatar ? <AvatarImage src={user.avatar} alt={user.username} /> : <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>}</Avatar>
              </Button>
            ) : (
              <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <Avatar className="w-8 h-8 rounded-lg">
                  {user.avatar ? <AvatarImage src={user.avatar} alt={user.username} /> : <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>}
                </Avatar>
                <div className="grid flex-1 text-sm leading-tight text-left">
                  <span className="font-medium truncate">{user.username}</span>
                  <span className="text-xs truncate">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" side={isMobile ? 'bottom' : 'right'} align="start" sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="w-8 h-8 rounded-lg">
                  {user.avatar ? <AvatarImage src={user.avatar} alt={user.username} /> : <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>}
                </Avatar>
                <div className="grid flex-1 text-sm leading-tight text-left">
                  <span className="font-medium truncate">{user.username}</span>
                  <span className="text-xs truncate">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem dir={direction} onClick={handleLogout} disabled={isLoading}>
              <LogOut />
              {t('logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
} 