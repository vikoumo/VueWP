<template>
  <div>
    <label>{{ title }}</label>
    <el-button type="primary" @click="changePropsVal">改变props值</el-button>
  </div>
</template>
<script>
export default {
  props: ['title'],
  methods: {
    changePropsVal() {
      console.log(this.$props.title);
      // this.$props.title = 'aaa';错误
      this.$emit('update:title', 'newTitle');
    }
  }
};
</script>
