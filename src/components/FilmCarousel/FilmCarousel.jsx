import { useState } from 'react';
import styles from './FilmCarousel.module.css';

/**
 * FilmCarousel — galeria de slides usada dentro dos artigos.
 * Props:
 *   slides: Array<{ src, alt, caption }>
 */
export default function FilmCarousel({ slides }) {
  const [idx, setIdx] = useState(0);

  if (!slides || slides.length === 0) return null;

  function goTo(n) {
    setIdx((n + slides.length) % slides.length);
  }

  const { src, alt, caption } = slides[idx];

  return (
    <div className={styles.carousel}>
      <div className={styles.slides}>
        <img src={src} alt={alt} className={styles.img} />
        <div className={styles.caption}>
          <div className={styles.num}>
            {String(idx + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </div>
          <p>{caption}</p>
        </div>
      </div>

      <button className={`${styles.btn} ${styles.prev}`} onClick={() => goTo(idx - 1)} aria-label="Anterior">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button className={`${styles.btn} ${styles.next}`} onClick={() => goTo(idx + 1)} aria-label="Próximo">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === idx ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
