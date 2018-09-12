<template>
  <div id="header">
    <div class="wrapper">
      <router-link :to = "{name: 'home'}">
        <img class= "logo" src="../assets/image/cnodejs_light.svg" alt="logo">
      </router-link>
    <ul class="nav">
      <li><a href="#">注册</a></li>
      <li><a href="#">登录</a></li>
    </ul>
   </div>
  </div>
</template>
<script>
export default {
  name: "Header"
};
</script>
<style lang="scss" scoped>
#header {
  .wrapper {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

/* 左侧的logo */
#header .logo {
  width: 120px;
  max-height: 30px;
}
/*右侧的导航栏*/
#header  .nav {
  display: flex;
  justify-content: center;
  li {
    padding-left: 1em;
    a {
      color: #ccc;
      font-size: 14px;
      text-shadow: none; /* CSS3属性，文本阴影 */
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>


