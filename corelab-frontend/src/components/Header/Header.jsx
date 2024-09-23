import React, { useEffect } from 'react';
import './Header.scss';
import logo from '../../assets/logo.png';
import { SwitchTheme } from '../SwitchTheme/SwitchTheme';
import PropTypes from 'prop-types';

export default function Header({ onSearch }) {
  useEffect(() => {
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.dataset.bsTheme = userPrefersDark ? 'dark' : 'light';
  }, []);

  const toggleTheme = () => {
    document.body.dataset.bsTheme = document.body.dataset.bsTheme === "light" ? "dark" : "light";
  };

  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <header className="d-flex justify-content-between align-items-center p-3 px-5 shadow-sm">
      {
        window.innerWidth <= 490 ? ("") :
        <div className="logo d-flex align-items-center">
          <img src={logo} width="40" alt="CoreNotes" />
          <span className="titleLogo unselect ms-2">CoreNotes</span>
        </div>
      }
      <div className="search input-group">
        <input
          type="text"
          className="search-input"
          placeholder="Pesquisar notas"
          onChange={handleSearch}
        />
        <span className="search-icon input-group-text">
          <i className="bi bi-search"></i>
        </span>
      </div>
      <SwitchTheme onClick={toggleTheme} />
    </header>
  );
}

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
}