import React from 'react';
import { TextField, TextFieldProps } from "./TextField";
import { UseControllerProps, useController } from 'react-hook-form';

export interface IControllerTextInputProps extends TextFieldProps, UseControllerProps<Record<string, string>> {
    name: string;
}

export const ControllerTextInput = ({ name, disabled, rules, ...props }: IControllerTextInputProps) => {
    const { field, fieldState } = useController({ name, disabled, rules });

    return (
        <TextField
            {...field}
            {...props}
            keyboardType="default"
            helper={fieldState.error?.message}
            onChangeText={(text) => field.onChange(text)}
            status={fieldState.error ? "error" : undefined}
        />
    )
}
