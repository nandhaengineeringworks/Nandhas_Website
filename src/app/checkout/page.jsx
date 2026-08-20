'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingCart, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  AlertCircle, 
  ArrowLeft, 
  ChevronRight,
  Send,
  Building2
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/api';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    companyName: '',
    gstNumber: '',
    shippingAddress: '',
    city: '',
    state: 'Tamil Nadu',
    postalCode: '',
    paymentMethod: 'ONLINE_UPI_BANK_TRANSFER',
    orderNotes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [completedOrder, setCompletedOrder] = useState(null);

  const subtotal = cartTotal;
  const gstTax = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gstTax;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add products before checking out.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderPayload = {
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerEmail: formData.customerEmail,
        companyName: formData.companyName,
        gstNumber: formData.gstNumber,
        shippingAddress: formData.shippingAddress,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        paymentMethod: formData.paymentMethod,
        subtotalAmount: subtotal,
        taxAmount: gstTax,
        totalAmount: grandTotal,
        items: cartItems.map(item => ({
          productId: item.id,
          variantId: item.variant?.id || null,
          productName: item.name,
          variantName: item.variant?.variantName || null,
          sku: item.variant?.sku || item.sku || 'NAND-PROD',
          unitPrice: item.variant?.price || item.price || 0,
          quantity: item.quantity,
          totalPrice: (item.variant?.price || item.price || 0) * item.quantity,
        })),
        notes: formData.orderNotes,
      };

      const res = await createOrder(orderPayload);
      setCompletedOrder(res);
      clearCart();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please check your details or contact sales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-bg min-h-screen py-10 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-content-muted">
          <Link href="/" className="hover:text-navy-800 font-semibold">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/cart" className="hover:text-navy-800 font-semibold">Shopping Cart</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-content-main">Secure Checkout</span>
        </div>

        {/* Order Confirmation Screen */}
        {completedOrder ? (
          <div className="bg-white rounded-3xl border border-surface-border p-8 sm:p-12 text-center space-y-6 shadow-card animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-trust-green flex items-center justify-center mx-auto border border-emerald-100">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <span className="text-[10px] font-mono font-bold text-accent-orange uppercase tracking-widest block">
                ORDER ID #{completedOrder.orderNumber || completedOrder.id}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-navy-800 font-display">
                Order Placed Successfully!
              </h1>
              <p className="text-xs text-content-muted leading-relaxed">
                Thank you for your commercial purchase, <strong className="text-content-main">{formData.customerName}</strong>. Our logistics and accounts desk in Coimbatore has initiated your 18% GST tax invoice.
              </p>
            </div>

            {/* Order Invoice Summary */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-surface-border max-w-lg mx-auto text-xs space-y-2 text-left">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal:</span>
                <span className="font-mono font-bold text-content-main">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>18% GST Tax:</span>
                <span className="font-mono font-bold text-content-main">{formatPrice(gstTax)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold text-navy-800">
                <span>Grand Total (Inc. GST):</span>
                <span className="font-mono text-accent-orange font-black">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center space-x-4">
              <Link
                href="/machinery"
                className="px-8 py-3.5 bg-navy-800 hover:bg-navy-900 text-white font-bold text-xs rounded-xl shadow transition"
              >
                Continue Browsing Catalogue
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Checkout Form Column */}
            <form onSubmit={handlePlaceOrder} className="lg:col-span-8 bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-card space-y-8">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* 1. Contact Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-navy-800 border-b border-slate-100 pb-2">
                  1. Customer &amp; Billing Contact
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name / Authorized Purchaser *</label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full p-3 bg-slate-50 border border-surface-border rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-navy-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full p-3 bg-slate-50 border border-surface-border rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-navy-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address for GST Invoice *</label>
                    <input
                      type="email"
                      required
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      placeholder="accounts@company.com"
                      className="w-full p-3 bg-slate-50 border border-surface-border rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-navy-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Plant Name</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Apex Dairy Products Pvt Ltd"
                      className="w-full p-3 bg-slate-50 border border-surface-border rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-navy-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GSTIN Number (For 18% Input Tax Credit)</label>
                  <input
                    type="text"
                    value={formData.gstNumber}
                    onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                    placeholder="e.g. 33AABCN1234F1Z8"
                    className="w-full p-3 bg-slate-50 border border-surface-border rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-navy-800 font-mono uppercase"
                  />
                </div>
              </div>

              {/* 2. Shipping Address */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-navy-800 border-b border-slate-100 pb-2 flex items-center">
                  <Truck className="w-4 h-4 mr-2 text-accent-orange" />
                  2. Factory / Delivery Destination
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Plant Street Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.shippingAddress}
                    onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                    placeholder="Plot No. 45, Industrial Estate, Main Road"
                    className="w-full p-3 bg-slate-50 border border-surface-border rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-navy-800"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">City / District *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Coimbatore / Chennai"
                      className="w-full p-3 bg-slate-50 border border-surface-border rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-navy-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">State *</label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-surface-border rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-navy-800"
                    >
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Postal Code (PIN) *</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="641001"
                      className="w-full p-3 bg-slate-50 border border-surface-border rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-navy-800 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Payment Method */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-navy-800 border-b border-slate-100 pb-2 flex items-center">
                  <CreditCard className="w-4 h-4 mr-2 text-accent-orange" />
                  3. Commercial Payment Method
                </h3>

                <div className="space-y-2">
                  <label className="flex items-center justify-between p-4 rounded-2xl border border-navy-800 bg-navy-50/50 cursor-pointer">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === 'ONLINE_UPI_BANK_TRANSFER'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'ONLINE_UPI_BANK_TRANSFER' })}
                        className="w-4 h-4 text-navy-800"
                      />
                      <span className="ml-3 font-bold text-xs text-navy-800">Commercial Bank Transfer (RTGS / NEFT / UPI)</span>
                    </div>
                    <span className="text-[10px] font-mono text-trust-green font-bold">18% GST Direct Invoicing</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-navy-800 hover:bg-navy-900 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center uppercase tracking-wider disabled:opacity-50"
              >
                <span>{loading ? 'Transmitting Commercial Order...' : `Confirm Purchase & Generate Invoice (${formatPrice(grandTotal)})`}</span>
              </button>
            </form>

            {/* Right Order Summary Column */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-surface-border p-6 shadow-card space-y-5 sticky top-24">
              <h3 className="font-bold text-xs text-navy-800 uppercase tracking-wider border-b border-slate-100 pb-2">
                Order Summary ({cartItems.length} items)
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs pb-2 border-b border-slate-100">
                    <div>
                      <strong className="text-content-main block truncate max-w-[180px]">{item.name}</strong>
                      <span className="text-[10px] text-content-muted">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-mono font-bold text-content-main">
                      {formatPrice((item.variant?.price || item.price || 0) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Base Subtotal</span>
                  <span className="font-mono font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>18% GST Input Tax</span>
                  <span className="font-mono font-bold">{formatPrice(gstTax)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold text-navy-800">
                  <span>Total Amount</span>
                  <span className="font-mono text-accent-orange font-black">{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
