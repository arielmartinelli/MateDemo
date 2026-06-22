import React, { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      // Offset slightly to account for sticky header height
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
    <header className="header-wrapper">
      <div className="container header-inner">
        {/* LOGO */}
        <a href="#inicio" className="logo-link" onClick={(e) => handleScroll(e, 'inicio')}>
          <span className="logo-title">il nostro mates</span>
        </a>

        {/* NAVIGATION DESKTOP */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            <li><a href="#mates" className="nav-link" onClick={(e) => handleScroll(e, 'mates')}>Mates</a></li>
            <li><a href="#bombillas" className="nav-link" onClick={(e) => handleScroll(e, 'bombillas')}>Bombillas</a></li>
            <li><a href="#yerbas" className="nav-link" onClick={(e) => handleScroll(e, 'yerbas')}>Yerba & Accesorios</a></li>
            <li><a href="#referencias" className="nav-link" onClick={(e) => handleScroll(e, 'referencias')}>Opiniones</a></li>
            <li><a href="#contacto" className="nav-link" onClick={(e) => handleScroll(e, 'contacto')}>Contacto</a></li>
          </ul>
        </nav>

        {/* ACTIONS */}
        <div className="header-actions">
          <a 
            href="https://wa.me/5493517877753?text=Hola!%20Me%20contacto%20desde%20su%20web%20para%20consultar%20por%20sus%20mates." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-contact-header desktop-only-btn"
          >
            <MessageCircle size={14} />
            Consultar
          </a>

          {/* Hamburger Menu Toggle (Mobile only) */}
          <button 
            type="button"
            className="mobile-menu-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menú de navegación"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION MENU DRAWER */}
      {isMenuOpen && (
        <div className="mobile-nav-drawer">
          <ul className="mobile-nav-links">
            <li><a href="#mates" className="mobile-nav-link" onClick={(e) => handleScroll(e, 'mates')}>Mates</a></li>
            <li><a href="#bombillas" className="mobile-nav-link" onClick={(e) => handleScroll(e, 'bombillas')}>Bombillas</a></li>
            <li><a href="#yerbas" className="mobile-nav-link" onClick={(e) => handleScroll(e, 'yerbas')}>Yerba & Accesorios</a></li>
            <li><a href="#referencias" className="mobile-nav-link" onClick={(e) => handleScroll(e, 'referencias')}>Opiniones</a></li>
            <li><a href="#contacto" className="mobile-nav-link" onClick={(e) => handleScroll(e, 'contacto')}>Contacto</a></li>
            <li style={{ marginTop: '10px', paddingTop: '15px', borderTop: '1px solid var(--c-border)' }}>
              <a 
                href="https://wa.me/5493517877753?text=Hola!%20Me%20contacto%20desde%20su%20web%20para%20consultar%20por%20sus%20mates." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-contact-header"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <MessageCircle size={14} />
                Consultar por WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
