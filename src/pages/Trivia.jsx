import { useContext, useState } from 'preact/hooks';
//import useSound from "use-sound";
import { ConfigContext } from '../ConfigProvider';

import Lottie from 'lottie-react';
import goldenCongrats from '../assets/lottie_json/golden_congrats.json';

import SpinnerWheel from '../components/Trivia/SpinnerWheel';
import PanelFooter from '../components/Trivia/PanelFooter';
import Header from '../components/Trivia/Header';

export default function Trivia() {
  const { points, images, imagesByLang, sounds, texts } =
    useContext(ConfigContext);

  //const [mutePop] = useSound(muteButton);
  const [rouletteDisable, setRouletteDisable] = useState(false);
  const [triviaCompleted, setTriviaCompleted] = useState(false);

  function handleSpinDisable(spinDisable) {
    setRouletteDisable(spinDisable);
  }

  function handleTriviaCompleted(triviaDisable) {
    setTriviaCompleted(triviaDisable);
  }

  // function handleSound() {
  //   // let context = new AudioContext();
  //   const contextAudio = new AudioContext();
  //   contextAudio.resume();
  //   mutePop();
  //   setSoundOn(!soundOn);
  // }

  return (
    <div className="app-trivia">
      {images?.backgroundApp && (
        <div className="background-image-container">
          <img
            className="background-image"
            src={images?.backgroundApp}
            alt="Image BackGround Trivia Maradona"
          />
        </div>
      )}

      <Header />

      <SpinnerWheel
        onSpinDisable={handleSpinDisable}
        onTriviaCompleted={handleTriviaCompleted}
      />

      {/* ---- Animation ---- */}
      {triviaCompleted && (
        <div className="pop-up-fireworks hid">
          <h3 className="golden-congrats">{texts?.congratsTriviaCompleted}</h3>
          <Lottie
            animationData={goldenCongrats}
            loop={true}
            style={{
              width: 300,
              height: 300,
            }}
          />
          {images?.idolGolden && (
            <img
              className="idol-golden"
              src={images?.idolGolden}
              alt="Image Idol Trivia Completed"
            />
          )}
        </div>
      )}
      {/* ---- Animation ---- */}

      {/* {!points && (
        <div className="bubble-message-wrapper">
          <img src={imagesByLang?.bubbleStartMessage} alt="Bubble Initial Message To Start" />
        </div>
      )} */}

      {/* {rouletteDisable && (
        <div className="bubble-daily-limit-wrapper">
          <img
            src={imagesByLang?.bubbleDailyLimit}
            alt="Bubble Message Daily Limit Reached"
          />
        </div>
      )} */}

      <PanelFooter />
    </div>
  );
}
