import { tableProps } from 'ant-design-vue/lib/table'

// 传参进行局部管理（争对一个页面两个表格的情况）
export const useTable = (get: AsyncFn, del: AsyncFn) =>
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
      async delRow(...params: any[]) {
        console.log(...params)

        await del(...params)
        this.getList()
      }
    }
  })()
export type CustomTable = ReturnType<typeof useTable>
