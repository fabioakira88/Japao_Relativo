import { useNavigate } from 'react-router-dom';
import styles from './ArticleCard.module.css';

/**
 * ArticleCard — card limpo estilo "Related Articles".
 *
 * Layout: IMAGEM no topo → TEXTO abaixo (tag, título, resumo, data).
 * O campo `content` (corpo completo) NUNCA é recebido aqui.
 *
 * Props:
 *   id, thumb, tag, title, excerpt, date
 *   featured — card destaque (largura maior na grid)
 */
export default function ArticleCard({ id, thumb, tag, title, excerpt, date, featured }) {
  const navigate = useNavigate();

  return (
    <article
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      onClick={() => navigate(`/artigo/${id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/artigo/${id}`)}
    >
      {/* Imagem — topo do card */}
      <div className={styles.imgWrap}>
        <img
          src={thumb}
          alt={title}
          className={styles.img}
          loading="lazy"
          onError={(e) => { e.currentTarget.style.background = '#f0ede8'; }}
        />
        <span className={styles.tagBadge}>{tag}</span>
      </div>

      {/* Texto — abaixo da imagem */}
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <div className={styles.footer}>
          <span className={styles.date}>{date}</span>
          <span className={styles.readMore}>
            Ler mais
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}
