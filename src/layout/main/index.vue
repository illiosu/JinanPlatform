<template>
  <!-- 路由组件的出口 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <div v-if="flag">
        <!-- 渲染layout一级路由的子路由 -->
        <component :is="Component"></component>
      </div>
    </transition>
  </router-view>
</template>
<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting';
let layOutSettingStore = useLayOutSettingStore();
import { ref, watch, nextTick } from 'vue';

//控制当前组件是否销毁重建
let flag = ref(true);

//监听仓库内部数据是否发生变化，如果发生变化，说明用户点击过刷新按钮
watch(
  () => layOutSettingStore.refresh,
  () => {
    flag.value = false;
    nextTick(() => {
      flag.value = true;
    });
  },
);
</script>
<style lang="scss" scoped></style>
