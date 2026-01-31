import React from 'react';
import './GreenHeader.css';

interface GreenHeaderProps {
    title?: string;
    showBack?: boolean;
    onBack?: () => void;
    rightAction?: React.ReactNode;
    children?: React.ReactNode;
}

const GreenHeader: React.FC<GreenHeaderProps> = ({
    title,
    showBack = false,
    onBack,
    rightAction,
    children
}) => {
    return (
        <header className="green-header">
            <div className="header-top">
                {showBack ? (
                    <button className="icon-btn" onClick={onBack}>
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                ) : (
                    <div style={{ width: '40px' }}></div>
                )}

                {title && <h2 className="header-title">{title}</h2>}

                {rightAction || <div style={{ width: '40px' }}></div>}
            </div>

            {children && <div className="header-content">{children}</div>}
        </header>
    );
};

export default GreenHeader;
