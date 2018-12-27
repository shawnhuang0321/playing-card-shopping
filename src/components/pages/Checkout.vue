<template>
  <div class="checkout">
    <h2 class="title"><i class="fas fa-shopping-cart"></i>購物車</h2>
    <OrderList
      :cart="cart"
      :allowDelete="true"
      @handleButtonClick="onButtonClick">
      <div class="coupon">
        <input
          v-model="coupon.code"
          type="text"
          placeholder="請輸入優惠碼，可以使用 magicisgood">
        <div class="btn-group">
          <button class="btn" @click="toFrontPage">手癢繼續逛</button>
          <button class="btn" @click="useCoupon">套用優惠卷</button>
        </div>
      </div>
    </OrderList>
    <div class="order">
      <h2 class="title">訂單資訊</h2>
      <label for="email">信箱</label>
      <input
        v-model="order.user.email"
        v-validate="'required|email'"
        id="email"
        name="email"
        type="text"
        placeholder="請輸入 E-mail">
      <span style="color: red;">{{ errors.first('email') }}</span>
      <label for="name">收件人姓名</label>
      <input
        v-model="order.user.name"
        v-validate="'required'"
        id="name"
        name="name"
        type="text"
        placeholder="請輸入姓名">
      <span style="color: red;">{{ errors.first('name') }}</span>
      <label for="tel">收件人電話</label>
      <input
        v-model="order.user.tel"
        v-validate="'required'"
        id="tel"
        name="tel"
        type="text"
        placeholder="請輸入電話">
      <span style="color: red;">{{ errors.first('tel') }}</span>
      <label for="address">收件人地址</label>
      <input
        v-model="order.user.address"
        v-validate="'required'"
        id="address"
        name="address"
        type="text"
        placeholder="請輸入地址">
      <span style="color: red;">{{ errors.first('address') }}</span>
      <label for="message">備註</label>
      <textarea
        v-model="message"
        id="message"
        type="text"></textarea>
      <button class="btn" @click="postOrder">送出訂單</button>
    </div>
  </div>
</template>

<script>
import OrderList from '@/components/OrderList';

import { mapState, mapActions } from 'vuex';

export default {
  name: 'Checkout',
  data() {
    return {
      coupon: {
        code: '',
      },
      order: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
      },
      message: '',
    }
  },
  components: {
    OrderList,
  },
  watch: {
    orderId: 'redirectToComfirm',
  },
  computed: {
    ...mapState('cart', ['cart', 'orderId']),
  },
  methods: {
    ...mapActions('cart', ['removeProductFromCart', 'getDiscount', 'sendOrder']),
    ...mapActions('modal', ['addMessage']),
    onButtonClick(id) {
      this.removeProductFromCart(id);
    },
    toFrontPage() {
      this.$router.go(-1);
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
    postOrder() {
      this.$validator.validate().then(result => {
        if (!result) {
          const message = {
            content: '訂單資訊填寫不完整',
            type: 'danger',
          }
          this.addMessage(message);
        }
        else {
          const { order } = this;
          this.sendOrder({ order, message });
        }
      })
    },
    redirectToComfirm() {
      const { orderId } = this;
      this.$router.push({ name: 'Comfirm', params: { id: orderId } });
    }
  }
}
</script>

<style lang="scss" scoped>
.checkout {
  width: 50%;
  margin: 0 auto;
}

.title {
  font-size: 2rem;
  text-align: center;

  i {
    margin-right: 1rem;
  }
}

.coupon {
  flex: 1;
  padding: 0 .25rem;
  
  input {
    width: 100%;
    padding: .45rem;
    margin-right: .25rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: .25rem;
    outline: none;
  }
}

.btn-group {
  display: flex;
  justify-content: space-between;
  margin-top: .5rem;

  .btn {
    width: 48%;
    font-size: 1rem;
    padding: .25rem 0;
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

.order {
  width: 100%;

  label {
    display: block;
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: .5rem;
  }

  input, textarea {
    width: 100%;
    font-size: 1rem;
    padding: .5rem;
    margin-bottom: .5rem;
    outline: none;
    border: 1px solid #ddd;
    border-radius: .25rem;
  }

  textarea {
    height: 200px;
  }

  .btn {
    width: 10rem;
    font-size: 1rem;
    padding: .5rem 0;
    display: block;
    margin: 0 auto;
    background: green;
    color: white;
    border: 1px solid transparent;
    border-radius: .25rem;
    cursor: pointer;
    transition: all .2s ease;

    &:hover, &:focus {
      background: white;
      color: green;
      border-color: green;
    }
  }
}

@media screen and (max-width: 800px) {
  .checkout {
    width: 80%;
  }
}

@media screen and (max-width: 640px) {
  .checkout {
    width: 95%;
  }
}
</style>