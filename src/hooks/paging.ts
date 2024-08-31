import { PaginationProps } from "naive-ui";

export function usePaging<R = any>(getList: (...args: any[]) => Promise<PageRes<R>>, initParams: Record<string, any> = {}) {
  const pageing = reactive<PaginationProps>({
    page: 1,
    pageSize: 3,
    pageCount: 0,
    showSizePicker: true,
    pageSizes: [3, 5, 7],
    onUpdatePageSize: (pageSize) => pageing.pageSize = pageSize,
    onUpdatePage: page => pageing.page = page,
  })
  const params = ref<Record<string, any>>(initParams)
  const list = ref<R[]>()
  watch([pageing, params], () => {
    getList({ pageNum: pageing.page, pageSize: pageing.pageSize, ...params.value })
      .then(res => {
        pageing.page = res.pageIndex
        pageing.pageSize = res.pageSize
        pageing.pageCount = res.totalCount
        list.value = res.dataList
      })
  }, { immediate: true })

  return { pageing, list, params }
}
