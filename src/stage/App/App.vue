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
    <div v-on:click="ajax()">ajax</div>
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
import '@/stage/App/App.scss';

export default {
  data() {
    return {
    };
  },
  methods: {
    jumpToPage1() {
      this.$router.push({
        name: 'page1Id',
        params: { id: 123 },
        query: { plan: 'private' }
      });
    },
    ajax() {
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
