import React, { FunctionComponent } from 'react';

import $ from './Error.module.css';

interface ErrorProps {
    children: React.ReactNode;
}

const Error: FunctionComponent<ErrorProps> = ({ children }) => {
    return <div className={$.error}>{children}</div>;
};

export default Error;
