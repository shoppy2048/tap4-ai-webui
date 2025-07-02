'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '@/lib/utils';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

function SelectTrigger(
  { className, children, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
  ref: React.ForwardedRef<React.ElementRef<typeof SelectPrimitive.Trigger>>
) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className='h-4 w-4 opacity-50' />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}
const SelectTriggerRef = React.forwardRef(SelectTrigger);
SelectTriggerRef.displayName = SelectPrimitive.Trigger.displayName;

function SelectScrollUpButton(
  { className, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>,
  ref: React.ForwardedRef<React.ElementRef<typeof SelectPrimitive.ScrollUpButton>>
) {
  return (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <ChevronUp className='h-4 w-4' />
    </SelectPrimitive.ScrollUpButton>
  );
}
const SelectScrollUpButtonRef = React.forwardRef(SelectScrollUpButton);
SelectScrollUpButtonRef.displayName = SelectPrimitive.ScrollUpButton.displayName;

function SelectScrollDownButton(
  { className, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>,
  ref: React.ForwardedRef<React.ElementRef<typeof SelectPrimitive.ScrollDownButton>>
) {
  return (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <ChevronDown className='h-4 w-4' />
    </SelectPrimitive.ScrollDownButton>
  );
}
const SelectScrollDownButtonRef = React.forwardRef(SelectScrollDownButton);
SelectScrollDownButtonRef.displayName = SelectPrimitive.ScrollDownButton.displayName;

function SelectContent(
  { className, children, position = 'popper', ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
  ref: React.ForwardedRef<React.ElementRef<typeof SelectPrimitive.Content>>
) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButtonRef />
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButtonRef />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}
const SelectContentRef = React.forwardRef(SelectContent);
SelectContentRef.displayName = SelectPrimitive.Content.displayName;

function SelectLabel(
  { className, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>,
  ref: React.ForwardedRef<React.ElementRef<typeof SelectPrimitive.Label>>
) {
  return (
    <SelectPrimitive.Label ref={ref} className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)} {...props} />
  );
}
const SelectLabelRef = React.forwardRef(SelectLabel);
SelectLabelRef.displayName = SelectPrimitive.Label.displayName;

function SelectItem(
  { className, children, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>,
  ref: React.ForwardedRef<React.ElementRef<typeof SelectPrimitive.Item>>
) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <SelectPrimitive.ItemIndicator>
          <Check className='h-4 w-4' />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}
const SelectItemRef = React.forwardRef(SelectItem);
SelectItemRef.displayName = SelectPrimitive.Item.displayName;

function SelectSeparator(
  { className, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>,
  ref: React.ForwardedRef<React.ElementRef<typeof SelectPrimitive.Separator>>
) {
  return (
    <SelectPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
  );
}
const SelectSeparatorRef = React.forwardRef(SelectSeparator);
SelectSeparatorRef.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTriggerRef as SelectTrigger,
  SelectContentRef as SelectContent,
  SelectLabelRef as SelectLabel,
  SelectItemRef as SelectItem,
  SelectSeparatorRef as SelectSeparator,
  SelectScrollUpButtonRef as SelectScrollUpButton,
  SelectScrollDownButtonRef as SelectScrollDownButton,
};
