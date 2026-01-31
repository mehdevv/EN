import React from 'react';
import './NotificationPanel.css';

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type?: 'info' | 'success' | 'warning';
}

interface NotificationPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
    const [notifications] = React.useState<Notification[]>([
        {
            id: '1',
            title: 'Recharge Successful',
            message: 'Your account has been recharged with 1,000 DA',
            time: '5 min ago',
            read: false,
            type: 'success'
        },
        {
            id: '2',
            title: 'New Offer Available',
            message: 'Get 100GB data for only 1,000 DA',
            time: '1 hour ago',
            read: false,
            type: 'info'
        },
        {
            id: '3',
            title: 'Payment Reminder',
            message: 'Your bill payment is due in 3 days',
            time: '2 hours ago',
            read: true,
            type: 'warning'
        }
    ]);

    if (!isOpen) return null;

    return (
        <>
            <div className="notification-overlay" onClick={onClose}></div>
            <div className={`notification-panel ${isOpen ? 'open' : ''}`}>
                <div className="notification-header">
                    <h3>Notifications</h3>
                    <button className="notification-close-btn" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="notification-list">
                    {notifications.length === 0 ? (
                        <div className="notification-empty">
                            <span className="material-symbols-outlined">notifications_off</span>
                            <p>No notifications</p>
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                            >
                                <div className={`notification-icon ${notification.type || 'info'}`}>
                                    <span className="material-symbols-outlined">
                                        {notification.type === 'success' ? 'check_circle' :
                                            notification.type === 'warning' ? 'warning' :
                                                'info'}
                                    </span>
                                </div>
                                <div className="notification-content">
                                    <h4 className="notification-title">{notification.title}</h4>
                                    <p className="notification-message">{notification.message}</p>
                                    <span className="notification-time">{notification.time}</span>
                                </div>
                                {!notification.read && <div className="notification-dot"></div>}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default NotificationPanel;
