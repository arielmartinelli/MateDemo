import React from 'react';
import { X, Trash2, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  cartItems, 
  onClose, 
  onRemoveFromCart, 
  onUpdateQuantity, 
  onCheckoutClick 
}) {
  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 50000; // Free shipping on orders over $50.000 ARS

  // Calculate items cost, adding the $4.500 engraving fee if customization was chosen
  const itemsSubtotal = cartItems.reduce((sum, item) => {
    const unitPrice = item.engraving 
      ? item.product.price + item.engraving.cost 
      : item.product.price;
    return sum + (unitPrice * item.quantity);
  }, 0);

  const missingForFreeShipping = FREE_SHIPPING_THRESHOLD - itemsSubtotal;
  const isFreeShipping = missingForFreeShipping <= 0;

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* HEADER */}
        <div className="cart-header">
          <h3 className="cart-title">Tu Carrito</h3>
          <button className="cart-close-btn" onClick={onClose} aria-label="Cerrar carrito">
            <X size={24} />
          </button>
        </div>

        {/* ITEMS LIST */}
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <span style={{ fontSize: '48px' }}>🧉</span>
              <p>Tu carrito está vacío.</p>
              <button 
                className="btn-primary" 
                onClick={onClose} 
                style={{ padding: '12px 24px', fontSize: '11px' }}
              >
                Volver a la Tienda
              </button>
            </div>
          ) : (
            cartItems.map((item, index) => {
              const unitPrice = item.engraving 
                ? item.product.price + item.engraving.cost 
                : item.product.price;
              
              return (
                <div className="cart-item" key={`${item.product.id}-${item.size}-${index}`}>
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                    className="cart-item-img" 
                  />
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.product.name}</h4>
                    <div className="cart-item-meta">
                      {item.size && <span>Medida: {item.size}</span>}
                      {item.engraving && (
                        <div className="cart-item-engrave-badge">
                          <Sparkles size={10} />
                          <span>
                            Grabado: {item.engraving.symbol.icon} "{item.engraving.text || 'Sin texto'}" ({item.engraving.font.name})
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="cart-item-price-row">
                      {/* QUANTITY CONTROL */}
                      <div className="quantity-selector" style={{ height: '32px' }}>
                        <button 
                          className="qty-btn" 
                          style={{ width: '28px' }}
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="qty-val" style={{ width: '28px', fontSize: '12px' }}>{item.quantity}</span>
                        <button 
                          className="qty-btn" 
                          style={{ width: '28px' }}
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <span className="cart-item-price">
                        ${(unitPrice * item.quantity).toLocaleString('es-AR')}
                      </span>
                    </div>

                    <button 
                      className="cart-item-remove-btn"
                      onClick={() => onRemoveFromCart(index)}
                      aria-label="Quitar producto"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* FOOTER */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            {/* SHIPPING PROGRESS BAR */}
            <div 
              className="cart-shipping-info"
              style={{
                backgroundColor: isFreeShipping ? '#ebf3ee' : '#fef5e7',
                color: isFreeShipping ? 'var(--c-mate-green)' : '#d68910'
              }}
            >
              <Truck size={16} />
              {isFreeShipping ? (
                <span>¡Felicidades! Tenés <strong>Envío Gratis</strong> en tu compra.</span>
              ) : (
                <span>
                  Sumá <strong>${missingForFreeShipping.toLocaleString('es-AR')}</strong> más y obtené envío gratis.
                </span>
              )}
            </div>

            {/* SUMMARY */}
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>${itemsSubtotal.toLocaleString('es-AR')}</span>
            </div>
            <div className="cart-summary-row">
              <span>Envío</span>
              <span>{isFreeShipping ? 'Gratis' : '$3.200 (Correo Argentino)'}</span>
            </div>
            
            <div className="cart-summary-row total">
              <span>Total Estimado</span>
              <span>
                ${(itemsSubtotal + (isFreeShipping ? 0 : 3200)).toLocaleString('es-AR')} ARS
              </span>
            </div>

            <button className="btn-checkout" onClick={onCheckoutClick}>
              <ShieldCheck size={18} />
              Iniciar Compra
            </button>
            <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--c-text-muted)', marginTop: '12px' }}>
              Transacciones seguras y encriptadas de extremo a extremo.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
