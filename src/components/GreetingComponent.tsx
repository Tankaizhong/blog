import React from 'react'
import '@/styles/greeting.less'

const GreetingComponent = () => {
  const currentTime = new Date().getHours()

  let greetingMessage
  if (currentTime < 12) {
    greetingMessage = '早上好！'
  } else if (currentTime < 18) {
    greetingMessage = '下午好！'
  } else {
    greetingMessage = '晚上好！'
  }

  return (
    <div className="greeting">
      <p className="greeting-message">{greetingMessage}</p>
      {currentTime < 12 && <p>祝您有个美好的一天！</p>}
      {currentTime >= 12 && currentTime < 18 && <p>祝您一天过得愉快！</p>}
      {currentTime >= 18 && <p>祝您晚上好好休息！</p>}
    </div>
  )
}

export default GreetingComponent
