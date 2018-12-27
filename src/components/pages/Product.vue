<template>
  <div class="container">
    <div class="nav">
      <div
        class="nav-item"
        :class="{ 'active': categoryFilter === 'All' }">
        <a class="link" href="#" @click.prevent="filterProducts('All')">
          <i class="fas fa-chevron-right"></i>All
        </a>
      </div>
      <div
        class="nav-item"
        :class="{ 'active': categoryFilter === 'Fontaine' }">
        <a class="link" href="#" @click.prevent="filterProducts('Fontaine')">
          <i class="fas fa-chevron-right"></i>Fontaine
        </a>
      </div>
      <div
        class="nav-item"
        :class="{ 'active': categoryFilter === 'Ellusionist' }">
        <a class="link" href="#" @click.prevent="filterProducts('Ellusionist')">
          <i class="fas fa-chevron-right"></i>Ellusionist
        </a>
      </div>
      <div
        class="nav-item"
        :class="{ 'active': categoryFilter === 'Theory11' }">
        <a class="link" href="#" @click.prevent="filterProducts('Theory11')">
          <i class="fas fa-chevron-right"></i>Theory11
        </a>
      </div>
    </div>
    <div class="main">
      <h4>{{ categoryFilter }}</h4>
      <div class="product-list">
        <div class="card" v-for="item in filtedProducts" :key="item.id">
          <div class="category"
            :style="{ background: colorInfo(item.category) }"
          >{{ item.category }}</div>
          <div class="card-img">
            <div class="img" :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
          </div>
          <h4 class="title">{{ item.title }}</h4>
          <p class="desc">{{ item.description }}</p>
          <div class="price">
            <h4>特價 {{ item.price }}元</h4>
            <p>原價 {{ item.origin_price }}元</p>
          </div>
          <div class="btn-group">
            <button v-if="item.is_enabled === 1" class="btn" @click="getDetail(item.id)">詳細介紹</button>
            <button v-if="item.is_enabled === 1" class="btn" @click="addProductToCart(item.id)">加入購物車</button>
            <button v-else class="btn btn--out_stock">尚無庫存</button>
          </div>
        </div>
      </div>
    </div>
    <Cart />
  </div>
</template>

<script>
import Cart from '@/components/Cart';
import commonTools from '@/utils/commonTools';

import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'Products',
  mixins: [
    commonTools,
  ],
  components: {
    Cart,
  },
  computed: {
    ...mapState('product', ['products', 'categoryFilter']),
    ...mapGetters('product', ['filtedProducts']),
  },
  methods: {
    ...mapActions('product', ['getProducts', 'filterProducts']),
    ...mapActions('cart', ['addToCart']),
    toProductInfo() {
      this.$router.push({ name: 'ProductInfo' });
    },
    getDetail(id) {
      this.$router.push({ name: 'ProductInfo', params: { id } });
    },
    addProductToCart(id) {
      const product = {
        product_id: id,
        qty: 1
      };
      this.addToCart(product);
    },
  },
  created() {
    this.getProducts();
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 80%;
  margin: 0 auto;
}

.nav {
  flex: 1;
  margin-right: 1.4rem;

  .active {
    background: #ddd;
    border-color: black;
  }

  &-item {
    border: 1px solid #ddd;
    border-radius: .25rem;
    margin-bottom: 1rem;
    transition: all .2s ease;

    &:hover, &:focus {
      border-color: red;
    }

    .link {
      width: 100%;
      display: inline-block;
      padding: .5rem 1rem;
      font-size: 1.2rem;
    }

    i {
      margin-right: 1rem;
    }
  }
}

.main {
  flex: 5;
  border: 1px solid #ddd;
  border-radius: .25rem;
  padding: .8rem;

  h4 {
    color: green;
    font-size: 26px;
    margin: .5rem 0;
  }
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.card {
  width: 300px;
  position: relative;
  padding: 2rem 1rem 1rem;
  margin: 0 .8rem 1rem 0;
  border: 1px solid #ddd;
  border-radius: .25rem;

  .category {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: .4rem .6rem;
    color: white;
    border-radius: .25rem;
  }

  &-img {
    width: 100%;
    height: 300px;
    overflow: hidden;
    margin-top: 1rem;
  }

  .img {
    width: 100%;
    height: 100%;
    background-position: center center;
    background-size: cover;
  }

  .title {
    font-size: 1.5rem;
    margin-top: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .desc {
    color: dimgrey;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .price {
    display: flex;
    border-top: 1px solid rgba(0, 0, 0, .3);

    h4 {
      font-size: 1.2rem;
      color: #26C281;
      letter-spacing: 1px;
    }

    p {
      color: dimgrey;
      font-size: .8rem;
      text-decoration: line-through;
      font-style: italic;
      padding-top: 14px;
      margin-left: auto;
    }
  }
}

.btn-group {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, .5);
  border-radius: .25rem;
  width: 100%;
  height: 100%;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .3s ease;

  &:hover {
    opacity: 1;
  }

  .btn {
    cursor: pointer;
    font-size: 1rem;
    color: azure;
    background: transparent;
    border: 1px solid azure;
    border-radius: .25rem;
    margin: 0 .5rem;
    padding: .5rem 1rem;
    transition: all .3s ease;

    &:hover {
      color: rgba(0, 0, 0, .5);
      border-color: transparent;
      background: azure;
    }

    &--out_stock {
      background: red;
      border-color: white;
      color: white;
    }
  }
}

@media screen and (max-width: 800px) {
  .container {
    width: 85%;
    flex-direction: column;
  }

  .nav {
    display: flex;
    justify-content: center;
    margin-right: 0;

    &-item {
      width: 25%;
      margin: 0 .5rem 1rem;
    }
  }

  .product-list {
    justify-content: center;
  }

  .card {
    width: 45%;

    &:nth-child(even) {
      margin-right: 0;
    }
  }

  .btn-group {
    position: relative;
    opacity: 1;
    width: 100%;
    height: 50px;
    background: white;

    .btn {
      flex: 1;
      margin: 0 .25rem;
      color: black;
      border: 1px solid black;
      transition: all .1s ease;

      &:focus, &:hover {
        color: white;
        background: green;
        border-color: transparent;
      }

      &--out_stock {
        background: red;
        border-color: #721c24;
        color: white;

        &:focus, &:hover {
          background: red;
          border-color: #721c24;
          color: white;
        }
      }
    }
  }
}

@media screen and (max-width: 640px) {
  .container {
    width: 100%;
    flex-direction: column;
  }

  .main {
    border-radius: 0;
    border: none;
  }

  .nav {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-right: 0;

    &-item {
      width: 45%;
      margin: 0 .5rem 1rem;
    }
  }

  .product-list {
    justify-content: center;
  }

  .card {
    width: 100%;
    margin-right: 0;
  }
}

@media screen and (max-width: 320px) {
  .nav > .nav-item > .link {
    font-size: 1rem;
  }
}
</style>