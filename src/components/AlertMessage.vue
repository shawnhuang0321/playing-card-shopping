<template>
  <div class="container" v-if="isShow">
    <div
      v-for="item in message"
      :key="item.id"
      class="message"
      :class="item.type">
      <p :class="`text-${item.type}`">{{ item.content }}</p>
      <a
        href="#"
        class="close"
        :class="`text-${item.type}`"
        @click.prevent="removeMessage(item.id)"></a>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AlertMessage',
  computed: {
    ...mapState('modal', ['message']),
    isShow() {
      return this.message.length !== 0;
    }
  },
  methods: {
    ...mapActions('modal', ['removeMessage']),
  }
}
</script>

<style lang="scss" scoped>
$danger: #721c24;
$success: #155724;

.container {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 2;
}

.message {
  position: relative;
  min-width: 280px;
  height: 40px;
  padding-left: 1rem;
  padding-right: 2rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  border-radius: 4px;

  &:first-child {
    margin-top: 0;
  }

  p {
    font-size: 16px;
  }
}

.danger {
  background: #f8d7da;
  border: 1px solid #f5c6cb;
}

.success {
  background: #d4edda;
  border: 1px solid #c3e6cb;
}

.text-danger {
  color: $danger;

  &::before, &::after {
    background: $danger;
  }
}

.text-success {
  color: $success;

  &::before, &::after {
    background: $success;
  }
}

.close {
  display: inline-block;
  position: absolute;
  top: 45%;
  right: 28px;

  &::before, &::after {
    border-radius: 20px;
    content: "";
    width: 22px;
    height: 3px;
    position: absolute;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
}

@media screen and (max-width: 640px) {
  .container {
    top: 1.5rem;
    right: 50%;
    transform: translateX(50%);
  }
}

</style>