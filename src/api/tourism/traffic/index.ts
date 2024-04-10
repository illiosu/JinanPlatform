// 景区简介接口
import request from '@/utils/request';

enum API {
  // 获取交通设施接口
  getTransportation = '/Transportation/getTransportation/',
  getTransportationCount = '/Transportation/getTransportationCount/',
}
export const reqTransportation = (page: number, limit: number) => request.get<any, any>(API.getTransportation + `?page=${page}&limit=${limit}`);
export const reqTransportationCount = () => request.get<any, any>(API.getTransportationCount);

// export const reqScenicSpot = () => request.get<any, any>(API.getScenicSpot);
