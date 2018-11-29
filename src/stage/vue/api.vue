<template>
  <div id='vueRouterPage1'>
    <el-button type="text" @click='jumpToPage'>jumpToPage2</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    jumpToPage() {
      this.$router.push({
        name: 'VueRouterPage2',
        params: { id: 123 },
        query: { plan: 'private', q: 'vue' }
      });
    }
  }
};

</script>
