import { http } from "@/utils";

export function getVideoGenerateInfo() {
  return http.get<VideoGenerate>({
    url: '/v1/video/get/videoInfoList'
  });
}
export function createVideoTask(data: {
  backgroundMusicEnable: number
  sourceLanguageId: number
  sourceUrl: string
  subtitleEnable: number
  targetLanguageId: number
  timbreId: number
}) {
  return http.post({
    url: '/v1/video/transaction/create',
    data
  });
}
export function getDownloadList(data: PageReq) {
  return http.post<PageRes>({
    url: '/v1/video/transaction/download/getList',
    data
  });
}
export function getTaskOrderStatus(data: { orderId: string }) {
  return http.post<OrderStatus>({
    url: '/v1/video/transaction/getOrderStatus',
    data,
    loading: false
  });
}