<script setup>
import { onMounted, ref } from 'vue';
import { getUserByid } from '@/api/up';

const tableData = ref([])
const props = defineProps(['userId'])

const getData = () => {
    console.log('sub--', props.proId);
    getUserByid(props.userId).then(res => {
        tableData.value = res.data
        getEmpData()
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
        <el-table :data="tableData" style="width: 600px">
            <el-table-column prop="project_name" label="参与项目" width="180" />
            <el-table-column prop="num" label="图幅数量" width="170" />
            <el-table-column prop="level" label="完成情况" width="180" />
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

  
  
  