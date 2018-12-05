<template>
  <div id='vueApi'>
    <h3>原始 HTML</h3>
    <p>Using mustaches: {{ rawHtml }}</p>
    <p>Using v-html directive: <span v-html="rawHtml"></span></p>
    <h3>v-if</h3>
    <p v-if="seen">现在你看到我了</p>
    <h3>computed vs methods</h3>
    <p>Original message: "{{ message }}"</p>
    <p>Computed reversed message: "{{ computedReversedMessage }}"</p>
    <p>Methods reversed message: "{{ methodsReversedMessage() }}"</p>
    <h3>computed vs watch</h3>
    <p>computed fullName {{ computedFullName }}</p>
    <p>watch fullName {{ fullName }}</p>
  </div>
</template>

<style lang="scss" scoped>
#vueApi {
  color: #2c3e50;
  font-size: 16px;
  h3 {
    font-size: 20px;
  }
}
</style>


<script>
export default {
  data() {
    return {
      rawHtml: '<span style="color:red">this should be red</span>',
      seen: true,
      message: 'hello',
      firstName: 'Foo',
      lastName: 'Bar',
      fullName: 'Foo Bar'
    };
  },
  computed: {
    // 计算属性的 getter
    // 计算属性是基于它们的依赖进行缓存的
    computedReversedMessage() {
      return this.message.split('').reverse().join('');
    },
    computedFullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  },
  watch: {
    firstName(val) {
      this.fullName = `${val} ${this.lastName}`;
    },
    lastName(val) {
      this.fullName = `${this.firstName} ${val}`;
    }
  },
  methods: {
    jumpToPage() {
      this.$router.push({
        name: 'VueRouterPage2',
        params: { id: 123 },
        query: { plan: 'private', q: 'vue' }
      });
    },
    methodsReversedMessage() {
      return this.message.split('').reverse().join('');
    }
  }
};

</script>
