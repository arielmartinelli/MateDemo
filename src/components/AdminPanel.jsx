import React, { useState } from 'react';
import { BarChart3, ShoppingCart, Package, PlusCircle, CheckCircle, TrendingUp, DollarSign, Sparkles, Edit, X, Save, Upload, MessageCircle } from 'lucide-react';

const PRELOADED_IMAGES = [
  { label: 'Mate Imperial Premium (Imagen IA)', value: '/images/mate_imperial.png' },
  { label: 'Mate Camionero Seleccionado (Imagen IA)', value: '/images/mate_camionero.png' },
  { label: 'Mate de Madera de Algarrobo (Imagen IA)', value: '/images/mate_madera.png' },
  { label: 'Mochila Matera de Cuero (Imagen IA)', value: '/images/matera_cuero.png' },
  { label: 'Termo Legado 1.2L (Gris Metálico)', value: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop' },
  { label: 'Bombilla de Alpaca / Acero', value: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop' },
  { label: 'Subir foto desde mis archivos...', value: 'upload' },
  { label: 'Ingresar URL personalizada...', value: 'custom' }
];

export default function AdminPanel({ 
  products, 
  orders, 
  quoteRequests = [],
  onUpdateQuoteStatus,
  onUpdateOrderStatus, 
  onAddProduct, 
  onEditProduct,
  onUpdateProductStock 
}) {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'orders', 'quotes', 'inventory'
  
  // State for Add Product Form
  const [newProduct, setNewProduct] = useState({
    name: '', category: 'mates', mateType: 'imperial', price: '', description: '',
    material: '', virola: '', costura: '', canEngrave: false,
    engravingArea: 'virola', stock: 10, imageSelection: '/images/mate_imperial.png', customImageUrl: ''
  });
  const [addUploadedImage, setAddUploadedImage] = useState(null); // base64 string

  // State for Editing Product Modal
  const [editingProduct, setEditingProduct] = useState(null);
  const [editImageSelection, setEditImageSelection] = useState('/images/mate_imperial.png');
  const [editCustomImageUrl, setEditCustomImageUrl] = useState('');
  const [editUploadedImage, setEditUploadedImage] = useState(null); // base64 string

  // Stats calculation
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'Pendiente').length;
  const pendingQuotes = quoteRequests.filter(q => q.status.includes('Pendiente')).length;
  const avgOrderValue = orders.length > 0 ? totalSales / orders.length : 0;

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChangeForAdd = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAddUploadedImage(reader.result); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChangeForEdit = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditUploadedImage(reader.result); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert('Por favor completa Nombre y Precio.');
      return;
    }

    let finalImage = newProduct.imageSelection;
    if (newProduct.imageSelection === 'custom') {
      finalImage = newProduct.customImageUrl || '/images/mate_imperial.png';
    } else if (newProduct.imageSelection === 'upload') {
      if (!addUploadedImage) {
        alert('Por favor selecciona un archivo de imagen para subir.');
        return;
      }
      finalImage = addUploadedImage;
    }

    const formattedProduct = {
      id: newProduct.name.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, ''),
      name: newProduct.name,
      category: newProduct.category,
      productType: newProduct.category, 
      mateType: newProduct.category === 'mates' ? newProduct.mateType : 'no_aplica',
      price: parseFloat(newProduct.price),
      rating: 5.0,
      reviewsCount: 0,
      description: newProduct.description,
      details: ['Producto añadido manualmente desde el administrador.'],
      features: {
        material: newProduct.material || 'No especificado',
        virola: newProduct.virola || 'No especificado',
        costura: newProduct.costura || 'No especificado'
      },
      images: [finalImage],
      canEngrave: newProduct.canEngrave,
      engravingArea: newProduct.engravingArea,
      stock: parseInt(newProduct.stock)
    };

    onAddProduct(formattedProduct);
    alert('¡Producto agregado con éxito!');
    
    // Reset Add Form
    setNewProduct({
      name: '', category: 'mates', mateType: 'imperial', price: '', description: '',
      material: '', virola: '', costura: '', canEngrave: false,
      engravingArea: 'virola', stock: 10, imageSelection: '/images/mate_imperial.png', customImageUrl: ''
    });
    setAddUploadedImage(null);
  };

  // Open Edit Modal and load product data
  const handleOpenEditModal = (product) => {
    setEditingProduct({
      ...product,
      material: product.features?.material || '',
      virola: product.features?.virola || '',
      costura: product.features?.costura || ''
    });
    
    const imageVal = product.images[0];
    const preloadedMatch = PRELOADED_IMAGES.find(img => img.value === imageVal);
    
    if (preloadedMatch) {
      setEditImageSelection(imageVal);
      setEditCustomImageUrl('');
      setEditUploadedImage(null);
    } else if (imageVal && imageVal.startsWith('data:')) {
      setEditImageSelection('upload');
      setEditCustomImageUrl('');
      setEditUploadedImage(imageVal); 
    } else {
      setEditImageSelection('custom');
      setEditCustomImageUrl(imageVal || '');
      setEditUploadedImage(null);
    }
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingProduct({
      ...editingProduct,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingProduct.name || !editingProduct.price) {
      alert('Por favor completa Nombre y Precio.');
      return;
    }

    let finalImage = editImageSelection;
    if (editImageSelection === 'custom') {
      finalImage = editCustomImageUrl || '/images/mate_imperial.png';
    } else if (editImageSelection === 'upload') {
      if (!editUploadedImage) {
        alert('Por favor selecciona un archivo de imagen para subir.');
        return;
      }
      finalImage = editUploadedImage;
    }

    const updatedProduct = {
      ...editingProduct,
      price: parseFloat(editingProduct.price),
      stock: parseInt(editingProduct.stock),
      productType: editingProduct.category,
      mateType: editingProduct.category === 'mates' ? editingProduct.mateType : 'no_aplica',
      features: {
        material: editingProduct.material || 'No especificado',
        virola: editingProduct.virola || 'No especificado',
        costura: editingProduct.costura || 'No especificado'
      },
      images: [finalImage]
    };

    onEditProduct(updatedProduct);
    setEditingProduct(null);
    setEditUploadedImage(null);
    alert('¡Producto modificado con éxito!');
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <span className="admin-sidebar-title">PANEL CRIOLLO</span>
          <span style={{ fontSize: '9px', color: 'var(--c-gold)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}>
            Administración
          </span>
        </div>

        <ul className="admin-menu">
          <li>
            <button 
              className={`admin-menu-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <BarChart3 size={16} />
              Resumen General
            </button>
          </li>
          <li>
            <button 
              className={`admin-menu-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <ShoppingCart size={16} />
              Pedidos ({orders.length})
              {pendingOrders > 0 && (
                <span style={{ background: '#c5a059', color: '#1f0f08', fontSize: '9px', padding: '2px 6px', borderRadius: '10px', marginLeft: 'auto', fontWeight: 'bold' }}>
                  {pendingOrders}
                </span>
              )}
            </button>
          </li>
          {/* MOCK ENGRAVING REQUESTS TAB */}
          <li>
            <button 
              className={`admin-menu-btn ${activeTab === 'quotes' ? 'active' : ''}`}
              onClick={() => setActiveTab('quotes')}
            >
              <Sparkles size={16} />
              Cotizaciones ({quoteRequests.length})
              {pendingQuotes > 0 && (
                <span style={{ background: '#c5a059', color: '#1f0f08', fontSize: '9px', padding: '2px 6px', borderRadius: '10px', marginLeft: 'auto', fontWeight: 'bold' }}>
                  {pendingQuotes}
                </span>
              )}
            </button>
          </li>
          <li>
            <button 
              className={`admin-menu-btn ${activeTab === 'inventory' ? 'active' : ''}`}
              onClick={() => setActiveTab('inventory')}
            >
              <Package size={16} />
              Inventario ({products.length})
            </button>
          </li>
        </ul>

        <div style={{ marginTop: 'auto', fontSize: '11px', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
          Legado Criollo v1.3.0
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="admin-main-content">
        
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="admin-page-title-row">
              <h2 className="admin-page-title">Resumen Financiero</h2>
              <span style={{ fontSize: '12px', color: 'var(--c-text-muted)', fontWeight: '500' }}>
                Datos actualizados a la fecha
              </span>
            </div>

            {/* CARDS */}
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <div className="admin-stat-info">
                  <h5>Facturación Total</h5>
                  <p>${totalSales.toLocaleString('es-AR')}</p>
                </div>
                <div className="admin-stat-icon-wrap">
                  <DollarSign size={20} />
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-info">
                  <h5>Pedidos Totales</h5>
                  <p>{orders.length}</p>
                </div>
                <div className="admin-stat-icon-wrap">
                  <ShoppingCart size={20} />
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-info">
                  <h5>Ticket Promedio</h5>
                  <p>${Math.round(avgOrderValue).toLocaleString('es-AR')}</p>
                </div>
                <div className="admin-stat-icon-wrap">
                  <TrendingUp size={20} />
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-info">
                  <h5>Solicitudes Grabados</h5>
                  <p>{quoteRequests.length}</p>
                </div>
                <div className="admin-stat-icon-wrap" style={{ color: 'var(--c-gold)' }}>
                  <Sparkles size={20} />
                </div>
              </div>
            </div>

            {/* CHART */}
            <div className="admin-chart-card">
              <div className="admin-chart-header">
                <h3 style={{ fontSize: '16px', fontFamily: 'var(--font-sans)', fontWeight: '700' }}>Ventas del Semestre (Simulado)</h3>
                <span style={{ fontSize: '11px', color: 'var(--c-mate-green)', background: '#ebf3ee', padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold' }}>
                  📈 +14.2% este mes
                </span>
              </div>
              <div className="chart-svg-container">
                <svg viewBox="0 0 500 200" width="100%" height="100%">
                  <line x1="40" y1="20" x2="480" y2="20" stroke="#f1eeea" strokeWidth="1" />
                  <line x1="40" y1="70" x2="480" y2="70" stroke="#f1eeea" strokeWidth="1" />
                  <line x1="40" y1="120" x2="480" y2="120" stroke="#f1eeea" strokeWidth="1" />
                  <line x1="40" y1="170" x2="480" y2="170" stroke="#f1eeea" strokeWidth="1.5" />
                  
                  <defs>
                    <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2a563c" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#2a563c" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  <path 
                    d="M 40 170 L 40 160 Q 100 110 120 120 T 200 90 T 280 80 T 360 40 T 440 60 T 480 30 L 480 170 Z" 
                    fill="url(#chart-grad)"
                  />
                  
                  <path 
                    d="M 40 160 Q 100 110 120 120 T 200 90 T 280 80 T 360 40 T 440 60 T 480 30" 
                    fill="none" 
                    stroke="var(--c-mate-green)" 
                    strokeWidth="3" 
                  />
                  
                  <text x="40" y="185" fill="#8e7d76" fontSize="8" textAnchor="middle">Ene</text>
                  <text x="120" y="185" fill="#8e7d76" fontSize="8" textAnchor="middle">Feb</text>
                  <text x="200" y="185" fill="#8e7d76" fontSize="8" textAnchor="middle">Mar</text>
                  <text x="280" y="185" fill="#8e7d76" fontSize="8" textAnchor="middle">Abr</text>
                  <text x="360" y="185" fill="#8e7d76" fontSize="8" textAnchor="middle">May</text>
                  <text x="440" y="185" fill="#8e7d76" fontSize="8" textAnchor="middle">Jun</text>
                  
                  <text x="30" y="23" fill="#8e7d76" fontSize="8" textAnchor="end">$200k</text>
                  <text x="30" y="73" fill="#8e7d76" fontSize="8" textAnchor="end">$100k</text>
                  <text x="30" y="123" fill="#8e7d76" fontSize="8" textAnchor="end">$50k</text>
                  <text x="30" y="173" fill="#8e7d76" fontSize="8" textAnchor="end">$0</text>
                </svg>
              </div>
            </div>

            {/* TOP PRODUCTS */}
            <div className="admin-card-table">
              <div className="admin-table-header">Productos Destacados</div>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Miniatura</th>
                      <th>Producto</th>
                      <th>Categoría</th>
                      <th>Precio Unitario</th>
                      <th>Stock Actual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice(0, 4).map((p) => (
                      <tr key={p.id}>
                        <td>
                          <img 
                            src={p.images[0]} 
                            alt={p.name} 
                            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--c-border)' }} 
                          />
                        </td>
                        <td><strong>{p.name}</strong></td>
                        <td style={{ textTransform: 'uppercase' }}>{p.category === 'mates' ? `Mate (${p.mateType})` : 'Accesorios'}</td>
                        <td>${p.price.toLocaleString('es-AR')}</td>
                        <td>
                          <span style={{ color: p.stock < 10 ? '#c0392b' : 'inherit', fontWeight: p.stock < 10 ? '700' : 'normal' }}>
                            {p.stock} u.
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS */}
        {activeTab === 'orders' && (
          <div>
            <div className="admin-page-title-row">
              <h2 className="admin-page-title">Órdenes de Compra</h2>
              <span style={{ fontSize: '12px', color: 'var(--c-text-muted)', fontWeight: '500' }}>
                Administración y despacho de mercadería
              </span>
            </div>

            <div className="admin-card-table">
              <div className="admin-table-header">Listado de Pedidos</div>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Cód. Pedido</th>
                      <th>Fecha</th>
                      <th>Cliente</th>
                      <th>Detalle Items</th>
                      <th>Total</th>
                      <th>Pago</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: 'var(--c-text-muted)' }}>
                          No hay órdenes de compra registradas.
                        </td>
                      </tr>
                    ) : (
                      orders.map((ord) => (
                        <tr key={ord.id}>
                          <td><strong>#{ord.id}</strong></td>
                          <td>{ord.date}</td>
                          <td>
                            <strong>{ord.customer}</strong>
                            <div style={{ fontSize: '11px', color: 'var(--c-text-muted)' }}>{ord.email}</div>
                          </td>
                          <td>
                            <ul style={{ paddingLeft: '14px', margin: 0 }}>
                              {ord.items.map((it, idx) => (
                                <li key={idx}>
                                  {it.quantity}x {it.name} {it.size ? `(${it.size})` : ''}
                                  {it.engraving && (
                                    <div style={{ fontSize: '11px', color: '#8c5e3c', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                                      <Sparkles size={10} />
                                      <span>Grabado: "{it.engraving.text}" [{it.engraving.symbol}] ({it.engraving.font})</span>
                                    </div>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td><strong>${ord.total.toLocaleString('es-AR')}</strong></td>
                          <td>{ord.payment}</td>
                          <td>
                            <span className={`badge-status ${ord.status.toLowerCase()}`}>
                              {ord.status}
                            </span>
                          </td>
                          <td>
                            {ord.status === 'Pendiente' ? (
                              <button 
                                className="admin-action-btn"
                                onClick={() => onUpdateOrderStatus(ord.id)}
                              >
                                Despachar
                              </button>
                            ) : (
                              <span style={{ color: 'var(--c-mate-green)', fontWeight: '600', fontSize: '11px' }}>✓ Despachado</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER ENGRAVING QUOTES */}
        {activeTab === 'quotes' && (
          <div>
            <div className="admin-page-title-row">
              <h2 className="admin-page-title">Solicitudes de Grabado</h2>
              <span style={{ fontSize: '12px', color: 'var(--c-text-muted)', fontWeight: '500' }}>
                Presupuestos de grabado láser para mates propios de clientes
              </span>
            </div>

            <div className="admin-card-table">
              <div className="admin-table-header">Pedidos de Cotización Recibidos</div>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Cód. Cot.</th>
                      <th>Fecha</th>
                      <th>Cliente</th>
                      <th>Artículo</th>
                      <th>Material</th>
                      <th>Diseño Solicitado</th>
                      <th>Logo Adjunto</th>
                      <th>Comentarios</th>
                      <th>Estado</th>
                      <th>Responder</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quoteRequests.length === 0 ? (
                      <tr>
                        <td colSpan="10" style={{ textAlign: 'center', padding: '30px', color: 'var(--c-text-muted)' }}>
                          No hay solicitudes de cotización recibidas.
                        </td>
                      </tr>
                    ) : (
                      quoteRequests.map((req) => (
                        <tr key={req.id}>
                          <td><strong>#{req.id}</strong></td>
                          <td>{req.date}</td>
                          <td>
                            <strong>{req.customer}</strong>
                            <div style={{ fontSize: '11px', color: 'var(--c-text-muted)' }}>{req.phone}</div>
                            <div style={{ fontSize: '11px', color: 'var(--c-text-muted)' }}>{req.email}</div>
                          </td>
                          <td>{req.itemType}</td>
                          <td>{req.material}</td>
                          <td>
                            {req.text && <div>Texto: "<strong>{req.text}</strong>"</div>}
                            {req.font && <div style={{ fontSize: '11px', color: 'var(--c-text-muted)' }}>Fuente: {req.font}</div>}
                            {req.symbol && <div style={{ fontSize: '11px', color: 'var(--c-text-muted)' }}>Símbolo: {req.symbol}</div>}
                          </td>
                          <td>
                            {req.logoPreview ? (
                              <img 
                                src={req.logoPreview} 
                                alt="Logo subido" 
                                style={{ width: '45px', height: '45px', objectFit: 'contain', border: '1px solid var(--c-border)', borderRadius: '4px', background: '#fafafa' }} 
                              />
                            ) : (
                              <span style={{ fontSize: '11px', color: 'var(--c-text-muted)' }}>Sin logo</span>
                            )}
                          </td>
                          <td style={{ maxWidth: '150px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                            {req.comments || '-'}
                          </td>
                          <td>
                            <span 
                              className={`badge-status ${req.status.toLowerCase().includes('pendiente') ? 'pendiente' : 'despachado'}`}
                              style={{ 
                                backgroundColor: req.status.toLowerCase().includes('pendiente') ? '#fef5e7' : '#ebf3ee',
                                color: req.status.toLowerCase().includes('pendiente') ? '#d68910' : 'var(--c-mate-green)'
                              }}
                            >
                              {req.status}
                            </span>
                          </td>
                          <td>
                            {req.status.toLowerCase().includes('pendiente') ? (
                              <div style={{ display: 'flex', gap: '6px' }}>
                                <button 
                                  className="admin-action-btn"
                                  style={{ backgroundColor: '#2a563c', display: 'flex', alignItems: 'center', gap: '4px' }}
                                  onClick={() => {
                                    const msg = `Hola ${req.customer}! Recibimos tu cotización #${req.id} para grabar tu ${req.itemType} de ${req.material}. El costo aproximado del grabado láser de tu diseño es de $5.500 ARS. Confirmame si te queda bien y coordinamos el envío o la entrega en nuestro taller!`;
                                    window.open(`https://wa.me/${req.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
                                    onUpdateQuoteStatus(req.id);
                                  }}
                                >
                                  <MessageCircle size={12} />
                                  Cotizar
                                </button>
                              </div>
                            ) : (
                              <span style={{ color: 'var(--c-mate-green)', fontWeight: '600', fontSize: '11px' }}>✓ Presupuestado</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: INVENTORY */}
        {activeTab === 'inventory' && (
          <div>
            <div className="admin-page-title-row">
              <h2 className="admin-page-title">Gestión de Inventario</h2>
              <span style={{ fontSize: '12px', color: 'var(--c-text-muted)', fontWeight: '500' }}>
                Añadir productos y ajustar existencias
              </span>
            </div>

            {/* ADD PRODUCT FORM */}
            <div className="admin-form-card">
              <h3 style={{ fontSize: '16px', fontFamily: 'var(--font-sans)', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PlusCircle size={18} style={{ color: 'var(--c-gold)' }} />
                Cargar Nuevo Producto
              </h3>
              <form onSubmit={handleAddSubmit}>
                <div className="admin-form-grid">
                  <div>
                    <label className="control-label">Nombre del Producto *</label>
                    <input 
                      type="text" 
                      name="name" 
                      className="customizer-input" 
                      value={newProduct.name} 
                      onChange={handleFormChange} 
                      required 
                      placeholder="Ej: Mate Imperial Cincelado Especial"
                    />
                  </div>

                  <div>
                    <label className="control-label">Categoría</label>
                    <select 
                      name="category" 
                      className="font-selector-select" 
                      value={newProduct.category} 
                      onChange={handleFormChange}
                    >
                      <option value="mates">Mates Premium</option>
                      <option value="accesorios">Accesorios y Matería</option>
                    </select>
                  </div>

                  {newProduct.category === 'mates' && (
                    <div>
                      <label className="control-label">Tipo de Mate</label>
                      <select 
                        name="mateType" 
                        className="font-selector-select" 
                        value={newProduct.mateType} 
                        onChange={handleFormChange}
                      >
                        <option value="imperial">Imperial</option>
                        <option value="camionero">Camionero</option>
                        <option value="torpedo">Torpedo</option>
                        <option value="madera">Madera</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="control-label">Precio ($ ARS) *</label>
                    <input 
                      type="number" 
                      name="price" 
                      className="customizer-input" 
                      value={newProduct.price} 
                      onChange={handleFormChange} 
                      required 
                      placeholder="Ej: 45000"
                    />
                  </div>

                  <div>
                    <label className="control-label">Stock Inicial</label>
                    <input 
                      type="number" 
                      name="stock" 
                      className="customizer-input" 
                      value={newProduct.stock} 
                      onChange={handleFormChange}
                      placeholder="10"
                    />
                  </div>

                  {/* IMAGE SELECTOR */}
                  <div>
                    <label className="control-label">Origen de la Foto</label>
                    <select
                      name="imageSelection"
                      className="font-selector-select"
                      value={newProduct.imageSelection}
                      onChange={handleFormChange}
                    >
                      {PRELOADED_IMAGES.map((img) => (
                        <option key={img.value} value={img.value}>{img.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* CONDITIONAL IMAGE INPUTS */}
                  {newProduct.imageSelection === 'custom' && (
                    <div style={{ gridColumn: 'span 2' }}>
                      <label className="control-label">URL de Imagen Personalizada</label>
                      <input
                        type="text"
                        name="customImageUrl"
                        className="customizer-input"
                        value={newProduct.customImageUrl}
                        onChange={handleFormChange}
                        placeholder="https://ejemplo.com/foto.jpg"
                      />
                    </div>
                  )}

                  {newProduct.imageSelection === 'upload' && (
                    <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <label className="control-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <Upload size={14} />
                        Seleccionar Archivo Local (Foto de Mate/Accesorio)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        className="customizer-input"
                        style={{ padding: '8px 12px' }}
                        onChange={handleFileChangeForAdd}
                      />
                      {addUploadedImage && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '11px', color: 'var(--c-mate-green)', fontWeight: 'bold' }}>✓ Foto cargada correctamente:</span>
                          <img 
                            src={addUploadedImage} 
                            alt="Vista previa de subida" 
                            style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--c-border)' }} 
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <div style={{ gridColumn: 'span 2' }}>
                    <label className="control-label">Descripción</label>
                    <textarea 
                      name="description" 
                      className="customizer-input" 
                      style={{ height: '70px', resize: 'none' }}
                      value={newProduct.description} 
                      onChange={handleFormChange}
                      placeholder="Breve descripción del producto..."
                    />
                  </div>

                  <div>
                    <label className="control-label">Materiales</label>
                    <input 
                      type="text" 
                      name="material" 
                      className="customizer-input" 
                      value={newProduct.material} 
                      onChange={handleFormChange}
                      placeholder="Ej: Calabaza y Cuero Legítimo"
                    />
                  </div>

                  <div>
                    <label className="control-label">Tipo de Virola</label>
                    <input 
                      type="text" 
                      name="virola" 
                      className="customizer-input" 
                      value={newProduct.virola} 
                      onChange={handleFormChange}
                      placeholder="Ej: Alpaca Cincelada"
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                    <input 
                      type="checkbox" 
                      id="canEngrave"
                      name="canEngrave" 
                      checked={newProduct.canEngrave} 
                      onChange={handleFormChange} 
                    />
                    <label htmlFor="canEngrave" className="control-label" style={{ cursor: 'pointer', margin: 0 }}>¿Admite grabado?</label>
                  </div>

                  {newProduct.canEngrave && (
                    <div>
                      <label className="control-label">Área de Grabado</label>
                      <select 
                        name="engravingArea" 
                        className="font-selector-select" 
                        value={newProduct.engravingArea} 
                        onChange={handleFormChange}
                      >
                        <option value="virola">Virola (Metal)</option>
                        <option value="cuerpo">Cuerpo (Cuero/Madera)</option>
                      </select>
                    </div>
                  )}

                  <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <button type="submit" className="btn-primary" style={{ padding: '12px 30px' }}>
                      Cargar Producto
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* INVENTORY LIST */}
            <div className="admin-card-table">
              <div className="admin-table-header">Control de Stock y Edición</div>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Foto</th>
                      <th>Producto</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th>Stock Disponible</th>
                      <th>Acciones de Stock</th>
                      <th>Edición</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <img 
                            src={p.images[0]} 
                            alt={p.name} 
                            style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--c-border)' }} 
                          />
                        </td>
                        <td>
                          <strong>{p.name}</strong>
                          <div style={{ fontSize: '10px', color: 'var(--c-text-muted)' }}>ID: {p.id}</div>
                        </td>
                        <td style={{ textTransform: 'uppercase' }}>{p.category === 'mates' ? `Mate (${p.mateType})` : 'Accesorios'}</td>
                        <td><strong>${p.price.toLocaleString('es-AR')}</strong></td>
                        <td>
                          <span 
                            style={{ 
                              padding: '2px 8px', 
                              borderRadius: '4px',
                              backgroundColor: p.stock <= 5 ? '#fef5e7' : '#ebf3ee',
                              color: p.stock <= 5 ? '#d68910' : 'var(--c-mate-green)',
                              fontWeight: 'bold'
                            }}
                          >
                            {p.stock} unidades
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                              type="button"
                              className="admin-action-btn"
                              style={{ backgroundColor: '#2a563c' }}
                              onClick={() => onUpdateProductStock(p.id, p.stock + 5)}
                            >
                              +5 Stock
                            </button>
                            <button 
                              type="button"
                              className="admin-action-btn"
                              style={{ backgroundColor: '#c0392b' }}
                              disabled={p.stock <= 0}
                              onClick={() => onUpdateProductStock(p.id, Math.max(0, p.stock - 1))}
                            >
                              -1 Stock
                            </button>
                          </div>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="admin-action-btn"
                            style={{ backgroundColor: 'var(--c-leather-light)', display: 'flex', alignItems: 'center', gap: '4px' }}
                            onClick={() => handleOpenEditModal(p)}
                          >
                            <Edit size={12} />
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div className="modal-backdrop" onClick={() => setEditingProduct(null)}>
          <div className="modal-container" style={{ maxWidth: '750px', padding: '30px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setEditingProduct(null)}>
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-sans)', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--c-border)', paddingBottom: '10px' }}>
              <Edit size={20} style={{ color: 'var(--c-gold)' }} />
              Editar Producto: <span style={{ color: 'var(--c-leather-medium)' }}>{editingProduct.name}</span>
            </h3>

            <form onSubmit={handleEditSubmit}>
              <div className="admin-form-grid">
                <div>
                  <label className="control-label">Nombre del Producto *</label>
                  <input 
                    type="text" 
                    name="name" 
                    className="customizer-input" 
                    value={editingProduct.name} 
                    onChange={handleEditChange} 
                    required 
                  />
                </div>

                <div>
                  <label className="control-label">Categoría</label>
                  <select 
                    name="category" 
                    className="font-selector-select" 
                    value={editingProduct.category} 
                    onChange={handleEditChange}
                  >
                    <option value="mates">Mates Premium</option>
                    <option value="accesorios">Accesorios y Matería</option>
                  </select>
                </div>

                {editingProduct.category === 'mates' && (
                  <div>
                    <label className="control-label">Tipo de Mate</label>
                    <select 
                      name="mateType" 
                      className="font-selector-select" 
                      value={editingProduct.mateType || 'imperial'} 
                      onChange={handleEditChange}
                    >
                      <option value="imperial">Imperial</option>
                      <option value="camionero">Camionero</option>
                      <option value="torpedo">Torpedo</option>
                      <option value="madera">Madera</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="control-label">Precio ($ ARS) *</label>
                  <input 
                    type="number" 
                    name="price" 
                    className="customizer-input" 
                    value={editingProduct.price} 
                    onChange={handleEditChange} 
                    required 
                  />
                </div>

                <div>
                  <label className="control-label">Stock Actual</label>
                  <input 
                    type="number" 
                    name="stock" 
                    className="customizer-input" 
                    value={editingProduct.stock} 
                    onChange={handleEditChange}
                  />
                </div>

                {/* IMAGE ORIGIN FOR EDIT */}
                <div>
                  <label className="control-label">Cambiar Foto (Origen)</label>
                  <select
                    className="font-selector-select"
                    value={editImageSelection}
                    onChange={(e) => setEditImageSelection(e.target.value)}
                  >
                    {PRELOADED_IMAGES.map((img) => (
                      <option key={img.value} value={img.value}>{img.label}</option>
                    ))}
                  </select>
                </div>

                {/* EDIT CONDITIONAL IMAGE INPUTS */}
                {editImageSelection === 'custom' && (
                  <div style={{ gridColumn: 'span 2' }}>
                    <label className="control-label">URL de Imagen Personalizada</label>
                    <input
                      type="text"
                      className="customizer-input"
                      value={editCustomImageUrl}
                      onChange={(e) => setEditCustomImageUrl(e.target.value)}
                      placeholder="https://ejemplo.com/foto.jpg"
                    />
                  </div>
                )}

                {editImageSelection === 'upload' && (
                  <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label className="control-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      <Upload size={14} />
                      Subir Nuevo Archivo para Reemplazar Foto
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="customizer-input"
                      style={{ padding: '8px 12px' }}
                      onChange={handleFileChangeForEdit}
                    />
                    {editUploadedImage && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--c-mate-green)', fontWeight: 'bold' }}>✓ Nueva foto cargada:</span>
                        <img 
                          src={editUploadedImage} 
                          alt="Vista previa de reemplazo" 
                          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--c-border)' }} 
                        />
                      </div>
                    )}
                  </div>
                )}

                <div style={{ gridColumn: 'span 2' }}>
                  <label className="control-label">Descripción</label>
                  <textarea 
                    name="description" 
                    className="customizer-input" 
                    style={{ height: '70px', resize: 'none' }}
                    value={editingProduct.description} 
                    onChange={handleEditChange}
                  />
                </div>

                <div>
                  <label className="control-label">Materiales</label>
                  <input 
                    type="text" 
                    name="material" 
                    className="customizer-input" 
                    value={editingProduct.material} 
                    onChange={handleEditChange}
                  />
                </div>

                <div>
                  <label className="control-label">Tipo de Virola</label>
                  <input 
                    type="text" 
                    name="virola" 
                    className="customizer-input" 
                    value={editingProduct.virola} 
                    onChange={handleEditChange}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                  <input 
                    type="checkbox" 
                    id="editCanEngrave"
                    name="canEngrave" 
                    checked={editingProduct.canEngrave} 
                    onChange={handleEditChange} 
                  />
                  <label htmlFor="editCanEngrave" className="control-label" style={{ cursor: 'pointer', margin: 0 }}>¿Admite grabado?</label>
                </div>

                {editingProduct.canEngrave && (
                  <div>
                    <label className="control-label">Área de Grabado</label>
                    <select 
                      name="engravingArea" 
                      className="font-selector-select" 
                      value={editingProduct.engravingArea || 'virola'} 
                      onChange={handleEditChange}
                    >
                      <option value="virola">Virola (Metal)</option>
                      <option value="cuerpo">Cuerpo (Cuero/Madera)</option>
                    </select>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px', borderTop: '1px solid var(--c-border)', paddingTop: '16px' }}>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  style={{ color: 'var(--c-text-dark)', borderColor: 'var(--c-border)', padding: '10px 20px', fontSize: '11px' }}
                  onClick={() => setEditingProduct(null)}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ padding: '10px 24px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Save size={14} />
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
