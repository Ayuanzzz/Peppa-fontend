<script setup>
// import router from '@/router'
// import { computed } from 'vue'
// const key = computed(() => {
//     return useRouter().path
// })
// console.log(router.currentRoute._value);
</script>

<template>
    <div class="app-main">
        <router-view v-slot="{ Component, route }">
            <component :is="Component" :key="route.path"></component>
        </router-view>
    </div>
</template>

<style lang="scss" scoped>
.app-main {
    height: 100vh;
    margin: 100px 20px 0px 20px;
}
</style>

