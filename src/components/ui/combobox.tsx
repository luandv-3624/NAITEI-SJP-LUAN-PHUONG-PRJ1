import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function Combobox({
  data = [],
  className,
  placeholderSelect,
  placeholderSearch,
  placeholderEmpty,
  disabled,
  onChange,
  value,
  ...props
}: Omit<React.ComponentProps<'button'>, 'onChange' | 'value'> & {
  data?: { value: string; label: string }[];
  placeholderSelect?: string;
  placeholderSearch?: string;
  placeholderEmpty?: string;
  onChange?: (value: string) => void;
  value?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [localValue, setLocalValue] = React.useState(value ?? '');

  const showValue = value ?? localValue;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn('justify-between w-full', className)}
          disabled={disabled}
          {...props}
        >
          {showValue
            ? data.find((d) => d.value === showValue)?.label
            : (placeholderSelect ?? 'Select data...')}
          <ChevronsUpDown
            className={cn(
              'size-4 opacity-50',
              disabled ? 'hidden' : 'opacity-100',
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 w-[300px] font-roboto' align='start'>
        <Command>
          <CommandInput
            disabled={disabled}
            placeholder={placeholderSearch ?? 'Search data...'}
            className='h-9'
          />
          <CommandList>
            <CommandEmpty>{placeholderEmpty ?? 'No data found.'}</CommandEmpty>
            <CommandGroup>
              {data.map((d) => (
                <CommandItem
                  disabled={disabled}
                  key={d.value}
                  value={d.value}
                  keywords={[d.label]}
                  onSelect={(currentValue) => {
                    setLocalValue(
                      currentValue === showValue ? '' : currentValue,
                    );
                    if (onChange !== undefined) {
                      onChange(currentValue === showValue ? '' : currentValue);
                    }
                    setOpen(false);
                  }}
                >
                  {d.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      showValue === d.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
