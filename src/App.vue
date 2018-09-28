<template>
  <div class="example">
    <p :class="a.red">
      This should be red
    </p>
    <div v-on:click="greet">{{ msg }}</div>
    <div>{{ msg }}</div>
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

export default {
  data() {
    return {
      msg: 'hello! webpack4-vue!'
    };
  },
  methods: {
    greet: () => {
      console.log(this.data.a.red);
    }
  }
  // mdsklf: {},
};

</script>
