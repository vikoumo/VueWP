<template>
  <div class="app">
    <ul>
      <li><router-link to='/page1'>router-link jump to page1</router-link></li>
      <li @click="jumpToPage1">$router.push page1</li>
      <li><router-link to='/page1/456'>jump to page1/456</router-link></li>
    </ul>
    <p :class="a.red">
      This should be red
    </p>
    <div v-on:click="axio">axio</div>
  </div>
</template>
<style module="a">
.app {
  color: red;
}
.red {
  color: red;
  font-weight: bold;
}
</style>
<script>
import './App.scss';

export default {
  data() {
    return {
    };
  },
  methods: {
    jumpToPage1() {
      this.$router.push({
        path: '/page1',
        // 到page1页面的时候params不会传过去，query会
        // 把路由导航到 /user/123 路径 ??
        params: { userId: 123 },
        query: { plan: 'private' }
      });
    },
    axio() {
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
