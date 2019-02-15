<template>
  <input @focus="msg('provide inject')"/>
</template>
<script>
export default {
  inject: ['msg']
};
</script>
