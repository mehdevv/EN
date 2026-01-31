import React, { useState } from 'react';
import BottomNav from '../components/BottomNav';
import './Promotions.css';

const Promotions: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('all');

    const hotDeals = [
        {
            id: 1,
            badge: 'Limited Offer',
            title: '100 GB',
            description: 'Internet + Unlimited Social',
            price: '1000 DZD',
            period: '/ month',
            gradient: 'from-red-600 to-red-700',
            icon: 'wifi'
        },
        {
            id: 2,
            badge: 'Students',
            title: '50 GB',
            description: 'Night Owl Special',
            price: '500 DZD',
            period: '/ month',
            gradient: 'from-purple-600 to-purple-700',
            icon: 'bedtime'
        },
        {
            id: 3,
            badge: 'Bundle',
            title: 'Gold Mix',
            description: 'Calls & Internet',
            price: '2000 DZD',
            period: '/ month',
            gradient: 'from-green-600 to-emerald-700',
            icon: 'diamond'
        }
    ];

    const categories = [
        { id: 'all', label: 'All Offers' },
        { id: 'internet', label: 'Internet' },
        { id: 'voice', label: 'Voice' },
        { id: 'bundles', label: 'Bundles' },
        { id: 'roaming', label: 'Roaming' }
    ];

    const offers = [
        {
            id: 1,
            name: 'Super Data Plan',
            description: 'High speed 4G internet',
            price: '500 DA',
            duration: '24 Hours',
            icon: 'wifi',
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600',
            details: [
                { label: 'Data', value: '10 GB' },
                { label: 'Bonus', value: 'Unltd FB' }
            ]
        },
        {
            id: 2,
            name: 'Talk More',
            description: 'National calls included',
            price: '100 DA',
            duration: '24 Hours',
            icon: 'call',
            iconBg: 'bg-purple-50',
            iconColor: 'text-purple-600',
            details: [
                { label: 'Voice', value: 'Unlimited' },
                { label: 'SMS', value: '50 SMS' }
            ]
        },
        {
            id: 3,
            name: 'PixX 1000',
            description: 'The complete package',
            price: '1000 DA',
            duration: '30 Days',
            icon: 'layers',
            iconBg: 'bg-orange-50',
            iconColor: 'text-orange-600',
            details: [
                { label: 'Data', value: '15 GB' },
                { label: 'Voice', value: '2000 DA' },
                { label: 'Social', value: 'Free' }
            ]
        }
    ];

    return (
        <div className="promotions">
            {/* Green Header */}
            <header className="promotions-header">
                <h2 className="header-title">Available Offers</h2>
            </header>

            <main className="promotions-main">
                {/* Hot Deals Section */}
                <section className="hot-deals-section">
                    <div className="section-header">
                        <h3 className="section-title">Hot Deals</h3>
                        <a href="#" className="view-all-link">View All</a>
                    </div>

                    <div className="hot-deals-scroll">
                        {hotDeals.map((deal) => (
                            <div key={deal.id} className={`hot-deal-card gradient-${deal.gradient}`}>
                                <div className="deal-content">
                                    <div className="deal-top">
                                        <span className="deal-badge">{deal.badge}</span>
                                        <h4 className="deal-title">{deal.title}</h4>
                                        <p className="deal-description">{deal.description}</p>
                                    </div>
                                    <div className="deal-bottom">
                                        <div className="deal-price">
                                            {deal.price} <span className="deal-period">{deal.period}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="deal-decoration"></div>
                                <div className="deal-icon">
                                    <span className="material-symbols-outlined">{deal.icon}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Category Filters */}
                <section className="categories-section">
                    <div className="categories-scroll">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`category-pill ${activeCategory === category.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category.id)}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Offers List */}
                <section className="offers-section">
                    {offers.map((offer) => (
                        <div key={offer.id} className="offer-card">
                            <div className={`offer-icon ${offer.iconBg} ${offer.iconColor}`}>
                                <span className="material-symbols-outlined">{offer.icon}</span>
                            </div>

                            <div className="offer-info">
                                <div className="offer-header">
                                    <h4 className="offer-name">{offer.name}</h4>
                                    <span className="offer-price">
                                        {offer.price}
                                        <span className="offer-duration">{offer.duration}</span>
                                    </span>
                                </div>
                                <p className="offer-description">{offer.description}</p>

                                <div className="offer-details">
                                    {offer.details.map((detail, index) => (
                                        <div key={index} className="detail-item">
                                            <span className="detail-label">{detail.label}</span>
                                            <span className="detail-value">{detail.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className="subscribe-btn">Subscribe</button>
                        </div>
                    ))}
                </section>
            </main>

            <BottomNav active="billing" />
        </div>
    );
};

export default Promotions;
