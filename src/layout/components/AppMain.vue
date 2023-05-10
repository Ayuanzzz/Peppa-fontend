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
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: scroll;
}
</style>

