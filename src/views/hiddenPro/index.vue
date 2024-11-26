<script setup>
import { onMounted, ref, watchEffect, watch } from "vue";
import { getHiddenPro, deletePro, findByName, showPro } from "@/api/project";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import { itemStore } from "@/stores/item";
import { createLoadingComponent } from "element-plus/es/components/loading/src/loading";

const tableData = ref([]);
const resData = ref([]);
const store = itemStore();

const handleDelete = (index, row) => {
  ElMessageBox.confirm("是否删除此项目", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      deletePro(row.id)
        .then((res) => {
          if (res.status == 200) {
            ElMessage({
              message: "删除已成功",
              type: "success",
            });
            getData(currentPage.value);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

//隐藏项目
const handleShow = (index, row) => {
  showPro(row.id)
    .then((res) => {
      if (res.status == 200) {
        ElMessage({
          message: "项目已显示",
          type: "success",
        });
        getData(currentPage.value);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const count = ref(0);
const getData = () => {
  getHiddenPro()
    .then((res) => {
      console.log("data------", res);
      backupData.value = res.projects;
      resData.value = res.projects;
      tableData.value = res.projects;
      computedTbale(currentPage.value);
    })
    .catch((err) => {
      console.log(err);
    });
};

const proId = ref(0);
const router = useRouter();
const handleEdit = (index, row) => {
  proId.value = row.id;
  store.changeName(row.name);
  router.push("/proSub/" + proId.value);
};

//分页选择
const currentPage = ref(1);
const handleCurrentChange = (val) => {
  currentPage.value = val;
};

//时间选择
const filterDate = ref("");
const backupData = ref([]);
const handleFilterChange = () => {
  if (filterDate.value === null) {
    filterDate.value = ["2000-01-01", "3000-01-01"];
  }
  resData.value = filterTime(filterDate.value, backupData.value);
  computedTbale(1);
};

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

//根据页码过滤数组
function filterPage(arr, i) {
  let result = [];
  let num = (i - 1) * 10;
  result = arr.slice(num, num + 10);
  return result;
}

//计算表格数据
const computedTbale = (page) => {
  count.value = resData.value.length;
  tableData.value = filterPage(resData.value, page);
};

//项目搜索框
const input = ref("");
watch(input, (newVal) => {
  setTimeout(() => {
    console.log(newVal);
    if (newVal) {
      findByName(newVal)
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            backupData.value = res.data;
            resData.value = res.data;
            tableData.value = res.data;
            computedTbale(currentPage.value);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getData(currentPage.value);
    }
  }, 2000);
});

//监听页数变化
watchEffect(() => {
  computedTbale(currentPage.value);
});

onMounted(() => {
  getData(currentPage.value);
});
</script>
<template>
  <div class="container">
    <div class="picker">
      <div>
        <span>按时间搜索：</span>
        <el-date-picker
          v-model="filterDate"
          type="daterange"
          range-separator="To"
          placeholder="选择日期"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="handleFilterChange"
          value-format="YYYY-MM-DD"
        ></el-date-picker>
      </div>
      <div>
        <el-input v-model="input" placeholder="按项目搜索" clearable />
      </div>
    </div>
    <el-divider style="border-color: #c8c9cc" />
    <el-table :data="tableData" style="width: 950px">
      <el-table-column prop="name" label="项目名称" width="300" />
      <el-table-column prop="progress" label="项目进度" width="220">
        <template #default="scope">
          <el-progress
            :text-inside="true"
            :stroke-width="20"
            :percentage="scope.row.progress.percentage"
            :status="scope.row.progress.status"
          />
        </template>
      </el-table-column>
      <el-table-column prop="timestamp" label="创建时间" width="200" />
      <el-table-column label="编辑">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button
            size="small"
            type="success"
            @click="handleShow(scope.$index, scope.row)"
            >显示</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pag">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="prev, pager, next"
        :total="count"
      ></el-pagination>
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

.picker {
  align-self: flex-start;
  width: 100%;
  display: flex;
  justify-content: space-between;

  span {
    color: #909399;
    font-family: "Microsoft YaHei";
    font-size: 14px;
  }

  .btn {
    margin-right: 50px;
  }
}
</style>
