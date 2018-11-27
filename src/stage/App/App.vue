<template>
  <div class="app">
    <ul>
      <li><router-link to='/page1'>router-link jump to page1</router-link></li>
      <li @click="jumpToPage1">$router.push page1</li>
    </ul>
    <p :class="a.red">
      This should be red
    </p>
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
        query: { plan: 'private', q: 'vue' }
      });
    }
  }
};

</script>
