<template>
  <div class="backTop">
    <slot>
      <img v-if="isShow" @click="BackTopClick" :src="backTopImg" alt />
    </slot>
  </div>
</template>

<script>
import backTopImg from "../assets/images/backtop.png";
export default {
  props: {
    top: {
      type: Number,
      default: 800,
    },
  },
  data() {
    return {
      backTopImg,
      isShow: false,
    };
  },
  methods: {
    scrollHandle() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > this.top) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    BackTopClick() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
  },
  mounted() {
    document.addEventListener("scroll", this.scrollHandle);
  },
  destroyed() {
    document.removeEventListener("scroll", this.scrollHandle);
  },
};
</script>

<style lang="scss">
.backTop {
  position: fixed;
  right: 8px;
  bottom: 120px;
  width: 38px;
  height: 38px;
  img {
    width: 100%;
  }
}
</style>