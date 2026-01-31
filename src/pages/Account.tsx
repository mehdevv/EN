import React from 'react';
import BottomNav from '../components/BottomNav';
import './Account.css';

const Account: React.FC = () => {
    const accountItems = [
        { id: 'personal', icon: 'person', label: 'Personal Information', iconBg: 'primary' },
        { id: 'sim', icon: 'sim_card', label: 'SIM Information', iconBg: 'primary' },
        { id: 'security', icon: 'verified_user', label: 'Wallet Security', iconBg: 'primary' }
    ];

    const generalItems = [
        { id: 'settings', icon: 'settings', label: 'App Settings', iconBg: 'gray' },
        { id: 'help', icon: 'help', label: 'Help & Support', iconBg: 'gray' }
    ];

    const handleLogout = () => {
        // Handle logout logic
        console.log('Logging out...');
    };

    return (
        <div className="account">
            {/* Header */}
            <header className="account-header">
                <h1 className="header-title">Account</h1>
            </header>

            {/* Main Content */}
            <main className="account-main">
                {/* Profile Section */}
                <section className="profile-section">
                    <div className="profile-avatar-wrapper">
                        <div className="profile-avatar">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSExC5Heyun_yOdqep12JIABTO8pREWRydEET5-6v8goVnjfu9Dyot7T-ziGxQCFIlnvTlCtYzOYoXnBgXTmAro1YzP4UQcAWbVl5gh5QsyQNVCYW47GS0i2FzVa0By1wf4w2INYGv-bTip0Nc1wvFAshrpfqk4qfe2DDjOrRAMy-W53xC3n5hka6ruy9Wz_PhIb5ZFOw6V-jFpewVE5m62NLLs0EME_tXhNDdChVtJL-5JO6ugDlFtEWP2LEIGBsBk2GVighuAI1v"
                                alt="Profile"
                                className="avatar-image"
                            />
                        </div>
                        <div className="edit-badge">
                            <span className="material-symbols-outlined">edit</span>
                        </div>
                    </div>
                    <div className="profile-info">
                        <h2 className="profile-name">Alex Johnson</h2>
                        <p className="profile-phone">+1 (555) 123-4567</p>
                    </div>
                </section>

                {/* Account Settings Group */}
                <div className="settings-group">
                    <h3 className="group-title">ACCOUNT</h3>
                    <div className="settings-card">
                        {accountItems.map((item, index) => (
                            <button
                                key={item.id}
                                className={`settings-item ${index < accountItems.length - 1 ? 'with-border' : ''}`}
                            >
                                <div className="item-content">
                                    <div className={`item-icon ${item.iconBg}-bg`}>
                                        <span className="material-symbols-outlined">{item.icon}</span>
                                    </div>
                                    <span className="item-label">{item.label}</span>
                                </div>
                                <span className="material-symbols-outlined chevron">chevron_right</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* General Settings Group */}
                <div className="settings-group">
                    <h3 className="group-title">GENERAL</h3>
                    <div className="settings-card">
                        {generalItems.map((item, index) => (
                            <button
                                key={item.id}
                                className={`settings-item ${index < generalItems.length - 1 ? 'with-border' : ''}`}
                            >
                                <div className="item-content">
                                    <div className={`item-icon ${item.iconBg}-bg`}>
                                        <span className="material-symbols-outlined">{item.icon}</span>
                                    </div>
                                    <span className="item-label">{item.label}</span>
                                </div>
                                <span className="material-symbols-outlined chevron">chevron_right</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Logout Section */}
                <div className="logout-section">
                    <button className="logout-btn" onClick={handleLogout}>
                        <span className="material-symbols-outlined">logout</span>
                        <span className="logout-text">Log Out</span>
                    </button>
                    <p className="version-text">MobiSpace Version 2.4.0</p>
                </div>
            </main>

            <BottomNav active="account" />
        </div>
    );
};

export default Account;
