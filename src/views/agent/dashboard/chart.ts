import { EChartsOption } from 'echarts/types/dist/shared'

const splitLine = {
  show: true, // 不显示网格线
  interval: 1,
  lineStyle: {
    type: 'dashed'
  }
}
const year = (name: string, data: number[], lineColor: string, areaColor: string) =>
  ({
    name,
    data,
    type: 'line',
    smooth: true,
    showSymbol: false,
    lineStyle: {
      color: lineColor,
      width: 5,
      cap: 'round'
    },
    areaStyle: {
      normal: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: areaColor },
            { offset: 1, color: '#ffffff' }
          ]
        },
        lineStyle: {
          width: 20,
          cap: 'round'
        }
      }
    }
  } as EChartsOption)
// 直方图
export const histogramOption = (dataY: number[], areaColor: string) =>
  ({
    xAxis: {
      type: 'category',
      axisTick: {
        show: false // 不显示坐标轴刻度线
      },
      splitLine,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
      splitLine
    },
    series: [
      {
        data: dataY,
        type: 'bar',
        itemStyle: {
          //柱状颜色和圆角
          color: areaColor,
          barBorderRadius: [6, 6, 0, 0] // （顺时针左上，右上，右下，左下）
        }
      }
    ]
  } as EChartsOption)
// 线趋势
export const smoothLineOption = (dataY: number[], lineColor: string) =>
  ({
    xAxis: {
      type: 'category',
      show: false
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
        data: dataY,
        type: 'line',
        smooth: true,
        showSymbol: false,
        itemStyle: {
          normal: {
            color: lineColor,
            lineStyle: {
              width: 5,
              cap: 'round'
            }
          }
        }
      }
    ]
  } as EChartsOption)

export const lineTrendOption = (dataY: [number[], number[]], dataX: any[]) =>
  ({
    legend: {
      icon: 'circle',
      right: 150,
      itemStyle: { color: '#ffffff', borderWidth: 4 },
      itemGap: 50,
      data: [
        { name: '今年', itemStyle: { borderColor: '#FE9874' } },
        { name: '去年', itemStyle: { borderColor: '#70504B' } }
      ]
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dataX
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: true,
        interval: 'auto', //居中显示
        formatter: '{value} %' //以百分比显示
      }
    },
    series: [year('今年', dataY[0], '#FE9874', '#fceae4'), year('去年', dataY[1], '#70504B', '#dbd4d3')]
  } as EChartsOption)
