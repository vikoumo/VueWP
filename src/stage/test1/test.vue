<template>
 <h2>1233</h2>
</template>
<style module="a" lang="scss">
    html{
        background:url("../../imgs/bg4.png");
    }
</style>
<script>

export default {
  data() {
    return {
      axio: 'axio',
      printRouter: 'printRouter'
    };
  },
  methods: {
    testaxio(){
      this.$http.get('/user?ID=12345')
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
    },
    testprintRouter(){
      console.log('router', this.$route);
    }
  }
};

</script>
