<template>
  <div id='deepApi'>
    <h3>将原生事件绑定到组件(.native)</h3>
    <native-input @click.native="msg('native')"/>
    <br />
    <listeners-input label="$listeners" @click="msg('listeners')" @focus="msg('listeners')"/>
    <h3>.sync 修饰符 => prop“双向绑定”</h3>
    <sync-prop :title.sync="sync" />
    <h3>插槽slot-scope</h3>
    <slot-scope :todos="todos">
      <template slot-scope="{ todo }">
        <span v-if="todo.isComplete">✓</span>
        {{ todo.text }}
      </template>
    </slot-scope>
    <h3>失活的组件将会被缓存 keep-alive</h3>
    <br />
    <h3>访问根实例和父级组件实例</h3>
    <root-parent />
    <h3>访问子组件实例或子元素</h3>
    <!-- $refs 只会在组件渲染完成之后生效，并且它们不是响应式的。
    这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问$refs。 -->
    <input ref="input" @focus="msg('$refs')"/>
    <el-button type="primary" @click="focusInput">focus input</el-button>
    <h3>依赖注入 provide inject</h3>
    <provide-inject />
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
      sync: 'title',
      todos: [
        {
          id: 1,
          text: '111',
          isComplete: true
        }, {
          id: 2,
          text: '222',
          isComplete: false
        }, {
          id: 3,
          text: '333',
          isComplete: true
        }, {
          id: 4,
          text: '444',
          isComplete: false
        }, {
          id: 5,
          text: '555',
          isComplete: true
        }
      ]
    };
  },
  beforeUpdate() {
    console.log('父级sync', this.sync);
  },
  mounted() {
  },
  provide() {
    return {
      msg: this.msg
    };
  },
  methods: {
    msg(msg) {
      console.log('msg', msg);
    },
    focusInput() {
      this.$refs.input.focus();
    }
  }
};
</script>
