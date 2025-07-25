import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) => {
  const value = React.useMemo(() => ({ name: props.name }), [props.name]);
  return (
    <FormFieldContext.Provider value={value}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>, ref: React.ForwardedRef<HTMLDivElement>) {
  const id = React.useId();
  const value = React.useMemo(() => ({ id }), [id]);
  
  return (
    <FormItemContext.Provider value={value}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
}
const FormItemRef = React.forwardRef(FormItem);
FormItemRef.displayName = 'FormItem';

function FormLabel(
  { className, ...props }: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
  ref: React.ForwardedRef<React.ElementRef<typeof LabelPrimitive.Root>>
) {
  const { error, formItemId } = useFormField();
  return (
    <Label 
      ref={ref} 
      className={cn(error && 'text-destructive', className)} 
      htmlFor={formItemId} 
      {...props} 
    />
  );
}
const FormLabelRef = React.forwardRef(FormLabel);
FormLabelRef.displayName = 'FormLabel';

function FormControl(
  { ...props }: React.ComponentPropsWithoutRef<typeof Slot>,
  ref: React.ForwardedRef<React.ElementRef<typeof Slot>>
) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
}
const FormControlRef = React.forwardRef(FormControl);
FormControlRef.displayName = 'FormControl';

function FormDescription(
  { className, ...props }: React.HTMLAttributes<HTMLParagraphElement>,
  ref: React.ForwardedRef<HTMLParagraphElement>
) {
  const { formDescriptionId } = useFormField();
  return (
    <p 
      ref={ref} 
      id={formDescriptionId} 
      className={cn('text-sm text-muted-foreground', className)} 
      {...props} 
    />
  );
}
const FormDescriptionRef = React.forwardRef(FormDescription);
FormDescriptionRef.displayName = 'FormDescription';

function FormMessage(
  { className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>,
  ref: React.ForwardedRef<HTMLParagraphElement>
) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p 
      ref={ref} 
      id={formMessageId} 
      className={cn('text-sm font-medium text-destructive', className)} 
      {...props}
    >
      {body}
    </p>
  );
}
const FormMessageRef = React.forwardRef(FormMessage);
FormMessageRef.displayName = 'FormMessage';

export { 
  useFormField, 
  Form, 
  FormItemRef as FormItem, 
  FormLabelRef as FormLabel, 
  FormControlRef as FormControl, 
  FormDescriptionRef as FormDescription, 
  FormMessageRef as FormMessage, 
  FormField 
};
