<template>
  <div class="checkout">
    <div v-if="!order.is_paid">
      <h2 class="title">確認訂單</h2>
      <OrderList
        :cart="cart"
        :allowDelete="false"/>
    </div>
    <h2 class="title">訂單資訊</h2>
    <table class="order-list">
      <tbody>
        <tr>
          <td>信箱</td>
          <td>{{ order.user.email }}</td>
        </tr>
        <tr>
          <td>姓名</td>
          <td>{{ order.user.name }}</td>
        </tr>
        <tr>
          <td>電話</td>
          <td>{{ order.user.tel }}</td>
        </tr>
        <tr>
          <td>地址</td>
          <td>{{ order.user.address }}</td>
        </tr>
        <tr>
          <td>付款狀態</td>
          <td>
            <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
            <span v-else class="text-success">已付款</span>
          </td>
        </tr>
      </tbody>
    </table>
    <button
      class="btn"
      v-if="!order.is_paid"
      @click="checkout">確認付款</button>
    <h2 v-else class="title text-success">感謝您的購買！</h2>
  </div>
</template>

<script>
import OrderList from '@/components/OrderList';

import { mapState, mapActions } from 'vuex';

export default {
  name: 'Comfirm',
  components: {
    OrderList,
  },
  computed: {
    ...mapState('cart', ['cart', 'orderId', 'order']),
  },
  methods: {
    ...mapActions('cart', ['getOrder', 'payMoney']),
    checkout() {
      const { id } = this.$route.params;
      this.payMoney(id);
    },
  },
  created() {
    const { id } = this.$route.params;
    this.getOrder(id);
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
}

.order-list {
  width: 80%;
  margin: 1rem auto;
  border-collapse: collapse;

  tr {
    border: 1px solid #ddd;
  }

  td:nth-child(odd) {
    width: 180px;
    text-align: center;
    border-right: 1px solid #ddd;
    padding: .5rem 1rem;
    font-weight: 700;
  }

  td:nth-child(even) {
    padding-left: 1rem;
    font-weight: 400;
  }

  a {
    font-size: 1.2rem;
  }
}

@mixin text($color) {
  font-weight: 700;
  color: $color;
}

.text-danger {
  @include text(red);
}

.text-success {
  @include text(green);
}

.btn {
  display: block;
  margin: 2rem auto;
  width: 200px;
  padding: .25rem 1rem;
  background: green;
  font-size: 1.4rem;
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

  &:disabled {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
    cursor: not-allowed;
  }
}

@media screen and (max-width: 800px) {
  .checkout {
    width: 80%;
  }

  .order-list {
    width: 80%;

    td:nth-child(odd) {
      width: 150px;
    }
  }
}

@media screen and (max-width: 640px) {
  .checkout {
    width: 95%;
  }

  .order-list {
    width: 95%;

    td:nth-child(odd) {
      width: 100px;
    }
  }

  
}
</style>