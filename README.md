# cnode

### Vue.js 实现CNODE社区
基于  Vue.js 实现的一个 CNODE 社区，目前实现了帖子列表页、帖子详情、用户信息页。使用**axios**获取数据，使用**过滤器**对帖子进行分类，使用**Vue Router**实现路由切换及传参，使用watch**监听路由**的变化，使用**媒体查询**来优化页面的展示。

**主要技术栈：**  ES6 + Webpack + Scss + vue-cli + Vue Router + axios + media queries 


### 项目截图
<div align=center>
	<img src="http://pf39hp3g2.bkt.clouddn.com/cnode1.jpg" width="25%">
        <img src="http://pf39hp3g2.bkt.clouddn.com/cnode2.jpg" width="25%">
        <img src="http://pf39hp3g2.bkt.clouddn.com/cnode3.jpg" width="25%">	
</div>

### 总结
##### 在Vue中使用 SCSS 变量
当我在assets下新建了一个 variables.scss文件存放我们的scss变量时，发现无法在组件中直接使用，最后找到解决方法如下：
- 安装 sass-resources-loader
```
npm install sass-resources-loader --save-dev
```
- 修改 utils.js 文件

具体操作总结到[博客](https://www.jianshu.com/p/437aa3eaadd6)里了


#####  使用 Vue 的 filters给帖子分类
filter 串联 满足多场景需要，有的地方需要将帖子分为置顶、精华、问答、分享、招聘（帖子列表页），而有的地方只需要知道帖子来自哪个版块，比如问答、分享、招聘等（帖子详情页两种场景都有），所以就写了两个过滤器，根据需要使用。
-  过滤器如下：
```
Vue.filter('topicType', function (tab) {  // 过滤器1  ， 帖子分类:  分享、问答、招聘
  if (typeof tab != 'string') return;
  if (tab === 'ask') {
    return '问答'
  } else if (tab === 'share') {
    return '分享'
  } else if (tab === 'job') {
    return '招聘'
  }
})
```

```
Vue.filter('topicFormat', function (val,obj) { // 过滤器2  ，判断帖子是否置顶或者精华
  if (obj.top === true) {
    return '置顶'
  } else if (obj.good === true) {
    return '精华'
  } else {
    return val
  }
})
```
只需判断帖子分类的场合： 
```
{{  post.tab | topicType }}
```
需要判断帖子是否精华或置顶的场合，过滤器串联： 
```
 {{ post.tab | topicType | topicFormat(post)  }}
```

#####  通过自定义事件实现父子组件通信
在pagination组件中 emit 事件 :
`this.$emit('handle', this.curPage)`
在postlist组件中监听事件，获取页码，然后根据页码获取帖子数据
`<Pagination class="pagination" 
       @handle = "fetchData"> </Pagination>`



关于组件通信，写了博客总结了一下：
[父子组件通信](https://www.jianshu.com/p/bbc7c82b7bdd)
[非父子组件通信](https://www.jianshu.com/p/f33c884d2ab5)


#####   Vue Router 的使用
- 路由跳转
```
<router-link to="/"></router-link>
```

- 路由传参
1.必须在路由内加入路由的name
2.必须在path后加/: +传递的参数
```
 {
    name: 'test',
    path: '/test/:msg',
    component: test
  }
```
```
< router-link :to = "{name: test ,params:{msg: 'xxxxxxx'}}" >
 test < /router-link>
```
- 监听路由参数变化
>当使用路由参数时，例如从 /user/foo 导航到 user/bar，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。 

也就是说，虽然路由参数发生了变化，但数据不会刷新。如果想要想对路由参数的变化作出响应，官网给出的解决方案是 ：watch (监测变化) $route 对象。
```
watch: {
    $route(to, from) {
      this.getArticle();     // 对路由变化作出响应...
    }
  }
```

- 命名视图： 给 router-view定义名字，router-link通过名字进行对应组件的渲染
App.vue
```
 <div class="layout">
     <router-view class="main" name="main"></router-view>
     <router-view class="sidebar" name="sidebar"></router-view>
  </div>
```
router.js
```
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
    }]
```



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
