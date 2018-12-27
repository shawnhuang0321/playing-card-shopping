<template>
  <div>
    <Cart />
    <Hero />
    <Slider
      :products="silderProducts"/>
  </div>
</template>

<script>
import Hero from '@/components/Hero';
import Slider from '@/components/Slider';
import Cart from '@/components/Cart';

import { mapState, mapActions } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      showCart: false,
    }
  },
  components: {
    Hero,
    Slider,
    Cart,
  },
  computed: {
    ...mapState('product', ['products']),
    ...mapState('loading', ['isLoading']),
    silderProducts() {
      return this.products.slice(0, 6);
    }
  },
  methods: {
    ...mapActions('product', ['getProducts']),
  },
  created() {
    this.getProducts();
  }
}
</script>

<style lang="scss" scoped>

</style>
