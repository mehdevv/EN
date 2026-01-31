import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/mobispace-logo.png';
import './SplashScreen.css';

const SplashScreen: React.FC = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => navigate('/login'), 300);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="splash-screen">
            <div className="splash-content">
                <img src={logo} alt="MobiSpace" className="splash-logo-img" />
                <h1 className="splash-title">MobiSpace</h1>
                <p className="splash-subtitle">Your Digital Space</p>
            </div>

            <div className="splash-footer">
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="splash-version">v 2.0</p>
            </div>
        </div>
    );
};

export default SplashScreen;
