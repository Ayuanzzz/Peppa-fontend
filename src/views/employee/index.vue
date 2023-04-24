<script setup>
import { onMounted, ref } from 'vue';
import { getEmp, updateEmp } from '../../api/employee';
import { ElMessage } from 'element-plus'

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
onMounted(() => {
    getData()
})



</script>
<template>
    <div class="container">
        <el-table :data="tableData" style="width: 500px">
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="timestamp" label="Time" width="180" />
            <el-table-column label="Operations">
                <template #default="scope">
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

  
  
  