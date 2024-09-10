// InputText.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputText from './InputText';

describe('InputText Component', () => {
    test('renders input with placeholder and value', () => {
        const handleChange = jest.fn();
        render(
            <InputText
                name='username'
                placeholder='Enter your username'
                value='JohnDoe'
                onChange={handleChange}
            />
        );
        const inputElement =
            screen.getByPlaceholderText(/Enter your username/i);
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveValue('JohnDoe');
    });
});
