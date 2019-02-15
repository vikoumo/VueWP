<template>
  <label>
    {{ label }}
    <input v-on="$listeners" />
  </label>
</template>
<script>
export default {
  props: ['label'],
  created() {
    console.log('this.$listeners', this.$listeners);
  }
};
</script>
