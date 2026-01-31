import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNav.css';

interface BottomNavProps {
    active: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ active }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { id: 'home', icon: 'home', label: 'Home', path: '/dashboard' },
        { id: 'usage', icon: 'account_balance_wallet', label: 'MobiPay', path: '/wallet' },
        { id: 'billing', icon: 'receipt_long', label: 'Offers', path: '/promotions' },
        { id: 'account', icon: 'person', label: 'Account', path: '/account' },
    ];

    const getActiveItem = () => {
        if (location.pathname.includes('/dashboard')) return 'home';
        if (location.pathname.includes('/wallet')) return 'usage';
        if (location.pathname.includes('/promotions') || location.pathname.includes('/offers')) return 'billing';
        if (location.pathname.includes('/account')) return 'account';
        return active;
    };

    const activeItem = getActiveItem();

    return (
        <nav className="bottom-nav">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
                    onClick={() => navigate(item.path)}
                >
                    <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: activeItem === item.id ? "'FILL' 1" : "'FILL' 0" }}
                    >
                        {item.icon}
                    </span>
                    <span className="nav-label">{item.label}</span>
                </button>
            ))}
        </nav>
    );
};

export default BottomNav;
