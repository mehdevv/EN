import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Chatbot from './Chatbot';
import logo from '../assets/mobispace-logo.png';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeView, setActiveView] = useState(1);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const viewWidth = container.offsetWidth;
            const currentView = Math.round(scrollLeft / viewWidth);
            setActiveView(currentView);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToView = (index: number) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const viewWidth = container.offsetWidth;
        container.scrollTo({
            left: viewWidth * index,
            behavior: 'smooth'
        });
    };

    return (
        <div className="dashboard">
            {isChatbotOpen && <Chatbot isPopup onClose={() => setIsChatbotOpen(false)} />}

            {/* Green Gradient Header */}
            <header className="dashboard-header">
                <div className="header-pattern"></div>
                <button className="chatbot-trigger" onClick={() => setIsChatbotOpen(true)}>
                    <span className="material-symbols-outlined">smart_toy</span>
                </button>
                <div className="header-content">
                    <img src={logo} alt="MobiSpace" className="dashboard-logo" />
                    <p className="greeting-text">GOOD MORNING,</p>
                    <div className="phone-number-badge">
                        <span className="material-symbols-outlined">sim_card</span>
                        <span className="phone-number">0661 45 82 91</span>
                        <span className="material-symbols-outlined">expand_more</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="dashboard-main">
                {/* Scrollable Balance Views */}
                <div className="balance-scroll-container" ref={scrollContainerRef}>
                    {/* View 1: Bonus Balance */}
                    <div className="balance-view">
                        <div className="balance-section">
                            <div className="balance-card-left">
                                <span className="material-symbols-outlined">account_balance_wallet</span>
                                <span className="card-label">Balance</span>
                            </div>

                            <div className="circular-balance">
                                <svg className="circular-chart" viewBox="0 0 36 36">
                                    <path
                                        className="circle-bg"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        stroke="#f0f0f0"
                                    />
                                    <path
                                        className="circle"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        stroke="currentColor"
                                        strokeDasharray="75, 100"
                                    />
                                </svg>
                                <div className="balance-center">
                                    <span className="material-symbols-outlined balance-icon">featured_seasonal_and_gifts</span>
                                    <h3 className="balance-amount">
                                        200 <span className="currency">DA</span>
                                    </h3>
                                    <p className="balance-label">REMAINING BONUS</p>
                                    <div className="balance-percentage">100%</div>
                                </div>
                            </div>

                            <div className="balance-card-right">
                                <span className="material-symbols-outlined">swap_horiz</span>
                                <span className="card-label">Internet</span>
                            </div>
                        </div>
                    </div>

                    {/* View 2: Data Usage */}
                    <div className="balance-view">
                        <div className="balance-section">
                            <div className="balance-card-left">
                                <span className="material-symbols-outlined">call</span>
                                <span className="card-label">Voice</span>
                            </div>

                            <div className="circular-balance">
                                <svg className="circular-chart" viewBox="0 0 36 36">
                                    {/* Background Circle */}
                                    <path
                                        className="circle-bg"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    {/* Progress Circle (e.g. 75% progress) */}
                                    <path
                                        className="circle"
                                        strokeDasharray="75, 100"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                </svg>
                                <div className="balance-center">
                                    <span className="material-symbols-outlined balance-icon">card_giftcard</span>
                                    <h3 className="balance-amount">
                                        200 <span className="currency">DA</span>
                                    </h3>
                                    <p className="balance-label">REMAINING BONUS</p>
                                    <div className="balance-percentage">100%</div>
                                </div>
                            </div>

                            <div className="balance-card-right" onClick={() => scrollToView(1)}>
                                <span className="material-symbols-outlined">swap_horiz</span>
                                <span className="card-label">Internet</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicators (Simple dots below) - Updated to match design (grey and green active) */}
                <div className="scroll-indicators">
                    <div
                        className={`indicator ${activeView === 0 ? 'active' : ''}`}
                        style={{ backgroundColor: activeView === 0 ? '#009640' : '#d1d5db', width: activeView === 0 ? '20px' : '8px', borderRadius: '4px' }}
                        onClick={() => scrollToView(0)}
                    ></div>
                    <div
                        className={`indicator ${activeView === 1 ? 'active' : ''}`}
                        onClick={() => scrollToView(1)}
                    ></div>
                </div>


                {/* MobiWallet Card */}
                <div className="mobiwallet-card">
                    <div className="wallet-icon">
                        <span className="material-symbols-outlined">account_balance</span>
                    </div>
                    <div className="wallet-info">
                        <span className="wallet-label">MOBIWALLET</span>
                        <h3 className="wallet-amount">15,500 <span className="wallet-currency">DA</span></h3>
                    </div>
                    <button className="wallet-manage-btn" onClick={() => navigate('/wallet')}>
                        Manage
                    </button>
                </div>

                {/* Quick Actions */}
                <div className="quick-actions-section">
                    <h3 className="quick-title">Quick Actions</h3>
                    <div className="quick-grid">
                        <button className="quick-action-card" onClick={() => navigate('/promotions')}>
                            <span className="material-symbols-outlined quick-icon">local_offer</span>
                            <span className="quick-label">Manage Offer</span>
                        </button>
                        <button className="quick-action-card" onClick={() => navigate('/offers')}>
                            <span className="material-symbols-outlined quick-icon">shopping_cart</span>
                            <span className="quick-label">Extra Bundles</span>
                        </button>
                        <button className="quick-action-card" onClick={() => navigate('/transfer-credit')}>
                            <span className="material-symbols-outlined quick-icon">payments</span>
                            <span className="quick-label">Recharge</span>
                        </button>
                        <button className="quick-action-card" onClick={() => navigate('/services')}>
                            <span className="material-symbols-outlined quick-icon">settings</span>
                            <span className="quick-label">Services</span>
                        </button>
                    </div>
                </div>

                {/* Special Offer Banner */}
                <div className="special-offer-banner">
                    <div className="offer-badge">LIMITED TIME</div>
                    <div className="offer-content">
                        <h4 className="offer-title">Double Data</h4>
                        <p className="offer-description">On all weekend recharges</p>
                    </div>
                    <div className="offer-bg-icon">
                        <span className="material-symbols-outlined">wifi</span>
                    </div>
                </div>
            </main>

            <BottomNav active="home" />
        </div>
    );
};

export default Dashboard;
