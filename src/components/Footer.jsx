import React from 'react';
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
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
    <footer className="footer-section">
      <div className="container">
        {/* Footer Top Links */}
        <ul className="footer-links">
          <li><a href="#inicio" className="footer-link" onClick={(e) => handleScroll(e, 'inicio')}>Inicio</a></li>
          <li><a href="#mates" className="footer-link" onClick={(e) => handleScroll(e, 'mates')}>Mates</a></li>
          <li><a href="#bombillas" className="footer-link" onClick={(e) => handleScroll(e, 'bombillas')}>Bombillas</a></li>
          <li><a href="#referencias" className="footer-link" onClick={(e) => handleScroll(e, 'referencias')}>Opiniones</a></li>
          <li><a href="#contacto" className="footer-link" onClick={(e) => handleScroll(e, 'contacto')}>Contacto</a></li>
        </ul>

        {/* Footer Brand info */}
        <div className="footer-logo">il nostro mates</div>
        
        {/* Footer Bottom copyright */}
        <p className="footer-bottom-text">
          © {new Date().getFullYear()} il nostro mates. Mates, Yerbas y Accesorios Premium. Córdoba, Argentina.
        </p>
        <p className="footer-bottom-text" style={{ fontSize: '11px', marginTop: '6px', color: 'var(--c-dark-grey)' }}>
          Hacemos envíos rápidos y seguros a todo el país.
        </p>
      </div>
    </footer>
  );
}
