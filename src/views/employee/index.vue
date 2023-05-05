<script setup>
import { onMounted, ref } from 'vue';
import { getEmp, updateEmp } from '@/api/employee';
import { ElMessage } from 'element-plus'
import UserSub from './component/UserSub.vue'

const tableData = ref([])

const handleDelete = (index, row) => {
    updateEmp(row.id).then((res) => {
        if (res.status == 200) {
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
const getData = () => {
    getEmp().then(res => {
        tableData.value = res.users
    }).catch(err => {
        console.log(err);
    })
}
const showSub = ref(false)
const userId = ref(0)
const handleEdit = (index, row) => {
    userId.value = row.id
    console.log('p', userId.value);
    showSub.value = true
}
onMounted(() => {
    getData()
})



</script>
<template>
    <div class="container">
        <el-dialog v-model="showSub" style="width: 700px">
            <!-- 添加key刷新组件 -->
            <UserSub :user-id="userId" :key="userId" />
        </el-dialog>
        <el-table :data="tableData" style="width: 700px">
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="timestamp" label="Time" width="180" />
            <el-table-column label="Operations">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
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

  
  
  