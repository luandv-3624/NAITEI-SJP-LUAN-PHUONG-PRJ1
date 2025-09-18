import * as React from 'react';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatDate, isValidDate } from '@/lib/date';

export function DatePicker({
  date,
  setDate,
  className,
  placeholder,
}: {
  date?: Date;
  setDate?: (date?: Date) => void;
  className?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>(formatDate(date));

  const startMonth = new Date();
  const endMonth = new Date();
  endMonth.setFullYear(startMonth.getFullYear() + 5);

  return (
    <div className='relative'>
      <Input
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={(e) => {
          const date = new Date(e.target.value);
          setValue(e.target.value);
          if (isValidDate(date)) {
            if (setDate) {
              setDate(date);
            }
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setOpen(true);
          }
        }}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='ghost'
            className='absolute top-1/2 right-2 size-6 -translate-y-1/2'
          >
            <CalendarIcon className='size-3.5' />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-auto overflow-hidden p-0'
          align='end'
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode='single'
            selected={date}
            captionLayout='dropdown'
            startMonth={startMonth}
            endMonth={endMonth}
            disabled={(date) => date < new Date()}
            onSelect={(date) => {
              if (setDate) {
                setDate(date);
              }
              setValue(formatDate(date));
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
