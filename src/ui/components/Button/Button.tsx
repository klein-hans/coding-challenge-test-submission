import { ButtonType, ButtonVariant } from '@/types';
import React, { FunctionComponent } from 'react';

import $ from './Button.module.css';

interface ButtonProps {
    onClick?: () => void;
    type?: ButtonType;
    variant?: ButtonVariant;
    loading?: boolean;
    children: React.ReactNode;
}

/**
 * Button component to handle user interactions.
 * @param props - Button properties including type, variant, and onClick handler.
 * @returns JSX.Element - The button element.
 */
const Button: FunctionComponent<ButtonProps> = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    loading = false,
}) => {
    const buttonClass = `${$.button} ${
        variant === 'primary' ? $.primary : $.secondary
    }`;

    return (
        <button
            className={buttonClass}
            type={type}
            onClick={onClick}
            disabled={loading} // Disable button when loading
        >
            {loading ? (
                // Display the loading spinner when loading is true
                <span className={$.spinner} data-testid='loading-spinner'>
                    {/* You can use an actual spinner icon or CSS spinner here */}
                    Loading...
                </span>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
