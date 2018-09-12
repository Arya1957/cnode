<template>
  <div id="app">
   <Header class="header"></Header>
  <div class="layout">
     <router-view class="main" name="main"></router-view>
     <router-view class="sidebar" name="sidebar"></router-view>
  </div>
   <GoTop></GoTop>
  </div>
</template>

<script>
import Header from "./components/Header";
import GoTop from "./components/GoTop";

export default {
  name: "App",
  components: { Header, GoTop }
};
</script>

<style lang="scss">
#app {
  background: #e1e1e1;
}
.header {
  background: #444;
  padding: 12px 0;
}
.layout {
  width: 90%;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
}

.main {
  flex: 1;
  min-width: 50%;
  /*By default flex items don't shrink below their minimum content size. To change this, set the item's min-width or min-height. */
  background: #fff;
  border-radius: 4px;
}

.sidebar {
  flex: 0 0 300px;
  background: #fff;
  border-radius: 4px;
  margin-left: 16px;
}
</style>
