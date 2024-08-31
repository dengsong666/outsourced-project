export function useList<R = any>(getList: (...args: any[]) => Promise<PageRes<R>>) {
  const list = ref<R[]>()
  getList({ pageNum: 1, pageSize: 100 })
    .then(res => {
      console.log(res);

      list.value = res.dataList
    })
  return list
}