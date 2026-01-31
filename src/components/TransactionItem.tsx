import React from 'react';
import './TransactionItem.css';

interface TransactionItemProps {
    icon: string;
    iconColor?: string;
    title: string;
    subtitle: string;
    amount: number;
    currency?: string;
    type?: 'positive' | 'negative';
    showDot?: boolean;
    onClick?: () => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
    icon,
    iconColor = 'primary',
    title,
    subtitle,
    amount,
    currency = 'DA',
    type = 'negative',
    showDot = false,
    onClick
}) => {
    const formatAmount = (value: number) => {
        const formatted = Math.abs(value).toLocaleString('en-US');
        return type === 'negative' ? `-${formatted}` : `+${formatted}`;
    };

    return (
        <button className="transaction-item" onClick={onClick}>
            <div className={`transaction-icon ${iconColor}`}>
                <span className="material-symbols-outlined">{icon}</span>
            </div>

            <div className="transaction-info">
                <h4 className="transaction-title">{title}</h4>
                <p className="transaction-subtitle">{subtitle}</p>
            </div>

            <div className="transaction-right">
                <p className={`transaction-amount ${type}`}>
                    {formatAmount(amount)} {currency}
                </p>
                {showDot && <span className="transaction-dot"></span>}
            </div>
        </button>
    );
};

export default TransactionItem;
