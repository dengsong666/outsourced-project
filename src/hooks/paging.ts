export function usePagination(
  cb: any,
  sizeOption: Array<number> = [10, 20, 50, 100, 200],
): any {
  const pagination = reactive({
    current: 1,
    total: 0,
    size: sizeOption[0],
    sizeOption,
    onPageChange: (page: number, extraData?: object) => {
      pagination.current = page
      return extraData ? cb(extraData) : cb()
    },
    onSizeChange: (size: number, extraData?: object) => {
      pagination.current = 1
      pagination.size = size
      return extraData ? cb(extraData) : cb()
    },
    setTotal: (total: number) => {
      pagination.total = total
    },
    reset() {
      pagination.current = 1
      pagination.total = 0
      pagination.size = pagination.sizeOption[0]
    },
  })

  return [
    pagination,
    pagination.onPageChange,
    pagination.onSizeChange,
    pagination.setTotal,
  ]
}