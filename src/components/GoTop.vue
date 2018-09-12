<template>
  <div id="gotop">
    <div class="btn" v-show = "show">回到顶部</div>
  </div>
</template>
<script>
export default {
  name: 'GoTop',
  data: function (){
    return {
      show: false
    }
  },
  mounted: function() {
    window.onScroll = function () {
      if(window.scrollTop() > 50) {
        this.show = true
      } else {
        this.show = false;
      }
    }
  },
  methods: {
    goTop() {
      window.scrollTop(0);
      this.show = false;
    }
  }
}
</script>
<style lang="scss" scoped>
#gotop .btn {
  font-size: 16px;
  width: 30px;
  border-radius: 3px;
  padding: 12px 6px;;
  text-align: center;
  color: grey;
  background: #fff;
  position: fixed;
  right: 10px;
  bottom: 100px;
} 
</style>


