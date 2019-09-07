<template>
  <div class="page-content">
    <div class="part-top">
      <div class="part-bar"/>
      <div class="part-title">
        <img src="https://supnuevoweb.com.ar/wp-content/uploads/2019/02/logo.png" height="61px" width="216px" alt="SupNuevo" id="logo"
             data-height-percentage="54" data-actual-width="216" data-actual-height="60">
        <!--<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">-->
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">
            <router-link :to="{'name':'method1'}">{{$t('menu.gys')}}</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link :to="{'name':'method3'}">{{$t('menu.spjhgm')}}</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link :to="{'name':'method4'}">{{$t('menu.spxxwh')}}</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <router-link :to="{'name':'method2'}">{{$t('menu.xgmm')}}</router-link>
          </el-menu-item>
          <lang-select style="float: right;margin-top: 20px;" />
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
  import LangSelect from '@/components/LangSelect'
  export default {
    name: 'layout',
    data() {
      return {}
    },
    computed: {
      key() {
        return this.$route.fullPath
      }
    },
    components: { LangSelect }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .page-content {
    width: 100%;
    background-color: white;
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
    padding-left: 8%;
    padding-right: 5%;
  }
</style>
