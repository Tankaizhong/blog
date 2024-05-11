import React, { useEffect } from 'react'
import '@/styles/right-content-location.less'


import AMapLoader from '@amap/amap-jsapi-loader'
import { LOCATION_API_KEY } from '@/config'

const RightContentLocation = () => {
  useEffect(() => {
    // 获取当前位置的经纬度
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          AMapLoader.load({
            key: LOCATION_API_KEY,
            version: '2.0',
            plugins: [],
          })
            .then((AMap) => {
              let amap = new AMap.Map('location-content', {
                zoom: 14,
                center: [longitude, latitude], // 将当前位置的经纬度作为地图中心点
                viewMode: '3D',
              })
              // 添加标记
              let marker = new AMap.Marker({
                position: [longitude, latitude],
              })
              amap.add(marker)
            })
            .catch((e) => {
              console.log(e)
            })
        },
        (error) => {
          console.error('获取当前位置失败：', error)
        }
      )
    } else {
      console.error('浏览器不支持地理定位功能')
    }
  }, [])

  return (
    <div className="right-content-location">
      <div className="location-title-content">位置</div>

      <div className="location-content">
        <div id="location-content" className="mapContainer"></div>
      </div>
    </div>
  )
}

export default RightContentLocation
