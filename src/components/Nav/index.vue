<template>
  <div style="width: 100%; height: 100vh; position: relative">
    <div style="position: absolute; left: 0; top: 0; bottom: 0; z-index: 9; display: flex; flex-direction: row; align-items: center; justify-content: center">
      <div :class="['box', slideClass]" style="height: 80vh">
        <div style="background: #fff; height: 100%; flex: 1; display: flex; flex-direction: column; padding: 10px">
          <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; margin-right: 25px">
            <div>
              <el-icon :size="24" color="#3aa5f1" style="font-weight: bold">
                <Sort />
              </el-icon>
            </div>
            <!-- :pointChange='pointChange' -->
            <div style="display: flex; flex-direction: column; flex: 1; margin: 0 10px">
              <div style="margin-bottom: 10px">
                <!-- <input  type="text"> -->
                <!-- <div :ref="autoCompleteInput+index" v-for="(item,index) in 10"></div> -->
                <!-- <el-input ref="pointStart" v-model="formData.name" placeholder="请输入线路名称">
                  <template #prepend>线路名称</template>
                </el-input> -->
              </div>
              <div style="margin-bottom: 10px">
                <!-- <input  type="text"> -->
                <!-- <div :ref="autoCompleteInput+index" v-for="(item,index) in 10"></div> -->
                <el-input ref="pointStart" v-model="formData.pointStart.address" placeholder="请输入起点位置">
                  <template #prepend>起</template>
                </el-input>
              </div>
              <!-- <div style="margin-bottom: 10px" v-for="(item, index) in formData.pointWay" :key="index">
                <el-input @focus="focusInput(index)" v-model="item.address" placeholder="请输入经过位置" :ref="(el) => setRef(el, index)">
                  <template #prepend>经</template>
                  <template #append>
                    <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between; width: 100%">
                      <el-icon :size="20">
                        <RemoveFilled @click="minusPoint(index)" />
                      </el-icon>
                      <div style="width: 6px"></div>
                      <el-icon :size="20">
                        <CirclePlusFilled @click="addPoint(index)" />
                      </el-icon>
                    </div>
                  </template>
                </el-input>
              </div> -->
              <div>
                <el-input ref="pointEnd" v-model="formData.pointEnd.address" placeholder="请输入终点位置">
                  <template #prepend>终</template>
                </el-input>
              </div>
            </div>
          </div>
          <!-- <div style="padding-left: 35px; color: var(--el-color-info)">
            状态：
            <el-switch v-model="formData.status" inline-prompt active-text="开启" active-value="开启" inactive-text="关闭" inactive-value="关闭" />
          </div> -->
          <!-- <div style="padding-left: 35px; color: var(--el-color-info)">
            权重：
            <el-input v-model="formData.weigh" style="width: 200px; height: 40px" size="large" placeholder="请输入权重" />
          </div> -->
          <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between; margin: 20px 45px 20px 45px">
            <!-- <div>清理路线</div> -->
            <div>
              <el-button type="primary" @click="setRule" :loading="data.loading">查询</el-button>
            </div>
          </div>
          <div style="flex: 1">
            <el-tabs v-model="formData.activeName" type="border-card" style="width: 98%; height: 100%; display: flex; flex-direction: column; margin-left: 1%" @tab-change="handleClick">
              <el-tab-pane v-for="(item, index) in data.drivingOptions" :label="item.title" :name="item.policy" style="flex: 1; height: 100%">
                <div v-if="data.routeList" style="height: 100%; width: 100%; display: flex; flex-direction: column">
                  <div style="margin-top: 10px; display: flex; flex-direction: row; align-items: center; width: 100%; font-size: 11px; color: #fff; font-weight: bold; text-align: center">
                    <div style="flex: 1; background: #007bff; border-radius: 0 15px 15px 0">
                      {{ formatTime(data.routeList.time) }}
                    </div>
                    <div style="flex: 1; margin: 0 10px; background: #28a745; border-radius: 15px">约{{ (data.routeList.distance / 1000).toFixed(2) }}公里</div>
                    <!-- <div style="flex: 1; background: #dc3545; border-radius: 15px 0 0 15px">过路费：{{ data.routeList.tolls }}元</div> -->
                  </div>
                  <div style="flex: 1; position: relative; margin-top: 10px">
                    <div style="position: absolute; left: 0; right: 0; bottom: 0; top: 0">
                      <el-scrollbar height="100%" style="width: 100%">
                        <div>
                          <p style="border-bottom: 1px solid gainsboro; padding-bottom: 10px" v-for="(v, k) in data.routeList.steps" :key="k" class="scrollbar-demo-item">
                            {{ v.instruction }}
                          </p>
                        </div>
                      </el-scrollbar>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <!-- <div style="display: flex; flex-direction: row; align-items: center; margin: 0 20px; margin-bottom: 30px; padding-top: 20px">
            <div style="flex: 1">
              <el-button style="width: 100%" type="danger">返回上层</el-button>
            </div>
            <div style="flex: 1; margin-left: 10px">
              <el-button style="width: 100%" type="primary">保存</el-button>
            </div>
          </div> -->
        </div>
      </div>
      <div style="margin-left: -24px" @click="toggle">
        <div :class="['icon', data.show ? 'arrow-up' : 'arrow-down']">
          <!-- <img src="/static/icon_location_close.png" style="width: 50px; height: 50px" /> -->
        </div>
      </div>
    </div>
    <el-row>
      <el-col :span="24">
        <!-- <div class="grid-content ep-bg-purple-dark" /> -->
        <div style="height: 100vh" id="container" ref="map"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
// 添加高德安全密钥

import { reactive, computed, ref, watch, getCurrentInstance, watchEffect } from 'vue';
import { ElMessage } from 'element-plus';
const { proxy } = getCurrentInstance();
import { useRouter } from 'vue-router';
import AMapLoader from '@amap/amap-jsapi-loader';
window._AMapSecurityConfig = {
  securityJsCode: '7c184295005860700c29ed3fdaeedf3d',
};
const router = useRouter();
const pointStart = ref(null);
const pointEnd = ref(null);
const pointWayRefs = ref([]);

const data = reactive({
  map: null,
  dialogVisible: false,
  show: true,
  isDes: false,
  loading: false,
  drivingOptions: [
    {
      policy: 1,
      title: '费用最低',
      route: {},
    },
    {
      policy: 0,
      title: '时间最短',
      route: {},
    },
    {
      policy: 2,
      title: '距离最短',
      route: {},
    },
  ],
  routeList: null,
});
const formData = reactive({
  // inputStart: '',
  // pointStart: [],
  // inputWay: '',
  id: '',
  name: '',
  pointStart: {
    point: [],
    address: '',
    name: '',
    longitude: '',
    latitude: '',
  },
  pointWay: [
    {
      point: [],
      address: '',
    },
  ],

  // pointWay: [],
  // inputEnd: '',
  pointEnd: {
    point: [],
    address: '',
    name: '',
    longitude: '',
    latitude: '',
  },
  activeName: 1,
  status: '开启',
  weigh: '',
});
let driving = null;
const slideClass = computed(() => {
  return data.show ? 'slide-enter-active' : 'slide-enter';
});

// watch(
//   [() => formData.pointStart.address, () => formData.pointEnd.address],
//   ([newProp1, newProp2], [oldProp1, oldProp2]) => {
//     // 这里可以对属性变化做出相应的处理
//     if (newProp1.length > 0 && newProp2.length > 0) {
//       formData.pointStart.address = newProp1;
//       formData.pointEnd.address = newProp2;
//       // console.log(formData.pointStart.address);
//       // console.log(formData.pointEnd.address);
//       // console.log(222222);
//       // formData.pointStart.address = newProp1;
//       // console.log(formData.pointStart.address);
//       // formData.pointEnd.address = newProp2;

//       // console.log(formData.pointEnd.address);
//       // // setRule();
//     }
//     // console.log('属性 prop1 变化了：', oldProp1, '=>', newProp1);
//     // console.log('属性 prop2 变化了：', oldProp2, '=>', newProp2);
//   },
//   { deep: true },
// );

// const pointChange = computed({
//     get: () => {
//       if(formData.pointStart.length>0&&formData.pointEnd.length>0){
//       	console.log(222222)
//       	setRule()
//       }
// 	  return 0
//     }
//   });

// const pointChange = computed(() => {
// 	if(formData.pointStart.length>0&&formData.pointEnd.length>0){
// 		console.log(222222)
// 		setRule()
// 	}
//   return 0;
// });
const toggle = () => {
  console.log(1112222);
  data.show = !data.show;
};

function handleClick(e) {
  console.log(e);
  setRule();
}

function formatTime(seconds) {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var remainingSeconds = seconds % 60;
  return hours + '小时 ' + minutes + '分钟 ';
}

const setRef = (el, index) => {
  // console.log(el);
  // console.log(index);
  pointWayRefs.value[index] = el;
};

AMapLoader.load({
  key: '5bfefa7c0868a56fbc2ab3ef50f0b27c', // 申请好的Web端开发者Key，首次调用 load 时必填
  version: '2.0', // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
  plugins: ['AMap.Scale', 'AMap.Driving', 'AMap.PlaceSearch', 'AMap.AutoComplete'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  AMapUI: {
    // 是否加载 AMapUI，缺省不加载
    version: '1.1', // AMapUI 版本
    plugins: [], // 需要加载的 AMapUI ui插件
  },
  Loca: {
    // 是否加载 Loca， 缺省不加载
    version: '2.0', // Loca 版本
  },
})
  .then((AMap) => {
    data.map = new AMap.Map('container', {
      resizeEnable: true,
      center: [116.397428, 39.90923], //地图中心点
      zoom: 13, //地图显示的缩放级别
    });
    data.map.addControl(new AMap.Scale());
    console.log(window.AMap.DrivingPolicy.LEAST_DISTANCE);
    // initPoint();
    // addRule()
  })
  .catch((e) => {
    console.error(e); //加载错误提示
  });

function minusPoint(index) {
  if (formData.pointWay.length > 1) {
    formData.pointWay.splice(index, 1);
  }
}

function addPoint(index) {
  formData.pointWay.splice(index + 1, 0, {
    point: [],
    address: '',
  });
  // formData.pointWay.push({
  // 	point: [],
  // 	address: ''
  // })
}

function focusInput(index) {
  const pointWayEl = pointWayRefs.value[index].$el.querySelector('input');
  setInput(pointWayEl, 'pointWay', index);
}

// function initPoint() {
//   const pointStartEl = pointStart.value.$el.querySelector('input');
//   setInput(pointStartEl, 'pointStart');
//   const pointEndEl = pointEnd.value.$el.querySelector('input');
//   setInput(pointEndEl, 'pointEnd');
//   if (router.currentRoute.value.query) {
//     proxy.$api.post('', router.currentRoute.value.query).then((response) => {
//       const result = response.data;
//       console.log(result);
//       if (result.code) {
//         formData.id = result.data.id;
//         formData.name = result.data.name;
//         formData.pointStart = result.data.start;
//         formData.pointEnd = result.data.end;
//         if (result.data.pass.length == 0) {
//           formData.pointWay = [
//             {
//               point: [],
//               address: '',
//             },
//           ];
//         } else {
//           formData.pointWay = result.data.pass;
//         }
//         formData.status = result.data.status;
//         formData.weigh = result.data.weigh;
//       }
//       console.log(response);
//     });
//   }
// }

function setInput(point, pointArr, index = -1) {
  var autoPoint = new window.AMap.AutoComplete({
    input: point, // 使用 $refs 来获取 el-input 对应的 DOM 元素
  });
  autoPoint.on('select', select); //注册监听，当选中某条记录时会触发
  function select(e) {
    if (e.poi && e.poi.location == '') {
      var placeSearch = new window.AMap.PlaceSearch({
        // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
        city: e.poi.adcode,
      });
      placeSearch.search(e.poi.name, function (status, result) {
        if (result.poiList) {
          if (index == -1) {
            formData[pointArr] = {
              point: [result.poiList.pois[0].location.lng, result.poiList.pois[0].location.lat],
              address: result.poiList.pois[0].name,
              name: result.poiList.pois[0].name,
              longitude: result.poiList.pois[0].location.lng,
              latitude: result.poiList.pois[0].location.lat,
            };
          } else {
            formData[pointArr][index] = {
              point: [result.poiList.pois[0].location.lng, result.poiList.pois[0].location.lat],
              address: result.poiList.pois[0].name,
              name: result.poiList.pois[0].name,
              longitude: result.poiList.pois[0].location.lng,
              latitude: result.poiList.pois[0].location.lat,
            };
          }

          // formData[pointArr] = [result.poiList.pois[0].location.lng, result.poiList.pois[0].location.lat];
          // formData[pointStr] = result.poiList.pois[0].name;
          // console.log(result.poiList.pois[0])
        }
      });
    } else {
      if (index == -1) {
        formData[pointArr] = {
          point: [e.poi.location.lng, e.poi.location.lat],
          address: e.poi.name,
          name: e.poi.name,
          longitude: e.poi.location.lng,
          latitude: e.poi.location.lat,
        };
      } else {
        formData[pointArr][index] = {
          point: [e.poi.location.lng, e.poi.location.lat],
          address: e.poi.name,
          name: e.poi.name,
          longitude: e.poi.location.lng,
          latitude: e.poi.location.lat,
        };
      }

      // formData[pointArr] = [e.poi.location.lng, e.poi.location.lat];
      // formData[pointStr] = e.poi.name;
    }
    // placeSearch.setCity(e.poi.adcode);
    // placeSearch.search(e.poi.name); //关键字查询查询
  }
}
// const points = [
//   { keyword: '北京市地震局（公交站）' }, //起始点坐标
//   { keyword: '亦庄文化园（地铁站）' }, //终点坐标
// ];
const point2 = [];

function setRule() {
  const points = reactive([
    { keyword: '北京市地震局（公交站）' }, //起始点坐标
    { keyword: '亦庄文化园（地铁站）' }, //终点坐标
  ]);
  points[0].keyword = formData.pointStart.address;
  points[1].keyword = formData.pointEnd.address;

  console.log(formData.pointStart.address);
  console.log(points);
  // //引入和创建驾车规划插件
  // AMap.plugin(['AMap.Driving'], function () {
  //   const driving = new AMap.Driving({
  //     map: data.map,
  //     // panel: 'my-panel',
  //   });
  //   //获取起终点规划线路
  //   driving.search(points, function (status, result) {
  //     if (status === 'complete') {
  //       //status：complete 表示查询成功，no_data 为查询无结果，error 代表查询错误
  //       //查询成功时，result 即为对应的驾车导航信息
  //       console.log(result);
  //     } else {
  //       console.log('获取驾车数据失败：' + result);
  //     }
  //   });
  // });

  console.log('setRule');
  console.log(formData.pointStart.address);
  console.log(formData.pointEnd.address);
  data.loading = true;
  if (driving) {
    driving.clear();
  }
  driving = new AMap.Driving({
    map: data.map,
    policy: formData.activeName,
  });
  let wayPoint = [];
  formData.pointWay.forEach((item) => {
    if (item.point.length > 0) {
      wayPoint.push(item.point);
    }
  });
  points[0].keyword = formData.pointStart.address;
  points[1].keyword = formData.pointEnd.address;
  console.log(points[0].keyword);
  console.log('ffffffffffff', wayPoint);
  console.log('formData.pointStart.point', formData.pointStart.address);
  console.log('formData.pointEnd.point', formData.pointEnd.address);
  driving.search(
    points,
    // formData.pointStart.address,
    // formData.pointEnd.address,
    // {
    //   waypoints: wayPoint,
    // },
    (status, result) => {
      console.log('result');
      data.routeList = result.routes[0];
      data.loading = false;
    },
  );
}

// function save() {
//   console.log(formData);
//   let params = {
//     name: formData.name,
//     start: formData.pointStart,
//     end: formData.pointEnd,
//     status: formData.status,
//     weigh: formData.weigh,
//   };
//   if (formData.pointWay.length == 1) {
//     if (formData.pointWay[0].point.length > 0) {
//       params.pass = formData.pointWay;
//     }
//   } else if (formData.pointWay.length > 1) {
//     params.pass = formData.pointWay;
//   }
//   if (formData.id == '') {
//     proxy.$api
//       .post('', params)
//       .then((response) => {
//         const result = response.data;
//         if (result.code) {
//           ElMessage({
//             message: result.msg,
//             type: 'success',
//           });
//         } else {
//           ElMessage.error(result.msg);
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   } else {
//     params.id = formData.id;
//     proxy.$api
//       .post('', params)
//       .then((response) => {
//         const result = response.data;
//         if (result.code) {
//           ElMessage({
//             message: result.msg,
//             type: 'success',
//           });
//         } else {
//           ElMessage.error(result.msg);
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }
// }
// function addRule() {
// 	console.log(22222)
// 	let routeList=[]
// 	data.drivingOptions.forEach(item=>{
// 		console.log(item)
// 		var driving = new window.AMap.Driving({
// 			map: data.map,
// 			policy: item.policy
// 			// panel: "panel"
// 		});
// 		driving.search(new window.AMap.LngLat(116.379028, 39.865042), new window.AMap.LngLat(116.427281, 39.903719), {
// 			waypoints: [new window.AMap.LngLat(116.379028, 39.885042)]
// 		}, (status, result) => {
// 			item.route=result.routes[0]
// 			routeList.push(item)
// 			if(routeList.length==data.drivingOptions.length){
// 				data.routeList=routeList
// 			}
// 			console.log(result)
// 			// console.log(result)
// 			// console.log(data.drivingOptions.value[i])
// 			// // set(data.drivingOptions,i,)
// 			// data.drivingOptions[i].route = result.routes[0]
// 			// console.log(result)
// 			// result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
// 			// if (status === 'complete') {
// 			// 	log.success('绘制驾车路线完成')
// 			// } else {
// 			// 	log.error('获取驾车数据失败：' + result)
// 			// }
// 		});
// 	})
// 	console.log(routeList)
// 	// 根据起终点经纬度规划驾车导航路线

// }

// console.log(router.currentRoute.value.query);
</script>
<style>
.el-input-group__append {
  padding: 0 10px !important;
}

.el-tabs__nav {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.el-tabs__item {
  flex: 1;
}

.el-tabs--border-card {
  border-width: 0 !important;
}

.el-tabs__item.is-active {
  border-top: 2px solid #dcdfe6 !important;
}

.el-tabs__content {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  padding: 0 !important;
}
</style>
<style scoped lang="scss">
.box {
  overflow: hidden;
  transition: width 0.5s;
}

.slide-enter,
.slide-leave-to {
  width: 0;
}

.slide-enter-active,
.slide-leave-active {
  width: 440px;
}

.icon {
  display: inline-block;
  width: 50px;
  height: 50px;
  transition: transform 0.3s;
}

.arrow-up {
  transform: rotate(180deg);
}

.arrow-down {
  transform: rotate(0deg);
}

.circle {
  width: 11px;
  height: 11px;
  border: 3px solid #28a745;
  border-radius: 50%;
  position: relative;
  background-color: white;
}

.circle::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background-color: #28a745;
  border-radius: 50%;
}

.circleRed {
  width: 11px;
  height: 11px;
  border: 3px solid #dc3545;
  border-radius: 50%;
  position: relative;
  background-color: white;
}

.circleRed::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background-color: #dc3545;
  border-radius: 50%;
}
</style>
