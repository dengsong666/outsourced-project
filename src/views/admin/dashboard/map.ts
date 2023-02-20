import { registerMap } from 'echarts'
import { MyChart } from '@/utils'
import { EChartsOption } from 'echarts/types/dist/shared'
interface Map {
  name: string
  value: number[]
}
const mapOption = (data: Map[]) =>
  ({
    title: {
      text: '代理商地域分布',
      textStyle: {
        color: '#000',
        fontSize: 24,
        fontWeight: 700
      }
    },
    geo: {
      type: 'map',
      map: 'china',
      selectedMode: true,
      layoutCenter: ['50%', '70%'],
      layoutSize: 750,
      itemStyle: {
        areaColor: '#E9ECF1',
        borderColor: '#ffffff',
        borderWidth: 2
      },
      regions: [
        { name: '广东省', selected: true, select: { itemStyle: { areaColor: '#b2c8f4' } } },
        { name: '浙江省', selected: true, select: { itemStyle: { areaColor: '#b2c8f4' } } },
        { name: '甘肃省', selected: true, select: { itemStyle: { areaColor: '#b2c8f4' } } },
        { name: '北京市', selected: true, select: { itemStyle: { areaColor: '#b2c8f4' } } },
      ]
    },
    series: {
      name: '标记点',
      type: 'scatter',
      coordinateSystem: 'geo',
      data,
      symbol:
        'path://M12 12q.825 0 1.413-.588Q14 10.825 14 10t-.587-1.413Q12.825 8 12 8q-.825 0-1.412.587Q10 9.175 10 10q0 .825.588 1.412Q11.175 12 12 12Zm0 10q-4.025-3.425-6.012-6.363Q4 12.7 4 10.2q0-3.75 2.413-5.975Q8.825 2 12 2t5.587 2.225Q20 6.45 20 10.2q0 2.5-1.987 5.437Q16.025 18.575 12 22Z',
      symbolSize: 30,
      symbolOffset: [0, '-50%'],
      label: {
        formatter: '{b}',
        show: true,
        position: 'inside',
        color: '#fff'
      },
      itemStyle: {
        color: '#f58d51'
      }
    }
  } as EChartsOption)

export function createMap(selector: string, data: Map[]) {
  fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
    .then((response) => response.json())
    .then((chinaJson) => {
      registerMap('china', chinaJson)
      MyChart.create(selector, mapOption(data))
    })
}
