'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Trash2, Plus, Minus, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/api';

export default function CartCheckoutPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartSubtotal, gstTax, cartTotal } = useCart();
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    companyName: '',
    shippingAddress: '',
    city: '',
    state: '',
    postalCode: '',
    paymentMethod: 'ONLINE_UPI',
  });
  const [loading, setLoading] = useState(false);
  const [orderResult, setOrderResult] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    setLoading(true);

    try {
      const payload = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        companyName: formData.companyName,
        shippingAddress: formData.shippingAddress,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        paymentMethod: formData.paymentMethod,
        items: cartItems.map(i => ({
          productId: i.productId,
          variantId: i.variantId,
          variantName: i.variantName,
          quantity: i.quantity,
        })),
      };

      const res = await createOrder(payload);
      setOrderResult(res.data);
      clearCart();
    } catch (err) {
      alert('Order placement failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (orderResult) {
    return (
      <div className="bg-slate-50 min-h-screen py-10 sm:py-16 w-full max-w-full overflow-x-hidden">
        <div className="max-w-xl mx-auto px-4 bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-200 text-center space-y-6 shadow-xl">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Order Confirmed</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display mt-1">Thank You for Your Order!</h2>
            <p className="text-xs text-slate-500 mt-1 font-mono">Order Number: <strong>{orderResult.orderNumber}</strong></p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-left space-y-2 text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-500">Customer:</span>
              <strong className="text-slate-900">{orderResult.customerName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Grand Total (inc. 18% GST):</span>
              <strong className="text-slate-900">{formatPrice(orderResult.totalAmount)}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Status:</span>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">{orderResult.status}</span>
            </div>
          </div>

          <Link
            href="/"
            className="inline-block w-full sm:w-auto px-8 py-3 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-500 transition shadow"
          >
            Back to Home Storefront
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10 w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2 text-xs text-slate-500 overflow-hidden">
            <Link href="/" className="hover:text-brand-600 shrink-0">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="font-semibold text-slate-900 truncate">Shopping Cart &amp; Direct Checkout</span>
          </div>
          <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-slate-900 font-display">
            Shopping Cart &amp; Direct Order
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-16 text-center border border-slate-200 space-y-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
              <ShoppingCart className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800">Your Cart is Empty</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven&apos;t added any equipment or panels for direct checkout. Most machinery is quote-driven.
            </p>
            <Link
              href="/machinery"
              className="inline-flex items-center px-6 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-500 transition shadow"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              <span>Explore Products</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4 w-full min-w-0">
              <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Cart Items ({cartItems.length})
                </h3>

                <div className="divide-y divide-slate-100">
                  {cartItems.map((item) => (
                    <div key={item.itemKey} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                      
                      {/* Item Details */}
                      <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          <img src={item.primaryImageUrl} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <strong className="text-xs sm:text-sm text-slate-900 block truncate">{item.name}</strong>
                          {item.variantName && (
                            <span className="text-[11px] text-brand-600 font-semibold block truncate">{item.variantName}</span>
                          )}
                          <span className="text-[11px] text-slate-500 font-mono">{formatPrice(item.unitPrice)} each</span>
                        </div>
                      </div>

                      {/* Quantity & Actions Bar */}
                      <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4 pt-2 sm:pt-0 border-t border-slate-50 sm:border-t-0">
                        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                          <button
                            onClick={() => updateQuantity(item.itemKey, -1)}
                            className="p-1.5 sm:p-2 text-slate-600 hover:bg-slate-200"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 sm:px-3 text-xs font-bold text-slate-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.itemKey, 1)}
                            className="p-1.5 sm:p-2 text-slate-600 hover:bg-slate-200"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <strong className="text-xs sm:text-sm font-black text-slate-900 font-display shrink-0">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </strong>

                        <button
                          onClick={() => removeFromCart(item.itemKey)}
                          className="p-2 text-slate-400 hover:text-red-500 transition shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Billing & Order Form */}
            <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-5 w-full min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                Order Summary &amp; Checkout
              </h3>

              <div className="space-y-2 text-xs border-b border-slate-100 pb-4">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST Tax (18% FSSAI/Industrial)</span>
                  <span className="font-semibold text-slate-900">{formatPrice(gstTax)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                  <span>Grand Total</span>
                  <span className="text-brand-600">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handlePlaceOrder} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="Customer Name"
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Shipping Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.shippingAddress}
                    onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                    placeholder="Plant / Site Address"
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="City"
                    className="p-2.5 rounded-xl border border-slate-200 outline-none"
                  />
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="State"
                    className="p-2.5 rounded-xl border border-slate-200 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow transition disabled:opacity-50 mt-2"
                >
                  {loading ? 'Processing Order...' : 'Place Official Order'}
                </button>
              </form>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
