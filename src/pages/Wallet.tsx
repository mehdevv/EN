import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import './Wallet.css';

const Wallet: React.FC = () => {
    const navigate = useNavigate();

    const transactions = [
        {
            id: 1,
            title: 'Transfer to 0661...',
            date: 'Today, 10:42 AM',
            amount: -2000,
            icon: 'person',
            bg: 'bg-gray-100',
            color: 'text-gray-500'
        },
        {
            id: 2,
            title: 'Sonelgaz Bill',
            date: 'Yesterday, 04:15 PM',
            amount: -4500,
            icon: 'lightbulb',
            bg: 'bg-orange-50',
            color: 'text-orange-500'
        },
        {
            id: 3,
            title: 'Wallet Top-up',
            date: '12 Oct, 09:00 AM',
            amount: 10000,
            icon: 'add_card',
            bg: 'bg-green-50',
            color: 'text-primary'
        }
    ];

    const actions = [
        {
            id: 'send',
            title: 'Send Money',
            subtitle: 'To any wallet',
            icon: 'send', // Changed from send_money (invalid) to send
            bg: 'bg-green-50',
            color: 'text-primary',
            path: '/transfer-credit' // Updated path to existing transfer page
        },
        {
            id: 'bill',
            title: 'Bill Payment',
            subtitle: 'Utilities & more',
            icon: 'receipt_long',
            bg: 'bg-orange-50',
            color: 'text-orange-500',
            path: '/bill-payment'
        },
        {
            id: 'card',
            title: 'Virtual Card',
            subtitle: 'Online payments',
            icon: 'credit_card',
            bg: 'bg-purple-50',
            color: 'text-purple-600',
            path: '/virtual-card'
        },
        {
            id: 'cash',
            title: 'Cash In/Out',
            subtitle: 'ATM or Agent',
            icon: 'currency_exchange',
            bg: 'bg-gold-50',
            color: 'text-gold',
            path: '/deposit-balance'
        }
    ];

    return (
        <div className="wallet-page">
            {/* Header Section */}
            <div className="wallet-header">
                <div className="header-decoration-circle1"></div>
                <div className="header-decoration-circle2"></div>

                <div className="wallet-header-top">
                    <div className="user-profile">
                        <div className="avatar-container">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCILDJNt5JeJ8togJ4ktSzPDNHGFeeu-lRsH_5EVn46_WitiyxNJSaNWzk8vkBC3AprHy5F_ALbNp8L7d8mzkt6N433XVSOM7NQX7nkALQT3BMBJNB8SVBGK12NV7ipt1AovbZqRnCwbTSMdlbNyY0okNzP1KTrZsiXG8XQI-eVI8MxobjXvpkXTNCNJqnCkMMPuyjsUHz87ORuk6I8jCwZv8yUkfIewKfA5Vo3r7dKuxzdb-pnwsGT4jPo3e5NiFs6OocYFie3yoVf"
                                alt="User Avatar"
                                className="user-avatar"
                            />
                            <div className="status-indicator"></div>
                        </div>
                        <div className="user-info">
                            <p className="welcome-text">Welcome back,</p>
                            <p className="user-name">Abdelkader</p>
                        </div>
                    </div>

                    <button className="notification-btn">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="notification-badge"></span>
                    </button>
                </div>

                <div className="balance-container">
                    <p className="balance-label">
                        <span className="material-symbols-outlined">account_balance_wallet</span>
                        Total Balance
                    </p>
                    <div className="balance-amount-wrapper">
                        <h1 className="balance-amount">24,500</h1>
                        <div className="balance-currency-group">
                            <span className="balance-decimal">.00</span>
                            <span className="balance-currency">DZD</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="quick-actions-container">
                <div className="actions-grid">
                    {actions.map(action => (
                        <button
                            key={action.id}
                            className="action-card"
                            onClick={() => action.path && navigate(action.path)}
                        >
                            <div className={`action-icon-wrapper ${action.bg} ${action.color}`}>
                                <span className="material-symbols-outlined">{action.icon}</span>
                            </div>
                            <div className="action-text-wrapper">
                                <span className="action-title">{action.title}</span>
                                <span className="action-subtitle">{action.subtitle}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Recent Activities */}
                <div className="activities-section">
                    <div className="activities-header">
                        <h3>Recent Activities</h3>
                        <button className="view-all-btn">View All</button>
                    </div>

                    <div className="activities-list">
                        {transactions.map(transaction => (
                            <div key={transaction.id} className="activity-item">
                                <div className="activity-left">
                                    <div className={`activity-icon-wrapper ${transaction.bg} ${transaction.color}`}>
                                        <span className="material-symbols-outlined">{transaction.icon}</span>
                                    </div>
                                    <div className="activity-details">
                                        <p className="activity-title">{transaction.title}</p>
                                        <p className="activity-date">{transaction.date}</p>
                                    </div>
                                </div>
                                <span className={`activity-amount ${transaction.amount > 0 ? 'positive' : 'negative'}`}>
                                    {transaction.amount > 0 ? '+' : '-'} {Math.abs(transaction.amount).toLocaleString()} DA
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Security Badge */}
                <div className="security-badge">
                    <span className="material-symbols-outlined">shield_lock</span>
                    <span>Wallet PIN Protected & Secure</span>
                </div>
            </div>

            <BottomNav active="wallet" />
        </div>
    );
};

export default Wallet;
