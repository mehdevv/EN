import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import GreenHeader from '../components/GreenHeader';
import SearchBar from '../components/SearchBar';
import './Services.css';

const Services: React.FC = () => {
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const topServices = [
        { id: 'tunes', icon: 'music_note', label: 'My Tunes', color: 'purple' },
        { id: 'intl', icon: 'public', label: 'Intl Calls', color: 'blue' },
        { id: 'gift', icon: 'card_giftcard', label: 'Gift Cards', color: 'orange' }
    ];

    const serviceCategories = [
        {
            id: 'roaming',
            icon: 'flight',
            title: 'Roaming Services',
            subtitle: 'Travel packs & international settings',
            color: 'blue',
            expandable: true
        },
        {
            id: 'caller-tunes',
            icon: 'music_note',
            title: 'Caller Tunes',
            subtitle: 'Personalize your ringback tone',
            color: 'purple',
            expandable: true
        },
        {
            id: 'top-charts',
            icon: 'trending_up',
            title: 'Top Charts',
            subtitle: 'Most popular content',
            color: 'pink',
            action: 'Browse'
        },
        {
            id: 'collection',
            icon: 'folder',
            title: 'My Collection',
            subtitle: 'Your saved items',
            color: 'yellow',
            expandable: true
        },
        {
            id: 'data',
            icon: 'wifi',
            title: 'Data Services',
            subtitle: '4G Switch, Hotspot & Settings',
            color: 'teal',
            expandable: true
        },
        {
            id: 'info',
            icon: 'info',
            title: 'Info Services',
            subtitle: 'News, Weather, Prayer times',
            color: 'orange',
            expandable: true
        }
    ];

    const filteredCategories = serviceCategories.filter(cat =>
        cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div className="services">
            {/* Header */}
            {!showSearch ? (
                <GreenHeader
                    title="Services Hub"
                    rightAction={
                        <button className="icon-btn" onClick={() => setShowSearch(true)}>
                            <span className="material-symbols-outlined">search</span>
                        </button>
                    }
                />
            ) : (
                <SearchBar
                    onSearch={handleSearch}
                    placeholder="Search for a service..."
                    onClose={() => {
                        setShowSearch(false);
                        setSearchQuery('');
                    }}
                />
            )}

            <div className="services-content">
                {/* Top Services */}
                {!searchQuery && (
                    <section className="top-services-section">
                        <div className="top-services-grid">
                            {topServices.map((service) => (
                                <button
                                    key={service.id}
                                    className="top-service-card"
                                    onClick={() => navigate('/services')}
                                >
                                    <div className={`top-service-icon ${service.color}`}>
                                        <span className="material-symbols-outlined">{service.icon}</span>
                                    </div>
                                    <span className="top-service-label">{service.label}</span>
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {/* Service Categories */}
                <section className="section">
                    <div className="service-categories">
                        {filteredCategories.map((category) => (
                            <button
                                key={category.id}
                                className="service-category-item"
                                onClick={() => navigate('/services')}
                            >
                                <div className={`category-icon ${category.color}`}>
                                    <span className="material-symbols-outlined">{category.icon}</span>
                                </div>
                                <div className="category-info">
                                    <h4 className="category-title">{category.title}</h4>
                                    <p className="category-subtitle">{category.subtitle}</p>
                                </div>
                                {category.action ? (
                                    <span className="category-action">{category.action}</span>
                                ) : category.expandable ? (
                                    <span className="material-symbols-outlined category-arrow">
                                        expand_more
                                    </span>
                                ) : null}
                            </button>
                        ))}
                    </div>
                </section>

                <div className="bottom-spacer"></div>
            </div>

            <BottomNav active="stores" />
        </div>
    );
};

export default Services;
