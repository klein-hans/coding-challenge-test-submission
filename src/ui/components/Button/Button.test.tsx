// Button.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button Component', () => {
    test('renders button with text', () => {
        render(<Button>Click Me</Button>);
        const buttonElement = screen.getByText(/Click Me/i);
        expect(buttonElement).toBeInTheDocument();
    });

    test('calls onClick handler when clicked', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click Me</Button>);
        const buttonElement = screen.getByText(/Click Me/i);
        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('shows loading spinner when loading is true', () => {
        render(<Button loading={true}>Click Me</Button>);
        const spinnerElement = screen.getByTestId('loading-spinner');
        expect(spinnerElement).toBeInTheDocument();
        expect(spinnerElement).toHaveTextContent('Loading...');
    });

    test('applies the correct variant class', () => {
        render(<Button variant='primary'>Primary Button</Button>);
        const primaryButton = screen.getByText(/Primary Button/i);
        expect(primaryButton).toHaveClass('button primary'); // Adjust class names based on your CSS module setup

        render(<Button variant='secondary'>Secondary Button</Button>);
        const secondaryButton = screen.getByText(/Secondary Button/i);
        expect(secondaryButton).toHaveClass('button secondary'); // Adjust class names based on your CSS module setup
    });
});
