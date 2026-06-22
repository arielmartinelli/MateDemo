import React, { useState, useEffect } from 'react';
import { Type, Sparkles, AlertCircle } from 'lucide-react';
import { engravingSymbols, engravingFonts } from '../data/products';

export default function EngravingCustomizer({ product, onChange }) {
  const [text, setText] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState(engravingSymbols[0]);
  const [selectedFont, setSelectedFont] = useState(engravingFonts[0]);
  const isVirola = product.engravingArea === 'virola';

  useEffect(() => {
    // Notify parent of updates
    onChange({
      text,
      symbol: selectedSymbol,
      font: selectedFont,
      cost: 4500 // Flat rate in ARS for custom engraving
    });
  }, [text, selectedSymbol, selectedFont]);

  const handleTextChange = (e) => {
    const val = e.target.value.substring(0, 20); // 20 chars max for spacing
    setText(val);
  };

  return (
    <div className="customizer-container">
      {/* PREVIEW CONTAINER */}
      <div className="customizer-preview-box" style={{ background: '#f5efe6', padding: '15px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '270px', position: 'relative' }}>
        <svg viewBox="0 0 300 300" width="220" height="220" style={{ filter: 'drop-shadow(0 10px 20px rgba(31,15,8,0.25))' }}>
          <defs>
            {/* Alpaca metal gradient (warmer, slightly golden-silver) */}
            <linearGradient id="alpacaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0dcd3" />
              <stop offset="20%" stopColor="#f5f2eb" />
              <stop offset="40%" stopColor="#cfcbbd" />
              <stop offset="60%" stopColor="#f5f2eb" />
              <stop offset="80%" stopColor="#bfae9b" />
              <stop offset="100%" stopColor="#9e8f7d" />
            </linearGradient>

            {/* Stainless steel gradient (cooler, cleaner metallic grey) */}
            <linearGradient id="steelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#90a4ae" />
              <stop offset="25%" stopColor="#cfd8dc" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="75%" stopColor="#b0bec5" />
              <stop offset="100%" stopColor="#78909c" />
            </linearGradient>

            {/* Text path: curved along top half of the virola ring */}
            <path id="topTextPath" d="M 45,150 A 105,105 0 0,1 255,150" fill="none" />
            
            {/* Text path: curved along bottom half of the virola ring */}
            <path id="bottomTextPath" d="M 255,150 A 105,105 0 0,1 45,150" fill="none" />
          </defs>

          {/* MATE OUTER BODY EDGE (background leather/wood circle showing behind virola) */}
          <circle cx="150" cy="150" r="140" fill={product?.id?.includes('madera') ? '#4a2711' : '#1f0f08'} />

          {/* VIROLA METAL RING */}
          <circle cx="150" cy="150" r="130" fill={isVirola && !product?.features?.virola?.toLowerCase()?.includes('acero') ? 'url(#alpacaGrad)' : 'url(#steelGrad)'} stroke="#4e2e1a" strokeWidth="1.5" />
          
          {/* Inner ring bezel detailing */}
          <circle cx="150" cy="150" r="128" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.35" />
          <circle cx="150" cy="150" r="82" fill="none" stroke="#000" strokeWidth="1" opacity="0.25" />

          {/* VIROLA CENTER HOLE (hollow inside of the mate mouth) */}
          <circle cx="150" cy="150" r="80" fill="#1b120c" stroke="#3e2723" strokeWidth="3" />
          
          {/* YERBA MATE DETAILED TEXTURE INSIDE THE HOLE */}
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
              fontSize: text.length > 15 ? '11px' : text.length > 10 ? '13px' : '15px',
              letterSpacing: '1px'
            }}
          >
            <textPath href="#topTextPath" startOffset="50%" textAnchor="middle">
              {text ? text.toUpperCase() : 'PERSONALIZÁ TU MATE'}
            </textPath>
          </text>

          {/* ENGRAVING - BOTTOM SYMBOL */}
          <text x="150" y="260" fontSize="26" textAnchor="middle" fill="#120703" opacity="0.9">
            {selectedSymbol.icon}
          </text>
        </svg>

        <span className="engraving-area-tag" style={{ position: 'absolute', bottom: '15px', background: 'rgba(31,15,8,0.7)', color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }}>
          Virola ({isVirola && !product?.features?.virola?.toLowerCase()?.includes('acero') ? 'Alpaca' : 'Acero'})
        </span>
      </div>

      {/* CONTROLS CONTAINER */}
      <div className="customizer-controls">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={16} style={{ color: '#c5a059' }} />
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase' }}>
            Simulador de Grabado
          </h4>
        </div>

        {/* TEXT INPUT */}
        <div className="control-group">
          <label className="control-label">Texto a grabar (máx. 20 car.)</label>
          <input 
            type="text" 
            className="customizer-input"
            value={text}
            onChange={handleTextChange}
            placeholder="Ej: Ariel - Legado"
          />
        </div>

        {/* SYMBOL SELECTIONS */}
        <div className="control-group">
          <label className="control-label">Elegir Símbolo Tradicional</label>
          <div className="symbol-grid">
            {engravingSymbols.map((sym) => (
              <button
                key={sym.id}
                type="button"
                className={`symbol-btn ${selectedSymbol.id === sym.id ? 'active' : ''}`}
                onClick={() => setSelectedSymbol(sym)}
                title={sym.name}
              >
                {sym.icon}
              </button>
            ))}
          </div>
        </div>

        {/* FONT SELECTIONS */}
        <div className="control-group">
          <label className="control-label">Elegir Estilo de Letra</label>
          <select 
            className="font-selector-select"
            value={selectedFont.id}
            onChange={(e) => {
              const font = engravingFonts.find(f => f.id === e.target.value);
              if (font) setSelectedFont(font);
            }}
          >
            {engravingFonts.map((font) => (
              <option key={font.id} value={font.id}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        {/* FEES AND INFO */}
        <div className="customizer-price-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AlertCircle size={12} />
            <span>Adicional por Personalizado</span>
          </div>
          <strong>+$4.500 ARS</strong>
        </div>
      </div>
    </div>
  );
}
