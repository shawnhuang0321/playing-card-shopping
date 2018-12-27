<template>
  <div>
    <div class="cart" :class="{ 'showCart': showCart }">
      <h2 class="title">我的購物車</h2>
      <div class="list">
        <h4 class="empty" v-if="cart.carts.length === 0">購物車內尚無任何商品</h4>
        <table v-else>
          <thead>
            <tr>
              <td>名稱</td>
              <td>數量</td>
              <td>金額</td>
              <td>刪除</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td>{{ item.product.title }}
                <p
                  v-if="item.final_total !== item.total"
                  style="color: #26C281; font-size: 14px;">已套用優惠卷</p>
              </td>
              <td>{{ item.qty }}{{ item.product.unit }}</td>
              <td>{{ item.final_total }}元</td>
              <td>
                <a href="#" @click.prevent="removeProductFromCart(item.id)"><i class="fas fa-trash-alt"></i></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4 class="total">總計：<span>{{ cart.final_total }}</span>元</h4>
      <div class="coupon">
        <input 
          v-model="coupon.code"
          type="text"
          placeholder="請輸入優惠碼，可以使用 magicisgood">
        <button class="coupon-btn" @click="useCoupon">套用優惠卷</button>
      </div>
      <div class="btn-group">
        <button class="btn" @click="showCart = false">手癢繼續逛</button>
        <button class="btn" @click="toCheckOut">結帳去</button>
      </div>
    </div>
    <div class="basket" @click="showCart = !showCart">
      <p>{{ cart.carts.length }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Cart',
  data: () => ({
    showCart: false,
    coupon: {
      code: '',
    },
  }),
  computed: {
    ...mapState('cart', ['cart']),
  },
  methods: {
    ...mapActions('cart', ['removeProductFromCart', 'getDiscount']),
    ...mapActions('modal', ['addMessage']),
    toCheckOut() {
      if (this.cart.carts.length === 0) {
        const message = {
          content: '購物車內無商品',
          type: 'danger',
        }
        this.addMessage(message);
        return;
      }
      this.$router.push({ name: 'Checkout' });
    },
    useCoupon() {
      if (this.coupon.code.trim() === '') {
        const message = {
          content: '請輸入優惠碼再套用',
          type: 'danger',
        }
        this.addMessage(message);
        return;
      }
      this.getDiscount(this.coupon);
    },
  },
}
</script>

<style lang="scss" scoped>
@mixin scrollbars($size, $thumb-color, $background-color) {
  ::-webkit-scrollbar {
    width: $size;
    background: $background-color;
    cursor: pointer;
  }
  ::-webkit-scrollbar-thumb {
    background: $thumb-color;
    cursor: pointer;
  }
}

.cart {
  @include scrollbars(5px, red, #ddd);
  position: fixed;
  top: 10%;
  left: 50%;
  width: 418px;
  height: 600px;
  padding: 1rem .5rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: .5rem;
  z-index: 1;
  transform: translate(-50%, -50%) scale(0);
  transition: all .2s ease;
}

.showCart {
  transform: translate(-50%, 0%) scale(1);
}

.title {
  text-align: center;
}

.list {
  height: 300px;
  overflow-y: auto;
  margin: 1rem;
}

.empty {
  font-size: 1.2rem;
  text-align: center;
  background: #ddd;
  margin: 1rem;
  padding: 1rem 0;
  border-radius: .5rem;
}

table {
  width: 100%;
  border-collapse: collapse;

  thead {
    background: #ffe58d;

    td {
      font-weight: 600;
    }
  }

  tr:nth-child(even) {
    background: #fff9c1;
  }

  td {
    text-align: center;
    padding: .25rem 0;
    font-weight: 400;
  }

  a {
    font-size: 1.2rem;
  }
}

.total {
  text-align: center;
  font-size: 1.4rem;
  color: #26C281;
}

.coupon {
  display: flex;
  margin-top: 1rem;
  
  input {
    flex: 3;
    padding: .45rem;
    margin-right: .25rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: .25rem;
    outline: none;
  }

  button {
    flex: 1;
    font-size: 1rem;
    background: green;
    color: white;
    border: 1px solid transparent;
    border-radius: .25rem;
    cursor: pointer;
    transition: all .2s ease;

    &:hover, &:focus {
      color: green;
      background: white;
      border-color: green;
    }
  }
}

.btn-group {
  
  .btn {
    width: 100%;
    padding: .5rem;
    margin-top: .8rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: .25rem;
    cursor: pointer;
    transition: all .2s ease;

    &:hover, &:focus {
      background: #ffe58d;
      border-color: transparent;
    }
  }
}

.basket {
  position: fixed;
  width: 64px;
  height: 64px;
  bottom: 50px;
  right: 50px;
  cursor: pointer;
  background-image: url(../assets/images/basket.png);
  background-position: center center;
  background-size: cover;
  z-index: 1;

  p {
    width: 24px;
    font-size: 14px;
    text-align: center;
    background: red;
    color: white;
    border-radius: 50%;
    border: 2px solid white;
  }
}

@media screen and (max-width: 800px) {
  .basket {
    bottom: 15px;
    right: 15px;
  }
}

@media screen and (max-width: 640px) {
  .cart {
    width: 370px;
    height: 580px;
  }
  .coupon {

    .coupon-btn {
      font-size: .8rem;
    }
  }

  .basket {
    width: 40px;
    height: 40px;
    bottom: 20px;
    right: 20px;

    p {
      width: 21px;
      font-size: 12px;
    }
  }
}

@media screen and (max-width: 374px) {
  .cart {
    width: 300px;
    height: 500px;
  }
  .coupon {

    .coupon-btn {
      font-size: .6rem;
    }
  }

  .list {
    height: 200px;
  }
}

</style>