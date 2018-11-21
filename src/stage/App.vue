<template>
  <div class="example">
    <p :class="a.red">
      This should be red
    </p>
    <div v-on:click="testaxio">{{ axio }}</div>
    <div v-on:click="testprintRouter">{{ printRouter }}</div>
  </div>
</template>
<style module="a">
.example {
  color: red;
}
.red {
  color: red;
}
.bold {
  font-weight: bold;
}
</style>
<script>
import './App.scss';
import axios from 'axios';

export default {
  data() {
    return {
      axio: 'axio',
      printRouter: 'printRouter'
    };
  },
  methods: {
    testaxio: () => {
      axios.get('/user?ID=12345')
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
    testprintRouter: () => {
      console.log('router', this.$route);
    }
  }
};

</script>
