<template>
  <div>this.$parent && this.$root</div>
</template>
<script>
export default {
  mounted() {
    console.log('this.$root', this.$root);
    console.log('this.$parent', this.$parent);
  }
};
</script>
