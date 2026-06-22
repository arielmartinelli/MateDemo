import React, { useState } from 'react';
import { X, Check, ShoppingCart, Sparkles, MessageCircle } from 'lucide-react';
import EngravingCustomizer from './EngravingCustomizer';

export default function ProductDetailModal({ product, onClose, onAddToCart }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [wantsEngraving, setWantsEngraving] = useState(false);
  const [engravingData, setEngravingData] = useState(null);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart({
      product,
      size: selectedSize,
      quantity,
      engraving: wantsEngraving && engravingData ? engravingData : null
    });
    onClose();
  };

  const currentPrice = wantsEngraving 
    ? product.price + 4500 
    : product.price;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar modal">
          <X size={20} />
        </button>

        <div className="detail-grid">
          {/* LEFT: GALLERY */}
          <div className="detail-gallery">
            <img 
              src={selectedImage} 
              alt={product.name} 
              className="detail-img-main"
            />
            {product.images.length > 1 && (
              <div className="detail-thumbs">
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className={`detail-thumb ${selectedImage === img ? 'active' : ''}`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: INFO & CONTROLS */}
          <div className="detail-info">
            <span className="detail-category">{product.category === 'mates' ? 'Mate Premium' : 'Materia & Accesorios'}</span>
            <h2 className="detail-name">{product.name}</h2>
            
            <div className="detail-rating-row">
              <div className="detail-rating-stars">
                {'★'.repeat(Math.floor(product.rating))}
                {product.rating % 1 !== 0 ? '½' : ''}
              </div>
              <span style={{ color: 'var(--c-text-muted)', fontSize: '12px' }}>
                ({product.reviewsCount} valoraciones de clientes)
              </span>
            </div>

            <div className="detail-price">
              ${currentPrice.toLocaleString('es-AR')} ARS
              {wantsEngraving && <span style={{ fontSize: '12px', color: 'var(--c-mate-green)', marginLeft: '10px', fontWeight: 'normal' }}>(Grabado Incluido)</span>}
            </div>

            <p className="detail-desc">{product.description}</p>

            {/* SIZES */}
            {product.sizes && (
              <div className="option-section">
                <span className="option-title">Seleccionar Tamaño</span>
                <div className="option-pills">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      className={`option-pill ${selectedSize === sz ? 'active' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* FEATURES LIST */}
            <div className="option-section">
              <span className="option-title">Ficha Técnica</span>
              <ul className="detail-features">
                {Object.entries(product.features || {}).map(([key, value]) => (
                  <li key={key}>
                    <Check size={14} className="features-check" />
                    <span><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</span>
                  </li>
                ))}
                <li>
                  <Check size={14} className="features-check" />
                  <span><strong>Disponibilidad:</strong> {product.stock > 0 ? `Stock disponible (${product.stock} u.)` : 'Sin Stock'}</span>
                </li>
              </ul>
            </div>

            {/* PERSONALIZATION TRIGGERS */}
            {product.canEngrave && (
              <div className="engraving-trigger-card">
                <div className="engraving-trigger-text">
                  <h4>
                    <Sparkles size={16} style={{ color: '#c5a059' }} />
                    ¿Querés grabarlo con tu nombre/logo?
                  </h4>
                  <p>Sumá un toque único y criollo a tu mate por un costo mínimo.</p>
                </div>
                <button
                  type="button"
                  className={`btn-engrave-toggle ${wantsEngraving ? 'active' : ''}`}
                  onClick={() => setWantsEngraving(!wantsEngraving)}
                >
                  {wantsEngraving ? 'Quitar Grabado' : 'Agregar (+$4.500)'}
                </button>
              </div>
            )}

            {/* CUSTOMIZER BOX */}
            {product.canEngrave && wantsEngraving && (
              <EngravingCustomizer 
                product={product} 
                onChange={(data) => setEngravingData(data)} 
              />
            )}

            {/* QUANTITY & BUY ROW */}
            <div className="purchase-row">
              <div className="quantity-selector">
                <button 
                  type="button" 
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="qty-val">{quantity}</span>
                <button 
                  type="button" 
                  className="qty-btn"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="btn-add-to-cart"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                <ShoppingCart size={18} />
                Agregar al Carrito
              </button>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: 'var(--c-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                🛡️ Compra segura
              </span>
              <span style={{ fontSize: '11px', color: 'var(--c-text-muted)' }}>•</span>
              <span style={{ fontSize: '11px', color: 'var(--c-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                🔄 Garantía por fallas de virola
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
