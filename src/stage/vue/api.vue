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
    <h3>事件修饰符</h3>
    <div class="parent" @click="print('1')">
      <div class="child" @click="print('2')">
        <div class="grant" @click="print('3')" />
      </div>
      <div class="child" @click.stop="print('2')">
        <div class="grant" @click.stop="print('3')">
          .stop阻止事件冒泡
        </div>
      </div>
      <div class="child" @click="print('2')">
        <div class="grant" @click.capture.prevent="print('3')">
          .prevent阻止捕获
        </div>
      </div>
      <div class="child" @click.capture="print('2')">
        <!-- 添加事件监听器时使用事件捕获模式 -->
        <!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
        <div class="grant" @click.capture="print('3')">
          使用事件捕获模式.capture
        </div>
      </div>
      <div class="child" @click.self="print('2')">
        <!-- 即事件不是从内部元素触发的 -->
        <div class="grant" @click.self="print('3')">
          元素自身触发处理函数.self
        </div>
      </div>
      <div class="child" @click.once="print('2')">
        <!-- 只触发一次 -->
        <div class="grant" @click.once="print('3')">
          .once
        </div>
      </div>
    </div>
    <h3>v-model</h3>
    <input v-model="searchText">
    <!-- || -->
    <!-- input 有个 oninput 事件,监听输入事件 -->
    <input
      :value="searchText"
      @input="searchText = $event.target.value"
    >
    <custom-input v-model="searchText" />
    <!-- || -->
    <custom-input
      :value="searchText"
      @input="searchText = $event"
    />
  </div>
</template>

<style lang="scss" scoped>
#vueApi {
  color: #2c3e50;
  font-size: 16px;
  h3 {
    font-size: 20px;
  }
  .parent {
    width: 100%;
    height: 200px;
    background-color: brown;
    display: flex;
    flex-wrap: wrap;
    .child {
      width: 15%;
      height: 80px;
      background-color: burlywood;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    .grant {
      width: 80%;
      height: 50px;
      background-color: aqua;
    }
  }
}
</style>


<script>
import customInput from './component/custom-input';

export default {
  components: {
    customInput
  },
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
      ],
      searchText: 'aa'
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
    },
    print(string) {
      console.log(string);
    }
  }
};

</script>
