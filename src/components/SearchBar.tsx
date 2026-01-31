import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    placeholder = 'Search...',
    onClose
}) => {
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Auto-focus when component mounts
        inputRef.current?.focus();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    const handleClear = () => {
        setQuery('');
        onSearch('');
        inputRef.current?.focus();
    };

    const handleClose = () => {
        setQuery('');
        onClose?.();
    };

    return (
        <div className="search-bar">
            <div className="search-input-wrapper">
                <span className="material-symbols-outlined search-icon">search</span>
                <input
                    ref={inputRef}
                    type="text"
                    className="search-input"
                    placeholder={placeholder}
                    value={query}
                    onChange={handleChange}
                />
                {query && (
                    <button className="search-clear-btn" onClick={handleClear}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                )}
            </div>
            {onClose && (
                <button className="search-cancel-btn" onClick={handleClose}>
                    Cancel
                </button>
            )}
        </div>
    );
};

export default SearchBar;
