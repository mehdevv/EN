import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GreenHeader from '../components/GreenHeader';
import BottomNav from '../components/BottomNav';
import './Offers.css';

interface Offer {
    id: string;
    name: string;
    price: number;
    category: string;
}

const Offers: React.FC = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', label: 'All', icon: 'apps' },
        { id: 'talk-net-mix', label: 'Talk/Net/Mix', icon: 'phone_in_talk' },
        { id: 'internet', label: 'Internet', icon: 'language' },
        { id: 'roaming', label: 'Roaming', icon: 'flight' },
        { id: 'country', label: 'Country', icon: 'public' },
        { id: 'special', label: 'Special', icon: 'star' }
    ];

    const offers: Offer[] = [
        // Talk / Net / Mix
        { id: '1', name: 'Sama Talk 2000', price: 2000, category: 'talk-net-mix' },
        { id: '2', name: 'Sama Talk 1500', price: 1500, category: 'talk-net-mix' },
        { id: '3', name: 'Sama Talk 1000', price: 1000, category: 'talk-net-mix' },
        { id: '4', name: 'Sama Talk 500', price: 500, category: 'talk-net-mix' },
        { id: '5', name: 'Sama Net 2000', price: 2000, category: 'talk-net-mix' },
        { id: '6', name: 'Sama Net 1500', price: 1500, category: 'talk-net-mix' },
        { id: '7', name: 'Sama Net 500', price: 500, category: 'talk-net-mix' },
        { id: '8', name: 'Sama Net 30', price: 30, category: 'talk-net-mix' },
        { id: '9', name: 'Sama Mix 2000', price: 2000, category: 'talk-net-mix' },
        { id: '10', name: 'Sama Mix 1500', price: 1500, category: 'talk-net-mix' },
        { id: '11', name: 'Sama Mix 1000', price: 1000, category: 'talk-net-mix' },
        { id: '12', name: 'Sama Mix 500', price: 500, category: 'talk-net-mix' },
        { id: '13', name: 'Sama Mix 100', price: 100, category: 'talk-net-mix' },
        { id: '14', name: 'Sama Mix 50', price: 50, category: 'talk-net-mix' },

        // Internet (Local)
        { id: '15', name: 'Plan Internet Hadj 4000DA', price: 4000, category: 'internet' },
        { id: '16', name: 'Plan Internet Hadj 2000DA', price: 2000, category: 'internet' },
        { id: '17', name: 'Plan Internet Hadj 1000DA', price: 1000, category: 'internet' },
        { id: '18', name: 'Plan INT 500DA', price: 500, category: 'internet' },
        { id: '19', name: 'Plan INT 1000DA', price: 1000, category: 'internet' },
        { id: '20', name: 'Plan INT 250DA', price: 250, category: 'internet' },

        // International / Roaming Internet
        { id: '21', name: 'Plan Internet Turquie 4000DZD', price: 4000, category: 'roaming' },
        { id: '22', name: 'Plan Internet Turquie 2000DZD', price: 2000, category: 'roaming' },
        { id: '23', name: 'Plan Internet Turquie 1000DZD', price: 1000, category: 'roaming' },
        { id: '24', name: 'Plan Internet Roaming Europe 15GB / 4000DA', price: 4000, category: 'roaming' },
        { id: '25', name: 'Plan Internet Roaming Europe 6GB / 2000DA', price: 2000, category: 'roaming' },
        { id: '26', name: 'Plan Internet Roaming Europe 2GB / 1000DA', price: 1000, category: 'roaming' },

        // Roaming Data Pass
        { id: '27', name: 'Pass Data Roaming France 6GB / 2000DA', price: 2000, category: 'roaming' },
        { id: '28', name: 'Pass Data Roaming France 2GB / 1000DA', price: 1000, category: 'roaming' },
        { id: '29', name: 'Pass Data Roaming France 15GB / 4000DA', price: 4000, category: 'roaming' },
        { id: '30', name: 'Pass Data Roaming Arabie Saoudite 1GB / 1000DA', price: 1000, category: 'roaming' },
        { id: '31', name: 'Pass Data Roaming Arabie Saoudite 400MB / 500DA', price: 500, category: 'roaming' },
        { id: '32', name: 'Pass Data Roaming Arabie Saoudite 5GB / 4000DA', price: 4000, category: 'roaming' },

        // International Country Passes
        { id: '33', name: 'Pass Amérique 1GB', price: 1950, category: 'country' },
        { id: '34', name: 'Pass Amérique 500MB', price: 1200, category: 'country' },
        { id: '35', name: 'Pass Amérique 250MB', price: 800, category: 'country' },
        { id: '36', name: 'Plan France 4000DZD', price: 4000, category: 'country' },
        { id: '37', name: 'Plan France 2000DZD', price: 2000, category: 'country' },
        { id: '38', name: 'Plan France 1000DZD', price: 1000, category: 'country' },

        // Tunisie
        { id: '39', name: 'Plan Tunisie 2024', price: 0, category: 'country' },
        { id: '40', name: 'Plan Tunisie 2024 (4000DA)', price: 4000, category: 'country' },
        { id: '41', name: 'Plan Tunisie 2024 (1000DA)', price: 1000, category: 'country' },
        { id: '42', name: 'Plan Orange Tunisie 500DA', price: 500, category: 'country' },

        // Special
        { id: '43', name: 'M50 4G CAT 6 INATEL', price: 0, category: 'special' }
    ];

    const filteredOffers = activeCategory === 'all'
        ? offers
        : offers.filter(offer => offer.category === activeCategory);

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'talk-net-mix': return 'phone_in_talk';
            case 'internet': return 'language';
            case 'roaming': return 'flight';
            case 'country': return 'public';
            case 'special': return 'star';
            default: return 'card_giftcard';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'talk-net-mix': return 'green';
            case 'internet': return 'blue';
            case 'roaming': return 'purple';
            case 'country': return 'orange';
            case 'special': return 'yellow';
            default: return 'primary';
        }
    };

    return (
        <div className="offers">
            <GreenHeader
                title="Available Offers"
                showBack={true}
                onBack={() => navigate(-1)}
            />

            <div className="offers-content">
                {/* Category Filters */}
                <section className="categories-section">
                    <div className="categories-scroll">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`category-chip ${activeCategory === category.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category.id)}
                            >
                                <span className="material-symbols-outlined">{category.icon}</span>
                                {category.label}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Offers Count */}
                <div className="offers-count">
                    <span className="material-symbols-outlined">local_offer</span>
                    {filteredOffers.length} {filteredOffers.length === 1 ? 'Offer' : 'Offers'} Available
                </div>

                {/* Offers Grid */}
                <section className="offers-grid">
                    {filteredOffers.map((offer) => (
                        <button
                            key={offer.id}
                            className="offer-card"
                            onClick={() => navigate('/offers')}
                        >
                            <div className={`offer-icon ${getCategoryColor(offer.category)}`}>
                                <span className="material-symbols-outlined">
                                    {getCategoryIcon(offer.category)}
                                </span>
                            </div>
                            <div className="offer-info">
                                <h4 className="offer-name">{offer.name}</h4>
                                <p className="offer-price">
                                    {offer.price === 0 ? 'Free' : `${offer.price.toLocaleString()} DA`}
                                </p>
                            </div>
                            <span className="material-symbols-outlined offer-arrow">chevron_right</span>
                        </button>
                    ))}
                </section>

                {filteredOffers.length === 0 && (
                    <div className="no-offers">
                        <span className="material-symbols-outlined">search_off</span>
                        <p>No offers found in this category</p>
                    </div>
                )}

                <div className="bottom-spacer"></div>
            </div>

            <BottomNav active="promotions" />
        </div>
    );
};

export default Offers;
