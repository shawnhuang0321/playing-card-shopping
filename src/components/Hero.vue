<template>
  <div class="container">
    <div class="hero">
      <div class="hero-inner">
        <h2>ALWAYS BE</h2>
        <h2>ORIGINAL</h2>
        <h4>NEW ARRIVALS ARE HERE</h4>
        <router-link class="link" to="/product">Shop Now</router-link>
      </div>
    </div>
    <h1 class="typing-title">＂歡迎光臨！請別在意荷包盡情血拼＂</h1>
  </div>
</template>

<script>
export default {
  name: 'Hero',
}
</script>

<style lang="scss" scoped>
.container {
  width: 80%;
  margin: 0 auto;
}

.hero {
  position: relative;
  background-image: url(../assets/images/hero.png);
  width: 100%;
  height: 670px;
  background-position: center center;
  background-attachment: scroll;
  background-size: cover;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .3);
  }

  &-inner {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 1;

    h2 {
      font-size: 78px;
      line-height: 72px;
      color: white;
    }

    h4 {
      font-size: 18px;
      color: white;
      letter-spacing: 6px;
      margin-top: 32px;
    }

    .link {
      display: inline-block;
      cursor: pointer;
      color: white;
      border-radius: 6px;
      border: 1px solid white;
      font-size: 22px;
      padding: 8px 18px;
      margin-top: 32px;
      transition: all .3s ease;

      &:hover, &:focus {
        background: white;
        color:black;
      }
    }
  }
}

.typing-title {
  width: 34rem;
  margin: 1rem auto;
  font-weight: bold;
  color: cadetblue;
  border-right: 0.05em solid;
  overflow: hidden;
  white-space: nowrap;
  animation: typing 3s steps(17), insert 1s steps(1) infinite;
}

@keyframes insert {
  50% {
    border-color: transparent;
  }
}
@keyframes typing {
  0% {
    width: 0;
  }
}

@media screen and (max-width: 1024px) {
  .container {
    width: 100%;
  }

  .hero-inner {
    top: 30%;
  }
}

@media screen and (max-width: 800px){
  .container {
    width: 100%;
  }

  .hero {
    height: 460px;

    &-inner {
      
      h2 {
        font-size: 48px;
        line-height: 48px;
      }

      h4 {
        font-size: 12px;
        letter-spacing: 3px;
        margin-top: 30px;
      }

      button {
        font-size: 21px;
        padding: 6px 18px;
        margin-top: 30px;
        border-radius: 4px;
      }
    }
  }

  .typing-title {
    width: 34rem;
    font-size: 2rem;
  }
}

@media screen and (max-width: 640px){
  .hero {
    height: 230px;

    &-inner {
      top: 30%;
      
      h2 {
        font-size: 24px;
        line-height: 24px;
      }

      h4 {
        font-size: 4px;
        letter-spacing: 1px;
        margin-top: 10px;
      }

      .link {
        font-size: 7px;
        padding: 2px 6px;
        margin-top: 10px;
        border-radius: 3px;
      }
    }
  }

  .typing-title {
    width: 17rem;
    font-size: 1rem;
  }
}
</style>