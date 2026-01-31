import React from 'react';
import './BalanceCard.css';

interface BalanceCardProps {
    balance: number;
    currency?: string;
    label?: string;
    showQR?: boolean;
    showTopUp?: boolean;
    onTopUp?: () => void;
    onQRClick?: () => void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
    balance,
    currency = 'DZD',
    label = 'MOBI WALLET BALANCE',
    showQR = false,
    showTopUp = true,
    onTopUp,
    onQRClick
}) => {
    const formatBalance = (amount: number) => {
        return amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    return (
        <div className="balance-card">
            <div className="balance-card-header">
                <div className="balance-label">
                    <span className="material-symbols-outlined">account_balance_wallet</span>
                    {label}
                </div>
                {showQR && (
                    <button className="qr-btn" onClick={onQRClick}>
                        <span className="material-symbols-outlined">qr_code_2</span>
                    </button>
                )}
            </div>

            <div className="balance-amount">
                <span className="amount-value">{formatBalance(balance)}</span>
                <span className="amount-currency">{currency}</span>
            </div>

            {showTopUp && (
                <button className="btn btn-primary btn-topup" onClick={onTopUp}>
                    <span className="material-symbols-outlined">add</span>
                    Top Up
                </button>
            )}
        </div>
    );
};

export default BalanceCard;
