import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import './Loyalty.css';

const Loyalty: React.FC = () => {
    const navigate = useNavigate();
    const [currentPoints, setCurrentPoints] = useState(2450);
    const [currentTier] = useState('Silver');

    const tiers = [
        { name: 'Bronze', min: 0, color: '#cd7f32', benefits: ['5% bonus on recharges', '1x points'] },
        { name: 'Silver', min: 2000, color: '#c0c0c0', benefits: ['10% bonus on recharges', '1.5x points', 'Priority support'] },
        { name: 'Gold', min: 5000, color: '#ffd700', benefits: ['15% bonus on recharges', '2x points', 'Exclusive offers', 'Free shipping'] },
        { name: 'VIP', min: 10000, color: '#9333ea', benefits: ['20% bonus on recharges', '3x points', 'VIP support', 'Premium gifts'] }
    ];

    const rewards = [
        { id: 1, name: '500 MB Data', points: 500, icon: 'wifi' },
        { id: 2, name: '100 Minutes', points: 800, icon: 'call' },
        { id: 3, name: '200 DA Credit', points: 1000, icon: 'payments' },
        { id: 4, name: '1 GB Data', points: 1500, icon: 'signal_cellular_alt' },
        { id: 5, name: '500 DA Credit', points: 2500, icon: 'account_balance_wallet' },
        { id: 6, name: 'Premium Offer', points: 3000, icon: 'card_giftcard' }
    ];

    const history = [
        { id: 1, action: 'Earned', amount: 150, description: 'Weekly usage bonus', date: 'Today' },
        { id: 2, action: 'Redeemed', amount: -500, description: '500 MB Data', date: 'Yesterday' },
        { id: 3, action: 'Earned', amount: 200, description: 'Recharge bonus', date: 'Jan 28' }
    ];

    const nextTierIndex = tiers.findIndex(t => t.name === currentTier) + 1;
    const nextTier = nextTierIndex < tiers.length ? tiers[nextTierIndex] : null;
    const progress = nextTier ? ((currentPoints - tiers[nextTierIndex - 1].min) / (nextTier.min - tiers[nextTierIndex - 1].min)) * 100 : 100;

    const handleRedeem = (reward: any) => {
        if (currentPoints >= reward.points) {
            setCurrentPoints(currentPoints - reward.points);
            alert(`Redeemed ${reward.name}!`);
        }
    };

    return (
        <div className="loyalty">
            {/* Header */}
            <header className="loyalty-header">
                <button className="header-back" onClick={() => navigate(-1)}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="header-title">Loyalty Program</h1>
                <div className="header-spacer"></div>
            </header>

            <main className="loyalty-main">
                {/* Points & Tier Card */}
                <div className="tier-card" style={{ background: `linear-gradient(135deg, ${tiers.find(t => t.name === currentTier)?.color} 0%, ${tiers.find(t => t.name === currentTier)?.color}dd 100%)` }}>
                    <div className="tier-badge">
                        <span className="material-symbols-outlined">workspace_premium</span>
                        <span className="tier-name">{currentTier}</span>
                    </div>
                    <h2 className="points-display">{currentPoints.toLocaleString()} pts</h2>
                    {nextTier && (
                        <div className="next-tier-info">
                            <span className="next-tier-text">
                                {nextTier.min - currentPoints} pts to {nextTier.name}
                            </span>
                            <div className="tier-progress">
                                <div className="tier-progress-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tier Benefits */}
                <div className="benefits-section">
                    <h3 className="section-title">✨ Your Benefits</h3>
                    <div className="benefits-grid">
                        {tiers.find(t => t.name === currentTier)?.benefits.map((benefit, index) => (
                            <div key={index} className="benefit-item">
                                <span className="material-symbols-outlined">check_circle</span>
                                <span>{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rewards Catalog */}
                <div className="rewards-section">
                    <h3 className="section-title">🎁 Redeem Rewards</h3>
                    <div className="rewards-grid">
                        {rewards.map((reward) => (
                            <div key={reward.id} className={`reward-card ${currentPoints < reward.points ? 'locked' : ''}`}>
                                <span className="material-symbols-outlined reward-icon">{reward.icon}</span>
                                <span className="reward-name">{reward.name}</span>
                                <span className="reward-points">{reward.points} pts</span>
                                <button
                                    className="redeem-btn"
                                    onClick={() => handleRedeem(reward)}
                                    disabled={currentPoints < reward.points}
                                >
                                    {currentPoints >= reward.points ? 'Redeem' : 'Locked'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Points History */}
                <div className="history-section">
                    <h3 className="section-title">📊 Points History</h3>
                    <div className="history-list">
                        {history.map((item) => (
                            <div key={item.id} className="history-item">
                                <div className={`history-icon ${item.action.toLowerCase()}`}>
                                    <span className="material-symbols-outlined">
                                        {item.action === 'Earned' ? 'add' : 'remove'}
                                    </span>
                                </div>
                                <div className="history-info">
                                    <span className="history-desc">{item.description}</span>
                                    <span className="history-date">{item.date}</span>
                                </div>
                                <span className={`history-amount ${item.action.toLowerCase()}`}>
                                    {item.amount > 0 ? '+' : ''}{item.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <BottomNav active="" />
        </div>
    );
};

export default Loyalty;
