import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import './TransferPackage.css';

const TransferPackage: React.FC = () => {
    const navigate = useNavigate();
    const [packageType, setPackageType] = useState<'data' | 'voice' | 'sms'>('data');
    const [amount, setAmount] = useState(0);
    const [recipient, setRecipient] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);

    const availableResources = {
        data: { current: 15, unit: 'GB' },
        voice: { current: 500, unit: 'min' },
        sms: { current: 1000, unit: 'SMS' }
    };

    const handleTransfer = () => {
        if (amount > 0 && recipient) {
            setShowConfirm(true);
        }
    };

    const confirmTransfer = () => {
        alert(`Transferred ${amount} ${availableResources[packageType].unit} to ${recipient}!`);
        setShowConfirm(false);
        setAmount(0);
        setRecipient('');
    };

    return (
        <div className="transfer-package">
            {/* Header */}
            <header className="transfer-header">
                <button className="header-back" onClick={() => navigate(-1)}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="header-title">Transfer Package</h1>
                <div className="header-spacer"></div>
            </header>

            <main className="transfer-main">
                {/* Package Type Selector */}
                <div className="package-selector">
                    <button
                        className={`package-type ${packageType === 'data' ? 'active' : ''}`}
                        onClick={() => setPackageType('data')}
                    >
                        <span className="material-symbols-outlined">wifi</span>
                        <span>Data</span>
                    </button>
                    <button
                        className={`package-type ${packageType === 'voice' ? 'active' : ''}`}
                        onClick={() => setPackageType('voice')}
                    >
                        <span className="material-symbols-outlined">call</span>
                        <span>Voice</span>
                    </button>
                    <button
                        className={`package-type ${packageType === 'sms' ? 'active' : ''}`}
                        onClick={() => setPackageType('sms')}
                    >
                        <span className="material-symbols-outlined">sms</span>
                        <span>SMS</span>
                    </button>
                </div>

                {/* Available Resources */}
                <div className="available-card">
                    <span className="available-label">Available to Share</span>
                    <h2 className="available-amount">
                        {availableResources[packageType].current} {availableResources[packageType].unit}
                    </h2>
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
                        <label className="form-label">
                            Amount ({availableResources[packageType].unit})
                        </label>
                        <input
                            type="range"
                            className="amount-slider"
                            min="0"
                            max={availableResources[packageType].current}
                            value={amount}
                            onChange={(e) => setAmount(parseInt(e.target.value))}
                        />
                        <div className="amount-display">
                            {amount} {availableResources[packageType].unit}
                        </div>
                    </div>

                    <button
                        className="transfer-btn"
                        onClick={handleTransfer}
                        disabled={amount === 0 || !recipient}
                    >
                        <span className="material-symbols-outlined">share</span>
                        <span>Share {packageType.charAt(0).toUpperCase() + packageType.slice(1)}</span>
                    </button>
                </div>
            </main>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="modal-icon material-symbols-outlined">check_circle</span>
                        <h3 className="modal-title">Confirm Transfer</h3>
                        <p className="modal-description">
                            Transfer {amount} {availableResources[packageType].unit} to {recipient}?
                        </p>
                        <div className="modal-actions">
                            <button className="modal-btn cancel" onClick={() => setShowConfirm(false)}>
                                Cancel
                            </button>
                            <button className="modal-btn confirm" onClick={confirmTransfer}>
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

export default TransferPackage;
