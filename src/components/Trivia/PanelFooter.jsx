import { useContext, useState } from 'preact/hooks'
import { Link, useLocation } from 'react-router-dom'
import useSound from 'use-sound'
import { ConfigContext } from '../../ConfigProvider'
import PointsDisplay from './PointsDisplay'
import QuestionsAnswered from './QuestionsAnswered'
import RewardsSlider from './RewardsSlider'

import { BackArrowIcon } from '../../utils/svgIcons'

const PanelFooter = ({ cat }) => {
  const {
    dataStored,
    soundOn,
    colors,
    points,
    images,
    imagesByLang,
    sounds,
    links,
    texts,
    categories,
  } = useContext(ConfigContext)

  const DATA_CATEGS = categories ? categories : []
  /*----*/
  const [clickButton] = useSound(sounds?.clickOpen, { soundEnabled: soundOn })
  const [closeRwd] = useSound(sounds?.closePopup, { soundEnabled: soundOn })
  const [openRewards, setOpenRewards] = useState(false)
  const location = useLocation().pathname

  const questionsAnswered = dataStored[parseInt(cat)]?.questionsAnswered.length
  const totalQuestions = DATA_CATEGS.find((categ) => categ.id === parseInt(cat))?.questions.length


  function handleRewards(e) {
    if (e.target.id.includes('open')) {
      setOpenRewards(true)
      clickButton()
    }
    if (e.target.id.includes('close')) {
      setOpenRewards(false)
      closeRwd()
    }
  }

  return (
    <div className="panel-footer-container">
      {location.includes('category') || location.includes('question') ? (
        <>
          <div className="button-back">
            <Link className="back-home" to={'/'} onClick={clickButton}>
              <BackArrowIcon colorFill={colors?.primary} />
            </Link>
          </div>

          <PointsDisplay
            points={points}
            textColor={colors?.text}
            img={images?.backgroundPoints}
          />

          <QuestionsAnswered
            questionsAnswered={questionsAnswered}
            catQuestionsTotal={totalQuestions}
            textColor={colors?.text}
          />
        </>
      ) : (
        <>
          <div
            className="wrapper-bases-rewards"
            style={{ color: colors?.text }}
          >
            <div className="bases">
              <a href={links?.termsURL} target="_blank" rel="noreferrer">
                <img
                  onClick={clickButton}
                  src={images?.termsButton}
                  alt="Icon Button Terms"
                />
              </a>
              <h5 className="bases-tag">{texts?.terms}</h5>
            </div>

            <PointsDisplay
              points={points}
              textColor={colors?.text}
              img={images?.backgroundPoints}
            />

            <div className="rewards">
              <button onClick={(e) => handleRewards(e)} id="button-rewards">
                <img
                  src={images?.rewardsButton}
                  alt="Icon Button Reward"
                  id="open-rewards"
                />
              </button>
              <h5 className="rewards-tag">{texts?.rewards}</h5>
            </div>
          </div>

          {openRewards && (
            <div className="wrapper-pop-up">
              <div
                className="pop-up-rewards"
                style={{ backgroundColor: colors?.backgroundRewards }}
              >
                <div className="wrapper-button">
                  <button
                    onClick={(e) => handleRewards(e)}
                    className="close-rewards"
                    id="close-rewards"
                    style={{
                      backgroundColor: colors?.primary,
                      color: colors?.text,
                    }}
                  >
                    &#10005;
                  </button>
                </div>

                <RewardsSlider
                  slidesImages={imagesByLang?.rewardsImages}
                  arrowsSlider={images?.arrowsSlider}
                  colors={colors}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default PanelFooter
