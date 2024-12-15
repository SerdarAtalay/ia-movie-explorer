import React from 'react';
import classNames from 'classnames';

interface ToolbarProps {
    children: React.ReactNode;
    className?: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ children, className }) => {
    return <div className={classNames('bg-primary-50 px-2 py-1 mb-4 rounded-md shadow flex flex-col md:flex-row items-center', className)}>{children}</div>;
};

export default Toolbar;
