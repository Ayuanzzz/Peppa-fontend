<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { getProByid, addUp, removeUp } from '@/api/up'
import { getAllEmp } from '@/api/employee';
const proId = ref(0)
proId.value = useRoute().params.id
const tableData = ref([])
const count = ref(0)
const getData = (page) => {
    getProByid(proId.value, page).then(res => {
        tableData.value = res.data
        getEmpData()
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

//获取员工列表
const empList = ref([])
const getEmpData = () => {
    getAllEmp().then(res => {
        empList.value = res.users
        empListFilter.value = filterArr(empList.value, tableData.value)

    }).catch(err => {
        console.log(err);
    })
}

// 过滤数组
function filterArr(array1, array2) {
    if (array2) {
        return array1.filter((item1) => !array2.find((item2) => item1.id === item2.user_id));
    } else {
        return array1
    }
}

const showForm = ref(false)
const checkList = ref([])
const empListFilter = ref([])

// 分配项目
const submit = () => {
    let tmp = checkList.value
    async function processTmp() {
        for (const e of tmp) {
            let data = {}
            data.user_id = e
            data.project_id = proId.value
            await addUp(data)
        }
        getData(currentPage.value)
        checkList.value = []
        showForm.value = false
    }
    processTmp()
}
const cancel = () => {
    checkList.value = []
    showForm.value = false;
}

//删除人员
const handleDelete = (index, row) => {
    removeUp(row.user_id, row.project_id).then(res => {
        if (res.status = 200) {
            ElMessage({
                message: '删除已成功',
                type: 'success',
            })
            getData()
        }
    }).catch(err => {
        console.log(err);
    })
}
</script>

<template>
    <div class="container">
        <el-button type="primary" @click="showForm = true">添加人员</el-button>
        <el-divider style="border-color:#c8c9cc" />
        <el-dialog title="添加人员" v-model="showForm">
            <el-checkbox-group v-model="checkList" v-for="emp in empListFilter" :key="emp.id">
                <el-checkbox :label=emp.id class="checkbox">{{ emp.name }}</el-checkbox>
            </el-checkbox-group>
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
        </el-dialog>
        <el-table :data="tableData" style="width: 750px">
            <el-table-column prop="user_name" label="参与人员" width="180" />
            <el-table-column prop="num" label="图幅数量" width="170" />
            <el-table-column prop="status" label="完成情况" width="180">
                <template #default="scope">
                    <el-tag :type="scope.row.status ? 'success' : ''">{{ scope.row.status ? '已完成' : '进行中' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="timestamp" label="创建时间" width="250" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
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

.checkbox {
    display: inline-block;
}
</style>