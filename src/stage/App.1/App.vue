<template>
  <div class='app'>
    <h1>scoped</h1>
    <ul>
      <li><router-link to='/page1'>router-link jump to page1</router-link></li>
      <li @click='jumpToPage1'>$router.push page1</li>
    </ul>
    <p :class='a.red'>
      This should be red
    </p>
    <el-input placeholder="请输入内容"></el-input>
  </div>
</template>
<style scoped lang='scss'>
  h1 {
  color: #f00;
  }
</style>

<style module='a'>
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
// import '@/utils/scss/reset.scss';

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
