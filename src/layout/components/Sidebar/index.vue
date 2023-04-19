<script setup>
import {
    Document,
    Menu as IconMenu,
} from '@element-plus/icons-vue'
</script>

<template>
    <div class="container">
        <div class="menu">
            <div class="title">贤宇</div>
            <el-menu active-text-color="#ffd04b" background-color="#545c64" text-color="#fff" default-active="1"
                style="border-right: none;">
                <el-menu-item index="1">
                    <el-icon><icon-menu /></el-icon>
                    <span>one</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>two</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>two</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>two</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="btn">
            <el-button type="primary">退出登录</el-button>

        </div>

        <!-- <div class="btn"> -->

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
    margin-bottom: 30px;
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
    // display: inline;
    position: absolute;
    bottom: 150px;
}

.menu {
    width: 100%;
}
</style>

