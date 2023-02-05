import { TablePaginationConfig } from 'ant-design-vue'

declare global {
  interface Pagination extends TablePaginationConfig {
    range: number[]
  }
}
