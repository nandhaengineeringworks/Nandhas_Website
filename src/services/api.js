import axios from 'axios';

// API Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.nandhas.in/api';

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

/**
 * Authenticate user/admin via the backend JWT login endpoint.
 * Endpoint: POST /api/auth/login  (public — no token required)
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ token: string, tokenType: string, id, email, fullName, role }>}
 */
export const loginUser = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  // Backend wraps response in ApiResponse<AuthResponseDTO>
  return res.data?.data || res.data;
};

/**
 * Check if a customer mobile number exists in the backend database.
 * Endpoint: GET /api/auth/check-phone
 * @param {string} phone
 * @returns {Promise<{ exists: boolean, fullName?: string, email?: string }>}
 */
export const checkPhoneNumber = async (phone) => {
  try {
    const res = await api.get('/auth/check-phone', { params: { phone } });
    return res.data?.data || { exists: false };
  } catch (err) {
    console.error('checkPhoneNumber error:', err);
    return { exists: false };
  }
};

/**
 * Authenticate user via Firebase Phone Auth ID token.
 * Endpoint: POST /api/auth/firebase
 * @param {string} firebaseIdToken
 * @param {string} fullName (Optional) for new customers
 * @param {string} email (Optional) for new customers
 * @returns {Promise<{ token: string, tokenType: string, id, email, fullName, role }>}
 */
export const loginWithFirebase = async (firebaseIdToken, fullName = null, email = null) => {
  const payload = {};
  if (fullName) payload.fullName = fullName;
  if (email) payload.email = email;
  const res = await api.post('/auth/firebase', payload, {
    headers: {
      Authorization: `Bearer ${firebaseIdToken}`
    }
  });
  return res.data?.data || res.data;
};

export default api;
