// @flow
import { api, SERVICES } from '../tools/helper';


// 订单列表
export const getOrderList = (params: any) =>
  api.post(`orders?pageNum=${params.pageNum}&pageSize=${params.pageSize}`, params);
