import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './HeroCarousel.module.css';

/*
 * Paths com %20 para evitar quebra de URL no browser.
 * Espaços não-codificados em background-image url() causam
 * falha silenciosa de carregamento → slide preto.
 */
const SLIDES = [
  {
    src: '/imagens/imagens%20layolt/fuji.JPG',
    eyebrow: 'Destaque da Semana',
    title: 'Descubra o Japão por Vários Ângulos',
    sub: 'Cultura, idioma e cotidiano — o Japão filtrado pelo olhar de quem vive e respira esse mundo.',
  },
  {
    src: '/imagens/imagens%20layolt/sevenfuji.jpeg',
    eyebrow: 'Cultura & Natureza',
    title: 'O Monte Fuji e os Sete Lagos Sagrados',
    sub: 'Símbolo eterno do Japão, o Fujisan reúne espiritualidade, beleza e história em cada estação.',
  },
  {
    src: '/imagens/imagens%20layolt/IMG_2277.JPG',
    eyebrow: 'Cotidiano Japonês',
    title: 'Tradições que Atravessam Séculos',
    sub: 'Detalhes que só quem vive no Japão consegue perceber — e que valem a pena conhecer.',
  },
  {
    src: '/imagens/imagens%20layolt/IMG_2279.JPG',
    eyebrow: 'Especial',
    title: 'O Japão que Ninguém Mostra',
    sub: 'Histórias, análises e reportagens aprofundadas sobre o cotidiano japonês real.',
  },
  {
    src: '/imagens/imagens%20layolt/IMG_2280.JPG',
    eyebrow: 'Curadoria',
    title: 'Cultura Viva no Japão Contemporâneo',
    sub: 'Festivais, gastronomia, idioma — o Japão de hoje em toda a sua riqueza.',
  },
];

const INTERVAL_MS = 5000;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  /*
   * startInterval com useCallback de deps [] → função estável,
   * nunca recriada. O setInterval interno usa updater funcional
   * `prev => ...` para evitar stale closure no estado `current`.
   */
  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, INTERVAL_MS);
  }, []);

  /* Inicia UMA vez ao montar. Limpa ao desmontar. */
  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [startInterval]);

  /* Navega para um slide específico e reinicia o timer. */
  function goTo(idx) {
    const next = ((idx % SLIDES.length) + SLIDES.length) % SLIDES.length;
    setCurrent(next);
    startInterval();
  }

  const slide = SLIDES[current];

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => clearInterval(intervalRef.current)}
      onMouseLeave={startInterval}
    >
      {/* Slides — usa <img> com object-fit para carregamento confiável */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`${styles.slide} ${i === current ? styles.active : ''}`}
          aria-hidden={i !== current}
        >
          <img
            src={s.src}
            alt={s.title}
            className={styles.slideImg}
            draggable={false}
          />
        </div>
      ))}

      {/* Overlay degradê para legibilidade do texto */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Texto sobre o slide ativo */}
      <div className={styles.content}>
        <span className={styles.eyebrow}>{slide.eyebrow}</span>
        <h1 className={styles.title}>{slide.title}</h1>
        <p className={styles.sub}>{slide.sub}</p>
      </div>

      {/* Setas de navegação */}
      <button
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={() => goTo(current - 1)}
        aria-label="Slide anterior"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={() => goTo(current + 1)}
        aria-label="Próximo slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Indicadores de ponto */}
      <div className={styles.dots}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
