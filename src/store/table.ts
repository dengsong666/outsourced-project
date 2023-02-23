// 传参进行局部管理（争对一个页面两个表格的情况）
export const useTable = (get: Function = () => {}, del: Function = () => {}, view: Function = () => {}) =>
  defineStore(get.name, {
    state: () => ({
      current: 1,
      page_size: 8,
      total: 0,
      list: [] as any[]
    }),
    actions: {
      async getList(params = {}) {
        const { current, page_size } = this
        const {
          data: { list, total }
        } = await get({ current, page_size, ...params })
        this.list = list
        this.total = total
        return current
      },
      async deleteRow(id: string | number) {
        await del(id)
        this.getList()
      },
      async viewRow(id: string | number) {
        await view(id)
      }
    }
  })()
export type CustomTable = ReturnType<typeof useTable>
