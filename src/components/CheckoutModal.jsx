import React, { useState } from 'react';
import { X, Copy, CheckCircle, QrCode, Landmark, LandmarkIcon, ClipboardCheck } from 'lucide-react';

export default function CheckoutModal({ isOpen, cartItems, onClose, onOrderCompleted }) {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState('transfer'); // 'transfer' or 'mp'
  const [formData, setFormData] = useState({
    email: '', name: '', surname: '', phone: '',
    province: 'Buenos Aires', city: '', zip: '', address: ''
  });
  const [copiedField, setCopiedField] = useState(null); // 'cbu' or 'alias'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);

  const CBU = '0000003100098765432109';
  const ALIAS = 'legado.criollo.mates';
  const CUIT = '20-38475923-9';

  const itemsSubtotal = cartItems.reduce((sum, item) => {
    const unitPrice = item.engraving 
      ? item.product.price + item.engraving.cost 
      : item.product.price;
    return sum + (unitPrice * item.quantity);
  }, 0);

  const shippingCost = itemsSubtotal >= 50000 ? 0 : 3200;
  const rawTotal = itemsSubtotal + shippingCost;
  
  // 10% discount for Bank Transfer
  const discount = paymentMethod === 'transfer' ? itemsSubtotal * 0.10 : 0;
  const finalTotal = rawTotal - discount;

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.name || !formData.address) {
      alert('Por favor, completa los datos obligatorios (Email, Nombre y Dirección).');
      return;
    }
    
    setIsSubmitting(true);

    setTimeout(() => {
      const orderCode = 'C-' + Math.floor(100000 + Math.random() * 900000);
      const newOrder = {
        id: orderCode,
        date: new Date().toLocaleDateString('es-AR'),
        customer: `${formData.name} ${formData.surname}`,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.province} (CP ${formData.zip})`,
        items: cartItems.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          size: item.size,
          engraving: item.engraving ? {
            text: item.engraving.text,
            symbol: item.engraving.symbol.name,
            font: item.engraving.font.name
          } : null
        })),
        payment: paymentMethod === 'transfer' ? 'Transferencia Bancaria' : 'Mercado Pago',
        total: finalTotal,
        status: 'Pendiente'
      };

      setSuccessOrder(newOrder);
      setIsSubmitting(false);
      onOrderCompleted(newOrder); // Add to admin order list
    }, 2000);
  };

  return (
    <div className="modal-backdrop" onClick={successOrder ? undefined : onClose}>
      <div className="modal-container" style={{ maxWidth: '850px' }} onClick={(e) => e.stopPropagation()}>
        
        {/* CLOSE BUTTON (disabled on success) */}
        {!successOrder && (
          <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar checkout">
            <X size={20} />
          </button>
        )}

        {successOrder ? (
          /* SUCCESS VIEW */
          <div className="checkout-success-view">
            <div className="success-icon-wrap">
              <CheckCircle size={44} />
            </div>
            <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>¡Muchas gracias por tu compra!</h2>
            <p style={{ color: 'var(--c-text-muted)', marginBottom: '24px' }}>
              Tu orden <strong>#{successOrder.id}</strong> ha sido registrada con éxito.
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
                Detalles del Pedido
              </h4>
              <p style={{ marginBottom: '6px' }}><strong>Cliente:</strong> {successOrder.customer}</p>
              <p style={{ marginBottom: '6px' }}><strong>Envío a:</strong> {successOrder.address}</p>
              <p style={{ marginBottom: '6px' }}><strong>Método de pago:</strong> {successOrder.payment}</p>
              <p style={{ marginBottom: '12px' }}><strong>Total abonado:</strong> ${successOrder.total.toLocaleString('es-AR')} ARS</p>
              
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', textTransform: 'uppercase', color: 'var(--c-gold)', marginBottom: '8px' }}>
                Productos
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {successOrder.items.map((it, idx) => (
                  <li key={idx} style={{ padding: '6px 0', borderBottom: idx === successOrder.items.length - 1 ? 'none' : '1px solid var(--c-border)' }}>
                    {it.quantity}x {it.name} {it.size ? `(${it.size})` : ''}
                    {it.engraving && (
                      <div style={{ fontSize: '11px', color: 'var(--c-leather-light)', marginLeft: '12px' }}>
                        ★ Grabado: "{it.engraving.text}" [{it.engraving.symbol}]
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {successOrder.payment.includes('Transferencia') && (
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
                  <Landmark size={18} />
                  <span>Pasos para completar el pago</span>
                </div>
                <p style={{ marginBottom: '10px' }}>
                  Para que despachemos tu pedido, realizá la transferencia por <strong>${successOrder.total.toLocaleString('es-AR')} ARS</strong> a los datos indicados en la pantalla anterior.
                </p>
                <p style={{ margin: 0 }}>
                  Luego, enviá el comprobante de pago por email a <strong>comprobantes@legadocriollo.com.ar</strong> o por WhatsApp al <strong>+54 9 351 787-7753</strong> indicando tu Cód. de Orden: <strong>#{successOrder.id}</strong>.
                </p>
              </div>
            )}

            <button 
              className="btn-primary" 
              onClick={onClose}
              style={{ width: '200px' }}
            >
              Cerrar y Salir
            </button>
          </div>
        ) : (
          /* CHECKOUT FORM VIEW */
          <form onSubmit={handleSubmit} className="checkout-grid">
            
            {/* LEFT: SHIPPING & BILLING */}
            <div>
              <h3 className="checkout-section-title">Detalles de Entrega</h3>
              <div className="checkout-form">
                <div className="full-width">
                  <label className="control-label" htmlFor="email">Email *</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email" 
                    className="customizer-input" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                
                <div>
                  <label className="control-label" htmlFor="name">Nombre *</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name" 
                    className="customizer-input" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div>
                  <label className="control-label" htmlFor="surname">Apellido *</label>
                  <input 
                    type="text" 
                    id="surname"
                    name="surname" 
                    className="customizer-input" 
                    value={formData.surname} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>

                <div className="full-width">
                  <label className="control-label" htmlFor="phone">Teléfono de contacto *</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone" 
                    className="customizer-input" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Ej: 11 5555 1234"
                  />
                </div>

                <div>
                  <label className="control-label" htmlFor="province">Provincia</label>
                  <select 
                    id="province"
                    name="province" 
                    className="font-selector-select" 
                    value={formData.province} 
                    onChange={handleInputChange}
                  >
                    <option>Buenos Aires</option>
                    <option>CABA</option>
                    <option>Córdoba</option>
                    <option>Santa Fe</option>
                    <option>Mendoza</option>
                    <option>Entre Ríos</option>
                    <option>Corrientes</option>
                    <option>Salta</option>
                    <option>Chaco</option>
                    <option>La Pampa</option>
                    <option>Neuquén</option>
                    <option>Río Negro</option>
                    <option>Chubut</option>
                    <option>Santa Cruz</option>
                    <option>Tierra del Fuego</option>
                  </select>
                </div>
                <div>
                  <label className="control-label" htmlFor="city">Localidad *</label>
                  <input 
                    type="text" 
                    id="city"
                    name="city" 
                    className="customizer-input" 
                    value={formData.city} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>

                <div>
                  <label className="control-label" htmlFor="zip">Código Postal *</label>
                  <input 
                    type="text" 
                    id="zip"
                    name="zip" 
                    className="customizer-input" 
                    value={formData.zip} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div>
                  <label className="control-label" htmlFor="address">Calle y Altura (Piso/Dpto) *</label>
                  <input 
                    type="text" 
                    id="address"
                    name="address" 
                    className="customizer-input" 
                    value={formData.address} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Ej: Av. del Libertador 1500, 3A"
                  />
                </div>
              </div>

              <h3 className="checkout-section-title" style={{ marginTop: '30px' }}>Método de Pago</h3>
              <div className="payment-method-selector">
                <button
                  type="button"
                  className={`payment-method-card ${paymentMethod === 'transfer' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('transfer')}
                >
                  <LandmarkIcon size={24} style={{ color: paymentMethod === 'transfer' ? 'var(--c-mate-green)' : 'var(--c-leather-light)' }} />
                  <span style={{ fontSize: '13px', fontWeight: '700' }}>Transferencia</span>
                  <span style={{ fontSize: '10px', color: 'var(--c-mate-green)', fontWeight: 'bold' }}>10% Descuento</span>
                </button>

                <button
                  type="button"
                  className={`payment-method-card ${paymentMethod === 'mp' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('mp')}
                >
                  <QrCode size={24} style={{ color: paymentMethod === 'mp' ? 'var(--c-mate-green)' : 'var(--c-leather-light)' }} />
                  <span style={{ fontSize: '13px', fontWeight: '700' }}>Mercado Pago</span>
                  <span style={{ fontSize: '10px', color: 'var(--c-text-muted)' }}>Acreditación inmediata</span>
                </button>
              </div>

              {/* PAYMENT CONDITIONAL PANELS */}
              {paymentMethod === 'transfer' ? (
                <div className="payment-details-box">
                  <h4 style={{ fontSize: '13px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Landmark size={14} style={{ color: 'var(--c-leather-light)' }} />
                    Datos de la Cuenta Bancaria
                  </h4>
                  <p style={{ fontSize: '11px', color: 'var(--c-text-muted)', marginBottom: '15px' }}>
                    Realizá la transferencia desde tu homebanking o billetera virtual usando los siguientes datos:
                  </p>

                  <div className="control-group">
                    <span className="control-label">Alias de Legado Criollo</span>
                    <div className="transfer-copy-field">
                      <span>{ALIAS}</span>
                      <button 
                        type="button" 
                        className="copy-btn" 
                        onClick={() => handleCopy(ALIAS, 'alias')}
                      >
                        {copiedField === 'alias' ? <ClipboardCheck size={14} style={{ color: 'var(--c-mate-green)' }} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>

                  <div className="control-group">
                    <span className="control-label">CBU</span>
                    <div className="transfer-copy-field">
                      <span>{CBU}</span>
                      <button 
                        type="button" 
                        className="copy-btn" 
                        onClick={() => handleCopy(CBU, 'cbu')}
                      >
                        {copiedField === 'cbu' ? <ClipboardCheck size={14} style={{ color: 'var(--c-mate-green)' }} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>

                  <p style={{ fontSize: '11px', color: 'var(--c-text-muted)' }}>
                    <strong>Razón Social:</strong> Legado Criollo S.A.S.<br />
                    <strong>CUIT:</strong> {CUIT}
                  </p>
                </div>
              ) : (
                <div className="payment-details-box" style={{ textAlign: 'center' }}>
                  <h4 style={{ fontSize: '13px', marginBottom: '6px' }}>Escanea el Código QR</h4>
                  <p style={{ fontSize: '11px', color: 'var(--c-text-muted)', marginBottom: '12px' }}>
                    Escanea con la app de Mercado Pago o cualquier billetera digital para realizar el pago:
                  </p>
                  
                  <div className="qr-code-mock">
                    {/* Simulated QR Code via SVG */}
                    <svg className="qr-code-img" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="100" fill="white" />
                      <path d="M5,5 h20 v20 h-20 z M10,10 h10 v10 h-10 z" fill="black" />
                      <path d="M75,5 h20 v20 h-20 z M80,10 h10 v10 h-10 z" fill="black" />
                      <path d="M5,75 h20 v20 h-20 z M10,80 h10 v10 h-10 z" fill="black" />
                      <path d="M30,5 h10 v10 h-10 z M50,5 h10 v10 h-10 z M65,5 h5 v5 h-5 z" fill="black" />
                      <path d="M5,35 h5 v5 h-5 z M5,45 h15 v5 h-15 z M15,55 h10 v15 h-10 z" fill="black" />
                      <path d="M40,30 h15 v5 h-15 z M35,45 h10 v15 h-10 z M55,45 h15 v20 h-15 z" fill="black" />
                      <path d="M75,35 h15 v5 h-15 z M85,45 h10 v10 h-10 z M75,65 h10 v20 h-10 z" fill="black" />
                      <path d="M35,75 h20 v5 h-20 z M45,85 h25 v10 h-25 z" fill="black" />
                    </svg>
                    <div className="qr-logo-overlay">MP</div>
                  </div>
                  
                  <p style={{ fontSize: '10px', color: 'var(--c-text-muted)' }}>
                    Al confirmar tu pago, el sistema registrará tu orden al instante.
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <div className="checkout-summary-box">
              <h3 className="checkout-section-title">Resumen de Compra</h3>
              
              <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {cartItems.map((item, idx) => {
                  const unitPrice = item.engraving 
                    ? item.product.price + item.engraving.cost 
                    : item.product.price;
                  return (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                      <span style={{ color: 'var(--c-text-dark)', fontWeight: '500' }}>
                        {item.quantity}x {item.product.name} {item.size ? `(${item.size})` : ''}
                        {item.engraving && <span style={{ display: 'block', fontSize: '10px', color: 'var(--c-gold)' }}>★ Grabado personalizado</span>}
                      </span>
                      <span style={{ fontWeight: '700' }}>
                        ${(unitPrice * item.quantity).toLocaleString('es-AR')}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--c-border)', paddingTop: '15px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal Productos</span>
                  <span>${itemsSubtotal.toLocaleString('es-AR')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Envío</span>
                  <span>{shippingCost === 0 ? 'Gratis' : `$${shippingCost.toLocaleString('es-AR')}`}</span>
                </div>
                
                {paymentMethod === 'transfer' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--c-mate-green)', fontWeight: '600' }}>
                    <span>Descuento Transferencia (10% OFF)</span>
                    <span>-${discount.toLocaleString('es-AR')}</span>
                  </div>
                )}
                
                <div 
                  className="cart-summary-row total" 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '18px', 
                    fontWeight: '800', 
                    color: 'var(--c-leather-dark)',
                    marginTop: '10px',
                    paddingTop: '10px'
                  }}
                >
                  <span>Total Final</span>
                  <span>${finalTotal.toLocaleString('es-AR')} ARS</span>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', marginTop: '24px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Procesando Pedido...' : 'Confirmar Pedido'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
