export const moneyFormat = (v: number) => v.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')

export * as MyChart from './echarts'
export * from './province-city-china'
