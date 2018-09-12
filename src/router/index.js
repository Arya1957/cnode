import Vue from 'vue'
import Router from 'vue-router'
import PostList from '@/components/PostList'
import Article from '@/components/Article'
import UserInfo from '@/components/UserInfo'
import SideBar from '@/components/SideBar'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',// 默认显示帖子列表
      components: {
        main: PostList
      }
    },

    {
      path: '/topic/:id&author=:name',  //指定要跳转的路径，在path后加/: +传递的参数 ， = 号后面不要有空格！！
      name: 'article',
      components: {
        main: Article,
        sidebar: SideBar
      }
    },
    {
      path: '/user/:name',
      name: 'user',
      components: {
        main: UserInfo,
        sidebar: SideBar
      }
    }
  ]
})
