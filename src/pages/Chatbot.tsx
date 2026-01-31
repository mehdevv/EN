import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import './Chatbot.css';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

interface ChatbotProps {
    onClose?: () => void;
    isPopup?: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose, isPopup = false }) => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: 'Hello! I\'m your MobiSpace assistant. How can I help you today?',
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const quickActions = [
        { icon: 'account_balance_wallet', text: 'Check Balance' },
        { icon: 'local_offer', text: 'View Offers' },
        { icon: 'support_agent', text: 'Contact Support' },
        { icon: 'help', text: 'FAQs' }
    ];

    const [isLoading, setIsLoading] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleBack = () => {
        if (onClose) {
            onClose();
        } else {
            navigate(-1);
        }
    };

    const callOpenRouter = async (userMsg: string) => {
        setIsLoading(true);
        try {
            const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

            if (!apiKey) {
                console.error("API Key not found");
                return "I'm sorry, I'm having trouble connecting to my brain right now.";
            }

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": window.location.origin, // For OpenRouter rankings
                    "X-Title": "MobiSpace",
                },
                body: JSON.stringify({
                    "model": "meta-llama/llama-3-8b-instruct:free",
                    "messages": [
                        {
                            "role": "system",
                            "content": "You are MobiBot, the friendly and helpful AI assistant for MobiSpace, a mobile telecom and wallet application. Your goal is to simplify the digital life of users. You can help with checking balances, explaining offers (PixX, Awel, Sama), facilitating credit transfers, and guiding users through the app. Be concise, polite, and use emojis occasionally. If asked about user-specific data (like current exact balance), say you are simulating it for now but in the real app you would fetch it securely."
                        },
                        ...messages.map(m => ({
                            role: m.sender === 'user' ? 'user' : 'assistant',
                            content: m.text
                        })).filter(m => m.content !== '...'), // Filter out loading states if any
                        { "role": "user", "content": userMsg }
                    ]
                })
            });

            const data = await response.json();
            if (data.choices && data.choices.length > 0) {
                return data.choices[0].message.content;
            } else {
                console.error("No choices in response", data);
                return "I didn't quite catch that. Could you try again?";
            }
        } catch (error) {
            console.error("API Call error:", error);
            return "Sorry, I'm experiencing some connection issues.";
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async () => {
        if (inputMessage.trim()) {
            const userText = inputMessage;
            const userMessage: Message = {
                id: messages.length + 1,
                text: userText,
                sender: 'user',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, userMessage]);
            setInputMessage('');
            setIsLoading(true);

            // Fetch bot response
            const botReplyText = await callOpenRouter(userText);

            const botResponse: Message = {
                id: messages.length + 2,
                text: botReplyText,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
        }
    };

    const handleQuickAction = (action: string) => {
        setInputMessage(action);
        handleSendMessage();
    };

    return (
        <div className={`chatbot ${isPopup ? 'chatbot-popup' : ''}`}>
            {/* Header */}
            <header className="chatbot-header">
                <button className="header-back" onClick={handleBack}>
                    {isPopup ? (
                        <span className="material-symbols-outlined">close</span>
                    ) : (
                        <span className="material-symbols-outlined">arrow_back</span>
                    )}
                </button>
                <div className="header-info">
                    <div className="bot-avatar">
                        <span className="material-symbols-outlined">smart_toy</span>
                    </div>
                    <div className="bot-details">
                        <h1 className="header-title">MobiBot</h1>
                        <span className="bot-status">Online 24/7</span>
                    </div>
                </div>
                <div className="header-spacer"></div>
            </header>

            {/* Messages */}
            <main className="chat-messages">
                {messages.map((message) => (
                    <div key={message.id} className={`message ${message.sender}`}>
                        {message.sender === 'bot' && (
                            <div className="message-avatar">
                                <span className="material-symbols-outlined">smart_toy</span>
                            </div>
                        )}
                        <div className="message-bubble">
                            <p className="message-text">{message.text}</p>
                            <span className="message-time">
                                {message.timestamp.toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                        {message.sender === 'user' && (
                            <div className="message-avatar user">
                                <span className="material-symbols-outlined">person</span>
                            </div>
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className="message bot">
                        <div className="message-avatar">
                            <span className="material-symbols-outlined">smart_toy</span>
                        </div>
                        <div className="message-bubble typing-indicator">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />

                {/* Quick Actions */}
                {messages.length === 1 && (
                    <div className="quick-actions">
                        <p className="quick-title">Quick Actions</p>
                        <div className="actions-grid">
                            {quickActions.map((action, index) => (
                                <button
                                    key={index}
                                    className="action-card"
                                    onClick={() => handleQuickAction(action.text)}
                                >
                                    <span className="material-symbols-outlined">{action.icon}</span>
                                    <span>{action.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Input */}
            <div className="chat-input">
                <button className="input-btn">
                    <span className="material-symbols-outlined">add</span>
                </button>
                <input
                    type="text"
                    className="message-input"
                    placeholder="Type a message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button className="send-btn" onClick={handleSendMessage}>
                    <span className="material-symbols-outlined">send</span>
                </button>
            </div>

            {!isPopup && <BottomNav active="" />}
        </div>
    );
};

export default Chatbot;
