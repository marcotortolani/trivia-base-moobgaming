import { createContext } from 'preact'
import { useEffect } from 'preact/hooks'
import useLocalStorage from './helpers/useLocalStorage'

const lang = document.documentElement.lang

const ConfigContext = createContext()

const soundDefault = false
const pointsInitial = 0
const answersTypeInitial = { correct: 0, incorrect: 0, bonus: 0 }

const ConfigProvider = ({ children, dataConfig, hash }) => {
  const {
    userData,
    validPeriod,
    config,
    colors,
    images,
    sounds,
    links,
    textsByLang,
    categories,
  } = dataConfig

  const catDataConfig = dataConfig?.categories.reduce((acc, category) => {
    acc[category.id] = {
      questionsAnswered: [],
      dateAnsweredToday: [],
    }
    return acc
  }, {})

  const [soundOn, setSoundOn] = useLocalStorage(
    `soundActive-${hash}`,
    soundDefault
  )

  // en una etapa 2 hacer update de puntos
  // con lo que viene de datos del config

  const [points, setPoints] = useLocalStorage(
    `userPoints-${hash}`,
    pointsInitial
  )
  const [answersType, setAnswersType] = useLocalStorage(
    `userAnswers-${hash}`,
    answersTypeInitial
  )
  const [dataStored, setDataStored] = useLocalStorage(
    `userCatData-${hash}`,
    catDataConfig
  )

  let texts = textsByLang[`${lang}`],
    imagesByLang = images[`${lang}`]

  const values = {
    soundOn,
    setSoundOn,
    points,
    setPoints,
    answersType,
    setAnswersType,
    dataStored,
    setDataStored,
    userData,
    validPeriod,
    config,
    colors,
    images,
    imagesByLang,
    sounds,
    links,
    texts,
    categories,
  }

  const updateDataStored = () => {
    // clean date answered
    const newDataStored = Object.entries(dataStored).reduce(
      (acc, [id, cat]) => {
        acc[id] = {
          ...cat,
          dateAnsweredToday: cat.dateAnsweredToday.filter(
            (ans) => ans === new Date().getDate()
          ),
        }
        return acc
      },
      {}
    )

    // update categories if is necessary
    Object.entries(catDataConfig).forEach(([id]) => {
      if (!newDataStored.hasOwnProperty(id)) {
        newDataStored[id] = {
          questionsAnswered: [],
          dateAnsweredToday: [],
        }
      }
    })

    setDataStored(newDataStored)
    // const newPoints = dataConfig.userData.userPoint
    // console.log(newPoints);
    // setPoints(dataConfig.userData.userPoint)
  }

  useEffect(() => {
    updateDataStored()
  }, [])

  return (
    <ConfigContext.Provider value={values}>{children}</ConfigContext.Provider>
  )
}

export { ConfigContext, ConfigProvider }
