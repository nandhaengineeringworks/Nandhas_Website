'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('nandhas_cart');
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveCart = (items) => {
    setCartItems(items);
    try {
      localStorage.setItem('nandhas_cart', JSON.stringify(items));
    } catch (e) {}
  };

  const addToCart = (product, variant = null, quantity = 1) => {
    const itemKey = `${product.id}-${variant?.id || 'base'}`;
    const existingIndex = cartItems.findIndex(i => i.itemKey === itemKey);

    let updated = [...cartItems];
    if (existingIndex > -1) {
      updated[existingIndex].quantity += quantity;
    } else {
      updated.push({
        itemKey,
        productId: product.id,
        name: product.name,
        slug: product.slug,
        primaryImageUrl: product.primaryImageUrl,
        variantId: variant?.id || null,
        variantName: variant?.variantName || null,
        sku: variant?.sku || product.sku,
        unitPrice: variant?.price || product.price || 0,
        quantity,
      });
    }
    saveCart(updated);
  };

  const updateQuantity = (itemKey, delta) => {
    const updated = cartItems
      .map(item => {
        if (item.itemKey === itemKey) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean);
    saveCart(updated);
  };

  const removeFromCart = (itemKey) => {
    const updated = cartItems.filter(i => i.itemKey !== itemKey);
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartSubtotal = cartItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const gstTax = cartSubtotal * 0.18;
  const cartTotal = cartSubtotal + gstTax;
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        gstTax,
        cartTotal,
        totalItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
