<template>
  <div :class="{show: isShow}" class="side">
    <ul class="side-list">
      <li><a class="link" href="#" @click.prevent="redirect('Home')">Home</a></li>
      <li><a class="link" href="#" @click.prevent="redirect('Product')">Shop</a></li>
      <li><a class="link" href="#" @click.prevent="showAlert">About Us</a></li>
      <li><a class="link" href="#" @click.prevent="showAlert">Contact</a></li>
      <li><a class="link" href="#" @click.prevent="showAlert">Blog</a></li>
    </ul>
    <div class="icon-list">
      <a href="#" @click.prevent="showAlert">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="#" @click.prevent="showAlert">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="#" @click.prevent="showAlert">
        <i class="fab fa-youtube"></i>
      </a>
      <a href="#" @click.prevent="showAlert">
        <i class="fab fa-twitter"></i>
      </a>
    </div>
    <a class="close" href="#" @click.prevent="handleOnClick"></a>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Sidebar',
  props: {
    isShow: {
      type: Boolean,
      default: () => false,
    }
  },
  methods: {
    ...mapActions('modal', ['addMessage']),
    showAlert() {
      const message = {
        content: '此按鈕為純版面，尚無功能。',
        type: 'danger',
      }
      this.handleOnClick();
      this.addMessage(message);
    },
    handleOnClick() {
      this.$emit('closeSidebar');
    },
    redirect(name) {
      this.handleOnClick();
      this.$router.push({ name });
    }
  }
}
</script>

<style lang="scss" scoped>
.side {
  width: 300px;
  height: 100%;
  text-align: center;
  position: fixed;
  top: 0;
  right: -300px;
  background: black;
  z-index: 10000;
  transition: all .2s ease;
}

.show {
  transform: translateX(-300px);
}

@media screen and (max-width: 480px) {
  .side {
    width: 250px;
  }
}

.side-list {
  margin-top: 5rem;

  .link {
    display: block;
    padding: 1rem 0;
    font-size: 1.2rem;
    font-weight: 700;
    color: white;
  }
}

.icon-list {
  margin-top: 4rem;

  a {
    display: inline-block;
    font-size: 1.6rem;
    padding: 0 .5rem;
    color: white;
  }
}

.close {
  position: absolute;
  top: 40px;
  right: 40px;
  width: 30px;
  height: 30px;

  &::before, &::after {
    content: "";
    width: 30px;
    height: 3px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    right: 5%;
    border-radius: 20px;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
}
</style>
