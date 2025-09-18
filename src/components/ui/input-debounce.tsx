import { ChangeEventHandler, useMemo, useState } from 'react';
import { Input } from './input';

function InputDebounce({
  value,
  onChange,
  ...props
}: React.ComponentProps<'input'>) {
  const [localValue, setLocalValue] = useState(value);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useMemo(() => {
    let i: NodeJS.Timeout | undefined = undefined;

    return (e) => {
      clearTimeout(i);

      setLocalValue(e.target.value);

      i = setTimeout(() => {
        if (onChange) {
          onChange(e);
        }
      }, 1000);
    };
  }, [onChange]);

  return <Input {...props} onChange={handleChange} value={localValue} />;
}

export { InputDebounce };
