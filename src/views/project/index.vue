<script setup>
import { onMounted, ref } from 'vue';
import { getPro, addPro, deletePro } from '../../api/project';
import { ElMessage } from 'element-plus'
import ProSub from './component/ProSub.vue'

const tableData = ref([])

const handleDelete = (index, row) => {
    deletePro(row.id).then((res) => {
        console.log(row.id);
        console.log(res);
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
    getPro().then(res => {
        tableData.value = res.projects
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
    console.log(form.value);
    addPro(form.value).then(res => {
        if (res.status == 200) {
            getData()
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

const showSub = ref(false)
const proId = ref(0)
const handleEdit = (index, row) => {
    proId.value = row.id
    console.log('p', proId.value);
    showSub.value = true
}
onMounted(() => {
    getData()
})



</script>
<template>
    <div class="container">
        <el-button type="primary" @click="showForm = true">创建项目</el-button>
        <el-dialog title="创建项目" v-model="showForm">
            <el-form :model="form">
                <el-form-item label="项目名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="项目数量">
                    <el-input v-model.number="form.num"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">提交</el-button>
                    <el-button type="primary" @click="cancleForm">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-divider />
        <el-dialog v-model="showSub" style="width: 700px">
            <!-- 添加key刷新组件 -->
            <ProSub :pro-id="proId" :key="proId" />
        </el-dialog>
        <el-table :data="tableData" style="width: 500px;height:1200px">
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="timestamp" label="Time" width="180" />
            <el-table-column label="Operations">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
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

  
  
  