<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in products" :key="item.id">
        <div class="card">
          <div class="category"
            :style="{ background: colorInfo(item.category) }">{{ item.category }}</div>
          <div class="card-img">
            <img :src="item.imageUrl" alt="">
          </div>
          <h4 class="title">{{ item.title }}</h4>
          <p class="desc">{{ item.description }}</p>
          <div class="price">
            <h4>特價 {{ item.price }}元</h4>
            <p>原價 {{ item.origin_price }}元</p>
          </div>
          <div class="btn-group">
            <button class="btn-green" @click="getDetail(item.id)">詳細介紹</button>
            <button class="btn-red" @click="addProductToCart(item.id)">加入購物車</button>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
// require styles
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapActions } from 'vuex';

import commonTools from '@/utils/commonTools';

export default {
  name: 'Slider',
  mixins: [
    commonTools,
  ],
  props: {
    products: {
      type: Array,
      default: () => [],
    }
  },
  components: {
    swiper,
    swiperSlide,
  },
  data: () => ({
    swiperOption: {
      slidesPerView: 4,
      spaceBetween: 10,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        480: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        800: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    }
  }),
  methods: {
    ...mapActions('cart', ['addToCart']),
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
  }
}
</script>

<style lang="scss" scoped>
.swiper-container {
  max-width: 1080px;
  width: 100%;
  padding-bottom: 40px;
  z-index: 0;
}

.card {
  position: relative;
  padding: 2rem 1rem 1rem;
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
    display: flex;
    justify-content: center;
  }

  img {
    display: block;
    margin: .8rem auto 0;
    border-radius: .25rem;
  }

  .title {
    font-size: 1.8rem;
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
    margin-top: .5rem;
    padding-top: .5rem;
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
      padding-top: 4px;
      margin-left: auto;
    }
  }

  .btn-group {
    margin-top: 1rem;
    display: flex;
  }
}

@mixin btn($color) {
  cursor: pointer;
  flex: 1;
  font-size: 1.2rem;
  font-weight: 700;
  padding: .5rem 0;
  border: 1px solid rgba(0, 0, 0, .3);
  border-radius: .25rem;
  transition: all .2s ease;

  &:hover, &:focus {
    color: white;
    background: $color;
    border: 1px solid transparent;
  }
}

.btn-green {
  @include btn(green);
  margin-right: .25rem;
}

.btn-red {
  @include btn(red);
}

.swiper-pagination {
  bottom: 0;
}

@media screen and (max-width: 800px) {
  .swiper-container {
    max-width: 752px;
    margin-right: 8px;
  }

  img {
    max-width: 100%;
  }

  .card > .price {
    font-size: 1rem;

    span {
      margin-left: 1.5rem;
      font-size: .6rem;
    }
  }

  .btn-green, .btn-red {
    font-size: 1rem;
  }
}

@media screen and (max-width: 480px) {
  .swiper-container {
    max-width: 357px;
    margin: 0 auto;
  }
}
</style>