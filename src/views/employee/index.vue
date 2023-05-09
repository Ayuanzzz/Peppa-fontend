<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import { getEmp, updateEmp } from '@/api/employee';
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router';
const tableData = ref([])

const handleDelete = (index, row) => {
    ElMessageBox.confirm(
        '是否删除此员工',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        updateEmp(row.id).then((res) => {
            if (res.status == 200) {
                ElMessage({
                    message: '删除已成功',
                    type: 'success',
                })
                getData(currentPage.value)
            }
        }).catch(err => {
            console.log(err);
        })
    }).catch((err) => { console.log(err); })


}

const count = ref(0)
const getData = (page) => {
    getEmp(page).then(res => {
        tableData.value = res.users
        count.value = parseInt(res.count)
    }).catch(err => {
        console.log(err);
    })
}
const userId = ref(0)
const router = useRouter()
const handleEdit = (index, row) => {
    userId.value = row.id
    router.push('/userSub/' + userId.value)
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
onMounted(() => {
    getData(currentPage.value)
})

</script>
<template>
    <div class="container">
        <el-table :data="tableData" style="width: 600px">
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="timestamp" label="加入时间" width="180" />
            <el-table-column label="编辑">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
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
</style>

  
  
  