<template>
<div class="article wrapper">
   <!-- 正在加载 -->
    <div v-if="loading" class="loading">
      <img src="../assets/image/loading.gif" alt="loading...">
    </div>
  <div v-else id="article">
     <header class="article-header">
       <h3 class="article-title" >
         <span :class="[{highlight: post.top || post.good },'topic-type']" > 
         {{ post.tab | topicType | topicFormat(post)  }}</span>  
         {{ post.title }} 
      </h3>
    
     <p class="article-intro">
      <span>  • 发布于 {{ post.create_at | formatDate }}</span>
      <span>  • 作者 {{ post.author.loginname }}</span>
      <span>  • {{ post.visit_count }} 次浏览</span>
      <span>  • 来自 {{  post.tab | topicType }} </span>
     </p>
    </header>
    <!-- 文章内容，需要用到 markdown.css，添加类名 markdown-body  -->
    <div class="article-content markdown-body " v-html="post.content">
    </div> 
    <div class="article-reply">
      <div class="reply-topbar"> 
        <span>{{ post.replies.length }} 回复</span>  
      </div>
      <div class="reply-list">
        <div class="reply-item" v-for="(reply,index) in post.replies" :key = "index" :class = "{highlight: reply.ups.length >= 3 }">
         <div class="reply-list-header">
           <p class="user-info">
             <router-link :to = "{name: 'user' ,params: { name: reply.author.loginname }}">
               <img class="user-avatar" 
               :src="reply.author.avatar_url" :alt="reply.author.loginname">
               <span class="username"> {{reply.author.loginname }}</span>
             </router-link>
            <span> {{ index + 1 }}  楼 •</span>
            <span> {{ reply.create_at  | formatDate }} </span>
           </p>
         <p class="thumbs-up" v-if="reply.ups.length > 0"> 
           <!-- thumbs-up -->
           <svg class="icon  thumbs-up-icon" aria-hidden="true">
             <use xlink:href="#icon-thumbs-up"></use>
           </svg>
           <span> {{ reply.ups.length }} </span> 
           </p>
         <p v-else></p>
         </div>
         <!-- 评论内容 ，需要用到 markdown.css ，添加类名 markdown-body -->
         <p class="reply-list-content markdown-body " v-html="reply.content"> </p>
        </div>
      </div>
    </div>

  </div>
  </div>

</template>
<script>
import "../assets/iconfont/iconfont.js";
export default {
  name: "Article",
  data: function() {
    return {
      loading: false,
      post: {} // 当前帖子详情
    };
  },
  methods: {
    getArticle() {
      this.loading = true;
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(res => {
          this.loading = false;
          this.post = res.data.data;
          //    console.log(this.post);
        })
        .catch(err => {
          console.log(JSON.parse(err));
        });
    }
  },
  beforeMount: function() {
    this.getArticle();
  },
  watch: {
    $route(to, from) {
      this.getArticle();
    }
  }
};
</script>
<style lang="scss">
// 由于要引入外部的CSS，scoped 必须去掉，否则不生效
// @import url("../assets/css/markdown.css");
@import "../assets/css/markdown.css";

// iconfont 样式
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

#article {
  .article-header {
    padding: 16px 10px;
    border-bottom: 1px solid #e5e5e5;
  }
  .article-content {
    padding: 10px;
  }
}

.article-header {
  .article-title {
    font-size: 22px;
  }
  .article-intro {
    padding: 12px;
    font-size: 12px;
    color: #838383;
  }
}

.article-reply {
  .reply-topbar {
    padding: 10px;
    font-size: 14px;
    background: #f6f6f6;
  }
  .reply-list {
    .reply-item {
      border-bottom: 1px solid #f6f6f6;
      padding: 10px;
    }
    .reply-item.highlight {
      background-color: #f4fcf0;
    }
  }
}

.reply-list .reply-list-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
  .user-info {
    font-size: 12px;
    color: #08c;
    .username {
      font-weight: 700;
      color: #666;
      padding-left: 8px;
    }
  }
  .thumbs-up {
    font-size: 16px;
    color: grey;
    vertical-align: middle;
    .thumbs-up-icon {
      width: 14px;
      height: 14px;
      position: relative;
      bottom: 0.1em;
    }
  }
}

.reply-list-content {
  padding-left: 40px;
}
</style>

