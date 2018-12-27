import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/pages/Home';
import Product from '@/components/pages/Product';
import ProductInfo from '@/components/pages/ProductInfo';
import Checkout from '@/components/pages/Checkout';
import Comfirm from '@/components/pages/Comfirm';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/product",
      name: "Product",
      component: Product
    },
    {
      path: "/product/:id",
      name: "ProductInfo",
      component: ProductInfo
    },
    {
      path: "/checkout",
      name: "Checkout",
      component: Checkout
    },
    {
      path: "/comfirm/:id",
      name: "Comfirm",
      component: Comfirm
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});