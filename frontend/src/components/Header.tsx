// src/components/Header.js
import React from 'react';
import '../styles/Header.scss';

/**
 * A component to render the header of the application.
 * @param {{ onSearch: (value: string) => void, searchValue: string }} props
 * @returns {JSX.Element} The rendered header element.
 */
const Header = ({ onSearch, searchValue }: { onSearch: (value: string) => void, searchValue: string }): JSX.Element => {
    return (
        <header className="header">
            <div className="header-logo">
                <img src="./logo.png" alt="Logo" />
                <span>CoreNotes</span>
            </div>
            <div className='header-search'>
                <input
                    type="text"
                    placeholder="Buscar por nome..."
                    value={searchValue}
                    onChange={(e) => onSearch(e.target.value)}
                />

            </div>
        </header>
    );
};

export default Header;
