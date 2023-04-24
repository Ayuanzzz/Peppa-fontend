<script setup>
import { onMounted, ref, computed } from 'vue';
import { getProByid, addUp, removeUp } from '../../api/up';
import { getEmp } from '../../api/employee';
import { ElMessage } from 'element-plus'

const tableData = ref([])
const showForm = ref(false)
const checkList = ref([])
const empList = ref([])
const empListFilter = ref([])

const getData = () => {
    getProByid(7).then(res => {
        tableData.value = res.data
        getEmpData()
    }).catch(err => {
        console.log(err);
    })
}

const getEmpData = () => {
    getEmp().then(res => {
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



// 分配项目
const submit = () => {
    let tmp = checkList.value
    async function processTmp() {
        for (const e of tmp) {
            let data = {}
            data.user_id = e
            data.project_id = 7
            await addUp(data)
        }
        getData()
        checkList.value = []
        showForm.value = false
    }
    processTmp()
}
const cancel = () => {
    checkList.value = []
    showForm.value = false;
}

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

const isdisable = ((id) => {
    if (tableData.value) return tableData.value.some(obj => obj.user_id === id)
})


onMounted(() => {
    getData()
})



</script>
<template>
    <div class="container">
        <el-button type="primary" @click="showForm = true">添加人员</el-button>
        <el-dialog title="添加人员" v-model="showForm">
            <el-checkbox-group v-model="checkList" v-for="emp in empListFilter" :key="emp.id">
                <!-- <el-checkbox :label=emp.id :disabled="isdisable(emp.id)">{{ emp.name }}</el-checkbox> -->
                <el-checkbox :label=emp.id>{{ emp.name }}</el-checkbox>
            </el-checkbox-group>
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>

        </el-dialog>
        <el-divider />
        <el-table :data="tableData" style="width: 600px">
            <el-table-column prop="user_name" label="参与人员" width="180" />
            <el-table-column prop="num" label="图幅数量" width="170" />
            <el-table-column prop="level" label="完成情况" width="180" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pag">
            <el-pagination layout="prev, pager, next" :total="50" />

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

  
  
  