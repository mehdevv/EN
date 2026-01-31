import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SendMoney.css';

const SendMoney: React.FC = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('0');
    const [recipient, setRecipient] = useState('');

    const handleKeypadClick = (key: string) => {
        if (key === 'backspace') {
            setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
        } else if (key === '.') {
            if (!amount.includes('.')) {
                setAmount(prev => prev + '.');
            }
        } else {
            setAmount(prev => prev === '0' ? key : prev + key);
        }
    };

    const favorites = [
        { id: 1, name: 'Amine', content: null, color: null, type: 'image', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCILDJNt5JeJ8togJ4ktSzPDNHGFeeu-lRsH_5EVn46_WitiyxNJSaNWzk8vkBC3AprHy5F_ALbNp8L7d8mzkt6N433XVSOM7NQX7nkALQT3BMBJNB8SVBGK12NV7ipt1AovbZqRnCwbTSMdlbNyY0okNzP1KTrZsiXG8XQI-eVI8MxobjXvpkXTNCNJqnCkMMPuyjsUHz87ORuk6I8jCwZv8yUkfIewKfA5Vo3r7dKuxzdb-pnwsGT4jPo3e5NiFs6OocYFie3yoVf' },
        { id: 2, name: 'Sarah', content: 'S', color: 'blue', type: 'initial' },
        { id: 3, name: 'Karim', content: 'K', color: 'purple', type: 'initial' },
        { id: 4, name: 'Mom', content: 'M', color: 'orange', type: 'initial' },
    ];

    return (
        <div className="send-money-page">
            <div className="background-blob-green"></div>
            <div className="background-blob-gold"></div>

            <header className="send-money-header">
                <button className="icon-btn" onClick={() => navigate(-1)}>
                    <span className="material-icons-round">arrow_back</span>
                </button>
                <h1>Send Money</h1>
                <button className="icon-btn">
                    <span className="material-icons-round">history</span>
                </button>
            </header>

            <main className="send-money-main">
                <div className="input-section">
                    <label className="input-label">RECIPIENT NUMBER</label>
                    <div className="glass-input-container">
                        <div className="icon-box">
                            <span className="material-icons-round">dialpad</span>
                        </div>
                        <input
                            type="tel"
                            placeholder="0X XX XX XX XX"
                            className="glass-input"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                        />
                        <button className="contact-btn">
                            <span className="material-icons-round">perm_contact_calendar</span>
                        </button>
                    </div>
                </div>

                <div className="favorites-section">
                    <div className="favorites-header">
                        <span className="favorites-label">FAVORITES</span>
                        <button className="view-all-btn">View All</button>
                    </div>
                    <div className="favorites-list hide-scrollbar">
                        <button className="favorite-item">
                            <div className="favorite-circle dashed">
                                <span className="material-icons-round">add</span>
                            </div>
                            <span className="favorite-name">New</span>
                        </button>

                        {favorites.map(fav => (
                            <button key={fav.id} className="favorite-item">
                                <div className="favorite-circle hover-primary">
                                    {fav.type === 'image' ? (
                                        <div className="avatar-wrapper">
                                            <img src={fav.img} alt={fav.name} className="favorite-avatar" />
                                            <div className="online-badge"></div>
                                        </div>
                                    ) : (
                                        <div className={`initial-circle bg-${fav.color}`}>
                                            {fav.content}
                                        </div>
                                    )}
                                </div>
                                <span className="favorite-name">{fav.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="amount-display-section">
                    <div className="balance-pill">
                        <span className="pulse-dot"></span>
                        <span>Available Balance: <strong>4,250 DA</strong></span>
                    </div>
                    <div className="amount-wrapper">
                        <span className="amount-value">{Number(amount).toLocaleString()}</span>
                        <span className="amount-currency">DA</span>
                    </div>
                    <div className="amount-underline"></div>
                </div>

                <div className="keypad-section">
                    <div className="keypad-grid">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map(key => (
                            <button
                                key={key}
                                className="keypad-btn"
                                onClick={() => handleKeypadClick(key.toString())}
                            >
                                {key}
                            </button>
                        ))}
                        <button
                            className="keypad-btn backspace"
                            onClick={() => handleKeypadClick('backspace')}
                        >
                            <span className="material-icons-round">backspace</span>
                        </button>
                    </div>

                    <button className="confirm-btn">
                        <span>Confirm Transfer</span>
                        <span className="material-icons-round">arrow_forward</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default SendMoney;
