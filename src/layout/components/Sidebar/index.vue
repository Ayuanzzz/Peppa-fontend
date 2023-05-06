<script setup>
import { computed } from 'vue'
import {
    Document as IconDocument,
    Menu as IconMenu,
} from '@element-plus/icons-vue'
import router from '@/router'
import { getUser } from '@/utils/auth'
import { asyncRoutes } from '@/router';
import { filterAsyncRoutes } from '@/utils/router';
import { useRoute } from 'vue-router';

const username = getUser().name
const accessRoutes = filterAsyncRoutes(asyncRoutes, getUser().roles)
const logout = () => {
    localStorage.removeItem("userData")
    localStorage.removeItem("accessRoutes")
    router.push('/login')
}

const route = useRoute()
const activeMenu = computed(() => {
    const { path } = route
    return path
})

</script>

<template>
    <div class="container">
        <div class="menu">
            <div class="title">{{ username }}</div>
            <el-menu active-text-color="#ffd04b" background-color="#545c64" text-color="#fff" :default-active="activeMenu"
                style="border-right: none;" v-for="route in accessRoutes" :key="route.path">
                <el-menu-item :index="route.path" class="rli">
                    <router-link :to="route.path" class="routerContainer">
                        <component :is="route.children[0].meta.icon" style="width: 18px; height:18px;"></component>
                        <span class="routerTitle">{{ route.children[0].meta.title }}</span>
                    </router-link>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="btn">
            <el-button type="primary" @click="logout()">退出登录</el-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    height: 100vh;
    background-color: #545c64;
    display: flex;
    justify-content: center;
}

.title {
    margin-top: 30px;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(204, 204, 204, 0.5);
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    color: #ccc;
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    letter-spacing: 0.1em;
}

.btn {
    position: absolute;
    bottom: 150px;
}

.menu {
    width: 100%;
}

.routerContainer {
    display: flex;
    align-items: center;
}

.routerTitle {
    margin-left: 7px;
    margin-bottom: 1px;
    font-size: 17px;
}

.rli {
    display: flex;
    justify-content: center;
}
</style>

