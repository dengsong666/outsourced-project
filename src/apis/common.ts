
import { http } from '@/utils';

/**
 * 获取会员套餐列表
 * @param data 分页请求对象，包含了用于分页和筛选的参数
 */
export function getMemberPackageList(data: PageReq) {
  return http.post({
    url: '/v1/recharge/getPackageList',
    data
  });
}