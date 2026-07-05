import { useEffect, useRef } from 'react';

interface TableCheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  ariaLabel?: string;
}

export function TableCheckbox({
  checked,
  indeterminate = false,
  onChange,
  ariaLabel,
}: TableCheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="custom-checkbox"
      aria-label={ariaLabel}
    />
  );
}
