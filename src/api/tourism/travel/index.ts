// 景区简介接口
import request from '@/utils/request';

enum API {
  // 获取景区简介接口
  getScenicSpot = '/scenicSpot/getScenicSpot/',
  getScenicSpotCount = '/scenicSpot/getScenicSpotCount/',
  addScenicSpot = '/scenicSpot/addScenicSpot/',
  deleteScenicSpot = '/scenicSpot/deleteScenicSpot/',
}
export const reqScenicSpot = (page: number, limit: number) => request.get<any, any>(API.getScenicSpot + `?page=${page}&limit=${limit}`);
export const reqScenicSpotCount = () => request.get<any, any>(API.getScenicSpotCount);
export const reqAddorUpdateScenicSpot = (data: any) => {
  if (data.id) {
    return request.post<any, any>(API.addScenicSpot + `${data.id}`, data);
  } else {
    return request.post<any, any>(API.addScenicSpot, data);
  }
};
export const reqDeleteScenicSpot = (id: number) => request.post<any, any>(API.deleteScenicSpot + `${id}`);
// export const reqScenicSpot = () => request.get<any, any>(API.getScenicSpot);
