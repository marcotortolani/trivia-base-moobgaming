import { useContext, useState } from 'preact/hooks'
import { ConfigContext } from '../ConfigProvider'
import Lottie from 'lottie-react'
import goldenCongrats from '../assets/lottie_json/golden_congrats.json'
import SpinnerWheel from '../components/Trivia/SpinnerWheel'
import PanelFooter from '../components/Trivia/PanelFooter'
import Header from '../components/Trivia/Header'

export default function Trivia() {
  const { colors, images, texts } =
    useContext(ConfigContext)

  const [rouletteDisable, setRouletteDisable] = useState(false)
  const [triviaCompleted, setTriviaCompleted] = useState(false)

  function handleSpinDisable(spinDisable) {
    setRouletteDisable(spinDisable)
  }

  function handleTriviaCompleted(triviaDisable) {
    setTriviaCompleted(triviaDisable)
  }

  return (
    <div
      className="app-trivia"
      style={{ backgroundColor: colors?.background, color: colors?.text }}
    >
      {images?.backgroundApp && (
        <div className="background-image-container">
          <img
            className="background-image"
            src={images?.backgroundApp}
            alt="Image BackGround Trivia Maradona"
          />
        </div>
      )}

      <Header />

      <SpinnerWheel
        onSpinDisable={handleSpinDisable}
        onTriviaCompleted={handleTriviaCompleted}
      />

      {/* ---- Animation ---- */}
      {triviaCompleted && (
        <div
          className="pop-up-fireworks hid"
          style={{ backgroundColor: colors?.backgroundCongrats }}
        >
          <h3 className="golden-congrats">{texts?.congratsTriviaCompleted}</h3>
          <Lottie
            animationData={goldenCongrats}
            loop={true}
            style={{
              width: 300,
              height: 300,
            }}
          />
        </div>
      )}
      {/* ---- Animation ---- */}
      <PanelFooter />
    </div>
  )
}
