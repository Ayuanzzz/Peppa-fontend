<script setup>
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
</script>

<template>
    <div class="app-container">
        <el-row class="side-row">
            <el-col :span="4">
                <sidebar />
            </el-col>
            <el-col :span="20">
                <app-main />
            </el-col>
        </el-row>
    </div>
</template>

<style lang="scss" scoped>
.app-container {
    height: 100%;
}
</style>

