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
      }
    }
  } as EChartsOption)
// 直方图
export const histogramOption = (dataY: number[], areaColor: string) =>
  ({
    grid: { top: 6, bottom: 0, left: 0, right: 0, containLabel: true },
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
          borderRadius: [6, 6, 0, 0] // （顺时针左上，右上，右下，左下）
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
          color: lineColor
        },
        lineStyle: {
          width: 5,
          cap: 'round'
        }
      }
    ]
  } as EChartsOption)

export const lineTrendOption = (dataY: [number[], number[]], dataX: any[]) =>
  ({
    title: {
      text: '租户的活跃趋势',
      textStyle: {
        color: '#000',
        fontSize: 24,
        fontWeight: 700
      }
    },
    legend: {
      icon: 'circle',
      right: 50,
      itemStyle: { color: '#ffffff', borderWidth: 4 },
      itemGap: 50,
      formatter: (name) => [`{l| ${name}}`, `{V| ${name == '今年' ? dataY[0].reduce((sum, v) => sum + v) : dataY[1].reduce((sum, v) => sum + v)}}`].join('\n'),
      textStyle: {
        rich: {
          l: {
            padding: [24, 0, 8]
          },
          V: {
            fontWeight: 600
          }
        }
      },
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
