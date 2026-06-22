import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { Star, Truck, MapPin, Sparkles, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Lists of products for display
  const mates = [
    {
      id: 'mate-imperial',
      name: 'Mate Imperial Premium',
      category: 'mates',
      price: 48500,
      description: 'Calabaza seleccionada de paredes gruesas, forrado en cuero vacuno legítimo con costura artesanal uruguaya y virola de alpaca cincelada.',
      details: 'Virola de alpaca maciza cincelada | Cuero vacuno de exportación | 4 patas firmes reforzadas',
      image: '/images/mate_imperial.png'
    },
    {
      id: 'mate-camionero',
      name: 'Mate Camionero Seleccionado',
      category: 'mates',
      price: 38900,
      description: 'El clásico matero de boca ancha para cebadas perfectas. Forrado en cuero vaqueta premium y virola de acero inoxidable pulido espejo.',
      details: 'Virola de acero inoxidable | Cuero de vaqueta grueso | Base robusta plana',
      image: '/images/mate_camionero.png'
    },
    {
      id: 'mate-algarrobo',
      name: 'Mate de Algarrobo Criollo',
      category: 'mates',
      price: 19500,
      description: 'Tallado artesanalmente en madera de algarrobo macizo seleccionado. Estacionado y pulido a mano con cera de abejas natural.',
      details: 'Madera de algarrobo chaqueño | Pulido artesanal con cera | Sabor dulce característico',
      image: '/images/mate_madera.png'
    }
  ];

  const bombillas = [
    {
      id: 'bombilla-loro-alpaca',
      name: 'Bombilla Pico de Loro de Alpaca',
      category: 'bombillas',
      price: 18500,
      description: 'Bombilla curva de alta calidad fabricada en alpaca maciza. Boquilla anatómica muy cómoda y filtro de pala desmontable a rosca para fácil limpieza.',
      details: 'Alpaca de alta gama | Filtro desarmable a rosca | Incluye cepillo limpiador',
      image: '/images/bombilla_alpaca.png'
    },
    {
      id: 'bombilla-plana-acero',
      name: 'Bombilla Plana de Acero',
      category: 'bombillas',
      price: 11000,
      description: 'Fabricada íntegramente en acero inoxidable quirúrgico. Higiénica, boquilla chata y filtro tipo cuchara con excelente drenaje de yerbas.',
      details: 'Acero inoxidable quirúrgico | Boquilla ancha y chata | Filtro fijo ranurado de gran caudal',
      image: '/images/bombilla_alpaca.png'
    }
  ];

  const yerbaYAccesorios = [
    {
      id: 'yerba-organica',
      name: 'Yerba Mate Orgánica il nostro',
      category: 'yerbas',
      price: 3500,
      description: 'Yerba mate de cultivo orgánico certificado con estacionamiento natural de 24 meses. Blend suave y equilibrado con bajo contenido de polvo.',
      details: '100% Orgánica Certificada | Estacionamiento natural de 24 meses | Contenido neto: 500g',
      image: '/images/yerba_mate_packaging.png'
    },
    {
      id: 'matera-mochila',
      name: 'Mochila Matera Cuero Rígido',
      category: 'accesorios',
      price: 54000,
      description: 'Mochila de cuero vacuno engrasado semi-rígido. Compartimento especial para termos de hasta 1.3L y separadores para yerbera y mate.',
      details: 'Cuero legítimo engrasado | Separadores internos protectores | Herrajes de bronce viejo',
      image: '/images/matera_cuero.png'
    }
  ];

  const testimonials = [
    {
      name: 'Juan Manuel de Rosas',
      city: 'Rosario, Santa Fe',
      text: 'Excelente calidad del mate imperial, llegó súper rápido y la virola cincelada es una obra de arte. Muy buena atención por WhatsApp.',
      stars: 5,
      avatar: 'JR'
    },
    {
      name: 'Valentina Rodríguez',
      city: 'Ciudad de Córdoba',
      text: 'La bombilla de alpaca es hermosa y tiene un flujo espectacular. Fui a retirar el mate por su punto de entrega, súper amables.',
      stars: 5,
      avatar: 'VR'
    },
    {
      name: 'Tomás Bermúdez',
      city: 'CABA',
      text: 'Compré la yerba orgánica y el mate camionero. Espectacular el sabor de la yerba y la calidad del cuero. Envío al toque por Correo Argentino.',
      stars: 5,
      avatar: 'TB'
    },
    {
      name: 'Sofía Giménez',
      city: 'Mendoza',
      text: 'Me ayudaron a elegir el tamaño del mate enviándome fotos por WhatsApp. La experiencia de compra fue impecable, 100% recomendados.',
      stars: 5,
      avatar: 'SG'
    }
  ];

  const formatWhatsAppLink = (productName) => {
    const baseText = `Hola! Vi en su web el ${productName} y me gustaría realizar una consulta sobre disponibilidad y formas de envío.`;
    return `https://wa.me/5493517877753?text=${encodeURIComponent(baseText)}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* HEADER */}
      <Header />

      <main style={{ flexGrow: 1 }}>
        {/* HERO */}
        <Hero />

        {/* BENEFITS BAR */}
        <section className="benefits-bar">
          <div className="container benefits-grid">
            <div className="benefit-item">
              <MapPin className="benefit-icon" size={20} />
              <h4 className="benefit-title">Desde Córdoba</h4>
              <p className="benefit-desc">Elaborados con dedicación local</p>
            </div>
            <div className="benefit-item">
              <Truck className="benefit-icon" size={20} />
              <h4 className="benefit-title">Envíos a todo el País</h4>
              <p className="benefit-desc">Por Correo Argentino y Andreani</p>
            </div>
            <div className="benefit-item">
              <Sparkles className="benefit-icon" size={20} />
              <h4 className="benefit-title">Mates, Yerbas y Accesorios</h4>
              <p className="benefit-desc">Calidad garantizada en cada producto</p>
            </div>
          </div>
        </section>

        {/* MATES SHOWCASE */}
        <section id="mates" className="showcase-section">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Nuestra Selección</span>
              <h2 className="section-title">Tipos de Mates</h2>
              <p>Mates seleccionados a mano por artesanos locales, forrados en cueros legítimos y tallados en maderas nobles.</p>
            </div>

            <div className="products-grid">
              {mates.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-img-wrap">
                    <img src={product.image} alt={product.name} className="product-img" />
                  </div>
                  <div className="product-info">
                    <div className="product-meta">
                      <span className="product-tag">Calabaza & Cuero / Madera</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                        <Star size={12} fill="var(--c-text-dark)" stroke="var(--c-text-dark)" />
                        <strong>4.9</strong>
                      </div>
                    </div>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-desc">{product.description}</p>
                    <p style={{ fontSize: '11px', color: 'var(--c-dark-grey)', marginBottom: '16px', borderLeft: '2px solid var(--c-border)', paddingLeft: '8px' }}>
                      {product.details}
                    </p>
                    <div className="product-action-row">
                      <span className="product-price">${product.price.toLocaleString('es-AR')}</span>
                      <a 
                        href={formatWhatsAppLink(product.name)} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-whatsapp-consult"
                      >
                        <MessageCircle size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                        Consultar
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOMBILLAS SHOWCASE */}
        <section id="bombillas" className="showcase-section alternate">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Complemento Esencial</span>
              <h2 className="section-title">Tipos de Bombillas</h2>
              <p>Bombillas de alpaca maciza y acero inoxidable diseñadas para ofrecer un filtrado perfecto y gran durabilidad.</p>
            </div>

            <div className="products-grid">
              {bombillas.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-img-wrap">
                    <img src={product.image} alt={product.name} className="product-img" />
                  </div>
                  <div className="product-info">
                    <div className="product-meta">
                      <span className="product-tag">Metales Finos</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                        <Star size={12} fill="var(--c-text-dark)" stroke="var(--c-text-dark)" />
                        <strong>4.8</strong>
                      </div>
                    </div>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-desc">{product.description}</p>
                    <p style={{ fontSize: '11px', color: 'var(--c-dark-grey)', marginBottom: '16px', borderLeft: '2px solid var(--c-border)', paddingLeft: '8px' }}>
                      {product.details}
                    </p>
                    <div className="product-action-row">
                      <span className="product-price">${product.price.toLocaleString('es-AR')}</span>
                      <a 
                        href={formatWhatsAppLink(product.name)} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-whatsapp-consult"
                      >
                        <MessageCircle size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                        Consultar
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* YERBA & ACCESORIOS */}
        <section id="yerbas" className="showcase-section">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Completá el Ritual</span>
              <h2 className="section-title">Yerba & Accesorios</h2>
              <p>Yerba mate de cultivo orgánico natural y accesorios materos de cuero vaqueta seleccionados.</p>
            </div>

            <div className="products-grid">
              {yerbaYAccesorios.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-img-wrap">
                    <img src={product.image} alt={product.name} className="product-img" />
                  </div>
                  <div className="product-info">
                    <div className="product-meta">
                      <span className="product-tag">{product.category === 'yerbas' ? 'Yerba Orgánica' : 'Cuero Rígido'}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                        <Star size={12} fill="var(--c-text-dark)" stroke="var(--c-text-dark)" />
                        <strong>4.9</strong>
                      </div>
                    </div>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-desc">{product.description}</p>
                    <p style={{ fontSize: '11px', color: 'var(--c-dark-grey)', marginBottom: '16px', borderLeft: '2px solid var(--c-border)', paddingLeft: '8px' }}>
                      {product.details}
                    </p>
                    <div className="product-action-row">
                      <span className="product-price">${product.price.toLocaleString('es-AR')}</span>
                      <a 
                        href={formatWhatsAppLink(product.name)} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-whatsapp-consult"
                      >
                        <MessageCircle size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                        Consultar
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS / REFERENCIAS */}
        <section id="referencias" className="references-section">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Opiniones de la Comunidad</span>
              <h2 className="section-title">Referencias de Clientes</h2>
              <p>Conocé la opinión de quienes nos eligen todos los días para acompañar sus cebadas.</p>
            </div>

            {/* DESKTOP VIEW: FULL GRID */}
            <div className="testimonials-grid desktop-only">
              {testimonials.map((t, idx) => (
                <div key={idx} className="testimonial-card">
                  <div>
                    <div className="stars-row">
                      {[...Array(t.stars)].map((_, i) => (
                        <Star key={i} size={14} fill="var(--c-text-dark)" stroke="var(--c-text-dark)" />
                      ))}
                    </div>
                    <p className="testimonial-text">"{t.text}"</p>
                  </div>
                  <div className="testimonial-author">
                    <div className="author-avatar">{t.avatar}</div>
                    <div className="author-info">
                      <span className="author-name">{t.name}</span>
                      <span className="author-city">{t.city}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* MOBILE VIEW: CAROUSEL WITH ARROWS */}
            <div className="testimonials-carousel-mobile mobile-only">
              <div className="testimonial-carousel-container">
                <div className="testimonial-card">
                  <div>
                    <div className="stars-row">
                      {[...Array(testimonials[activeTestimonial].stars)].map((_, i) => (
                        <Star key={i} size={14} fill="var(--c-text-dark)" stroke="var(--c-text-dark)" />
                      ))}
                    </div>
                    <p className="testimonial-text" style={{ minHeight: '80px' }}>"{testimonials[activeTestimonial].text}"</p>
                  </div>
                  <div className="testimonial-author">
                    <div className="author-avatar">{testimonials[activeTestimonial].avatar}</div>
                    <div className="author-info">
                      <span className="author-name">{testimonials[activeTestimonial].name}</span>
                      <span className="author-city">{testimonials[activeTestimonial].city}</span>
                    </div>
                  </div>
                </div>
                
                {/* Carousel Controls */}
                <div className="carousel-controls">
                  <button 
                    onClick={handlePrevTestimonial} 
                    className="carousel-arrow-btn" 
                    aria-label="Testimonio anterior"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <div className="carousel-indicators">
                    {testimonials.map((_, i) => (
                      <span 
                        key={i} 
                        className={`indicator-dot ${activeTestimonial === i ? 'active' : ''}`}
                        onClick={() => setActiveTestimonial(i)}
                      />
                    ))}
                  </div>
                  
                  <button 
                    onClick={handleNextTestimonial} 
                    className="carousel-arrow-btn" 
                    aria-label="Siguiente testimonio"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contacto" className="contact-section">
          <div className="container contact-grid">
            {/* Info block */}
            <div className="contact-info-block">
              <h3>il nostro mates</h3>
              <p>
                Somos un emprendimiento de la provincia de Córdoba. Hacemos envíos rápidos y seguros de mates, yerbas artesanales y accesorios a toda la Argentina. Cada pieza es seleccionada y controlada individualmente para garantizar que recibas la mejor calidad del mercado.
              </p>
              
              <div className="contact-details">
                <div className="detail-row">
                  <div className="detail-icon-wrap"><MapPin size={18} /></div>
                  <div className="detail-content">
                    <h4>Ubicación</h4>
                    <p>Córdoba, Argentina. Hacemos envíos a todo el país.</p>
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-icon-wrap"><Truck size={18} /></div>
                  <div className="detail-content">
                    <h4>Métodos de Envío</h4>
                    <p>Envíos por Correo Argentino, Andreani y despachos rápidos coordinados.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions block */}
            <div className="contact-actions-block">
              <h4>¿Querés realizar un pedido?</h4>
              <p>Contactanos de forma directa para consultar stock, talles, o coordinar compras personalizadas en el acto.</p>
              <div className="contact-buttons-stack">
                <a 
                  href="https://wa.me/5493517877753?text=Hola!%20Me%20contacto%20desde%20su%20web%20para%20realizar%20una%20consulta%20por%20mates%20y%20accesorios." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-whatsapp-large"
                >
                  <MessageCircle size={18} />
                  Contactar por WhatsApp
                </a>
                <a 
                  href="https://instagram.com/ilnostromates" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-instagram-large"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  Seguinos en Instagram
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
