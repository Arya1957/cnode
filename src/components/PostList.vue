<template>
  <div id="postlist">
    <!-- 正在加载 -->
    <div v-if="loading" class="loading">
      <img src="../assets/image/loading.gif" alt="loading...">
    </div>
    <div v-else>
   <!-- 帖子分类 -->
   <!-- <ul id="tabs">
     <li v-for="(item,index) in topics" :key="index"
         v-on:click="selected = index"
     v-bind:class= "['topic-tab', {active: selected === index }]" 
          >
           <router-link :to = "{name: 'home', params: {tab: item.tab}}">
          {{ item.title }}
           </router-link>
       </li>   
    </ul>  -->

    <ul id="tabs">
      <li v-bind:class= "['topic-tab', {active: selected === index }]" 
         v-for="(item,index) in topics" :key="index"
         v-on:click= "switchTab(index, item.tab)" >
          {{ item.title }}
       </li>
    </ul>  
    <!-- 帖子列表 -->
    <ul class="posts">
      <li class="post" 
      v-for="item in posts" 
      :key = item.id>
      <!-- 用户头像 -->
      <router-link :to= "{name: 'user',params: {
        name: item.author.loginname }}">
        <img class="user-avatar"
        :src="item.author.avatar_url" :alt="item.author.loginname">
      </router-link>
   
     <!-- 回复量 & 浏览量 -->
        <span class="counts">
          <span class="reply-count"> {{ item.reply_count}} </span>
          <span class="count-seperator">/</span>
          <span class="visit-count"> {{ item.visit_count }}</span>
        </span>
        <!-- 帖子类型 -->
        <span class= "topic-type" 
              :class="{highlight: item.top || item.good}"
              > 
         {{ item.tab | topicType | topicFormat(item)  }} 
        </span>
        <!-- 帖子标题 -->
        <router-link class="title" :to = "{name: 'article',params: {
          id: item.id,
          name: item.author.loginname
        }}">
          <span >{{ item.title }}</span>
        </router-link> 
        <!-- 最后更新时间 -->
         <span class="update-time"> {{ item.last_reply_at | formatDate}} </span>
        </li>
      </ul>
       <Pagination class="pagination" 
       @handle = "fetchData"> </Pagination>
    </div>
  </div>
</template>
<script>
import Pagination from "./Pagination";
export default {
  name: "PostList",
  components: { Pagination },
  data: function() {
    return {
      topics: [
        { title: "全部", tab: "all" },
        { title: "精华", tab: "good" },
        { title: "分享", tab: "share" },
        { title: "问答", tab: "ask" },
        { title: "招聘", tab: "job" }
      ],
      selected: 0,
      url: "https://cnodejs.org/api/v1/topics",
      page: 1,
      posts: [],
      loading: false
    };
  },
  methods: {
    getData() {
      this.$http
        .get(this.url, {
          params: {
            page: this.page,
            limit: 20
          }
        })
        .then(res => {
          this.loading = false;
          this.posts = res.data.data;
          console.log(res.data.data);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    switchTab(idx, tab) {
      //  console.log(idx ,tab);
      this.selected = idx;
      this.url = `https://cnodejs.org/api/v1/topics?tab=${tab}`; // 改变链接
      this.getData(this.url);
    },
    fetchData(idx) {
      this.page = idx;
      this.getData();
    }
  },
  beforeMount: function() {
    this.loading = true;
    this.getData();
  }//,
  // watch: {
  //   $route(to, from) {
  //     let tab = this.$route.params.tab;
  //     this.url = `https://cnodejs.org/api/v1/topics?tab=${tab}`; // 改变链接
  //     this.getData(this.url);
  //   }
  // }
};
</script>
<style lang="scss" scoped>
#tabs {
  padding: 14px;
  background: #f6f6f6;
  .topic-tab {
    display: inline-block;
    margin: 0 10px;
    color: $green;
    cursor: pointer;
  }
  .topic-tab.active {
    background: $green;
    color: #fff;
    padding: 3px 4px;
    border-radius: 3px;
  }
}
</style>


