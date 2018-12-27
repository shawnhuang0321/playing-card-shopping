import axios from 'axios';

// product
export const getProducts = () =>
  axios.get(`/products/all`);

export const getProductDetail = ({ id }) =>
  axios.get(`/product/${id}`);

// cart
export const addToCart = ({ product }) =>
  axios.post(`/cart`, { data: product });

export const getCartList = () =>
  axios.get('/cart');

export const removeProductFromCart = ({ id }) =>
  axios.delete(`/cart/${id}`);

export const getDiscount = ({ code }) =>
  axios.post(`/coupon`, { data: code });

export const sendOrder = ({ order, message }) =>
  axios.post(`/order`, { data: order, message });

export const getOrder = ({ id }) =>
  axios.get(`/order/${id}`);

export const payMoney = ({ id }) =>
  axios.post(`/pay/${id}`);