import axios from 'axios';

// Configurar base URL da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Criar instância do axios com configurações padrão
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Funções de API
export const authAPI = {
  loginWallet: (walletAddress) => api.post('/auth/login-wallet/', { wallet_address: walletAddress }),
  getUser: () => api.get('/users/me/'),
};

export const productsAPI = {
  getProducts: (params) => api.get('/products/', { params }),
  getProduct: (id) => api.get(`/products/${id}/`),
};

export const inventoryAPI = {
  getInventory: () => api.get('/inventory/'),
  equipItem: (inventoryId, slot) => api.post('/inventory/equip/', { inventory_id: inventoryId, slot }),
  sellItem: (inventoryId, price) => api.post('/inventory/sell/', { inventory_id: inventoryId, price }),
};

export const ordersAPI = {
  getOrders: (params) => api.get('/orders/', { params }),
  createOrder: (orderData) => api.post('/orders/', orderData),
  payOrder: (orderId) => api.post(`/orders/${orderId}/pay/`),
  shipOrder: (orderId) => api.post(`/orders/${orderId}/ship/`),
  deliverOrder: (orderId) => api.post(`/orders/${orderId}/deliver/`),
};

export const transactionsAPI = {
  getTransactions: () => api.get('/transactions/'),
};

export const balanceAPI = {
  getBalance: () => api.get('/balance/'),
};

export default api;
