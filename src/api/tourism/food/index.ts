// 景区简介接口
import request from '@/utils/request';

enum API {
  // 获取餐饮设施接口
  getCatering = '/Catering/getCatering/',
  getCateringCount = '/Catering/getCateringCount/',
}
export const reqCatering = (page: number, limit: number) => request.get<any, any>(API.getCatering + `?page=${page}&limit=${limit}`);
export const reqCateringCount = () => request.get<any, any>(API.getCateringCount);

// export const reqScenicSpot = () => request.get<any, any>(API.getScenicSpot);
