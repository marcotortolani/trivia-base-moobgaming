import { useContext, useState, useEffect, useRef } from 'preact/hooks'
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
    totalAnswersTime,
    dataStored,
    userDataStored,
    setUserDataStored,
    validPeriod,
    config,
    colors,
    images,
    texts,
    imagesByLang,
    categories,
  } = useContext(ConfigContext)
  const [showAvatars, setShowAvatars] = useState(false)
  const modalRef = useRef(null)
  const { userName, userId, userAvatar } = userDataStored

  const totalProgress = getTotalProgress(dataStored)
  const totalQuestions = getTotalQuestions(categories)

  function timeToText(time) {
    if (time === 0) return '00m:00s'
    if (isNaN(time)) return '00m:00s'

    if (time < 60) return `${time.toString().padStart(2, '0')}s`

    const minutes = Math.floor(time / 60)
    const seconds = time - minutes * 60
    return `${minutes.toString().padStart(2, '0')}m ${seconds
      .toString()
      .padStart(2, '0')}s`
  }

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

  function handleCloseAvatars(e) {
    e.preventDefault()
    e.stopPropagation()
    setShowAvatars(false)
  }

  function handleAvatarSelected(avatar) {
    setUserDataStored({ ...userDataStored, userAvatar: avatar })
    setShowAvatars(false)
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleCloseMenu()
      }
    }
    if (showMenu) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showMenu, onClose])

  return (
    <div
      className={`user-menu-container ${
        showMenu ? 'show-user-menu' : 'hide-user-menu'
      }`}
    >
      <div
        ref={modalRef}
        className={`side-menu `}
        style={{ backgroundColor: colors?.primary }}
      >
        <div className="header" style={{ borderColor: colors?.text }}>
          <h4 style={{ color: colors?.text }}>{texts?.userMenu}</h4>
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
                {userAvatar && userAvatar.length > 0 && true ? (
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
              <span>{texts?.points}</span>
            </div>
          </div>

          <div className="user-progress" style={{ backgroundColor: '#0005' }}>
            <h4 className="title" style={{ color: colors?.text }}>
              {texts?.progressByCategory}
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
              <h5 className="title">{texts?.totalProgress}</h5>
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
                {texts?.hitRate}
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
                <span className="detail">
                  {texts?.correctAmount}: {answersType.correct}
                </span>
              </div>
              <div className="answer-type">
                <img
                  className="image-icon"
                  src={incorrectIcon}
                  alt="Image Correct Icon"
                />
                <span className="detail">
                  {texts?.incorrectAmount}: {answersType.incorrect}
                </span>
              </div>
              <div className="answer-type">
                <img
                  className="image-icon"
                  src={bonusIcon}
                  alt="Image Correct Icon"
                />
                <span className="detail">
                  {texts?.bonusAmount}: {answersType.bonus}
                </span>
              </div>
            </div>
          </div>

          <div
            className="answers-time-container"
            style={{ backgroundColor: '#0005' }}
          >
            <h4 className="title-category" style={{ color: colors?.text }}>
              {texts?.timeSpentTitle}
            </h4>

            <div className="answer-time">
              <svg
                fill="#000000"
                viewBox="0 0 24 24"
                id="timer-5-second"
                dataName="Line Color"
                className="timer-icon"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <polyline
                    id="secondary"
                    points="12 10 12 14 13.4 15.57"
                    style={`fill: none; stroke: ${colors?.primary}; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;`}
                  ></polyline>
                  <path
                    id="secondary-2"
                    data-name="secondary"
                    d="M17.3,8.2l1.5-1.5M6.7,8.2,5.2,6.7M12,6V3M9,3h6"
                    style={`fill: none; stroke: ${colors?.primary}; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;`}
                  ></path>
                  <circle
                    id="primary"
                    cx="12"
                    cy="13.5"
                    r="7.5"
                    style={`fill: none; stroke: ${colors?.primary}; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;`}
                  ></circle>
                </g>
              </svg>
              <h5 className="title" style={{ color: colors?.text }}>
                {texts?.totalTime}:
              </h5>
              <p className="detail">
                <span className="number">{totalAnswersTime}</span>{' '}
                {texts?.seconds} = {timeToText(totalAnswersTime)}
              </p>
            </div>

            <div className="answer-time">
              <svg
                fill="#000000"
                viewBox="0 0 24 24"
                id="timer-5-second"
                dataName="Line Color"
                className="timer-icon"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <polyline
                    id="secondary"
                    points="12 10 12 14 13.4 15.57"
                    style={`fill: none; stroke: ${colors?.primary}; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;`}
                  ></polyline>
                  <path
                    id="secondary-2"
                    data-name="secondary"
                    d="M17.3,8.2l1.5-1.5M6.7,8.2,5.2,6.7M12,6V3M9,3h6"
                    style={`fill: none; stroke: ${colors?.primary}; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;`}
                  ></path>
                  <circle
                    id="primary"
                    cx="12"
                    cy="13.5"
                    r="7.5"
                    style={`fill: none; stroke: ${colors?.primary}; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;`}
                  ></circle>
                </g>
              </svg>
              <h5 className="title" style={{ color: colors?.text }}>
                {texts?.averageTime}:
              </h5>
              <p className="detail">
                <span className="number">
                  {totalAnswersTime ? totalAnswersTime / totalProgress : 0}
                </span>{' '}
                {texts?.seconds}
              </p>
            </div>
          </div>

          <div className="answers-points">
            <h4 className="title">{texts?.pointsPerAnswer}</h4>
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
            <AvatarsSelection
              colors={colors}
              images={images}
              userAvatar={userAvatar}
              handleAvatarSelected={handleAvatarSelected}
              handleCloseAvatars={handleCloseAvatars}
            />
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

const AvatarsSelection = ({
  colors,
  images,
  userAvatar,
  handleAvatarSelected,
  handleCloseAvatars,
}) => {
  return (
    <div
      className="avatars-selection-container"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="avatars-grid-container"
        style={{ backgroundColor: colors?.backgroundRewards }}
      >
        <button className="button-close" onClick={handleCloseAvatars}>
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
                borderColor: userAvatar === el ? colors?.correct : 'black',
                borderWidth: userAvatar === el ? '6px' : '3px',
              }}
            >
              <img
                src={el}
                alt="Image Avatar"
                style={{
                  filter: userAvatar === el ? 'grayscale(0)' : 'grayscale(1)',
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
