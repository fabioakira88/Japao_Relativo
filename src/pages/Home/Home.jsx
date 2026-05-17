import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { posts, getExcerpt } from '../../data/posts';
import HeroCarousel from '../../components/HeroCarousel/HeroCarousel';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import styles from './Home.module.css';

const CATEGORIES = [
  { label: 'Todos',        value: 'all' },
  { label: 'Notícias',     value: 'Notícia' },
  { label: 'Cultura',      value: 'Cultura' },
  { label: 'Idioma',       value: 'Idioma' },
  { label: 'Curiosidades', value: 'Curiosidade' },
  { label: 'Saúde',        value: 'Saúde e Bem-Estar' },
  { label: 'Auto',         value: 'Indústria Automotiva' },
  { label: 'Anime',        value: 'Anime' },
];

const PAGE_SIZE = 9;

export default function Home() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const urlFilter = searchParams.get('filter') || 'all';

  const [filter, setFilter] = useState(urlFilter);
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    setFilter(urlFilter);
    setVisible(PAGE_SIZE);
    if (urlFilter !== 'all') {
      setTimeout(() => {
        document.getElementById('materias')?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    }
  }, [urlFilter]);

  const filtered =
    filter === 'all'
      ? posts
      : posts.filter((p) => p.tag === filter || p.tag.includes(filter));

  const shown = filtered.slice(0, visible);

  function changeFilter(val) {
    setFilter(val);
    setVisible(PAGE_SIZE);
    navigate(val === 'all' ? '/' : `/?filter=${encodeURIComponent(val)}`, { replace: true });
  }

  return (
    <div className={styles.page}>

      {/* ── CARROSSEL ──────────────────────────────────────── */}
      <HeroCarousel />

      {/* ── GRADE DE MATÉRIAS ───────────────────────────────── */}
      <section className={styles.section} id="materias">
        <div className={styles.sectionHead}>
          <div className={styles.headLeft}>
            <span className={styles.sectionEye}>PUBLICAÇÕES RECENTES</span>
            <h2 className={styles.sectionTitle}>Últimas Matérias</h2>
          </div>
          <p className={styles.sectionSub}>
            Curadoria independente sobre cultura, idioma e cotidiano japonês.
          </p>
        </div>

        {/* Filtros */}
        <div className={styles.filters}>
          {CATEGORIES.map(({ label, value }) => (
            <button
              key={value}
              className={`${styles.filterBtn} ${filter === value ? styles.filterActive : ''}`}
              onClick={() => changeFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid 3 colunas */}
        {shown.length > 0 ? (
          <div className={styles.grid}>
            {shown.map((post, i) => (
              <ArticleCard
                key={post.id}
                id={post.id}
                thumb={post.thumb}
                tag={post.tag}
                title={post.title}
                excerpt={getExcerpt(post.content)}
                date={post.date}
                featured={i === 0 && filter === 'all'}
              />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            Nenhuma matéria encontrada nesta categoria.
          </div>
        )}

        {/* Carregar mais */}
        {visible < filtered.length && (
          <div className={styles.loadMore}>
            <button className={styles.btnLoad} onClick={() => setVisible((v) => v + 6)}>
              Ver mais matérias
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </button>
          </div>
        )}
      </section>

      {/* ── BANNER SOBRE ─────────────────────────────────────── */}
      <section className={styles.about} id="sobre">
        <div className={styles.aboutInner}>
          <span className={styles.sectionEye}>SOBRE O PROJETO</span>
          <h2 className={styles.aboutTitle}>O Japão por Vários Ângulos</h2>
          <p className={styles.aboutDesc}>
            O Japão Relativo é uma curadoria independente sobre a cultura, o idioma e o cotidiano
            japonês. Não somos um guia turístico — somos o olhar de quem vive e respira esse país,
            todos os dias.
          </p>
        </div>
      </section>

    </div>
  );
}
