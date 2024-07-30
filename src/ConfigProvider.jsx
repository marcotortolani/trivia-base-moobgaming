import { createContext } from 'preact'
import { useEffect } from 'preact/hooks'
import useLocalStorage from './helpers/useLocalStorage'
import rc4Min from 'rc4.js'

const rc4 = new rc4Min('MoobgamingAJM')

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
    lang,
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

  const [points, setPoints] = useLocalStorage(
    `userPoints-${hash}`,
    rc4.encrypt(pointsInitial.toString())
  )

  const pointsDecrypted = parseInt(rc4.decrypt(points), 10)
  const setPointsEncrypted = (number) => {
    setPoints(rc4.encrypt(number.toString()))
  }

  const [userDataStored, setUserDataStored] = useLocalStorage(
    `userData-${hash}`,
    userData
  )

  const [answersType, setAnswersType] = useLocalStorage(
    `userAnswers-${hash}`,
    answersTypeInitial
  )
  const [dataStored, setDataStored] = useLocalStorage(
    `userCatData-${hash}`,
    catDataConfig
  )

  let texts = textsByLang[lang],
    imagesByLang = images[lang]

  const values = {
    soundOn,
    setSoundOn,
    points: pointsDecrypted,
    setPoints: setPointsEncrypted,
    answersType,
    setAnswersType,
    dataStored,
    setDataStored,
    userData,
    userDataStored,
    setUserDataStored,
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
  }

  useEffect(() => {
    updateDataStored()
  }, [])

  return (
    <ConfigContext.Provider value={values}>{children}</ConfigContext.Provider>
  )
}

export { ConfigContext, ConfigProvider }
