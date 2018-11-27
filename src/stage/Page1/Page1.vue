<template>
  <div class="page1">
    <div @click="showRoute()">显示路由信息</div>
    <div @click="showProps()">显示props信息</div>
    <div @click="goBack()">回退</div>
    <div><router-link to='/page1/456'>jump to page1/456</router-link></div>
    <div>User (route){{ $route.params.id }}</div>
    <div>User (props){{ q }}</div>
  </div>
</template>
<script>

export default {
  props: ['id', 'q', 'plan'],
  data() {
    return {
    };
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
    showRoute() {
      console.log('$route', this.$route);
    },
    showProps() {
      console.log('props', this.$props);
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
    }
  }
};

</script>
