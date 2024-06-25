import { createContext } from 'preact'
import { useEffect } from 'preact/hooks'
import useLocalStorage from './helpers/useLocalStorage'

const lang = document.documentElement.lang

const ConfigContext = createContext()

const soundDefault = false
const pointsInitial = 0

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

  console.log(hash)

  const catDataConfig = dataConfig?.categories.reduce((acc, category) => {
    acc[category.id] = {
      questionsAnswered: [],
      dateAnsweredToday: [],
    }
    return acc
  }, {})

  const [soundOn, setSoundOn] = useLocalStorage('soundActive', soundDefault)
  const [points, setPoints] = useLocalStorage(
    `userPoints-${hash}`,
    pointsInitial
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
  }

  useEffect(() => {
    updateDataStored()
  }, [])

  return (
    <ConfigContext.Provider value={values}>{children}</ConfigContext.Provider>
  )
}

export { ConfigContext, ConfigProvider }
