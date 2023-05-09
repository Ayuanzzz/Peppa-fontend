<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import { getUserDone, changeStatus, removeUpById, updateUp } from '@/api/up';
import { ElMessage, ElMessageBox } from 'element-plus'
import { getUser } from '@/utils/auth'
import { getCreator } from '@/api/project';

const userId = getUser().id
const resData = ref([])
const count = ref(0)
const tableData = ref([])
const backupData = ref([])

//删除表格数据
const handleDelete = (index, row) => {
    getCreator(row.project_id).then((res => {
        if (res.project.creator === userId) {
            ElMessageBox.confirm(
                '是否删除此项目',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                .then(() => {
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
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            ElMessage.error('不是此项目创建者，无权删除')
        }
    }))
}

//计算表格数据
const computedTbale = (page) => {
    count.value = resData.value.length
    tableData.value = filterPage(resData.value, page)
}
const getData = () => {
    getUserDone(userId).then(res => {
        backupData.value = res.data
        resData.value = res.data
        currentPage.value = 1
        computedTbale(currentPage.value)
    }).catch(err => {
        console.log(err);
    })
}

//编辑状态
const editStatus = (index, row) => {
    if (row.status === true) {
        let data = {}
        data.status = row.status
        changeStatus(row.id, data).then(res => {
            if (res.status == 200) {
                getData()
                ElMessage({
                    message: '项目进行中',
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

//编辑按钮
const submitEdit = () => {
    let data = {}
    data.level = editForm.value.level
    data.num = editForm.value.num
    data.remark = editForm.value.remark
    updateUp(editForm.value.id, data).then(res => {
        if (res.status == 200) {
            getData()
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
    console.log(currentPage.value);
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
        <div class="datepicker">
            <span>按时间选择：</span>
            <el-date-picker v-model="filterDate" type="daterange" range-separator="To" placeholder="选择日期"
                start-placeholder="开始日期" end-placeholder="结束日期" @change="handleFilterChange"
                value-format="YYYY-MM-DD"></el-date-picker>
        </div>
        <el-dialog title="编辑项目" v-model="showEditForm" style="height: 300px;">
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
                <el-form-item style="float:right">
                    <el-button type="primary" @click="submitEdit">提交</el-button>
                    <el-button type="primary" @click="cancleEdit">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="project_name" label="项目名称" width="180" />
            <el-table-column prop="num" label="数量" width="70" />
            <el-table-column prop="level" label="难度系数" width="100" />
            <el-table-column label="状态" width="100">
                <template #default="scope">
                    <el-switch v-model="scope.row.status" @change="editStatus(scope.$index, scope.row)" inline-prompt
                        active-text="进行中" inactive-text="已完成"></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" width="200" />
            <el-table-column prop="timestamp" label="创建时间" width="180">

            </el-table-column>
            <el-table-column label="编辑" width="180">
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

.datepicker {
    padding-left: 10px;
    align-self: flex-start;
    display: flex;
    align-items: center;

    span {
        color: #909399;
        font-family: "Microsoft YaHei";
        font-size: 14px;
    }
}
</style>

  
  
  