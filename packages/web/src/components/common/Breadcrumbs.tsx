import { ReactNode } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from 'next/link';
import projectConfig from '@frontend/shared';

interface IProps {
  children: ReactNode;
}

export default function BreadcrumbsComponent({ children }: IProps) {
  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb" className="my-3">
      <Link href="/">{projectConfig.title}</Link>
      {children}
    </Breadcrumbs>
  );
}
