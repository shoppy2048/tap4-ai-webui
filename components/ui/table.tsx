import * as React from 'react';

import { cn } from '@/lib/utils';

function Table(
  { className, ...props }: React.HTMLAttributes<HTMLTableElement>,
  ref: React.ForwardedRef<HTMLTableElement>
) {
  return (
    <div className='relative w-full overflow-auto'>
      <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  );
}

const TableRef = React.forwardRef(Table);
TableRef.displayName = 'Table';

function TableHeader(
  { className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>,
  ref: React.ForwardedRef<HTMLTableSectionElement>
) {
  return <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />;
}

const TableHeaderRef = React.forwardRef(TableHeader);
TableHeaderRef.displayName = 'TableHeader';

function TableBody(
  { className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>,
  ref: React.ForwardedRef<HTMLTableSectionElement>
) {
  return <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
}

const TableBodyRef = React.forwardRef(TableBody);
TableBodyRef.displayName = 'TableBody';

function TableFooter(
  { className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>,
  ref: React.ForwardedRef<HTMLTableSectionElement>
) {
  return <tfoot ref={ref} className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)} {...props} />;
}

const TableFooterRef = React.forwardRef(TableFooter);
TableFooterRef.displayName = 'TableFooter';

function TableRow(
  { className, ...props }: React.HTMLAttributes<HTMLTableRowElement>,
  ref: React.ForwardedRef<HTMLTableRowElement>
) {
  return (
    <tr
      ref={ref}
      className={cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className)}
      {...props}
    />
  );
}

const TableRowRef = React.forwardRef(TableRow);
TableRowRef.displayName = 'TableRow';

function TableHead(
  { className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>,
  ref: React.ForwardedRef<HTMLTableCellElement>
) {
  return (
    <th
      ref={ref}
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  );
}

const TableHeadRef = React.forwardRef(TableHead);
TableHeadRef.displayName = 'TableHead';

function TableCell(
  { className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>,
  ref: React.ForwardedRef<HTMLTableCellElement>
) {
  return <td ref={ref} className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)} {...props} />;
}

const TableCellRef = React.forwardRef(TableCell);
TableCellRef.displayName = 'TableCell';

function TableCaption(
  { className, ...props }: React.HTMLAttributes<HTMLTableCaptionElement>,
  ref: React.ForwardedRef<HTMLTableCaptionElement>
) {
  return <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />;
}

const TableCaptionRef = React.forwardRef(TableCaption);
TableCaptionRef.displayName = 'TableCaption';

export {
  TableRef as Table,
  TableHeaderRef as TableHeader,
  TableBodyRef as TableBody,
  TableFooterRef as TableFooter,
  TableHeadRef as TableHead,
  TableRowRef as TableRow,
  TableCellRef as TableCell,
  TableCaptionRef as TableCaption,
};
