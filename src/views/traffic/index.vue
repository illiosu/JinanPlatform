<template>
  <div>
    <el-card class="box-card" style="margin: 10px">
      <!-- 添加按钮 -->
      <!-- <el-button type="primary" @click="addScenicSpot" icon="plus">添加景区</el-button> -->
      <!-- 表格 -->
      <el-table :data="TransportationList" style="width: 100%; margin: 10px 0px" border>
        <el-table-column label="gid" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="name">
          <template #="{ row, $index }">
            <pre style="color: black">{{ row.name }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="address" prop="address"></el-table-column>
        <el-table-column label="adname" prop="adname"></el-table-column>

        <el-table-column label="location" prop="location"></el-table-column>

        <el-table-column label="q_name" prop="q_name"></el-table-column>
        <!-- <el-table-column label="简介" prop="景区简"></el-table-column> -->

        <!-- <el-table-column label="操作" width="180px">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" icon="Edit" @click="updateScenicSpot(row)">编辑</el-button>
            <el-button type="primary" size="small" icon="Delete" @click="deleteScenicSpotApi(row.gid)">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper, ->,sizes,total"
        :total="total"
        @current-change="getTransportation"
        @size-change="getTransportation" />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { reqTransportation, reqTransportationCount } from '@/api/tourism/traffic/index.ts';
import { ElMessageBox } from 'element-plus';

const dialogTableVisible = ref(false);
const dialogFormVisible = ref<boolean>(false);
const formLabelWidth = '140px';

const form = reactive({
  id: '',
  name: '',
  address: '',
  adname: '',
  x: '',
  y: '',
  type: '',
  introduction: '',
});

// import { test } from '@/api/test/index.ts';
// 当前页码
let pageNo = ref<number>(1);
// 每页显示条数
let limit = ref<number>(7);
// 总条数
let total = ref<number>(0);
// 存储景区信息的数组
let TransportationList = ref([]);

// 封装获取交通设施的接口
const getTransportation = async () => {
  const result = await reqTransportation(pageNo.value, limit.value);
  if (result.code == 200) {
    console.log(result);
    TransportationList.value = result.data;
  }
};
// 封装获取景区总数的接口
const getTransportationCount = async () => {
  const result = await reqTransportationCount();
  if (result.code == 200) {
    // console.log(result.data);
    total.value = result.data;
  }
};
//   // console.log(result);
// };
// // 封装添加或编辑景区的接口
// const addOrUpdateScenicSpotApi = async () => {
//   console.log(form);
//   const result = await reqAddorUpdateScenicSpot(form);
//   console.log(result);
//   //todo 后端结果类还没有封装,目前是void
//   if (result.code == 200) {
//     dialogFormVisible.value = false;
//     ElMessageBox({
//       type: 'success',
//       message: '添加成功',
//     });

//     getTransportation();
//     getTransportationCount();
//   } else {
//     ElMessageBox({
//       type: 'error',
//       message: '添加失败',
//     });
//   }
// };
// 封装删除景区的接口
// const deleteScenicSpotApi = async (id: number) => {
//   ElMessageBox.confirm('确认删除吗？')
//     .then(async () => {
//       // console.log(id);
//       // console.log('deleteScenicSpotApi')
//       const result = await reqDeleteScenicSpot(id);
//       // console.log(result);
//       //todo 后端结果类还没有封装,目前是void
//       if (result.code == 200) {
//         dialogFormVisible.value = false;
//         ElMessageBox({
//           type: 'success',
//           message: '删除成功',
//         });
//         getScenicSpot();
//         getScenicSpotCount();
//       } else {
//         ElMessageBox({
//           type: 'error',
//           message: '删除失败',
//         });
//       }
//     })
//     .catch(() => {
//       console.log('cancel');
//     });
// };

// const getTest = async () => {
//   const data = await test();
//   console.log(data);
// };
onMounted(() => {
  getTransportation();
  getTransportationCount();

  // getTest();
});
// const addScenicSpot = () => {
//   dialogFormVisible.value = true;
// };
// const updateScenicSpot = (row) => {
//   console.log(row.gid);
//   dialogFormVisible.value = true;

//   // todo form.x 和 form.y 没有解决赋值问题
//   // // ES6合并对象
//   // Object.assign(form, row);

//   form.id = row.gid;
//   form.name = row.name;
//   form.address = row.address;
//   form.adname = row.adname;
//   console.log(row.location);
//   form.x = row.location.split(',')[0];
//   form.y = row.location.split(',')[1];
//   form.type = row.type;
//   console.log(row.景区简);
//   form.introduction = row.景区简;
// };
// const cancel = () => {
//   dialogFormVisible.value = false;
// };
// const confirm = () => {
//   // dialogFormVisible.value = false;
//   ElMessageBox.confirm('确认提交吗？')
//     .then(() => {
//       addOrUpdateScenicSpotApi();
//       dialogFormVisible.value = false;
//       // 再次请求接口获取数据
//       getTransportation();
//       // 清空表单
//       form.id = '';
//       form.name = '';
//       form.address = '';
//       form.adname = '';
//       form.x = '';
//       form.y = '';
//       form.type = '';
//       form.introduction = '';

//       console.log('submit');
//     })
//     .catch(() => {
//       console.log('cancel');
//     });
// };
//dialog关闭时的回调函数
// const handleClose = () => {
//   // dialogFormVisible.value = false;
//   console.log('handleClose');
//   // 清空表单
//   form.id = '';
//   form.name = '';
//   form.address = '';
//   form.adname = '';
//   form.x = '';
//   form.y = '';
//   form.type = '';
//   form.introduction = '';
// };
// // 分页器页码发生变化时触发
// const changePageNo = (val: number) => {
//   // pageNo.value = val;
//   getScenicSpot();
// };
</script>
<style lang="scss" scoped></style>
