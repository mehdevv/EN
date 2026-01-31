import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import './Games.css';

const Games: React.FC = () => {
    const navigate = useNavigate();
    const [points, setPoints] = useState(250);
    const [isSpinning, setIsSpinning] = useState(false);
    const [showReward, setShowReward] = useState(false);
    const [reward, setReward] = useState('');

    const prizes = ['50 DA', '100 MB', '10 MIN', '200 DA', '500 MB', '20 MIN', '1 GB', '500 DA'];

    const handleSpin = () => {
        if (points >= 50) {
            setIsSpinning(true);
            setPoints(points - 50);

            setTimeout(() => {
                const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
                setReward(randomPrize);
                setIsSpinning(false);
                setShowReward(true);
            }, 3000);
        }
    };

    const games = [
        { id: 1, name: 'Spin Wheel', icon: 'token', cost: 50, active: true },
        { id: 2, name: 'Scratch Card', icon: 'confirmation_number', cost: 30, active: false },
        { id: 3, name: 'Quiz', icon: 'quiz', cost: 20, active: false },
        { id: 4, name: 'Daily Challenge', icon: 'emoji_events', cost: 0, active: false }
    ];

    const challenges = [
        { id: 1, title: 'Make 5 calls', progress: 3, total: 5, reward: '100 MIN' },
        { id: 2, title: 'Use 1GB data', progress: 0.6, total: 1, reward: '500 MB' },
        { id: 3, title: 'Send 20 SMS', progress: 15, total: 20, reward: '50 SMS' }
    ];

    return (
        <div className="games">
            {/* Header */}
            <header className="games-header">
                <button className="header-back" onClick={() => navigate(-1)}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="header-title">Games & Rewards</h1>
                <div className="header-spacer"></div>
            </header>

            <main className="games-main">
                {/* Points Balance */}
                <div className="points-card">
                    <div className="points-info">
                        <span className="points-label">Your Points</span>
                        <h2 className="points-amount">{points}</h2>
                    </div>
                    <div className="points-icon">
                        <span className="material-symbols-outlined">stars</span>
                    </div>
                </div>

                {/* Spin Wheel Section */}
                <div className="game-section">
                    <h3 className="section-title">🎰 Spin the Wheel</h3>
                    <div className="spin-wheel-card">
                        <div className={`wheel ${isSpinning ? 'spinning' : ''}`}>
                            <div className="wheel-center">
                                <span className="material-symbols-outlined">currency_exchange</span>
                            </div>
                            {prizes.map((prize, index) => (
                                <div
                                    key={index}
                                    className="wheel-segment"
                                    style={{ transform: `rotate(${index * 45}deg)` }}
                                >
                                    <span className="prize-text">{prize}</span>
                                </div>
                            ))}
                        </div>
                        <button
                            className="spin-btn"
                            onClick={handleSpin}
                            disabled={isSpinning || points < 50}
                        >
                            {isSpinning ? 'Spinning...' : 'Spin (50 pts)'}
                        </button>
                    </div>
                </div>

                {/* Other Games */}
                <div className="game-section">
                    <h3 className="section-title">🎮 Mini Games</h3>
                    <div className="games-grid">
                        {games.slice(1).map((game) => (
                            <div key={game.id} className={`game-card ${!game.active ? 'locked' : ''}`}>
                                <span className="material-symbols-outlined game-icon">{game.icon}</span>
                                <span className="game-name">{game.name}</span>
                                <span className="game-cost">{game.cost} pts</span>
                                {!game.active && <div className="lock-badge">Coming Soon</div>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Weekly Challenges */}
                <div className="game-section">
                    <h3 className="section-title">🏆 Weekly Challenges</h3>
                    <div className="challenges-list">
                        {challenges.map((challenge) => (
                            <div key={challenge.id} className="challenge-card">
                                <div className="challenge-info">
                                    <span className="challenge-title">{challenge.title}</span>
                                    <span className="challenge-reward">🎁 {challenge.reward}</span>
                                </div>
                                <div className="challenge-progress">
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="progress-text">
                                        {challenge.progress}/{challenge.total}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Reward Modal */}
            {showReward && (
                <div className="modal-overlay" onClick={() => setShowReward(false)}>
                    <div className="modal-content reward-modal" onClick={(e) => e.stopPropagation()}>
                        <span className="reward-icon">🎉</span>
                        <h3 className="modal-title">Congratulations!</h3>
                        <p className="modal-description">You won</p>
                        <div className="reward-display">{reward}</div>
                        <button className="modal-btn confirm" onClick={() => setShowReward(false)}>
                            Claim Reward
                        </button>
                    </div>
                </div>
            )}

            <BottomNav active="" />
        </div>
    );
};

export default Games;
