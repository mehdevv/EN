import React from 'react';
import './ServiceGrid.css';

interface Service {
    id: string;
    icon: string;
    label: string;
    color?: string;
    onClick?: () => void;
}

interface ServiceGridProps {
    services: Service[];
    columns?: 2 | 3 | 4;
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ services, columns = 2 }) => {
    return (
        <div className={`service-grid grid-${columns}`}>
            {services.map((service) => (
                <button
                    key={service.id}
                    className="service-item"
                    onClick={service.onClick}
                >
                    <div className={`service-icon ${service.color || 'primary'}`}>
                        <span className="material-symbols-outlined">{service.icon}</span>
                    </div>
                    <span className="service-label">{service.label}</span>
                </button>
            ))}
        </div>
    );
};

export default ServiceGrid;
