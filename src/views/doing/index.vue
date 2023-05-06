<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import { getUserDoing, addUpByUser, changeStatus, removeUpById, updateUp } from '@/api/up';
import { ElMessage } from 'element-plus'
import { getUser } from '@/utils/auth'

const tableData = ref([])
const form = ref({
    name: '',
    num: 0,
    level: 0,
    remark: ''
});
const count = ref(0)

const userId = getUser().id
const handleDelete = (index, row) => {
    removeUpById(row.id).then((res) => {
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
}
const getData = (page) => {
    getUserDoing(userId, page).then(res => {
        console.log(res.count);
        tableData.value = res.data
        count.value = parseInt(res.count)
    }).catch(err => {
        console.log(err);
    })
}

const showForm = ref(false);
const submitForm = () => {
    let data = form.value
    data.user_id = userId
    addUpByUser(data).then(res => {
        if (res.status == 200) {
            getData(currentPage.value)
            ElMessage({
                message: '添加项目成功',
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

const editStatus = (index, row) => {
    if (row.status === false) {
        let data = {}
        data.status = row.status
        changeStatus(row.id, data).then(res => {
            if (res.status == 200) {
                getData(currentPage.value)
                ElMessage({
                    message: '项目已完成',
                    type: 'success',
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

const showEditForm = ref(false)
const editForm = ref({});
const handleEdit = (index, row) => {
    editForm.value = row
    showEditForm.value = true;
}

const submitEdit = () => {
    let data = {}
    data.level = editForm.value.level
    data.num = editForm.value.num
    data.remark = editForm.value.remark
    updateUp(editForm.value.id, data).then(res => {
        if (res.status == 200) {
            getData(currentPage.value)
            showEditForm.value = false
        }
    }).catch(err => {
        console.log(err);
    })
}
const cancleEdit = () => {
    showEditForm.value = false
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
        <el-dialog title="创建项目" v-model="showForm">
            <el-form :model="form">
                <el-form-item label="项目名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input v-model.num="form.num"></el-input>
                </el-form-item>
                <el-form-item label="难度">
                    <el-input v-model.level="form.level"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model.remark="form.remark"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">提交</el-button>
                    <el-button type="primary" @click="cancleForm">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-divider />

        <el-dialog title="编辑项目" v-model="showEditForm">
            <el-form :model="editForm">
                <el-form-item label="数量">
                    <el-input v-model.num="editForm.num"></el-input>
                </el-form-item>
                <el-form-item label="难度">
                    <el-input v-model.level="editForm.level"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model.remark="editForm.remark"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitEdit">提交</el-button>
                    <el-button type="primary" @click="cancleEdit">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-table :data="tableData" style="width: 1000px">
            <el-table-column prop="project_name" label="项目名称" width="180" />
            <el-table-column prop="num" label="数量" width="70" />
            <el-table-column prop="level" label="难度系数" width="100" />
            <el-table-column label="状态">
                <template #default="scope">
                    <el-switch v-model="scope.row.status" @change="editStatus(scope.$index, scope.row)" inline-prompt
                        active-text="进行中" inactive-text="已完成"></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="timestamp" label="创建时间" width="180" />
            <el-table-column prop="remark" label="备注" width="200" />
            <el-table-column label="Operations" width="180">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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

  
  
  