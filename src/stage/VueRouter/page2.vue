<template>
  <div id="vueRouterPage2">
    <el-button type="text" @click='hanleShow'>显示路由和props信息</el-button>
    <div>User (route){{ $route.params.id }}</div>
    <div>(props){{ q }}</div>
    <el-button type="text" @click='goBack'>回退</el-button>
    <div><el-button type="text" @click='handleRoute'>jump to page1/456</el-button></div>
  </div>
</template>

<script>
export default {
  props: ['id', 'q', 'plan'],
  data() {
    return {};
  },
  created() {
    this.fetch();
  },
  watch: {
    // 当使用路由参数时，例如从 /user/foo 导航到 /user/bar，原来的组件实例会被复用。
    // 因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。
    // 不过，这也意味着组件的生命周期钩子不会再被调用。
    $route() {
      this.fetch();
    }
  },
  methods: {
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push({ name: 'home' });
      }
    },
    hanleShow() {
      console.log('$route', this.$route);
      console.log('$props', this.$props);
    },
    fetch() {
      this.axios.get('/user?ID=12345')
        .then((response) => {
          // handle success
          console.log(response);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
        .then(() => {
          // always executed
        });
    },
    handleRoute() {
      this.$router.push({
        name: 'VueRouterPage2',
        params: { id: 456 }
      });
    }
  }
};

</script>
