import { useContext, useRef, useEffect } from 'preact/hooks'
import { ConfigContext } from '../ConfigProvider'
import { CloseIcon } from '../utils/svgIcons'
import RewardsSlider from './Trivia/RewardsSlider'

export default function PopUpRewards({ show, onClose }) {
  const modalRef = useRef(null)
  const { colors, images, imagesByLang } = useContext(ConfigContext)

  useEffect(() => {
    function handleClickoutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }

    if (show) {
      document.addEventListener('click', handleClickoutside)
    }

    return () => {
      document.removeEventListener('click', handleClickoutside)
    }
  }, [])
  return (
    <div className="wrapper-pop-up">
      <div
        ref={modalRef}
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
