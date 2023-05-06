<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { getUserByid } from '@/api/up'
const userId = ref(0)
userId.value = useRoute().params.id
const tableData = ref([])
const count = ref(0)
const getData = (page) => {
    getUserByid(userId.value, page).then(res => {
        tableData.value = res.userprojects
        console.log(tableData.value);
        count.value = parseInt(res.count)
    }).catch(err => {
        console.log(err);
    })
}

//分页选择
const currentPage = ref(1)
const handleCurrentChange = (val) => {
    currentPage.value = val
}
//监听页数变化
watchEffect(() => {
    getData(currentPage.value)
})

</script>

<template>
    <div class="container">
        <el-table :data="tableData" style="width: 750px">
            <el-table-column prop="project_name" label="参与项目" width="180" />
            <el-table-column prop="num" label="图幅数量" width="170" />
            <el-table-column prop="status" label="完成情况" width="180">
                <template #default="scope">
                    <el-tag :type="scope.row.status ? 'success' : ''">{{ scope.row.status ? '已完成' : '进行中' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="timestamp" label="创建时间" width="250" />
        </el-table>
        <div class="pag">
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" layout="prev, pager, next"
                :total="count"></el-pagination>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.pag {
    margin-top: 20px;
}
</style>