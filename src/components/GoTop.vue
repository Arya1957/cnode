<template>
  <div id="gotop">
    <div class="btn" v-show = "show" @click="goTop">回到顶部</div>
  </div>
</template>
<script>
export default {
  name: "GoTop",
  data: function() {
    return {
      show: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    goTop() {
      window.scrollTo(0, 0);
      this.show = false;
    },
    handleScroll() {
      if (window.pageYOffset > 150) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#gotop .btn {
  font-size: 16px;
  width: 30px;
  border-radius: 3px;
  padding: 12px 6px;
  text-align: center;
  color: grey;
  background: #fff;
  position: fixed;
  right: 10px;
  bottom: 100px;
  cursor: pointer;
}
</style>


