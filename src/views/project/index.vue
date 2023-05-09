<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import { getPro, addPro, deletePro } from '@/api/project';
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router';

const tableData = ref([])

const handleDelete = (index, row) => {
    ElMessageBox.confirm(
        '是否删除此项目',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            deletePro(row.id).then((res) => {
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
        })
        .catch(err => {
            console.log(err);
        })
}

const count = ref(0)
const getData = (page) => {
    getPro(page).then(res => {
        console.log(res);
        tableData.value = res.projects
        count.value = parseInt(res.count)
    }).catch(err => {
        console.log(err);
    })
}

const showForm = ref(false);
const form = ref({
    name: '',
    num: 0,
});

const submitForm = () => {
    let userId = JSON.parse(localStorage.getItem('userData')).id
    let data = form.value
    data.userId = userId
    addPro(data).then(res => {
        if (res.status == 200) {
            getData(1)
            ElMessage({
                message: '创建项目成功',
                type: 'success',
            })
        }
    }).catch(err => {
        console.log(err);
    })
    showForm.value = false;
};

const cancleForm = () => {
    showForm.value = false;
}

const proId = ref(0)
const router = useRouter()
const handleEdit = (index, row) => {
    proId.value = row.id
    router.push('/proSub/' + proId.value)
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
        <el-button type="primary" @click="showForm = true">创建项目</el-button>
        <el-dialog title="创建项目" v-model="showForm" style="height: 230px;">
            <el-form :model="form">
                <el-form-item label="项目名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="项目数量">
                    <el-input v-model.number="form.num"></el-input>
                </el-form-item>
                <el-form-item style="float:right">
                    <el-button type="primary" @click="submitForm">提交</el-button>
                    <el-button type="primary" @click="cancleForm">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-divider style="border-color:#c8c9cc" />
        <el-table :data="tableData" style="width: 950px">
            <el-table-column prop="name" label="项目名称" width="400" />
            <el-table-column prop="progress" label="项目进度" width="220">
                <template #default="scope">
                    <el-progress :text-inside="true" :stroke-width="20" :percentage=scope.row.progress.percentage
                        :status=scope.row.progress.status />
                </template>
            </el-table-column>
            <el-table-column prop="timestamp" label="创建时间" width="150" />
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

  
  
  