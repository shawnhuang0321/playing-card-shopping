<template>
  <div>
    <div class="top">
      <h6>Playing Card Shopping</h6>
    </div>
    <nav>
      <div class="logo" @click="toHomePage">
        <h2 class="logo-left">Card</h2>
        <div class="logo-right">
          <h4 class="logo-right-top">Shop</h4>
          <div class="logo-right-bot"></div>
        </div>
      </div>
      <a href="#" @click="toggleSidebar"><i class="fas fa-bars"></i></a>
    </nav>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Header',
  methods: {
    ...mapActions('modal', ['toggleSidebar']),
    toHomePage() {
      this.$router.push({ name: 'Home' });
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  background: black;

  h6 {
    height: 2.3125rem;
    letter-spacing: 0.25em;
    line-height: 2.3125rem;
    text-align: center;
    color: #A6A2A2;
    font-size: 1rem;
    font-weight: 700;
  }
}

nav {
  width: 80%;
  height: 83px;
  display: flex;
  margin: 0 auto;

  .logo {
    cursor: pointer;
    height: 58px;
    align-self: center;
    display: flex;
    font-weight: 900;
    background: rgba(242, 242, 242, 1);
  }

  a {
    display: inline-block;
    align-self: center;
    margin-left: auto;
    font-size: 2.5rem;
  }
}

.logo-left {
  font-size: 32px;
  letter-spacing: -2px;
  text-align: center;
  align-self: center;
}

.logo-right {
  height: 45px;
  font-size: 16px;
  font-weight: 900;
  align-self: center;
  margin-left: 4px;

  &-top {
    font-size: 16px;
    margin-top: 6px;
  }

  &-bot {
    width: 100%;
    height: 8px;
    background: black;
  }
}

@media screen and (max-width: 640px) {
  nav {
    width: 95%;
  }
}
</style>