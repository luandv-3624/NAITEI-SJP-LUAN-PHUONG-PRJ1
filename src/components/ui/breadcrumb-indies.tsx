import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import React from 'react';

export function BreadcrumbIndies({
  items,
  ...props
}: React.ComponentProps<typeof Breadcrumb> & {
  items: {
    label: string;
    link?: string;
  }[];
}) {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbList>
        {items.map(({ label, link }, index) => (
          <React.Fragment key={index}>
            {index > 0 && index < items.length && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {link ? (
                <BreadcrumbLink to={link}>{label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
