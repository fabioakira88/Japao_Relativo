import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const NAV_CATEGORIES = [
  { label: 'Notícias',  filter: 'Notícia' },
  { label: 'Cultura',   filter: 'Cultura' },
  { label: 'Idioma',    filter: 'Idioma' },
  { label: 'Saúde',     filter: 'Saúde e Bem-Estar' },
  { label: 'Anime',     filter: 'Anime' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  function goFilter(filter) {
    navigate(`/?filter=${encodeURIComponent(filter)}`);
    setTimeout(() => {
      document.getElementById('materias')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>

      {/* Logo + nome */}
      <Link to="/" className={styles.brand}>
        <img
          src="/imagens/imagens%20layolt/logo-japaorelativo.PNG"
          alt="Japão Relativo"
          className={styles.logo}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className={styles.brandText}>
          <span className={styles.brandName}>Japão Relativo</span>
          <span className={styles.brandSub}>O Japão por vários ângulos</span>
        </div>
      </Link>

      {/* Links de navegação */}
      <nav>
        <ul className={styles.links}>
          {NAV_CATEGORIES.map(({ label, filter }) => (
            <li key={filter}>
              <button className={styles.navBtn} onClick={() => goFilter(filter)}>
                {label}
              </button>
            </li>
          ))}
          <li>
            <Link to="/#sobre" className={styles.navBtn}>Sobre</Link>
          </li>
        </ul>
      </nav>

      {/* Busca */}
      <button className={styles.searchBtn} title="Buscar" aria-label="Buscar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </button>

    </header>
  );
}
