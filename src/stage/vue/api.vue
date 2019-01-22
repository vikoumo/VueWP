<template>
  <div id='vueApi'>
    <h3>v-once</h3>
    <p>Message: {{ onece }}</p>
    <p v-once>这个将不会改变: {{ onece }}</p>
    <el-button type="primary" @click="changeOnceVal">改变值</el-button>
    <h3>原始 HTML</h3>
    <p>Using mustaches: {{ rawHtml }}</p>
    <p>Using v-html directive: <span v-html="rawHtml"></span></p>
    <h3>v-if vs v-show</h3>
    <!-- v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。 -->
    <!-- v-show控制元素的display属性，始终会被渲染并保留在 DOM 中 -->
    <!-- v-if 有更高的切换开销，而 v-show 有更高的初始渲染开 -->
    <p v-if="seen">v-if 现在你看到我了</p>
    <p v-show="seen">v-show 现在你看到我了</p>
    <el-button type="primary" @click="toggle">toggle</el-button>
    <h3>computed vs methods</h3>
    <p>Original message: "{{ message }}"</p>
    <p>Computed reversed message: "{{ computedReversedMessage }}"</p>
    <p>Methods reversed message: "{{ methodsReversedMessage() }}"</p>
    <h3>computed vs watch</h3>
    <el-form>
      <el-form-item label="computed fullName">
        <el-input v-model="computedFullName"></el-input>
      </el-form-item>
    </el-form>
    <p>computed fullName {{ computedFullName }}</p>
    <p>watch fullName {{ watchFullName }}</p>
    <h3>watch</h3>
    <p>Ask a yes/no question:</p>
    <el-form>
      <el-form-item label="question">
        <el-input v-model="question"></el-input>
      </el-form-item>
    </el-form>
    <p>{{ answer }}</p>
    <h3>v-for</h3>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item.name }}
      </li>
    </ul>
    <el-button type="primary" @click="pushItem">pushItem</el-button>
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
      onece: 'abc',
      rawHtml: '<span style="color:red">this should be red</span>',
      seen: true,
      message: 'hello',
      firstName: 'Foo',
      lastName: 'Bar',
      watchFullName: 'Foo Bar',
      question: '',
      answer: 'I cannot give you an answer until you ask a question!',
      items: [
        { name: 'aa' },
        { name: 'bb' }
      ]
    };
  },
  computed: {
    // 计算属性的 getter
    // 计算属性是基于它们的依赖进行缓存的
    computedReversedMessage() {
      return this.message.split('').reverse().join('');
    },
    computedFullName: {
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(newVal) {
        [this.firstName, ...this.lastName] = newVal.split(' ');
      }
    }
  },
  watch: {
    firstName(val) {
      this.watchFullName = `${val} ${this.lastName}`;
    },
    lastName(val) {
      this.watchFullName = `${this.firstName} ${val}`;
    },
    // 当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的
    // 如果 `question` 发生改变，这个函数就会运行
    question() {
      this.answer = 'Waiting for you to stop typing...';
      this.debouncedGetAnswer();
    }
  },
  created() {
    // debounce返回的是一个新的函数
    this.debouncedGetAnswer = lodash.debounce(this.getAnswer, 500);
  },
  methods: {
    changeOnceVal() {
      this.onece = 'aaa';
    },
    toggle() {
      this.seen = !this.seen;
    },
    // 每当触发重新渲染时，调用方法将总会再次执行函数
    methodsReversedMessage() {
      return this.message.split('').reverse().join('');
    },
    getAnswer() {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)';
      } else {
        this.answer = 'Thinking...';
        const vm = this;
        this.axios.get('https://yesno.wtf/api')
          .then(function (response) {
            vm.answer = lodash.capitalize(response.data.answer);
          })
          .catch(function (error) {
            console.log(error);
            vm.answer = 'Error! Could not reach the API. ';
          });
      }
    },
    pushItem() {
      // this.items.push({ name: 'cc' });
      this.$set(this.items, 2, { name: 'cc' });
    }
  }
};

</script>
