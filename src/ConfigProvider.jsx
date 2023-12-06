import { createContext } from "preact";
import { useEffect } from "preact/hooks";
import useLocalStorage from "./helpers/useLocalStorage";

import {
  config,
  images,
  sounds,
  links,
  textsByLang,
  categories,
} from "./conf/config.json";

const lang = document.documentElement.lang;
const texts = textsByLang[`${lang}`];
const imagesByLang = images[`${lang}`];

const ConfigContext = createContext();

const soundDefault = false;
const pointsInitial = 0;
const catDataInitial = categories.map(() => ({
  questionsAnswered: [],
  dateAnsweredToday: [],
}));

const ConfigProvider = ({ children }) => {
  const [soundOn, setSoundOn] = useLocalStorage("soundActive", soundDefault);
  const [points, setPoints] = useLocalStorage("userPoints", pointsInitial);
  const [dataStored, setDataStored] = useLocalStorage(
    "userData",
    catDataInitial
  );
  
  const values = {
    soundOn, 
    setSoundOn,
    points,
    setPoints,
    dataStored,
    setDataStored,
    config,
    images,
    imagesByLang,
    sounds,
    links,
    texts,
    categories,
  };

  useEffect(() => {
    const dataLS = dataStored.map((cat) => ({
      ...cat,
      dateAnsweredToday: cat.dateAnsweredToday.filter(
        (ans) => ans === new Date().getDate()
      ),
    }));
    setDataStored(dataLS);
  }, []);

  return (
    <ConfigContext.Provider value={values}>{children}</ConfigContext.Provider>
  );
};

export { ConfigContext, ConfigProvider };
