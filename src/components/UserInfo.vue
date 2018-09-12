<template>
  <div v-if="!loading" id="userinfo">
    <section class="cell basic-info">
      <div class="cell-topbar">
        <router-link :to = "{name: 'home'}">
        <span> 主页 </span>
      </router-link> 
      <span class="seperator"> / </span>
      </div>
    <div class="cell-inner">
        <div>
          <img class="user-avatar-large" :src="userinfo.avatar_url" alt="用户头像">
        <span> {{ userinfo.loginname }} </span>
        </div>
        <p> 
          <svg class="icon  github" aria-hidden="true">
             <use xlink:href="#icon-github"></use>
          </svg>
          <a class="user-git" :href="`https://github.com/${userinfo.githubUsername}`"> @{{ userinfo.githubUsername }}</a>
        </p>
       <p> {{userinfo.score }} 积分</p>

      <p class="time"> 注册时间  {{ userinfo.create_at | formatDate}}</p>
    </div>
    </section>
   
    <section class="cell recent-creation">
      <h3 class="cell-topbar"> 最近创建的话题 </h3>
      <ul class="cell-inner list">
        <li class="list-item" v-for="(item,index) in userinfo.recent_topics" :key= "index">
          <img class="user-avatar" :src="userinfo.avatar_url" :alt="userinfo.loginname">
            <router-link class="title" :to = "{ 
             name: 'article' ,
             params: {
               id: item.id , 
               name:userinfo.loginname }}">
             {{ item.title }}
           </router-link>
            <span class="update-time"> {{ item.last_reply_at | formatDate}} </span>
        </li>
      </ul>
    </section>
    <section class="cell recent-replies">
       <h3 class="cell-topbar"> 最近参与的话题 </h3>
       <ul class="cell-inner list">
         <li class="list-item" v-for= "(item,index) in userinfo.recent_replies" :key= "index">
            <img class="user-avatar" :src="userinfo.avatar_url" :alt="userinfo.loginname">
           <router-link  class="title" :to = "{ name: 'article' ,params: {id: item.id ,name:userinfo.loginname }}">
             {{ item.title }}
           </router-link>
            <span class="update-time"> {{ item.last_reply_at | formatDate}} </span>
         </li>
       </ul>
    </section>
  </div>
</template>
<script>
import "../assets/iconfont/iconfont.js";

export default {
  name: "UserInfo",
  data: function() {
    return {
      loading: false,
      userinfo: {}
    };
  },
  methods: {
    getUserInfo() {
      this.loading = true;
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(res => {
          this.loading = false;
          this.userinfo = res.data.data;
          //  console.log(this.userinfo);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount: function() {
    this.getUserInfo();
  }
};
</script>
<style lang="scss" scoped>
// iconfont 样式
.icon {
  width: 1.25em;
  height: 1.25em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

// 公共
.cell {
  border-radius: 3px;
  background: #fff;
  margin-bottom: 12px;
  .cell-topbar {
    font-size: 14px;
    font-weight: 400;
    padding: 10px;
    background: #f6f6f6;
  }
  .cell-inner {
    font-size: 14px;
  }
}
// 单独
// 基本信息单独写
#userinfo {
  background: #e1e1e1;
}
#userinfo > .basic-info {
  color: #778087;
  .cell-topbar {
    > a {
      color: $green;
    }
  }
  .cell-inner {
    padding: 10px;
    p {
      margin-top: 16px;
    }
    .user-git {
      color: #333;
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
#userinfo .list {
  .list-item {
    padding: 10px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      padding-left: 10px;
      color: #08c;
      flex: 1;
      min-width: 50%;
      @include textOverflow;
      font-size: 16px;
      &:hover {
        text-decoration: underline;
      }
    }
    .update-time {
      color: grey;
      font-size: 12px;
    }
  }
}
</style>

