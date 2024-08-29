
import { http } from '@/utils';

export function getMemberPackageList(data: PageReq) {
  return http.post({
    url: '/v1/recharge/getPackageList',
    data
  });
}