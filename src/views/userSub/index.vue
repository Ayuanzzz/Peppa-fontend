<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { getUserByid } from '@/api/up'
const userId = ref(0)
userId.value = useRoute().params.id
const tableData = ref([])
const count = ref(0)

const backupData = ref([])
const resData = ref([])

//计算表格数据
const computedTbale = (page) => {
    count.value = resData.value.length
    tableData.value = filterPage(resData.value, page)
}
const getData = (page) => {
    getUserByid(userId.value, page).then(res => {
        backupData.value = res.userprojects
        resData.value = res.userprojects
        currentPage.value = 1
        computedTbale(currentPage.value)
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
    computedTbale(currentPage.value)
})

//时间选择
const filterDate = ref('')
const handleFilterChange = () => {
    console.log(filterDate.value);
    if (filterDate.value === null) {
        filterDate.value = ["2000-01-01", "3000-01-01"]
    }
    resData.value = filterTime(filterDate.value, backupData.value)
    computedTbale()
}

//根据页码过滤数组
function filterPage(arr, i) {
    let result = [];
    let num = (i - 1) * 10
    result = arr.slice(num, num + 10)
    return result
}

//根据时间过滤数组
function filterTime(arr1, arr2) {
    const filteredArr = [];

    for (let i = 0; i < arr2.length; i++) {
        const startDate = new Date(arr1[0]).getTime(); // 将开始日期转换为时间戳
        const endDate = new Date(arr1[1]).getTime(); // 将结束日期转换为时间戳
        const objDate = new Date(arr2[i].timestamp).getTime(); // 将对象中的时间戳转换为时间戳

        if (objDate >= startDate && objDate <= endDate) {
            filteredArr.push(arr2[i]);
        }
    }
    return filteredArr;
}

onMounted(() => {
    getData()
})

</script>

<template>
    <div class="container">
        <el-date-picker v-model="filterDate" type="daterange" range-separator="To" placeholder="选择日期"
            start-placeholder="开始日期" end-placeholder="结束日期" @change="handleFilterChange"
            value-format="YYYY-MM-DD"></el-date-picker>
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