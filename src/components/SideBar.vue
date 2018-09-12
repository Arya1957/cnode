<template>
  <aside v-if="!loading" id="sidebar">
   <section class = "basic-info">
      <h3 class="head"> 作者 </h3>
      <div>
        <router-link :to = "{name: 'user',params: {username: userinfo.loginname}}">
       <img class="user-avatar-large" :src="userinfo.avatar_url" alt="用户头像">
      <span> {{ userinfo.loginname }} </span>
    </router-link>
      <p> {{userinfo.score }} 积分</p>
      <p class="time"> 注册时间  {{ userinfo.create_at | formatDate}}</p>
      </div>
   </section>
     <section class="recent-creation">
      <h3 class="head"> 作者最近主题 </h3>
      <ul class="list">
        <li v-for="(item,index) in creationLimit" :key= "index">
           <router-link class="title" :to = "{ name: 'article' ,params: {id: item.id,
           name: userinfo.loginname}}">
             {{ item.title }}
           </router-link>
        </li>
      </ul>
    </section>
    <section class="recent-replies">
       <h3 class="head"> 作者最近回复 </h3>
       <ul class="list">
         <li class="list-item" v-for= "(item,index) in  replyLimit" :key= "index">
           <router-link class="title" :to = "{ name: 'article' ,params: {id: item.id,
           name: userinfo.loginname }}">
             {{ item.title }}
           </router-link>
         </li>
       </ul>
    </section>
  </aside>

</template>
<script>
export default {
  name: "Sidebar",
  data: function() {
    return {
      loading: false,
      userinfo: {}
    };
  },
  computed: {
    creationLimit() {
       if(this.userinfo.recent_topics) {
         return this.userinfo.recent_topics.slice(0,5)
       }
    },
    replyLimit() {
        if(this.userinfo.recent_replies) {
         return this.userinfo.recent_replies.slice(0,5)
       }
    }
  },
  methods: {
    getUserInfo() {
      this.loading = true;
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(res => {
          this.loading = false;
          this.userinfo = res.data.data;
          console.log(this.userinfo);
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
#sidebar {
  background:  #e1e1e1;
  color:  #778087;
  .head {
    padding: 10px 14px;
    font-weight: 400;
    font-size: 14px;
    color: #333;
    background: #f6f6f6;
  }
}
#sidebar .basic-info {
  font-size: 14px;
 
  >div {
   background: #fff;
   padding: 10px; 
   p {
     margin-top: 12px;
   }
  }
}
#sidebar .recent-creation,
#sidebar .recent-replies {
  margin-top: 12px;
  background: #fff;
  .list {
    padding: 14px;
    .title {
      font-size: 14px;
      line-height: 1.75em;
      &:visited {
        color: #999;
      }
       &:hover {
         color: #333;
        text-decoration: underline;
      }
    }
  }


}
#sidebar .recent-replies {
 margin-top: 12px;
}
</style>
