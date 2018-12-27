<template>
  <div class="container">
    <div class="left">
      <div class="card-img">
        <div class="img" :style="{backgroundImage: `url(${tempProduct.imageUrl})`}"></div>
      </div>
      <h4 class="title">商品介紹</h4>
      <p class="desc">{{ tempProduct.duscription }}</p>
      <h4 class="title">運費資訊</h4>
      <p class="desc">無</p>
    </div>
    <div class="right">
      <h2 class="title">{{ tempProduct.title }}</h2>
      <p class="ori-price">原價 {{ tempProduct.origin_price }}元</p>
      <h4 class="price">特價 {{ tempProduct.price }}元</h4>
      <select v-model="order.num">
        <option v-for="i in 10" :value="i" :key="i">選購 {{i}} {{ tempProduct.unit }}</option>
      </select>
      <h4 class="total-price">選購 {{ order.num }} 件，共 <span>{{ order.num * tempProduct.price }}</span> 元</h4>
      <button class="btn" @click="addProductToCart(tempProduct.id, order.num)">加入購物車</button>
    </div>
    <Cart />
  </div>
</template>

<script>
import Cart from '@/components/Cart';

import { mapState, mapActions } from 'vuex';

export default {
  name: 'ProductInfo',
  data() {
    return {
      order: {
        num: 1,
      }
    }
  },
  components: {
    Cart,
  },
  computed: {
    ...mapState('product', ['tempProduct']),
  },
  methods: {
    ...mapActions('product', ['getProductDetail']),
    ...mapActions('cart', ['addToCart']),
    addProductToCart(id, qty) {
      const product = {
        product_id: id,
        qty
      }
      this.addToCart(product);
    }
  },
  created() {
    const { params: { id } } = this.$route;
    this.getProductDetail(id);
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 80%;
  margin: 0 auto;
}

.left, .right {
  flex: 1;
  padding: .5rem 1.5rem;
  border: 1px solid #ddd;
  border-radius: .25rem;
}

.left {
  margin-right: .5rem;

  .card-img {
    width: 100%;
    height: 300px;
    overflow: hidden;
    margin-top: 1rem;
  }

  .img {
    width: 50%;
    height: 100%;
    margin: 0 auto;
    background-position: center center;
    background-size: cover;
  }

  .title {
    font-size: 1.4rem;
    color: #555;
    padding: 1.2rem 0;
    border-bottom: 1px solid #ddd;
  }

  .desc {
    margin: 1rem 0;
  }
}

.right {
  
  .title {
    font-size: 1.8rem;
    margin: 2rem 0;
  }

  .ori-price {
    font-style: italic;
    font-size: .8rem;
    color: dimgrey;
    text-decoration: line-through;
  }

  .price {
    margin-top: .6rem;
    color: #26C281;
    font-size: 1.4rem;
  }

  select {
    width: 100%;
    font-size: 1.2rem;
    margin: .75rem 0;
    letter-spacing: 2px;
    font-family: Noto Sans TC,sans-serif;
  }

  .total-price {
    font-size: 1.2rem;

    span {
      color: red;
    }
  }

  .btn {
    width: 100%;
    font-size: 1.2rem;
    background: green;
    color: white;
    margin-top: .5rem;
    padding: .5rem 0;
    border: 1px solid transparent;
    border-radius: .25rem;
    cursor: pointer;
    transition: all .2s ease;

    &:hover, &:focus {
      color: green;
      background: white;
      border: 1px solid green;
    }
  }
}

@media screen and (max-width: 800px) {
  .left {

    .img {
      width: 100%;
    }
  }

  .right {
    select {
      outline: 1px solid rgb(166, 166, 166);
      background-color: rgb(248, 248, 248);
    }
  }
}

@media screen and (max-width: 640px) {
  .container {
    width: 95%;
    flex-direction: column;
  }

  .left {
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .right {
    padding-bottom: 1.5rem;
  }
}
</style>