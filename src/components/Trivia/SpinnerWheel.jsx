import { useState, useEffect, useMemo, useContext } from 'preact/hooks'
import { useNavigate } from 'react-router-dom'
import { ConfigContext } from '../../ConfigProvider.jsx'
import useSound from 'use-sound'

const DEGREE = 1800
const TIME_SPINNING = 3
let totalDegree

export default function SpinnerWheel({ onSpinDisable, onTriviaCompleted }) {
  const { soundOn, dataStored, colors, images, categories, sounds, config } =
    useContext(ConfigContext)

  const DATA_CATEGS = categories ? categories : []
  const TRIES_ALLOWED = config ? config['triesAllowedPerDay'] : null
  /*--------- */
  const SECTIONS_WHEEL = useMemo(() => DATA_CATEGS?.length, [categories])

  const [rouletteSound] = useSound(sounds?.rouletteWheel, {
    soundEnabled: soundOn,
  })
  const [catWheel, setCatWheel] = useState(0)
  const navigate = useNavigate()

  // deshabilita el boton SPIN si se completaron
  // todas las categorias y/o alcanzo el limite diario
  const spinDisable = useMemo(
    () =>
      DATA_CATEGS.every(
        (cat, index) =>
          cat.questions.length === dataStored[index].questionsAnswered.length ||
          dataStored[index].dateAnsweredToday.length === TRIES_ALLOWED
      ),
    [dataStored]
  )

  useEffect(() => {
    onSpinDisable(spinDisable)
  }, [spinDisable])

  const triviaCompleted = useMemo(
    () =>
      DATA_CATEGS.every(
        (cat, index) =>
          cat.questions.length === dataStored[index].questionsAnswered.length
      ),
    [dataStored]
  )

  useEffect(() => {
    onTriviaCompleted(triviaCompleted)
  }, [triviaCompleted])

  const handleSpin = () => {
    const extraDegree = Math.floor(Math.random() * (360 - 1) + 1)
    totalDegree = DEGREE + extraDegree
    //const cat = Math.floor(extraDegree / (360 / SECTIONS_WHEEL) + 1);

    /* nuevo calculo condiserando la ubicacion de la flecha/puntero */
    // ubicación inicial de la flecha indicadora en grados
    const initialArrowPosDegrees = 0
    const adjustedExtraDegree = (extraDegree + initialArrowPosDegrees) % 360
    const cat = Math.floor(adjustedExtraDegree / (360 / SECTIONS_WHEEL)) + 1

    if (
      dataStored[cat - 1].questionsAnswered.length ===
        DATA_CATEGS[cat - 1].questions.length ||
      dataStored[cat - 1].dateAnsweredToday.length === TRIES_ALLOWED
    ) {
      return handleSpin()
    }

    rouletteSound()
    setCatWheel(cat)
  }

  useEffect(() => {
    if (!catWheel) return
    setTimeout(() => {
      navigate('/category/' + catWheel)
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
              <li
                key={cat.name}
                className={
                  cat.questions.length ===
                    dataStored[index].questionsAnswered.length ||
                  dataStored[index].dateAnsweredToday.length === TRIES_ALLOWED
                    ? 'sec disabled'
                    : 'sec'
                }
                style={{
                  backgroundColor: colors?.rouletteSection[index],
                }}
              >
                <img src={cat.imgURL} alt={`Category Icon ${cat.name}`} />
              </li>
            ))}
          </ul>

          <div id="spin" className="">
            <button
              disabled={spinDisable}
              id="inner-spin"
              onClick={handleSpin}
              style={{ backgroundColor: colors?.wheel }}
            >
              <img
                className={spinDisable ? 'disabled' : ''}
                src={images?.spinButton}
                alt="Image Spin Button"
              />
            </button>
          </div>

          <div className="ring">
            <div
              className="center-ring"
              style={{ borderColor: colors?.wheel }}
            ></div>
            <div
              className="pointer-triangle"
              style={{ backgroundColor: colors?.wheel }}
            ></div>
          </div>

          <div id="shine"></div>
        </div>
      </div>
    </div>
  )
}
