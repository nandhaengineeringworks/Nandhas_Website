import axios from 'axios';

// When running SSR, call http://localhost:8080/api directly, on client call /api
const isServer = typeof window === 'undefined';
const API_BASE_URL = isServer ? 'https://api.nandhas.in/api' : '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCategories = async (type, rootOnly = false) => {
  try {
    const params = {};
    if (type) params.type = type;
    if (rootOnly) params.rootOnly = rootOnly;
    const res = await api.get('/categories', { params });
    return res.data?.data || [];
  } catch (err) {
    console.error('getCategories error:', err.message);
    return [];
  }
};

export const getCategoryBySlug = async (slug) => {
  try {
    const res = await api.get(`/categories/${slug}`);
    return res.data?.data || null;
  } catch (err) {
    console.error('getCategoryBySlug error:', err.message);
    return null;
  }
};

export const getProducts = async (filters = {}) => {
  try {
    const res = await api.get('/products', { params: filters });
    return res.data?.data || { content: [], totalElements: 0, totalPages: 1 };
  } catch (err) {
    console.error('getProducts error:', err.message);
    return { content: [], totalElements: 0, totalPages: 1 };
  }
};

export const getProductBySlug = async (slug) => {
  try {
    const res = await api.get(`/products/${slug}`);
    return res.data?.data || null;
  } catch (err) {
    console.error('getProductBySlug error:', err.message);
    return null;
  }
};

export const getFeaturedProducts = async (type) => {
  try {
    const params = type ? { type } : {};
    const res = await api.get('/products/featured', { params });
    return res.data?.data || [];
  } catch (err) {
    console.error('getFeaturedProducts error:', err.message);
    return [];
  }
};

export const getRelatedProducts = async (id) => {
  try {
    const res = await api.get(`/products/${id}/related`);
    return res.data?.data || [];
  } catch (err) {
    console.error('getRelatedProducts error:', err.message);
    return [];
  }
};

export const getBanners = async (type) => {
  try {
    const params = type ? { type } : {};
    const res = await api.get('/banners', { params });
    return res.data?.data || [];
  } catch (err) {
    console.error('getBanners error:', err.message);
    return [];
  }
};

export const submitEnquiry = async (enquiryData) => {
  const res = await api.post('/enquiries', enquiryData);
  return res.data;
};

export const createOrder = async (orderData) => {
  const res = await api.post('/orders', orderData);
  return res.data;
};

export const lookupOrder = async (orderNumber) => {
  const res = await api.get(`/orders/lookup/${orderNumber}`);
  return res.data?.data || null;
};

export const getPublicSettings = async () => {
  try {
    const res = await api.get('/settings/public');
    return res.data?.data || { showPrices: false, b2bMode: true };
  } catch (err) {
    console.error('getPublicSettings error:', err.message);
    return { showPrices: false, b2bMode: true };
  }
};

export default api;
