import React from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import Input, { InputType } from 'components/Input';

interface IInputControl<T extends FieldValues> extends UseControllerProps<T> {
  label?: string;
  placeholder?: string;
  maxLength?: number;
  type?: InputType;
}

const InputControl = <T extends FieldValues>({ control, name, ...rest }: IInputControl<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { invalid, error } }) => (
        <Input
          error={error?.message}
          isError={invalid}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          {...rest}
        />
      )}
    />
  );
};

export default InputControl;
