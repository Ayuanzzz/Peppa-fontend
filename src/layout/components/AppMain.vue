<template>
    <div class="app-main">
        <div>
            <router-view v-slot="{ Component, route }">
                <component :is="Component" :key="route.path"></component>
            </router-view>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.app-main {
    height: calc(100vh - 10px);
    display: flex;
    margin-top: 5%;
    justify-content: center;
    overflow: scroll;
}
</style>

