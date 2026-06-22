import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Hero() {
  const handleScroll = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="inicio" className="hero-section">
      <div className="container hero-grid">
        {/* LEFT COLUMN: TEXT */}
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={10} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
            Desde Córdoba al País
          </div>
          <h1 className="hero-title">
            Mates criollos con
            <span>estilo propio.</span>
          </h1>
          <p className="hero-desc">
            En <strong>il nostro mates</strong> seleccionamos las mejores calabazas y maderas nobles para crear piezas únicas. Ofrecemos mates imperiales, camioneros, bombillas de alpaca y acero, yerbas orgánicas y accesorios de mate. Hacemos envíos rápidos a todo el país.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => handleScroll('mates')}>
              Ver Mates
            </button>
            <button className="btn-secondary" onClick={() => handleScroll('contacto')}>
              Escribinos
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: MATE ILLUSTRATION */}
        <div className="hero-visual">
          <div className="hero-image-wrap">
            <img 
              src="/images/mate_laser_engraved.png" 
              alt="il nostro mates - Mate Imperial" 
              className="hero-mate-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
