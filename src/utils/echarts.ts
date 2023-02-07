import { BarChart, LineChart } from 'echarts/charts'
import { DatasetComponent, GridComponent, TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components' // 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件
import { dispose, getInstanceByDom, init, use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsOption } from 'echarts/types/dist/shared'

// 注册必须的组件
use([TitleComponent, TooltipComponent, GridComponent, DatasetComponent, LegendComponent, BarChart, LineChart, CanvasRenderer])

export function create(selector: string, option: EChartsOption) {
  const dom = document.querySelector(selector) as HTMLElement
  getInstanceByDom(dom) && dispose(dom)
  dom && init(dom).setOption({ ...option, grid: { top: 48, right: 16, bottom: 0, left: 0, containLabel: true } })
}
