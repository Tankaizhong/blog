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
  // console.log(domId)
  const chartDom = document.getElementById(domId)
  const myChart = echarts.init(chartDom)
  const option = {
    title: {
      text: '分类文章统计',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
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
  chartDom.style.width = '100%'
  chartDom.style.height = '400px'
}

export { renderPieChart }
