import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import './DepositBalance.css';

const DepositBalance: React.FC = () => {
    const navigate = useNavigate();
    const [selectedAmount, setSelectedAmount] = useState<number | null>(200);
    const [scratchCode, setScratchCode] = useState('');
    const [activeTab, setActiveTab] = useState<'me' | 'other'>('me');

    const quickAmounts = [
        { value: 100, label: '100' },
        { value: 200, label: '200', isPopular: true },
        { value: 500, label: '500' },
        { value: 1000, label: '1000' },
        { value: 2000, label: '2000' },
    ];

    return (
        <div className="deposit-page">
            {/* Header Background */}
            <div className="header-background">
                <div className="header-pattern"></div>
                <div className="header-gradient"></div>
            </div>

            <div className="deposit-content">
                {/* Header */}
                <header className="deposit-header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="header-title">Recharge Balance</h1>
                    <button className="history-btn">
                        <span className="material-symbols-outlined">history</span>
                    </button>
                </header>

                {/* Main Card */}
                <div className="main-card">
                    {/* Number Toggles */}
                    <div className="toggle-container">
                        <button
                            className={`toggle-btn ${activeTab === 'me' ? 'active' : ''}`}
                            onClick={() => setActiveTab('me')}
                        >
                            My Number
                        </button>
                        <button
                            className={`toggle-btn ${activeTab === 'other' ? 'active' : ''}`}
                            onClick={() => setActiveTab('other')}
                        >
                            Another Number
                        </button>
                    </div>

                    <div className="card-padding">
                        {/* Number Display */}
                        <div className="number-display-card">
                            <div className="number-info">
                                <div className="sim-icon-wrapper">
                                    <span className="material-symbols-outlined">sim_card</span>
                                </div>
                                <div>
                                    <p className="recharging-label">Recharging</p>
                                    <p className="phone-number">0666 11 70 88</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined check-icon">check_circle</span>
                        </div>

                        {/* Quick Top-Up Section */}
                        <div className="section-container">
                            <div className="section-header">
                                <h3 className="section-title">
                                    <span className="material-symbols-outlined bolt-icon">bolt</span>
                                    Quick Top-Up
                                </h3>
                                <span className="bonus-badge">Bonus applied</span>
                            </div>

                            <div className="amounts-grid">
                                {quickAmounts.map((amt) => (
                                    <button
                                        key={amt.value}
                                        className={`amount-btn ${selectedAmount === amt.value ? 'selected' : ''}`}
                                        onClick={() => setSelectedAmount(amt.value)}
                                    >
                                        {amt.isPopular && (
                                            <div className="popular-badge">POPULAR</div>
                                        )}
                                        <span className={`amount-value ${selectedAmount === amt.value ? 'selected-text' : ''}`}>
                                            {amt.label}
                                        </span>
                                        <span className="amount-currency">DA</span>
                                    </button>
                                ))}
                                <button
                                    className={`amount-btn custom ${selectedAmount === null ? 'selected' : ''}`}
                                    onClick={() => setSelectedAmount(null)}
                                >
                                    <span className="material-symbols-outlined edit-icon">edit</span>
                                    <span className="custom-label">Custom</span>
                                </button>
                            </div>

                            <button className="pay-btn">
                                <span className="material-symbols-outlined">account_balance_wallet</span>
                                Pay with MobiWallet
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="divider-container">
                            <div className="divider-line"></div>
                            <span className="divider-text">Or Use Code</span>
                            <div className="divider-line"></div>
                        </div>

                        {/* Scratch Card Section */}
                        <div className="scratch-section">
                            <div className="section-header">
                                <h3 className="section-title">
                                    <span className="material-symbols-outlined qr-icon">qr_code_2</span>
                                    Scratch Card
                                </h3>
                            </div>

                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    className="scratch-input"
                                    placeholder="Enter 14-digit code"
                                    value={scratchCode}
                                    onChange={(e) => setScratchCode(e.target.value)}
                                />
                                <button className="scan-btn">
                                    <span className="material-symbols-outlined">center_focus_strong</span>
                                </button>
                            </div>

                            <button className="use-card-btn">
                                Use Scratch Card
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <BottomNav active="wallet" />
        </div>
    );
};

export default DepositBalance;
