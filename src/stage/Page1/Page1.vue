<template>
  <div class="page1">
    <div @click="showRoute()">显示路由信息</div>
    <div @click="showProps()">显示props信息</div>
    <div @click="goBack()">回退</div>
    <div>User (route){{ $route.params.id }}</div>
    <div>User (props){{ id }}</div>
  </div>
</template>
<script>

export default {
  props: ['id'],
  data() {
    return {
    };
  },
  watch: {
    // 提醒一下，当使用路由参数时，例如从 /user/foo 导航到 /user/bar，原来的组件实例会被复用。
    // 因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。
    // 不过，这也意味着组件的生命周期钩子不会再被调用。
    // '$route'(to, from) {
    //   console.log(to, from);
    //   // 对路由变化作出响应...
    // }
    // ? ?
  },
  // beforeRouteUpdate (to, from, next) {
  //   // react to route changes...
  //   // don't forget to call next()
  // },
  // ??
  methods: {
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push({ name: 'home' });
      }
    },
    showRoute() {
      console.log('$route', this.$route);
    },
    showProps() {
      console.log('props', this.props);
    }
    // this.props不管用？应该用什么拿到props信息？
  }
};

</script>
