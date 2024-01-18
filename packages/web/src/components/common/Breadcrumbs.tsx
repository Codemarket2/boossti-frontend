import { ReactNode } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import projectConfig from '@frontend/shared';

interface IProps {
  children: ReactNode;
}

export default function BreadcrumbsComponent({ children }: IProps): any {
  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb" className="my-2">
      <Link href="/">{projectConfig.title}</Link>
      {children}
    </Breadcrumbs>
  );
}
