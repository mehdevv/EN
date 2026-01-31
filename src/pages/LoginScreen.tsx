import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/mobispace-logo.png';
import './LoginScreen.css';

const LoginScreen: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(phone, password);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-screen">
            <div className="login-content">
                <div className="login-header">
                    <img src={logo} alt="MobiSpace" className="login-logo-img" />
                    <h1 className="login-title">MobiSpace</h1>
                    <p className="login-subtitle">Secure access to telecom & wallet services</p>
                </div>

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <div className="input-wrapper">
                            <span className="material-symbols-outlined input-icon">smartphone</span>
                            <input
                                type="tel"
                                className="form-input"
                                placeholder="06 XX XX XX XX"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div className="input-wrapper">
                            <span className="material-symbols-outlined input-icon">lock</span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="input-action"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <span className="material-symbols-outlined">
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    <a href="#" className="forgot-password">Forgot password?</a>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <button type="button" className="btn-secondary">
                        <span className="material-symbols-outlined">face</span>
                        Login with Face ID
                    </button>
                </form>

                <p className="signup-link">
                    Don't have an account? <a href="#">Sign up</a>
                </p>
            </div>

            <p className="login-footer">
                <span className="material-symbols-outlined">verified_user</span>
                Secured by Mobilis
            </p>
        </div>
    );
};

export default LoginScreen;
