<template>
  <div id="pagination">
    <a class="btn" @click = "changeBtn">首页</a>
    <a class="btn" @click = "changeBtn">上一页</a>
    <a class="disabled btn" v-show="more" disabled = "disabled"
    >......</a>
    <a :class = "[{active:btn == curPage},'btn']"
    v-for="btn in pagebtns" 
    v-on:click = "changeBtn(btn)"
    :key= "btn">
       {{ btn }}
    </a>
    <a class="disabled btn" disabled = "disabled">......</a>
    <a class="btn" @click = "changeBtn">下一页</a>
  </div>  
</template>
<script>
export default {
  name: "Pagination",
  data: function() {
    return {
      curPage: 1,
      more: false,
      pagebtns: [1, 2, 3, 4, 5]
    };
  },
  methods: {
    changeBtn(e) {
      if (typeof e != "number") {
        let temp = e.target.innerText;
        switch (temp) {
          case "首页":
            this.pagebtns = [1, 2, 3, 4, 5];
            break;
          case "上一页":
            this.curPage > 1
              ? this.changeBtn(this.curPage - 1)
              : (this.curPage = 1);
            break;
          case "下一页":
            this.changeBtn(this.curPage + 1);
            break;
          default:
            break;
        }
      } else {
        this.curPage = e;
        if (e > 4) {
          this.more = true;
        } else {
          this.more = false;
        }
        if (e === this.pagebtns[4]) {
          this.pagebtns.shift();
          this.pagebtns.splice(4, 0, this.pagebtns[3] + 1);
        } else if (e === this.pagebtns[0] && e > 1) {
          this.pagebtns.unshift(this.pagebtns[0] - 1);
          this.pagebtns.splice(5, 1);
        }
      }
    //  console.log(this.curPage);
      this.$emit('handle', this.curPage);
    }
  }
};
</script>
<style lang="scss" scoped>
#pagination {
  padding: 16px;
  font-size: 14px;
  color: #778087;
  .btn {
    padding: 8px 12px;
    margin-right: 8px;
    background-color: #fff;
    border: 1px solid #ddd;
    cursor: pointer;
    &:hover {
      background: #e5e5e5;
    }
    &.active {
      background: #ddd;
    }
  }
  .disabled {
    &:hover {
      background: #fff;
    }
  }
}
</style>
