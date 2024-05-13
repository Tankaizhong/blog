// CreatorStatsChart.jsx
import React, { useEffect } from 'react'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

const CreatorStatsChart = () => {
  useEffect(() => {
    // 初始化echarts
    echarts.use([LineChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])
    const chart = echarts.init(document.getElementById('creator-stats-chart'))

    // 模拟数据
    const xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    const seriesData = [120, 200, 150, 80, 70, 110, 130]

    // 绘制图表
    chart.setOption({
      xAxis: {
        type: 'category',
        data: xAxisData,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: seriesData,
          type: 'line',
        },
      ],
    })
  }, [])

  return <div id="creator-stats-chart" style={{ width: '100%', height: '400px' }} />
}

export default CreatorStatsChart
