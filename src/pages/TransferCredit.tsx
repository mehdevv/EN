import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import './TransferCredit.css';

const TransferCredit: React.FC = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [pin, setPin] = useState('');
    const [showPinConfirm, setShowPinConfirm] = useState(false);

    const quickAmounts = [50, 100, 200, 500];

    const recentTransfers = [
        { id: 1, number: '0661 45 82 92', amount: 100, date: 'Today, 14:30' },
        { id: 2, number: '0551 23 45 67', amount: 200, date: 'Yesterday' },
        { id: 3, number: '0771 98 76 54', amount: 50, date: 'Jan 28' }
    ];

    const handleTransfer = () => {
        if (amount && recipient) {
            setShowPinConfirm(true);
        }
    };

    const confirmTransfer = () => {
        if (pin.length === 4) {
            // Simulate transfer
            alert(`Transfer of ${amount} DA to ${recipient} successful!`);
            setShowPinConfirm(false);
            setAmount('');
            setRecipient('');
            setPin('');
        }
    };

    return (
        <div className="transfer-credit">
            {/* Header */}
            <header className="transfer-header">
                <button className="header-back" onClick={() => navigate(-1)}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="header-title">Transfer Credit</h1>
                <div className="header-spacer"></div>
            </header>

            <main className="transfer-main">
                {/* Balance Display */}
                <div className="current-balance">
                    <span className="balance-label">Available Balance</span>
                    <h2 className="balance-amount">1,250 DA</h2>
                    <span className="balance-note">Daily limit: 1,000 DA remaining</span>
                </div>

                {/* Transfer Form */}
                <div className="transfer-form">
                    <div className="form-group">
                        <label className="form-label">Recipient Number</label>
                        <div className="input-with-icon">
                            <span className="material-symbols-outlined">phone</span>
                            <input
                                type="tel"
                                className="form-input"
                                placeholder="0661 45 82 91"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                            />
                            <button className="input-action">
                                <span className="material-symbols-outlined">contacts</span>
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Amount (DA)</label>
                        <div className="input-with-icon">
                            <span className="material-symbols-outlined">payments</span>
                            <input
                                type="number"
                                className="form-input large"
                                placeholder="0"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Quick Amount Buttons */}
                    <div className="quick-amounts">
                        {quickAmounts.map((amt) => (
                            <button
                                key={amt}
                                className="quick-amount-btn"
                                onClick={() => setAmount(amt.toString())}
                            >
                                {amt} DA
                            </button>
                        ))}
                    </div>

                    {/* Transfer Button */}
                    <button
                        className="transfer-btn"
                        onClick={handleTransfer}
                        disabled={!amount || !recipient}
                    >
                        <span className="material-symbols-outlined">send</span>
                        <span>Send Credit</span>
                    </button>
                </div>

                {/* Recent Transfers */}
                <div className="recent-section">
                    <h3 className="section-title">Recent Transfers</h3>
                    <div className="transfer-list">
                        {recentTransfers.map((transfer) => (
                            <div key={transfer.id} className="transfer-item">
                                <div className="transfer-icon">
                                    <span className="material-symbols-outlined">north_east</span>
                                </div>
                                <div className="transfer-info">
                                    <span className="transfer-number">{transfer.number}</span>
                                    <span className="transfer-date">{transfer.date}</span>
                                </div>
                                <span className="transfer-amount">-{transfer.amount} DA</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* PIN Confirmation Modal */}
            {showPinConfirm && (
                <div className="modal-overlay" onClick={() => setShowPinConfirm(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3 className="modal-title">Confirm Transfer</h3>
                        <p className="modal-description">
                            Transfer {amount} DA to {recipient}
                        </p>
                        <div className="pin-input-group">
                            <label className="form-label">Enter PIN</label>
                            <input
                                type="password"
                                className="form-input pin-input"
                                placeholder="****"
                                maxLength={4}
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                            />
                        </div>
                        <div className="modal-actions">
                            <button
                                className="modal-btn cancel"
                                onClick={() => setShowPinConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="modal-btn confirm"
                                onClick={confirmTransfer}
                                disabled={pin.length !== 4}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <BottomNav active="" />
        </div>
    );
};

export default TransferCredit;
