<template>
  <el-row class="tac">
    <el-col :span="6">
      <el-menu
        class="el-menu-vertical"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>Vue Demo</span>
          </template>
          <el-menu-item-group>
            <el-submenu index="1-1">
              <div slot="title" @click="handleRoute({name: 'vueRouter'})">VueRouter</div>
              <el-menu-item index="1-1-1" @click="handleRoute({name: 'VueRouterPage1'})">page1</el-menu-item>
              <el-menu-item index="1-1-2" @click="handleRoute({name: 'VueRouterPage2', params: { id: 123 }})">page2</el-menu-item>
            </el-submenu>
            <el-submenu index="1-2">
              <div slot="title">Vue</div>
              <el-menu-item index="1-2-1" @click="handleRoute({name: 'vueAPI'})">vueAPI demo</el-menu-item>
              <el-menu-item index="1-2-2" @click="handleRoute({name: 'deepVueAPI'})">deep vueAPI demo</el-menu-item>
            </el-submenu>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-location"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="17">
      <el-card class="box-card">
        <h1 slot="header" class="header">{{ $route.meta.title }}</h1>
        <div>
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.el-menu-vertical {
  margin-right: 50px;
}
.header {
  font-size: 26px;
}
</style>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleRoute(params = {}) {
      this.$router.push(params);
    }
  }
};
</script>
