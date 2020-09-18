import { useState } from 'react';

import { OnInputChangeHandler } from '../elements/Input';


export function useInputValue<T = string>(): [ T, OnInputChangeHandler, string ] {

  const [ inputValue, setInputValue ] = useState<{ raw: string, casted: T | null }>({ raw: '', casted: null });

  const handleInputChange: OnInputChangeHandler = (e, props) => {
    const { value, type } = props;

    const raw: string = value?.toString() ?? '';

    switch (type) {
      case 'number':
        const casted = +(value ?? '');
        setInputValue({ raw, casted: casted as unknown as T });
        break;

      default:
        setInputValue({ raw, casted: value as unknown as T });
    }
  };

  return [
    inputValue.casted as unknown as T,
    handleInputChange,
    inputValue.raw
  ];

}
