<template>
  <div class="page-content">
    <div class="part-top">
      <div class="part-bar"/>
      <div class="part-title">
        <img src="https://supnuevoweb.com.ar/wp-content/uploads/2019/02/logo.png" alt="SupNuevo" id="logo"
             data-height-percentage="54" data-actual-width="216" data-actual-height="60">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">

          <el-menu-item index="1">
            <router-link :to="{'name':'method1'}">供应商信息</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link :to="{'name':'method3'}">商品计划购买</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link :to="{'name':'method4'}">商品信息维护</router-link>
          </el-menu-item>
          <el-submenu index="4">
            <template slot="title">帮助</template>
            <el-menu-item index="2-1">p</el-menu-item>
            <el-menu-item index="2-2">p</el-menu-item>
            <el-menu-item index="2-3">a</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">b</template>
              <el-menu-item index="2-4-1">b</el-menu-item>
              <el-menu-item index="2-4-2">b</el-menu-item>
              <el-menu-item index="2-4-3">b</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </div>


    </div>

    <div class="main-content">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key"/>
      </transition>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'layout',
    data() {
      return {}
    },
    computed: {
      key() {
        return this.$route.fullPath
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .page-content {
    width: 100%;
    background-color: ghostwhite;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 100vh;

  }

  .part-top {
    background-color: white;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }

  .part-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 15%;
  }

  .part-bar {
    height: 4vh;
    background-color: #2ea3f2;
  }

  .main-content {
    padding: 0 8%;
  }
</style>
