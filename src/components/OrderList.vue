<template>
  <div class="cart">
    <div class="list">
      <table>
        <thead>
          <tr>
            <td>名稱</td>
            <td>數量</td>
            <td>金額</td>
            <td v-if="allowDelete">刪除</td>
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
              <a
                v-if="allowDelete"
                href="#" 
                @click.prevent="handleOnClick(item.id)"><i class="fas fa-trash-alt"></i></a>
            </td>
          </tr>
        </tbody>
      </table>
      <h4 class="total">總計：<span>{{ cart.final_total }}</span>元</h4>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'OrderList',
  props: {
    cart: {
      type: Object,
      default: () => {},
    },
    allowDelete: {
      type: Boolean,
      default: () => true,
    }
  },
  methods: {
    handleOnClick(id) {
      this.$emit('handleButtonClick', id);
    }
  }
}
</script>

<style lang="scss" scoped>
.cart {
  width: 100%;
  padding: 1rem 0rem;
  background: white;
  border-radius: .5rem;
  z-index: 10000;
}

.list {
  flex: 1;
  padding: 0 .25rem;
}

table {
  width: 100%;
  border-collapse: collapse;

  thead {
    border-top: 1px solid #ddd;
    background: #ffe58d;

    td {
      font-weight: 600;
    }
  }

  tr {
    border-bottom: 1px solid #ddd;
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
  text-align: right;
  font-size: 1.6rem;
  margin: 1rem 0;
  color: #26C281;
}

@media screen and (max-width: 640px) {
  .cart {
    width: 100%;
    max-height: 80%;
  }

  .list {
    min-height: 230px;
  }
}

@media screen and (max-width: 374px) {
  .list {
    min-height: 165px;
  }
}
</style>