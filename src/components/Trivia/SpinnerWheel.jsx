import { useState, useEffect, useMemo, useContext } from 'preact/hooks'
import { useNavigate } from 'react-router-dom'
import { ConfigContext } from '../../ConfigProvider.jsx'
import useSound from 'use-sound'

const DEGREE = 1800
const TIME_SPINNING = 3
//let totalDegree

export default function SpinnerWheel({ onSpinDisable, onTriviaCompleted }) {
  const { soundOn, dataStored, colors, images, categories, sounds, config } =
    useContext(ConfigContext)

  const DATA_CATEGS = categories ? categories : []
  const TRIES_ALLOWED = config ? config.triesAllowedPerDay : null
  /*--------- */
  const SECTIONS_WHEEL = useMemo(() => DATA_CATEGS?.length, [categories])

  const [rouletteSound] = useSound(sounds?.rouletteWheel, {
    soundEnabled: soundOn,
  })
  const [catWheel, setCatWheel] = useState(0)
  const [totalDegree, setTotalDegree] = useState(DEGREE)
  const navigate = useNavigate()

  // deshabilita el boton SPIN si se completaron
  // todas las categorias y/o alcanzo el limite diario
  const spinDisable = useMemo(
    () =>
      DATA_CATEGS.every(
        (cat) =>
          cat.questions.length ===
            dataStored[cat.id].questionsAnswered.length ||
          dataStored[cat.id].dateAnsweredToday.length === TRIES_ALLOWED
      ),
    [dataStored]
  )
  onSpinDisable(spinDisable)

  const triviaCompleted = useMemo(
    () =>
      DATA_CATEGS.every(
        (cat) =>
          cat.questions.length === dataStored[cat.id].questionsAnswered.length
      ),
    [dataStored]
  )
  onTriviaCompleted(triviaCompleted)

  const handleSpin = () => {
    const extraDegree = Math.floor(Math.random() * (360 - 1) + 1)
    const totalDegree = DEGREE + extraDegree
    setTotalDegree(totalDegree)

    /* nuevo calculo condiserando la ubicacion de la flecha/puntero */
    // ubicación inicial de la flecha indicadora en grados
    const initialArrowPosDegrees = 0
    const adjustedExtraDegree = (extraDegree + initialArrowPosDegrees) % 360
    const cat = Math.floor(adjustedExtraDegree / (360 / SECTIONS_WHEEL)) + 1
    const catSelected = DATA_CATEGS[cat - 1]

    if (
      dataStored[catSelected.id].questionsAnswered.length ===
        catSelected.questions.length ||
      dataStored[catSelected.id].dateAnsweredToday.length === TRIES_ALLOWED
    ) {
      return handleSpin()
    }

    rouletteSound()
    setCatWheel(cat)
  }

  useEffect(() => {
    if (!catWheel) return
    setTimeout(() => {
      navigate('/category/' + DATA_CATEGS[catWheel - 1].id)
    }, TIME_SPINNING * 1000 + 500)
  }, [catWheel])

  return (
    <div className="spinner-wheel">
      <div id="wrapper">
        <div id="wheel">
          <ul
            className={`sections-${SECTIONS_WHEEL}`}
            id="inner-wheel"
            style={
              catWheel !== 0 && {
                transform: `rotate(${totalDegree}deg)`,
                transitionDuration: `${TIME_SPINNING}s`,
              }
            }
          >
            {DATA_CATEGS.map((cat, index) => (
              <CategorySection
                key={cat.id}
                cat={cat}
                dataStored={dataStored}
                triesAllowed={TRIES_ALLOWED}
                backgroundColor={colors?.rouletteSection[index]}
              />
            ))}
          </ul>

          <SpinnerButton
            disabled={spinDisable}
            onSpin={handleSpin}
            color={colors?.wheel}
            image={images?.spinButton}
          />

          <WheelRing color={colors?.wheel} />
        </div>
      </div>
    </div>
  )
}

const CategorySection = ({
  cat,
  dataStored,
  triesAllowed,
  backgroundColor,
}) => {
  const sectionDisabled =
    cat.questions.length === dataStored[cat.id].questionsAnswered.length ||
    dataStored[cat.id].dateAnsweredToday.length === triesAllowed
  return (
    <li
      className={sectionDisabled ? 'sec disabled' : 'sec'}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <img src={cat.imgURL} alt={`Category Icon ${cat.name}`} />
    </li>
  )
}

const SpinnerButton = ({ disabled, onSpin, color, image }) => (
  <div id="spin">
    <button
      id="inner-spin"
      disabled={disabled}
      onClick={onSpin}
      style={{ backgroundColor: color }}
    >
      <img
        className={disabled ? 'disabled' : ''}
        src={image}
        alt="Image Spin Button"
      />
    </button>
  </div>
)

const WheelRing = ({ color }) => (
  <div className="ring">
    <div className="center-ring" style={{ borderColor: color }}></div>
    <div className="pointer-triangle" style={{ backgroundColor: color }}></div>
  </div>
)
