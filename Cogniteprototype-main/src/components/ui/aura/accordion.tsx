import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import { type Icon, IconChevronDown } from '@tabler/icons-react';
import {
  type ComponentProps,
  type ComponentRef,
  forwardRef,
  useMemo,
} from 'react';

import { cn } from '@/lib/utils';

type AccordionCommonProps = Omit<
  ComponentProps<typeof AccordionPrimitive.Root>,
  'multiple' | 'value' | 'defaultValue' | 'onValueChange'
>;

type AccordionSingleProps = {
  type?: 'single';
  collapsible?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

type AccordionMultipleProps = {
  type: 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
};

type AccordionProps = AccordionCommonProps &
  (AccordionSingleProps | AccordionMultipleProps);

const Accordion = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>((props, ref) => {
  if (props.type === 'multiple') {
    const {
      type: _type,
      value,
      defaultValue,
      onValueChange,
      ...rootProps
    } = props;

    const controlledValue = useMemo<string[] | undefined>(() => {
      if (value === undefined) return undefined;
      return value;
    }, [value]);

    const uncontrolledDefaultValue = useMemo<string[] | undefined>(() => {
      if (defaultValue === undefined) return undefined;
      return defaultValue;
    }, [defaultValue]);

    return (
      <AccordionPrimitive.Root
        ref={ref}
        data-slot="accordion"
        multiple
        value={controlledValue}
        defaultValue={uncontrolledDefaultValue}
        onValueChange={(nextValue) => {
          if (!onValueChange) return;
          const filtered = nextValue.filter(
            (next): next is string => next != null
          );
          onValueChange(filtered);
        }}
        {...rootProps}
      />
    );
  }

  const {
    type: _type,
    collapsible = false,
    value,
    defaultValue,
    onValueChange,
    ...rootProps
  } = props;

  const controlledValue = useMemo<string[] | undefined>(() => {
    if (value === undefined) return undefined;
    if (value === '') return [];
    return [value];
  }, [value]);

  const uncontrolledDefaultValue = useMemo<string[] | undefined>(() => {
    if (defaultValue === undefined) return undefined;
    if (defaultValue === '') return [];
    return [defaultValue];
  }, [defaultValue]);

  return (
    <AccordionPrimitive.Root
      ref={ref}
      data-slot="accordion"
      multiple={false}
      value={controlledValue}
      defaultValue={uncontrolledDefaultValue}
      onValueChange={(nextValue, details) => {
        if (!onValueChange) return;
        if (!collapsible && nextValue.length === 0) {
          details.cancel();
          return;
        }
        onValueChange(nextValue[0] ?? '');
      }}
      {...rootProps}
    />
  );
});
Accordion.displayName = 'Accordion';

const AccordionItem = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Item>,
  AccordionPrimitive.Item.Props
>(({ className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      data-slot="accordion-item"
      className={cn(
        'mt-2 first:mt-0 rounded-md hover:bg-accent data-open:bg-accent',
        className
      )}
      {...props}
    />
  );
});
AccordionItem.displayName = 'AccordionItem';

const chevronClassName =
  'text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-180';

const AccordionTrigger = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Trigger>,
  AccordionPrimitive.Trigger.Props & {
    icon?: Icon;
    /** `end` (default): chevron on the far right. `nextToLabel`: list icon, label, then chevron. */
    chevronPlacement?: 'end' | 'nextToLabel';
  }
>(({ className, children, icon, chevronPlacement = 'end', ...props }, ref) => {
  const Icon = icon;
  const chevron = (
    <IconChevronDown className={chevronClassName} aria-hidden />
  );

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        data-slot="accordion-trigger"
        className={cn(
          'focus-visible:border-ring focus-visible:ring-ring-shadow group/accordion-trigger flex flex-1 rounded-md p-2 text-left focus-visible:ring text-base leading-5 tracking-tightest font-medium transition-all outline-none disabled:pointer-events-none disabled:opacity-50',
          chevronPlacement === 'end'
            ? 'items-start justify-between gap-4'
            : 'w-full items-center justify-start',
          className
        )}
        {...props}
      >
        {chevronPlacement === 'end' ? (
          <>
            <div className="flex min-w-0 flex-1 items-center gap-2">
              {Icon && (
                <Icon className="text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-200" />
              )}
              <span className="inline-flex min-w-0 max-w-full items-center gap-1.5 overflow-visible">
                {children}
              </span>
            </div>
            {chevron}
          </>
        ) : (
          // w-max: keep list icon + label + chevron as one left-aligned group (not stretched across the chat width)
          <div className="inline-flex w-max max-w-full min-w-0 shrink-0 items-center justify-start gap-1.5">
            {Icon && (
              <Icon className="text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-200" />
            )}
            <span className="shrink-0 text-left">{children}</span>
            {chevron}
          </div>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Panel>,
  AccordionPrimitive.Panel.Props
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Panel
      ref={ref}
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden text-base leading-5 tracking-tightest transition-all duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0"
      {...props}
    >
      <div className={cn('px-2 pb-2 pt-0', className)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
});
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
