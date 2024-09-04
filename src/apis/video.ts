import { http } from "@/utils";

/**
 * 获取视频生成信息
 */
export function getVideoGenerateInfo() {
  return http.get<VideoGenerate>({
    url: '/v1/video/get/videoInfoList'
  });
}

/**
 * 创建视频任务
 * @param data 包含背景音乐启用状态、源语言ID、源URL、字幕启用状态、目标语言ID和音色ID的对象
 */
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

/**
 * 获取下载列表
 * @param data 分页请求对象，用于控制返回的页码数据
 */
export function getDownloadList(data: PageReq) {
  return http.post<PageRes>({
    url: '/v1/video/transaction/download/getList',
    data
  });
}

/**
 * 获取任务状态
 * @param data 包含订单ID的对象，用于标识需要查询的状态的任务
 */
export function getTaskOrderStatus(data: { orderId: string }) {
  return http.post<OrderStatus>({
    url: '/v1/video/transaction/getOrderStatus',
    data,
    loading: false
  });
}

/**
 * 获取预估价格
 * @param data 包含视频源URL、字幕启用状态和音色ID的对象，用于计算预估价格
 */
export function getEstimatedPrice(data: { sourceUrl: string; subtitleEnable: number; timbreId: number }) {
  return http.post({
    url: '/v1/video/transaction/getEstimatedPrice',
    data,
    loading: false
  });
}