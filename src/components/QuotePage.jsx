import React, { useState } from 'react';
import { Sparkles, FileText, Upload, CheckCircle, ArrowRight, ShieldCheck, Mail, Phone } from 'lucide-react';
import { engravingFonts, engravingSymbols } from '../data/products';

export default function QuotePage({ onAddQuoteRequest, onNavigateHome }) {
  const [step, setStep] = useState(1); // 1: Config, 2: Form, 3: Success
  const [itemType, setItemType] = useState('mate'); 
  const [material, setMaterial] = useState('metal'); // 'metal' (Alpaca), 'acero' (Acero Inoxidable)
  const [bodyStyle, setBodyStyle] = useState('cuero'); // 'cuero', 'madera'
  const [engraveText, setEngraveText] = useState('');
  const [selectedFont, setSelectedFont] = useState(engravingFonts[0]);
  const [selectedSymbol, setSelectedSymbol] = useState(engravingSymbols[0]);
  const [customLogoBase64, setCustomLogoBase64] = useState(null); // client uploaded logo
  
  const [contactForm, setContactForm] = useState({
    name: '', email: '', phone: '', comments: ''
  });
  const [submittedQuote, setSubmittedQuote] = useState(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomLogoBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.phone) {
      alert('Por favor completa los campos de contacto obligatorios.');
      return;
    }

    const quoteCode = 'COT-' + Math.floor(1000 + Math.random() * 9000);
    const newRequest = {
      id: quoteCode,
      date: new Date().toLocaleDateString('es-AR'),
      customer: contactForm.name,
      email: contactForm.email,
      phone: contactForm.phone,
      itemType: itemType === 'mate' ? 'Mate Propio' : itemType.toUpperCase(),
      material: material.toUpperCase(),
      text: engraveText,
      font: selectedFont.name,
      symbol: customLogoBase64 ? 'Logo de cliente' : selectedSymbol.name,
      logoPreview: customLogoBase64,
      comments: contactForm.comments,
      status: 'Pendiente de Cotización'
    };

    onAddQuoteRequest(newRequest);
    setSubmittedQuote(newRequest);
    setStep(3);
  };

  return (
    <div style={{ flexGrow: 1 }}>
      {/* BREADCRUMB HEADER */}
      <div style={{ background: '#f2ece4', borderBottom: '1px solid var(--c-border)', padding: '20px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--c-text-muted)' }}>
              <span style={{ cursor: 'pointer', fontWeight: '600' }} onClick={onNavigateHome}>Inicio</span> / Cotizá tu Grabado
            </span>
            <h2 className="laser-engraved-title" style={{ fontSize: '24px', margin: '4px 0 0 0' }}>Servicio de Grabado Láser Personalizado</h2>
          </div>
          <button 
            type="button" 
            style={{ fontSize: '12px', fontWeight: '700', color: 'var(--c-leather-medium)' }}
            onClick={onNavigateHome}
          >
            ← Volver al Inicio
          </button>
        </div>
      </div>

      <section className="container" style={{ padding: '50px 24px 80px 24px' }}>
        
        {step < 3 && (
          <div style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
            <span style={{ fontSize: '11px', color: 'var(--c-gold)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '2px' }}>
              ¿Ya tenés tu termo o mate?
            </span>
            <h3 className="laser-engraved-title" style={{ fontSize: '28px', marginTop: '6px' }}>Cotizá el Grabado Láser de tu Pieza</h3>
            <p style={{ color: 'var(--c-text-muted)', fontSize: '13px', marginTop: '10px' }}>
              Traé o envianos tu termo, mate, bombilla o matera de cualquier material y grabale tu marca, escudo de fútbol, iniciales o frase de forma permanente con tecnología láser de precisión.
            </p>
          </div>
        )}

        {step === 1 && (
          /* STEP 1: CONFIGURATION */
          <div className="checkout-grid" style={{ gap: '40px' }}>
            {/* LEFT: SETTINGS */}
            <div>
              <h3 className="checkout-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} style={{ color: 'var(--c-gold)' }} />
                1. Especificaciones de tu Grabado
              </h3>

              <div className="admin-form-grid" style={{ gap: '20px' }}>
                <div>
                  <label className="control-label">Artículo a Personalizar</label>
                  <select 
                    className="font-selector-select"
                    value={itemType}
                    disabled
                  >
                    <option value="mate">Mate Propio (Grabado en Virola)</option>
                  </select>
                </div>

                <div>
                  <label className="control-label">Material de la Virola</label>
                  <select 
                    className="font-selector-select"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                  >
                    <option value="metal">Alpaca (Símil Plata)</option>
                    <option value="acero">Acero Inoxidable</option>
                  </select>
                </div>

                <div>
                  <label className="control-label">Estilo del Cuerpo de tu Mate</label>
                  <select 
                    className="font-selector-select"
                    value={bodyStyle}
                    onChange={(e) => setBodyStyle(e.target.value)}
                  >
                    <option value="cuero">Forrado en Cuero Negro/Marrón</option>
                    <option value="madera">Madera Noble (Algarrobo/Palo Santo)</option>
                  </select>
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label className="control-label">Texto o Frase a Grabar</label>
                  <input 
                    type="text" 
                    className="customizer-input"
                    value={engraveText}
                    onChange={(e) => setEngraveText(e.target.value.substring(0, 24))}
                    placeholder="Escribí aquí tu nombre, iniciales o frase corta..."
                  />
                </div>

                <div>
                  <label className="control-label">Tipo de Letra</label>
                  <select 
                    className="font-selector-select"
                    value={selectedFont.id}
                    onChange={(e) => {
                      const f = engravingFonts.find(x => x.id === e.target.value);
                      if (f) setSelectedFont(f);
                    }}
                  >
                    {engravingFonts.map((font) => (
                      <option key={font.id} value={font.id}>{font.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="control-label">Símbolo Tradicional (Opcional)</label>
                  <select 
                    className="font-selector-select"
                    value={selectedSymbol.id}
                    onChange={(e) => {
                      const s = engravingSymbols.find(x => x.id === e.target.value);
                      if (s) setSelectedSymbol(s);
                    }}
                    disabled={!!customLogoBase64}
                  >
                    {engravingSymbols.map((sym) => (
                      <option key={sym.id} value={sym.id}>{sym.name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px dashed var(--c-border)', paddingTop: '15px' }}>
                  <label className="control-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <Upload size={14} />
                    Subir tu propio Logotipo o Escudo (JPG / PNG)
                  </label>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="customizer-input"
                    onChange={handleLogoUpload}
                    style={{ padding: '8px 12px' }}
                  />
                  {customLogoBase64 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--c-mate-green)', fontWeight: 'bold' }}>✓ Logo subido con éxito. Se proyectará en el simulador.</span>
                      <button 
                        type="button" 
                        style={{ fontSize: '11px', color: '#c0392b', fontWeight: 'bold' }} 
                        onClick={() => setCustomLogoBase64(null)}
                      >
                        [Remover]
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ marginTop: '35px', display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  type="button" 
                  className="btn-primary" 
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                  onClick={() => setStep(2)}
                >
                  Continuar al paso 2
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* RIGHT: LIVE SIMULATOR FOR CUSTOM ITEMS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--c-leather-medium)' }}>
                Vista Previa de Simulación
              </h4>
              <div 
                className="customizer-preview-box" 
                style={{ 
                  borderRadius: '12px', 
                  height: '350px',
                  background: '#f5efe6',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative'
                }}
              >
                <svg viewBox="0 0 300 300" width="240" height="240" style={{ filter: 'drop-shadow(0 12px 25px rgba(31,15,8,0.2))' }}>
                  <defs>
                    {/* Alpaca metal gradient */}
                    <linearGradient id="quoteAlpacaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e0dcd3" />
                      <stop offset="20%" stopColor="#f5f2eb" />
                      <stop offset="40%" stopColor="#cfcbbd" />
                      <stop offset="60%" stopColor="#f5f2eb" />
                      <stop offset="80%" stopColor="#bfae9b" />
                      <stop offset="100%" stopColor="#9e8f7d" />
                    </linearGradient>

                    {/* Stainless steel gradient */}
                    <linearGradient id="quoteSteelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#90a4ae" />
                      <stop offset="25%" stopColor="#cfd8dc" />
                      <stop offset="50%" stopColor="#ffffff" />
                      <stop offset="75%" stopColor="#b0bec5" />
                      <stop offset="100%" stopColor="#78909c" />
                    </linearGradient>

                    {/* Text paths */}
                    <path id="quoteTopTextPath" d="M 45,150 A 105,105 0 0,1 255,150" fill="none" />
                    <path id="quoteBottomTextPath" d="M 255,150 A 105,105 0 0,1 45,150" fill="none" />
                  </defs>

                  {/* MATE OUTER BODY EDGE */}
                  <circle cx="150" cy="150" r="140" fill={bodyStyle === 'madera' ? '#4a2711' : '#1f0f08'} />

                  {/* VIROLA METAL RING */}
                  <circle cx="150" cy="150" r="130" fill={material === 'acero' ? 'url(#quoteSteelGrad)' : 'url(#quoteAlpacaGrad)'} stroke="#4e2e1a" strokeWidth="1.5" />
                  
                  {/* Inner ring bezel detailing */}
                  <circle cx="150" cy="150" r="128" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.35" />
                  <circle cx="150" cy="150" r="82" fill="none" stroke="#000" strokeWidth="1" opacity="0.25" />

                  {/* VIROLA CENTER HOLE */}
                  <circle cx="150" cy="150" r="80" fill="#1b120c" stroke="#3e2723" strokeWidth="3" />
                  
                  {/* YERBA MATE DETAILED TEXTURE */}
                  <circle cx="150" cy="150" r="77" fill="#2d521d" />
                  <circle cx="150" cy="150" r="77" fill="none" stroke="#25160F" strokeWidth="1" opacity="0.3" />
                  <circle cx="130" cy="140" r="3" fill="#1e3814" opacity="0.6" />
                  <circle cx="170" cy="130" r="4" fill="#527d41" opacity="0.8" />
                  <circle cx="145" cy="165" r="3" fill="#6a9955" opacity="0.7" />
                  <circle cx="160" cy="150" r="5" fill="#3b632c" opacity="0.9" />
                  <circle cx="125" cy="155" r="4" fill="#436b34" opacity="0.8" />
                  <path d="M125 135 Q135 145 145 135" fill="none" stroke="#527d41" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                  <path d="M155 160 Q160 170 170 160" fill="none" stroke="#1e3814" strokeWidth="2" opacity="0.7" />

                  {/* ENGRAVING - TOP TEXT */}
                  <text 
                    fill="#120703" 
                    opacity="0.9" 
                    style={{ 
                      fontFamily: selectedFont.fontFamily,
                      fontStyle: selectedFont.style?.fontStyle || 'normal',
                      fontWeight: selectedFont.style?.fontWeight || 'bold',
                      fontSize: engraveText.length > 15 ? '11px' : engraveText.length > 10 ? '13px' : '15px',
                      letterSpacing: '1px'
                    }}
                  >
                    <textPath href="#quoteTopTextPath" startOffset="50%" textAnchor="middle">
                      {engraveText ? engraveText.toUpperCase() : 'TU TEXTO CRIOLLO'}
                    </textPath>
                  </text>

                  {/* ENGRAVING - BOTTOM SYMBOL OR LOGO */}
                  {customLogoBase64 ? (
                    <image 
                      href={customLogoBase64} 
                      x="132" 
                      y="233" 
                      width="36" 
                      height="36" 
                      style={{ 
                        filter: 'grayscale(100%) contrast(160%) brightness(30%)', 
                        opacity: 0.85 
                      }} 
                    />
                  ) : (
                    <text x="150" y="260" fontSize="26" textAnchor="middle" fill="#120703" opacity="0.9">
                      {selectedSymbol.icon}
                    </text>
                  )}
                </svg>

                <span className="engraving-area-tag" style={{ position: 'absolute', bottom: '15px', background: 'rgba(31,15,8,0.7)', color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }}>
                  VIROLA ({material === 'acero' ? 'ACERO' : 'ALPACA'})
                </span>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--c-text-muted)', textAlign: 'center' }}>
                La visualización es aproximada. El tono final del grabado depende de la aleación y el pulido de la virola de alpaca o acero.
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          /* STEP 2: CONTACT FORM */
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h3 className="checkout-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} style={{ color: 'var(--c-gold)' }} />
              2. Datos del Solicitante
            </h3>
            
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="full-width">
                <label className="control-label">Nombre y Apellido *</label>
                <input 
                  type="text" 
                  name="name" 
                  className="customizer-input" 
                  value={contactForm.name} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Ej: Martín Fierro"
                />
              </div>

              <div>
                <label className="control-label">Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  className="customizer-input" 
                  value={contactForm.email} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="correo@ejemplo.com"
                />
              </div>

              <div>
                <label className="control-label">Teléfono de Contacto (WhatsApp) *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  className="customizer-input" 
                  value={contactForm.phone} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Ej: 351 787 7753"
                />
              </div>

              <div className="full-width">
                <label className="control-label">Comentarios o Detalles Especiales</label>
                <textarea 
                  name="comments" 
                  className="customizer-input" 
                  style={{ height: '100px', resize: 'none' }}
                  value={contactForm.comments} 
                  onChange={handleInputChange}
                  placeholder="Contanos más detalles sobre tu pieza y cómo te gustaría ubicar el diseño..."
                />
              </div>

              <div className="full-width" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  style={{ color: 'var(--c-text-dark)', borderColor: 'var(--c-border)', padding: '12px 24px', fontSize: '12px' }}
                  onClick={() => setStep(1)}
                >
                  Volver al paso 1
                </button>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ padding: '12px 30px', fontSize: '12px' }}
                >
                  Enviar Solicitud de Cotización
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && submittedQuote && (
          /* STEP 3: SUCCESS SCREEN */
          <div className="checkout-success-view">
            <div className="success-icon-wrap">
              <CheckCircle size={44} />
            </div>
            <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>¡Solicitud Enviada con Éxito!</h2>
            <p style={{ color: 'var(--c-text-muted)', marginBottom: '24px' }}>
              Tu solicitud de cotización <strong>#{submittedQuote.id}</strong> ha sido registrada en el sistema.
            </p>

            <div 
              style={{ 
                background: '#fcfaf6', 
                border: '1px solid var(--c-border)', 
                borderRadius: '8px', 
                padding: '20px', 
                textAlign: 'left',
                maxWidth: '500px',
                margin: '0 auto 24px auto',
                fontSize: '13px'
              }}
            >
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', textTransform: 'uppercase', color: 'var(--c-gold)', marginBottom: '10px' }}>
                Detalles del Pedido de Cotización
              </h4>
              <p style={{ marginBottom: '6px' }}><strong>Cliente:</strong> {submittedQuote.customer}</p>
              <p style={{ marginBottom: '6px' }}><strong>Artículo:</strong> {submittedQuote.itemType} ({submittedQuote.material})</p>
              <p style={{ marginBottom: '6px' }}><strong>Grabado solicitado:</strong> Frase: "{submittedQuote.text}" | Fuente: {submittedQuote.font} | Símbolo: {submittedQuote.symbol}</p>
              <p style={{ marginBottom: '6px' }}><strong>WhatsApp:</strong> {submittedQuote.phone}</p>
              {submittedQuote.comments && <p style={{ margin: 0 }}><strong>Comentarios:</strong> {submittedQuote.comments}</p>}
            </div>

            <div 
              style={{ 
                background: '#fef9f3', 
                border: '1px solid var(--c-gold)', 
                borderRadius: '8px', 
                padding: '20px', 
                maxWidth: '500px', 
                margin: '0 auto 24px auto', 
                fontSize: '13px', 
                textAlign: 'left' 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--c-leather-medium)', marginBottom: '10px', fontWeight: 'bold' }}>
                <ShieldCheck size={18} />
                <span>¿Cómo seguimos?</span>
              </div>
              <p style={{ marginBottom: '10px' }}>
                Nuestros artesanos van a analizar la forma y material de tu artículo. En las próximas **2 horas** nos vamos a contactar a tu WhatsApp <strong>{submittedQuote.phone}</strong> para pasarte el presupuesto final y coordinar el envío de tu pieza.
              </p>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--c-text-muted)' }}>
                * Hacemos grabados en el acto si traés tu mate a nuestro taller en San Antonio de Areco.
              </p>
            </div>

            <button 
              className="btn-primary" 
              onClick={onNavigateHome}
              style={{ width: '200px' }}
            >
              Volver al Inicio
            </button>
          </div>
        )}

      </section>
    </div>
  );
}
