import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DB } from '../../data/posts';
import FilmCarousel from '../../components/FilmCarousel/FilmCarousel';
import styles from './Article.module.css';

/**
 * Article — página de leitura do artigo.
 *
 * O conteúdo completo (post.content) só é carregado aqui,
 * NUNCA na Home. Isso mantém a Home limpa e sem vazamentos de estilo.
 *
 * O carousel do artigo "Ninguém Pode Saber" é convertido em um
 * componente React (<FilmCarousel>), totalmente isolado por CSS Modules.
 */
export default function Article() {
  const { id } = useParams();
  const navigate = useNavigate();
  const topRef = useRef(null);

  const post = DB[id];

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} — Japão Relativo`;
    topRef.current?.scrollIntoView();
    return () => { document.title = 'Japão Relativo — O Japão por Vários Ângulos'; };
  }, [id, post]);

  if (!post) {
    return (
      <div className={styles.notFound}>
        <p>Artigo não encontrado.</p>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          ← Voltar
        </button>
      </div>
    );
  }

  // Parse carousel slides from content if this article has a film-carousel
  const carouselSlides = parseCarouselSlides(post.content);
  // Strip the carousel HTML from the content (replaced by React component)
  const cleanContent = carouselSlides.length > 0 ? removeCarouselHtml(post.content) : post.content;

  // Split content at the carousel position marker
  const [beforeCarousel, afterCarousel] = splitAtCarouselMarker(post.content, carouselSlides.length > 0);

  return (
    <div className={styles.view} ref={topRef}>
      {/* Hero image */}
      <div className={styles.heroWrap}>
        <div
          className={styles.heroBg}
          style={{ backgroundImage: `url('${post.thumb}')` }}
        />
        <div className={styles.heroOverlay} />
      </div>

      {/* Article body */}
      <div className={styles.inner}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Voltar ao portal
        </button>

        <div className={styles.tag}>{post.tag}</div>
        <h1 className={styles.title}>{post.title}</h1>

        <div className={styles.meta}>
          <span>Por Japão Relativo</span>
          <span className={styles.sep}>|</span>
          <span>{post.date}</span>
        </div>

        {/* Content before carousel (or full content if no carousel) */}
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: beforeCarousel }}
        />

        {/* React FilmCarousel (estilo completamente isolado por CSS Module) */}
        {carouselSlides.length > 0 && (
          <FilmCarousel slides={carouselSlides} />
        )}

        {/* Content after carousel */}
        {afterCarousel && (
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: afterCarousel }}
          />
        )}
      </div>
    </div>
  );
}

/* ── Helpers ──────────────────────────────────────────────── */

function parseCarouselSlides(content) {
  const slides = [];
  const slideRegex = /<div class="fc-slide[^"]*">\s*<img src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>[\s\S]*?<p>([\s\S]*?)<\/p>/g;
  let match;
  while ((match = slideRegex.exec(content)) !== null) {
    slides.push({ src: match[1], alt: match[2], caption: match[3].trim() });
  }
  return slides;
}

function splitAtCarouselMarker(content, hasCarousel) {
  if (!hasCarousel) return [content, ''];
  const markerStart = content.indexOf('<div class="film-carousel"');
  const markerEnd = content.indexOf('</div>', content.lastIndexOf('fc-dots')) + 6;
  // Close the outer film-carousel div
  const outerEnd = content.indexOf('</div>', markerEnd) + 6;
  if (markerStart === -1) return [content, ''];
  return [content.slice(0, markerStart).trim(), content.slice(outerEnd).trim()];
}

function removeCarouselHtml(content) {
  return content.replace(/<div class="film-carousel"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');
}
