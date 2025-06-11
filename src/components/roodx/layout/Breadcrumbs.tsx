'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from 'next-intl';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations('Sidebar');
  const [breadcrumbs, setBreadcrumbs] = useState<Array<{ name: string; href: string }>>([]);

  const TRANSLATABLE_KEYS = new Set(['home', 'profile', 'job', 'video']);

  useEffect(() => {
    if (pathname) {
      const paths = pathname.split('/').filter(Boolean);
      const crumbs = paths.map((path, index) => ({
        name: path,
        href: `/${paths.slice(0, index + 1).join('/')}`,
      }));
      setBreadcrumbs(crumbs);
    }
  }, [pathname]);

  const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <header className="sticky top-0 flex items-center gap-2 h-14 shrink-0 bg-background">
      <div className="flex items-center flex-1 h-full gap-2 px-3 py-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-2 mr-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Roodx</BreadcrumbLink>
            </BreadcrumbItem>

            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              const shouldTranslate = TRANSLATABLE_KEYS.has(crumb.name);

              let label;
              if (shouldTranslate) {
                label = t(crumb.name);
              } else if (isLast) {
                label = capitalizeFirst(crumb.name);
              } else {
                label = crumb.name;
              }

              return (
                <React.Fragment key={crumb.href}>
                  <BreadcrumbSeparator className="rtl:rotate-180" />
                  <BreadcrumbItem>{isLast ? <BreadcrumbPage>{label}</BreadcrumbPage> : <BreadcrumbLink href={crumb.href}>{label}</BreadcrumbLink>}</BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
} 