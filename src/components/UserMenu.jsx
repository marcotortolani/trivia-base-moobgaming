import { useContext, useState } from 'preact/hooks'
import { ConfigContext } from '../ConfigProvider'

import { DonutChart } from './DonutChart'
import { CloseIcon, EditIcon, UserIcon } from '../utils/svgIcons'

import correctIcon from '/img/correct-icon.webp'
import incorrectIcon from '/img/incorrect-icon.webp'
import bonusIcon from '/img/bonus-icon.webp'

export default function UserMenu({ showMenu, onClose }) {
  const {
    points,
    answersType,
    dataStored,
    userDataStored,
    setUserDataStored,
    validPeriod,
    config,
    colors,
    images,
    imagesByLang,
    categories,
  } = useContext(ConfigContext)
  const [showAvatars, setShowAvatars] = useState(false)
  const { userName, userId, userAvatar } = userDataStored

  const totalProgress = getTotalProgress(dataStored)
  const totalQuestions = getTotalQuestions(categories)

  function getTotalProgress(dataStored) {
    return Object.values(dataStored).reduce((sum, day) => {
      return sum + day.questionsAnswered.length
    }, 0)
  }

  function getTotalQuestions(categories) {
    return categories.reduce((sum, cat) => sum + cat.questions.length, 0)
  }

  function handleCloseMenu() {
    onClose()
    setShowAvatars(false)
  }

  function handleAvatarSelected(avatar) {
    setUserDataStored({ ...userDataStored, userAvatar: avatar })
  }

  return (
    <div
      className={`user-menu-container ${
        showMenu ? 'show-user-menu' : 'hide-user-menu'
      }`}
    >
      <div
        className={`side-menu `}
        style={{ backgroundColor: colors?.primary }}
      >
        <div className="header" style={{ borderColor: colors?.text }}>
          <h4 style={{ color: colors?.text }}>Menu de usuario</h4>
          <img src={imagesByLang?.logoHeader} alt="Logo Product" />
          <button className="button-close" onClick={handleCloseMenu}>
            <CloseIcon colorFill={colors?.text} />
          </button>
        </div>

        <div className="main">
          <div className="user-profile">
            <div className="user-data">
              <button
                type="button"
                className="user-avatar-container"
                onClick={() => setShowAvatars(true)}
              >
                {userAvatar.length > 0 && true ? (
                  <img
                    className="user-avatar-image"
                    src={userAvatar}
                    alt="User Avatar Image"
                  />
                ) : (
                  <div className="user-icon-container">
                    <UserIcon colorStroke="#000" />
                  </div>
                )}
                <div className="edit-icon">
                  <EditIcon />
                </div>
              </button>

              <span className="user-name">{userName ? userName : userId}</span>
            </div>

            <div className="user-points-container">
              <div
                className="user-points"
                style={{
                  color: colors?.text,
                }}
              >
                {points}
              </div>
              <span>Puntos</span>
            </div>
          </div>

          <div className="user-progress" style={{ backgroundColor: '#0005' }}>
            <h4 className="title" style={{ color: colors?.text }}>
              Progreso por categoría
            </h4>

            <ul className="categories-progress">
              {categories.map((cat, i) => (
                <li key={cat.id} className="category-progress">
                  <span className="category-name">{cat.name}</span>
                  <ProgressBar
                    progress={dataStored[cat.id].questionsAnswered.length}
                    total={cat.questions.length}
                    colors={colors}
                  />
                </li>
              ))}
            </ul>
            <div className="total-progress">
              <h5 className="title">Progreso Total</h5>
              <ProgressBar
                progress={totalProgress}
                total={totalQuestions}
                colors={colors}
              />
            </div>
          </div>

          <div className="answers-type" style={{ backgroundColor: '#0005' }}>
            <div className="donuts-chart-container">
              <h4 className="title" style={{ color: colors?.text }}>
                Índice de aciertos
              </h4>
              <DonutChart
                answers={answersType}
                colorCorrect={colors.correct}
                colorWrong={colors.wrong}
              />
            </div>
            <div className="answers-type-detail">
              <div className="answer-type">
                <img
                  className="image-icon"
                  src={correctIcon}
                  alt="Image Correct Icon"
                />
                <span className="detail">Correctas: {answersType.correct}</span>
              </div>
              <div className="answer-type">
                <img
                  className="image-icon"
                  src={incorrectIcon}
                  alt="Image Correct Icon"
                />
                <span className="detail">
                  Incorrectas: {answersType.incorrect}
                </span>
              </div>
              <div className="answer-type">
                <img
                  className="image-icon"
                  src={bonusIcon}
                  alt="Image Correct Icon"
                />
                <span className="detail">Bonus: {answersType.bonus}</span>
              </div>
            </div>
          </div>

          <div className="answers-points">
            <h4 className="title">Puntos por respuesta</h4>
            <div className="answer">
              <img
                className="image-icon"
                src={correctIcon}
                alt="Image Correct Icon"
              />
              <span className="number">{config.pointsCorrect}</span>
            </div>
            <div className="answer">
              <img
                className="image-icon"
                src={incorrectIcon}
                alt="Image Incorrect Icon"
              />
              <span className="number">{config.pointsWrong}</span>
            </div>
            <div className="answer">
              <img
                className="image-icon"
                src={bonusIcon}
                alt="Image Bonus Icon"
              />
              <span className="number">
                {config.pointsCorrect + config.pointsBonus}
              </span>
            </div>
          </div>

          {showAvatars && (
            <div className="avatars-selection-container">
              <div
                className="avatars-grid-container"
                style={{ backgroundColor: colors?.backgroundRewards }}
              >
                <button
                  className="button-close"
                  onClick={() => setShowAvatars(false)}
                >
                  <CloseIcon colorFill={colors?.primary} />
                </button>
                <div className="avatars-grid">
                  {images?.avatars.map((el) => (
                    <button
                      type="button"
                      key={el}
                      className="button-avatar"
                      onClick={() => handleAvatarSelected(el)}
                      style={{
                        borderColor:
                          userAvatar === el ? colors?.correct : 'black',
                        borderWidth: userAvatar === el ? '6px' : '3px',
                      }}
                    >
                      <img
                        src={el}
                        alt="Image Avatar"
                        style={{
                          filter:
                            userAvatar === el ? 'grayscale(0)' : 'grayscale(1)',
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const ProgressBar = ({ progress, total, colors }) => {
  return (
    <div className="progress-bar-container">
      <span className="number">0</span>

      <div className="bar-container">
        <div
          className="bar"
          style={{
            width: `${(progress / total) * 100}%`,
          }}
        >
          {(progress / total) * 100 >= 10 ? (
            <span className="actual-progress" style={{ color: colors?.text }}>
              {progress < total ? progress : 'Completo'}
            </span>
          ) : null}
        </div>
      </div>
      <span className="number">{total}</span>
    </div>
  )
}
