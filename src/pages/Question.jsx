import { useParams, useNavigate } from 'react-router-dom'
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from 'preact/hooks'

import useSound from 'use-sound'
import { ConfigContext } from '../ConfigProvider'
import { updateScore } from '../services/updateScore'

import Lottie from 'lottie-react'
import bonusTag from '../assets/lottie_json/ticket-bonus.json'
import silverCongrats from '../assets/lottie_json/silver_congrats.json'

import LogoHeader from '../components/Trivia/LogoHeader'
import PanelFooter from '../components/Trivia/PanelFooter'
import DailyLimit from '../components/DailyLimit'

const indexInitial = 0

export default function Question() {
  const {
    soundOn,
    dataStored,
    setDataStored,
    colors,
    points,
    setPoints,
    answersType,
    setAnswersType,
    images,
    texts,
    categories,
    config,
    sounds,
  } = useContext(ConfigContext)
  const { backgroundApp, idolCatCompleted } = images
  const {
    categoryTitle,
    dailyLimit,
    categoryCompleted,
    correctAnswer,
    wrongAnswer,
  } = texts
  const POINTS_CORRECT = config['pointsCorrect']
  const POINTS_WRONG = config['pointsWrong']
  const POINTS_BONUS = config['pointsBonus']
  const TRIES_ALLOWED = config['triesAllowedPerDay']
  const { correctAnswerSound, wrongAnswerSound } = sounds
  /*----- */
  let { cat } = useParams()
  const [correctAnswSound] = useSound(correctAnswerSound, {
    soundEnabled: soundOn,
  })
  const [wrongAnswSound] = useSound(wrongAnswerSound, {
    soundEnabled: soundOn,
  })
  const catSelected = useMemo(
    () => categories.find((categ) => categ.id === parseInt(cat)),
    [cat]
  )

  const navigate = useNavigate()
  const questions = catSelected?.questions
  const catBonus = catSelected?.bonus

  const [indexQuestion, setIndexQuestion] = useState(indexInitial)
  const [slideQuestion, setSlideQuestion] = useState(false)
  const [isDisable, setIsDisable] = useState(false)

  const [animation, setAnimation] = useState('')
  // Posible Animation States:
  // 1. "limitReached" - Daily Limit of Tries Reached
  // 2. "catCompleted" - Category Completed

  const answerDefault = questions[indexQuestion].answers.map((answer) => ({
    ...answer,
    isClicked: false,
  }))
  const [answersClicked, setAnswersClicked] = useState(answerDefault)

  const hasBonus = useMemo(
    () => questions[indexQuestion].bonus || catBonus,
    [catBonus, indexQuestion, questions]
  )

  useEffect(() => {
    const index = dataStored[parseInt(cat)].questionsAnswered.length
    setIndexQuestion(index)
  }, [])

  useEffect(() => {
    if (!indexQuestion) return
    setSlideQuestion(false)
    setAnswersClicked(answerDefault)
    setIsDisable(false)
  }, [indexQuestion])

  const handleAnswer = useCallback(
    ({ answer }) => {
      const contextAudio = new AudioContext()
      const answerClicked = answer
      let newPoints
      setIsDisable(true)

      if (answerClicked.isCorrect) {
        //correctAnswer
        contextAudio.resume().then(correctAnswSound())
        if (hasBonus) {
          newPoints = points + POINTS_CORRECT + POINTS_BONUS
          let newAnswer = answersType
          newAnswer = { ...newAnswer, bonus: newAnswer.bonus + 1 }
          setAnswersType(newAnswer)
          // update partial score to endpoint
          updateScore({ partialScore: POINTS_CORRECT + POINTS_BONUS })
        } else {
          newPoints = points + POINTS_CORRECT
          let newAnswer = answersType
          newAnswer = { ...newAnswer, correct: newAnswer.correct + 1 }
          setAnswersType(newAnswer)
          // update partial score to endpoint
          updateScore({ partialScore: POINTS_CORRECT })
        }
      } else {
        //wrongAnswer
        contextAudio.resume().then(wrongAnswSound())
        newPoints = points + POINTS_WRONG
        let newAnswer = answersType
        newAnswer = { ...newAnswer, incorrect: newAnswer.incorrect + 1 }
        setAnswersType(newAnswer)
        // update partial score to endpoint
        updateScore({ partialScore: POINTS_WRONG })
      }

      // update points on front
      setPoints(newPoints)

      const answerClickTrue = answersClicked.map((ans) => {
        if (ans === answerClicked) {
          return { ...ans, isClicked: true }
        }
        return ans
      })
      setAnswersClicked(answerClickTrue)

      handleQuestionsAnswered()
    },
    [answersClicked, hasBonus, points]
  )

  function handleQuestionsAnswered() {
    const newData = dataStored
    newData[cat].questionsAnswered.push(indexQuestion)
    newData[cat].dateAnsweredToday.push(new Date().getDate())
    setDataStored(newData)

    if (
      dataStored[parseInt(cat)].questionsAnswered.length === questions.length ||
      dataStored[parseInt(cat)].dateAnsweredToday.length === TRIES_ALLOWED
    ) {
      setTimeout(() => {
        setSlideQuestion(true)
      }, 1500)
      // Questions completed in this Category
      if (
        dataStored[parseInt(cat)].questionsAnswered.length === questions.length
      ) {
        setTimeout(() => {
          setAnimation('catCompleted')
        }, 1500)
      } else {
        // Daily Limit reached
        setTimeout(() => {
          setAnimation('limitReached')
        }, 1500)
      }
    } else {
      setTimeout(() => {
        setSlideQuestion(true)
        setTimeout(() => {
          setIndexQuestion((indexQuestion) => indexQuestion + 1)
        }, 500)
      }, 1500)
    }
  }

  useEffect(() => {
    if (animation === 'catCompleted' || animation === 'limitReached') {
      setTimeout(() => {
        navigate('/')
      }, 4000)
    }
  }, [animation])

  const CardQuestion = useCallback(() => {
    return (
      <>
        <div className="title-question" style={{ borderColor: colors?.text }}>
          <h3 className="title" style={{ color: colors?.text }}>
            {questions[indexQuestion].title}
          </h3>
          {hasBonus && (
            <div className="wrapper-lottie">
              <Lottie
                className="lottie-bonus"
                animationData={bonusTag}
                loop={true}
                style={{
                  width: 100,
                  height: 100,
                }}
              />
            </div>
          )}
        </div>

        <ul className="cards-answers">
          {answersClicked.map((answer) => (
            <li key={answer.text}>
              {answer.isClicked ? (
                <button
                  className={`answer ${answer.isCorrect ? 'correct' : 'wrong'}`}
                  onClick={() => handleAnswer({ answer })}
                  disabled={isDisable}
                  style={{
                    color: colors?.text,
                    backgroundColor: answer.isCorrect
                      ? colors?.correct
                      : colors?.wrong,
                  }}
                >
                  {answer.isCorrect
                    ? hasBonus
                      ? `${correctAnswer}: +${POINTS_CORRECT + POINTS_BONUS}`
                      : `${correctAnswer}: +${POINTS_CORRECT}`
                    : `${wrongAnswer}: +${POINTS_WRONG}`}
                </button>
              ) : (
                <button
                  className="answer"
                  onClick={() => handleAnswer({ answer })}
                  disabled={isDisable}
                  style={{
                    color: colors?.text,
                    background: colors?.answerBtnGradient,
                  }}
                >
                  {answer.text}
                </button>
              )}
            </li>
          ))}
        </ul>
      </>
    )
  }, [cat, indexQuestion, hasBonus, answersClicked, isDisable])

  return (
    <div className="category" style={{ backgroundColor: colors?.background }}>
      {backgroundApp && (
        <div className="background-image-container">
          <img
            className="background-image"
            src={backgroundApp}
            alt="Image BackGround Trivia Maradona"
          />
        </div>
      )}

      <LogoHeader />

      <div className="category-questions">
        <div className="category-chosen">
          <div className="category-image" id="cat-image">
            <img src={catSelected?.imgURL} alt="Image - Category Selected" />
          </div>

          <div className="title">
            <h2 style={{ color: colors?.title }}>{categoryTitle}</h2>
            <h3 className="category-name" style={{ color: colors?.text }}>
              {catSelected?.name}
            </h3>
          </div>
        </div>

        <div
          className={`cards-question ${
            slideQuestion ? 'show-side-right' : 'show-side-left'
          }`}
        >
          <CardQuestion />
        </div>
      </div>

      {/* ---- Animations ---- */}
      {animation === 'catCompleted' && (
        <div
          className="title-congrats"
          style={{ backgroundColor: colors?.backgroundCongrats }}
        >
          <h3 className="silver-congrats">{categoryCompleted}</h3>
          <Lottie
            animationData={silverCongrats}
            loop={true}
            style={{
              width: 300,
              height: 300,
            }}
          />
          {idolCatCompleted && (
            <img
              className="idol-cat-completed"
              src={idolCatCompleted}
              alt="Image Idol Category Completed"
            />
          )}
        </div>
      )}

      {animation === 'limitReached' && <DailyLimit text={dailyLimit} />}

      {/* ---- Animations ---- */}

      <PanelFooter cat={cat} />
    </div>
  )
}
