'use client';

import Link from 'next/link';
// i18n
import { useTranslations } from 'next-intl';

export default function PolicyPrivacy() {
  const t = useTranslations('Auth');
  return (
    <div className="text-xs text-center text-muted-foreground">
      {t('policy.text')}
      <br />
      <Link href="#" className="text-sm underline-offset-4 hover:underline text-end text-primary">
        {t('policy.terms')}
      </Link>{' '}
      {t('policy.and')}{' '}
      <Link href="#" className="text-sm underline-offset-4 hover:underline text-end text-primary">
        {t('policy.privacy')}
      </Link>
    </div>
  );
} 