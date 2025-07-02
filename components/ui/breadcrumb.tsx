import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, MoreHorizontal } from 'lucide-react';

import { cn } from '@/lib/utils';

function Breadcrumb(
  props: React.ComponentPropsWithoutRef<'nav'> & {
    separator?: React.ReactNode;
  },
  ref: React.ForwardedRef<HTMLElement>
) {
  const { ...restProps } = props;
  return <nav ref={ref} aria-label='breadcrumb' {...restProps} />;
}
Breadcrumb.displayName = 'Breadcrumb';
const BreadcrumbRef = React.forwardRef(Breadcrumb);

function BreadcrumbList(
  props: React.ComponentPropsWithoutRef<'ol'>,
  ref: React.ForwardedRef<HTMLOListElement>
) {
  const { className, ...restProps } = props;
  return (
    <ol
      ref={ref}
      className={cn(
        'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
        className
      )}
      {...restProps}
    />
  );
}
BreadcrumbList.displayName = 'BreadcrumbList';
const BreadcrumbListRef = React.forwardRef(BreadcrumbList);

function BreadcrumbItem(
  props: React.ComponentPropsWithoutRef<'li'>,
  ref: React.ForwardedRef<HTMLLIElement>
) {
  const { className, ...restProps } = props;
  return (
    <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...restProps} />
  );
}
BreadcrumbItem.displayName = 'BreadcrumbItem';
const BreadcrumbItemRef = React.forwardRef(BreadcrumbItem);

function BreadcrumbLink(
  props: React.ComponentPropsWithoutRef<'a'> & {
    asChild?: boolean;
  },
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  const { asChild, className, ...restProps } = props;
  const Comp = asChild ? Slot : 'a';

  return <Comp ref={ref} className={cn('transition-colors hover:text-foreground', className)} {...restProps} />;
}
BreadcrumbLink.displayName = 'BreadcrumbLink';
const BreadcrumbLinkRef = React.forwardRef(BreadcrumbLink);

function BreadcrumbPage(
  props: React.ComponentPropsWithoutRef<'span'>,
  ref: React.ForwardedRef<HTMLSpanElement>
) {
  const { className, ...restProps } = props;
  return (
    <span
      ref={ref}
      role='link'
      aria-disabled='true'
      aria-current='page'
      className={cn('font-normal text-foreground', className)}
      {...restProps}
    />
  );
}
BreadcrumbPage.displayName = 'BreadcrumbPage';
const BreadcrumbPageRef = React.forwardRef(BreadcrumbPage);

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li role='presentation' aria-hidden='true' className={cn('[&>svg]:size-3.5', className)} {...props}>
      {children ?? <ChevronRight />}
    </li>
  );
}
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      role='presentation'
      aria-hidden='true'
      className={cn('flex h-9 w-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className='h-4 w-4' />
      <span className='sr-only'>More</span>
    </span>
  );
}
BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis';

export {
  BreadcrumbRef as Breadcrumb,
  BreadcrumbListRef as BreadcrumbList,
  BreadcrumbItemRef as BreadcrumbItem,
  BreadcrumbLinkRef as BreadcrumbLink,
  BreadcrumbPageRef as BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
