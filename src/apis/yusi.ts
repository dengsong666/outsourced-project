import http from '@/utils/request'

/**
 * 获取协议列表
 * @param data 
 * @returns 
 */
export function getXieYiList(data: { pageNum: number, pageSize: number }) {
    return http({
        method: 'POST',
        url: '/v1/protocolTemplate/getList',
        data
    })
}

/**
 * 下载协议
 * @param data 
 * @returns 
 */
export function downloadProtocal(data: { templateId: string }) {
    return http<{ templateId: string, templateUrl: string }>({
        method: "POST",
        url: "/v1/protocolTemplate/download",
        data
    })

}

/**
 * 获取存证列表
 * @param data 
 * @returns 
 */
export function getCunZhengList(data: {
    musicTypeId: string,
    pageNum: number,
    pageSize: number,
    searchContent: string
}) {
    return http({
        method: 'POST',
        url: '/v1/evidence/getList',
        data
    })
}

/**
 * 获取存证详情
 * @param data 
 * @returns 
 */
export function getCunZhengDetail(data: {
    evidenceId: string,
}) {
    return http<{
        certificateNo: string,
        certificateUrl: string,
        evidenceTime: string
        id: string,
    }>({
        method: 'POST',
        url: '/v1/evidence/getDetailsInfo',
        data
    })
}


