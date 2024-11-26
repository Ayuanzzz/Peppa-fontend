<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { getProByid, addUp, removeUp } from '@/api/up'
import { getAllEmp } from '@/api/employee'
import { ElMessage } from 'element-plus'
import{itemStore} from '@/stores/item'

const store= itemStore()
const proId = ref(0)
proId.value = useRoute().params.id
const tableData = ref([])
const count = ref(0)
const getData = (page) => {
    getProByid(proId.value, page).then(res => {
        console.log(res)
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
            getData(currentPage.value)
        }
    }).catch(err => {
        console.log(err);
    })
}
</script>

<template>
    <div class="container">
        <div class="header">
        <h2>{{store.name}}</h2>
        <el-button type="primary" @click="showForm = true">添加人员</el-button>
        </div>
        <el-divider style="border-color:#c8c9cc" />
        <el-dialog title="添加人员" v-model="showForm" class="dialog">
            <el-divider />
            <el-checkbox-group v-model="checkList" v-for="emp in empListFilter" :key="emp.id">
                <el-checkbox :label=emp.id class="checkbox">{{ emp.name }}</el-checkbox>
            </el-checkbox-group>
            <div class="footer">
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button type="primary" @click="cancel">取消</el-button>
            </div>
        </el-dialog>
        <el-table :data="tableData" style="width: 1000px">
            <el-table-column prop="user_name" label="参与人员" width="100" />
            <el-table-column prop="num" label="图幅数量" width="90" />
            <el-table-column prop="remark" label="备注" />
            <el-table-column prop="status" label="完成情况" width="180">
                <template #default="scope">
                    <el-tag :type="scope.row.status ? '' : 'success'">{{ scope.row.status ? '进行中' : '已完成' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="timestamp" label="创建时间" width="120" />
            <el-table-column prop="endtime" label="完成时间" width="120" />
            <el-table-column label="操作" width="90">
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

h2{
    color: #909399;
}

.pag {
    margin-top: 20px;
}

.checkbox {
    display: inline-block;
}

.footer {
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.dialog {
    position: relative;
}

.header{
    width: 100%;
    display: flex;
    justify-content: space-around;
}
</style>