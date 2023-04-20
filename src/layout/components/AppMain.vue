<script setup>
import router from '@/router'
import { computed } from 'vue'
const key = computed(() => {
    return useRouter().path
})
console.log(router.currentRoute._value);
</script>

<template>
    <div class="app-main">
        <!-- <Transition name="fade-transform" mode="out-in"> -->
        <router-view key="/done"></router-view>
        <!-- </Transition> -->
        <!-- <div>test</div> -->
    </div>
</template>

<style lang="scss" scoped>
.app-main {
    height: 100vh;
    margin: 100px 20px 0px 20px;
}
</style>

