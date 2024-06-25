import React from 'react'
import Lottie from 'lottie-react'
import stopAlert from '../assets/lottie_json/stop_alert.json'

export default function DailyLimit({ text }) {
  return (
    <div className="pop-up-limit-answers">
      <Lottie className="lottie-stop" animationData={stopAlert} loop={true} />
      <h3 className="title-limit-answers" style={{ color: '#DDD' }}>
        {text}
      </h3>
    </div>
  )
}
