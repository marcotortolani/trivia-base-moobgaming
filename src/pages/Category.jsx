import { useContext } from "preact/hooks";
import { useNavigate, useParams } from "react-router-dom";
import useSound from "use-sound";
import { ConfigContext } from "../ConfigProvider";

import LogoHeader from "../components/Trivia/LogoHeader";
import PanelFooter from "../components/Trivia/PanelFooter";

export default function Category() {
  const { soundOn, images, texts, categories, sounds } =
    useContext(ConfigContext);
  const { categoryTitle, buttonStart } = texts;
  const { backgroundApp } = images;
  const { startButton } = sounds;
  const DATA_CATEGS = categories;

  /*------ */
  const navigate = useNavigate();
  let { cat } = useParams();
  const [startButtonSound] = useSound(startButton, {
    soundEnabled: soundOn,
  });

  function handleClick() {
    startButtonSound();
    navigate("/question/" + cat);
  }

  return (
    <div className="category">
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

      <div class="category-chosen">
        <div class="title">
          <h2>{categoryTitle}</h2>
          <h3 class="category-name">{DATA_CATEGS[cat - 1].name}</h3>
        </div>

        <div class="category-image" id="cat-image">
          <img
            src={DATA_CATEGS[cat - 1].imgURL}
            alt="Image - Category Selected"
          />
        </div>
        <button onClick={handleClick} class="button-begin">
          {buttonStart}
        </button>
      </div>

      <PanelFooter cat={cat} />
    </div>
  );
}
