'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/lib/utils';

function Separator(
  { className, orientation = 'horizontal', decorative = true, ...props }: React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
  ref: React.ForwardedRef<React.ElementRef<typeof SeparatorPrimitive.Root>>
) {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn('shrink-0 bg-border', orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]', className)}
      {...props}
    />
  );
}

const SeparatorRef = React.forwardRef(Separator);
SeparatorRef.displayName = SeparatorPrimitive.Root.displayName;

export default SeparatorRef;
export { SeparatorRef as Separator };
