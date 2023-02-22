import { TablePaginationConfig } from 'ant-design-vue'

declare global {
  interface Pagination extends TablePaginationConfig {
    range: number[]
  }
  type AnyObj = { [key: string]: string }
}
