import React, { FunctionComponent } from 'react';

import Button from '../Button/Button';
import InputText from '../InputText/InputText';
import $ from './Form.module.css';

interface FormEntry {
    name: string;
    placeholder: string;
    extraProps: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> & {
        value: string; // Ensure this matches the InputTextProps value type
    };
}

interface FormProps {
    label: string;
    loading: boolean;
    formEntries: FormEntry[];
    onFormSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
    submitText: string;
}

/**
 * Generic form component to handle form submission and layout.
 * @param props - Form properties including onSubmit handler and children components.
 * @returns JSX.Element - The form element.
 */
const Form: FunctionComponent<FormProps> = ({
    label,
    loading,
    formEntries,
    onFormSubmit,
    submitText,
}) => {
    return (
        <form onSubmit={onFormSubmit} className={$.form}>
            <fieldset>
                <legend>{label}</legend>
                {formEntries.map(({ name, placeholder, extraProps }, index) => (
                    <div key={`${name}-${index}`} className={$.formRow}>
                        <InputText
                            key={`${name}-${index}`}
                            name={name}
                            placeholder={placeholder}
                            {...extraProps}
                        />
                    </div>
                ))}

                <Button loading={loading} type='submit'>
                    {submitText}
                </Button>
            </fieldset>
        </form>
    );
};

export default Form;
