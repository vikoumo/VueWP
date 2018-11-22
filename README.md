# webpack4
# vue
 > * vue: dependencies
 > * vue-loader: 会解析组件, 提取语言块. 在需要的时候, 经过其他的loader处理, 最后组装成一个commonjs模块.
 > * vue-eslint-parser
 > * vue-template-compiler
 > * style module scoped: .vue文件中style标签的几个标识符
# vue router
  ## $router和route区别
  > $router:
    $router为VueRouter的实例，相当于一个全局的路由器对象，里面含有很多属性和子对象.
    例如history对象。。。经常用的跳转链接就可以用this.$router.push，和router-link跳转一样。。。
    this.$router.push会往history栈中添加一个新的记录。。

  > $route:
    $route相当于当前正在跳转的路由对象。。可以从里面获取name,path,params,query等。。
  ## $router方法
  > $router.push()
  > $router.go()
  > $router.replace()
# vue demo
