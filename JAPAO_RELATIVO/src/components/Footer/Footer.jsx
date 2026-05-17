import { useNavigate } from 'react-router-dom';
import { posts } from '../../data/posts';
import styles from './Footer.module.css';

const CATEGORIES = [
  { label: 'Notícias',        filter: 'Notícia' },
  { label: 'Cultura',         filter: 'Cultura' },
  { label: 'Idioma',          filter: 'Idioma' },
  { label: 'Curiosidades',    filter: 'Curiosidade' },
  { label: 'Saúde e Bem-Estar', filter: 'Saúde e Bem-Estar' },
  { label: 'Automotivo',      filter: 'Indústria Automotiva' },
  { label: 'Anime',           filter: 'Anime' },
];

export default function Footer() {
  const navigate = useNavigate();
  const recent = posts.slice(0, 6);

  function goFilter(filter) {
    navigate(`/?filter=${encodeURIComponent(filter)}`);
    setTimeout(() => {
      document.getElementById('grid-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            <img
              src="imagens/imagens layolt/logo-japaorelativo.PNG"
              alt="Japão Relativo"
              className={styles.logoImg}
            />
            <span className={styles.logoText}>Japão Relativo</span>
          </div>
          <p className={styles.desc}>
            Curadoria independente sobre o Japão — cultura, idioma, notícias e o
            cotidiano de quem vive neste país fascinante.
          </p>
        </div>

        <div className={styles.col}>
          <h4>Categorias</h4>
          <ul>
            {CATEGORIES.map(({ label, filter }) => (
              <li key={filter}>
                <button className={styles.colLink} onClick={() => goFilter(filter)}>
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Recentes</h4>
          <ul>
            {recent.map((post) => (
              <li key={post.id}>
                <button
                  className={styles.colLink}
                  onClick={() => navigate(`/artigo/${post.id}`)}
                >
                  {post.title.length > 50 ? post.title.slice(0, 50) + '…' : post.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <span className={styles.copy}>© 2026 Japão Relativo. Todos os direitos reservados.</span>
        <div className={styles.socials}>
          <a className={styles.socialLink} href="#" aria-label="Instagram">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
          </a>
          <a className={styles.socialLink} href="#" aria-label="YouTube">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
