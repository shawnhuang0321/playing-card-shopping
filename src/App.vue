<template>
  <div>
    <loading
      :active.sync="isLoading"
      color="#26C281"
      loader="bars"></loading>
    <Sidebar :isShow="isShowSidebar" @closeSidebar="toggleSidebar"/>
    <div class="cover" v-if="isShowSidebar"></div>
    <AlertMessage />
    <Header />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import AlertMessage from '@/components/AlertMessage';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    AlertMessage,
    Sidebar,
    Header,
    Footer
  },
  computed: {
    ...mapState('loading', ['isLoading']),
    ...mapState('modal', ['isShowSidebar']),
  },
  methods: {
    ...mapActions('modal', ['toggleSidebar']),
    ...mapActions('cart', ['getCartList']),
  },
  created() {
    this.getCartList();
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/reset.scss';

.cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  z-index: 9999;
}
</style>
