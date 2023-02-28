import { TablePaginationConfig } from 'ant-design-vue'

declare global {
  interface Pagination extends TablePaginationConfig {
    range: number[]
  }
  type AnyObj = { [key: string]: string }
  type AsyncFn = (...args: any[]) => Promise<any> | any
  type Page = {
    current: number
    page_size: number
    total?: number
  }
}
