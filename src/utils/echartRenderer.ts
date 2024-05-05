import * as echarts from 'echarts/core'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
])

const renderPieChart = (domId, categoryData) => {
  const chartDom = document.getElementById(domId)
  const myChart = echarts.init(chartDom)
  const option = {
    title: {
      text: '分类文章统计',
      left: 'center',
      top: 30,
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'horizontal', // 将图例水平放置
      bottom: 10, // 调整图例距离底部的距离
    },
    series: [
      {
        name: '文章数量',
        type: 'pie',
        radius: '50%',
        data: categoryData.map((item) => ({ value: item.PostCount, name: item.CategoryName })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
  myChart.setOption(option)
  // 设置容器样式
  // 设置容器样式
  chartDom.style.width = '100%' // 设置容器宽度
  chartDom.style.margin = '0 auto' // 设置水平居中
}

export { renderPieChart }
