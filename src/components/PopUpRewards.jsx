import { useContext } from 'preact/hooks'
import { ConfigContext } from '../ConfigProvider'
import { CloseIcon } from '../utils/svgIcons'
import RewardsSlider from "./Trivia/RewardsSlider"

export default function PopUpRewards({ onClose }) {
  const { colors, images, imagesByLang } = useContext(ConfigContext)
  return (
    <div className="wrapper-pop-up">
      <div
        className="pop-up-rewards"
        style={{ backgroundColor: colors?.backgroundRewards }}
      >
        <div className="wrapper-button">
          <button
            onClick={onClose}
            className="close-rewards"
            id="close-rewards"
          >
            <CloseIcon colorFill={colors?.primary} />
          </button>
        </div>

        <RewardsSlider
          slidesImages={imagesByLang?.rewardsImages}
          arrowsSlider={images?.arrowsSlider}
          colors={colors}
        />
      </div>
    </div>
  )
}
