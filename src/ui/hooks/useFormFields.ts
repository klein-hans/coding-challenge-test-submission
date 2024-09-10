import { useState } from 'react';

/**
 * Custom hook to manage form fields state and handle changes.
 * @param initialValues - Initial values for the form fields.
 * @returns An object containing the form fields, a handler for field changes, and a function to reset fields.
 */
const useFormFields = (initialValues: { [key: string]: string }) => {
    const [fields, setFields] = useState<{ [key: string]: string }>(
        initialValues
    );

    /**
     * Handle changes to form fields.
     * @param e - The change event from an input element.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFields((prevFields) => ({ ...prevFields, [name]: value }));
    };

    /**
     * Reset all form fields to their initial values.
     */
    const resetFields = () => {
        setFields(initialValues);
    };

    return { fields, handleChange, resetFields };
};

export default useFormFields;
