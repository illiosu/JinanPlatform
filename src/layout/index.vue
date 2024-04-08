<template>
  <div class="layout_container">
    <div class="layout_slider" :class="{ fold: LatOutSettingStore.fold ? true : false }">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu :collapse="LatOutSettingStore.fold ? true : false" :default-active="$route.path" background-color="#001529" text-color="white">
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar" :class="{ fold: LatOutSettingStore.fold ? true : false }">
      <Tabbar></Tabbar>
    </div>
    <div class="layout_main" :class="{ fold: LatOutSettingStore.fold ? true : false }">
      <Main></Main>
    </div>
  </div>
</template>
<script setup lang="ts">
import userUserStore from '@/store/modules/user';
import Logo from './logo/index.vue';
import Menu from './menu/index.vue';
import Main from './main/index.vue';
import { useRoute } from 'vue-router';
import Tabbar from './tabbar/index.vue';

import useLayOutSettingStore from '@/store/modules/setting';
let userStore = userUserStore();
let $route = useRoute();
let LatOutSettingStore = useLayOutSettingStore();
console.log(userStore.menuRoutes);
</script>
<script lang="ts">
export default {
  name: 'Layout',
};
</script>
<style scoped lang="scss">
.layout_container {
  // background-color: red;
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-slider-width;
    height: 100vh;
    background-color: $base-slider-background;
    transition: all 0.3s;
    color: white;
    .scrollbar {
      width: 100%;
      height: calc(90vh - $base-slider-logo-height);
    }
    &.fold {
      width: $base-slider-min-width;
    }
  }

  .layout_tabbar {
    width: calc(100% - $base-slider-width);
    position: fixed;
    height: $base-tabbar-heigth;
    // background-color: aqua;
    top: 0px;
    left: $base-slider-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-slider-min-width);
      left: $base-slider-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-slider-width);
    height: calc(100vh - $base-tabbar-heigth);
    background-color: bisque;
    left: $base-slider-width;
    top: $base-tabbar-heigth;
    // padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-slider-min-width);
      left: $base-slider-min-width;
    }
  }
}
</style>
