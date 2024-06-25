import { useContext } from 'preact/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import useSound from 'use-sound'
import { ConfigContext } from '../ConfigProvider'

import LogoHeader from '../components/Trivia/LogoHeader'
import PanelFooter from '../components/Trivia/PanelFooter'

export default function Category() {
  const navigate = useNavigate()
  let { cat } = useParams()
  const { soundOn, colors, images, texts, categories, sounds } =
    useContext(ConfigContext)
  const { categoryTitle, buttonStart } = texts
  const { backgroundApp } = images
  const { startButton } = sounds
  const DATA_CATEGS = categories
  const catSelected = DATA_CATEGS.find((categ) => categ.id === parseInt(cat))

  const [startButtonSound] = useSound(startButton, {
    soundEnabled: soundOn,
  })

  function handleClick() {
    startButtonSound()
    navigate('/question/' + cat)
  }

  return (
    <div className="category" style={{ backgroundColor: colors?.background }}>
      {backgroundApp && (
        <div className="background-image-container">
          <img
            className="background-image"
            src={backgroundApp}
            alt="Image BackGround Trivia Maradona"
          />
        </div>
      )}

      <LogoHeader />

      <div class="category-chosen">
        <div class="title">
          <h2 style={{ color: colors?.title }}>{categoryTitle}</h2>
          <h3 class="category-name" style={{ color: colors?.text }}>
            {catSelected?.name}
          </h3>
        </div>

        <div class="category-image" id="cat-image">
          <img src={catSelected?.imgURL} alt="Image - Category Selected" />
        </div>
        <button
          onClick={handleClick}
          class="button-begin"
          style={{ background: colors?.nextBtnGradient, color: colors?.text }}
        >
          {buttonStart}
        </button>
      </div>

      <PanelFooter cat={cat} />
    </div>
  )
}
