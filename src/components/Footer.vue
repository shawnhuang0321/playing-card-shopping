<template>
  <div class="footer">
    <div class="container">
      <ul class="footer-list">
        <li><a href="#" @click.prevent="showAlert">Shop</a></li>
        <li><a href="#" @click.prevent="showAlert">Stockists</a></li>
        <li><a href="#" @click.prevent="showAlert">Blog</a></li>
        <li><a href="#" @click.prevent="showAlert">About Us</a></li>
        <li><a href="#" @click.prevent="showAlert">Contact</a></li>
      </ul>
      <ul class="footer-list">
        <li><a href="#" @click.prevent="showAlert">FAQ</a></li>
        <li><a href="#" @click.prevent="showAlert">Shipping & Returns</a></li>
        <li><a href="#" @click.prevent="showAlert">Store Policy</a></li>
        <li><a href="#" @click.prevent="showAlert">Payment Methods</a></li>
      </ul>
      <div class="footer-right">
        <div class="email">
          <div>
            <i class="far fa-envelope"></i>
            <input type="text" placeholder="Email Address">
          </div>
          <button @click.prevent="showAlert">SUBSCRIBE</button>
        </div>
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
      </div>
    </div>
    <div class="bottom">
      <p>© 2018 Shawn All Rights Reserved</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Footer',
  methods: {
    ...mapActions('modal', ['addMessage']),
    showAlert() {
      const message = {
        content: '此按鈕為純版面，尚無功能。',
        type: 'danger',
      }
      this.addMessage(message);
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  max-width: 100%;
  background: #232323;
  margin-top: 1rem;
  padding: 5rem 0 0;

  .container {
    display: flex;
    width: 70%;
    margin: 0 auto;
  }

  @media screen and (max-width: 800px) {
    .container {
      width: 90%;
    }
  }

  &-right {
    margin-left: auto;
  }

  .bottom {
    background: #2f2f2f;
    text-align: center;
    margin-top: 2rem;
    padding: .5rem 0;

    p {
      color: #8e8e8e;
    }
  }
}

.footer-list {

  li {
    margin: .6rem 0;

    a {
      color: white;
    }
  }
  
  &:first-child {
    margin-right: 7rem;
  }
}

@media screen and (max-width: 800px) {
  .footer-list:first-child {
    margin-right: 2rem;
  }
}

.email {
  display: flex;

  div {
    width: 280px;
    padding-left: .5rem;
    margin-right: .5rem;
    border: none;
    border-bottom: 1px solid white;

    i {
      color: white;
    }

    input {
      padding-top:.8rem;
      padding-left: .8rem;
      font-size: 1rem;
      border: none;
      outline: 0;
      background: transparent;
      color: white;

      ::placeholder {
        color: white;
        opacity: 1;
      }

      &:focus {
        border: none;
      }
    }
  }

  button {
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: -1px;
    cursor: pointer;
    color: black;
    background: white;
    padding: .6rem 1rem;
  }
}

.icon-list {
  margin-top: 3.5rem;
  text-align: right;

  a {
    display: inline-block;
    font-size: 1.4rem;
    margin-right: 1rem;
    color: white;

    &:last-child {
      margin-right: 0;
    }
  }
}

@media screen and (max-width: 640px) {
  .footer {
    .container {
      flex-direction: column;
    }

    &-list {
      li {
        text-align: center;

        a {
          font-size: 1.2rem;
        }
      }

      &:first-child {
        margin-right: 0;
      }
    }

    &-right {
      margin-top: 2rem;
      margin-left: 0;

      .email {
        justify-content: center;

        div {
          width: 220px;
        }

        button {
          font-size: 1rem;
        }
      }

      .icon-list {
        margin-top: 2rem;
        text-align: center;
      }
    }
  }
}

@media screen and (max-width: 374px) {
  .footer-right {
    margin: 2rem auto 0;
  }

  .email {
    flex-direction: column;

    div {
      margin-right: 0;
    }

    button {
      margin-top: 1rem;
    }
  }
}

</style>