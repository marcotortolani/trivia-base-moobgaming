import { useContext } from "preact/hooks";
import useSound from "use-sound";
import { ConfigContext } from "../../ConfigProvider";

import LogoHeader from "./LogoHeader";
import { HomeIcon, SoundActiveIcon, SoundMuteIcon } from "../../utils/svgIcons";

export default function Header() {
  const { soundOn, setSoundOn, images, sounds } = useContext(ConfigContext);
  const { muteButton } = sounds;
  const { iconSoundActive, iconSoundMute, homeIcon } = images;
  const [mutePop] = useSound(muteButton);

  function handleSound() {
    // let context = new AudioContext();
    const contextAudio = new AudioContext();
    contextAudio.resume();
    mutePop();
    setSoundOn(!soundOn);
  }
  return (
    <header className="header">
      <div className="home-icon">
        <a href="" target="_self">
          {/* <img src={homeIcon} alt="Icon home yellow" /> */}
          <HomeIcon />
        </a>
      </div>

      <LogoHeader />

      <div className="sound-controls ">
        <button className="mute-control" aria="switch" onClick={handleSound}>
          {soundOn ? (
            // <img src={iconSoundActive} alt="Icon Sound Active" />
            <SoundActiveIcon />
          ) : (
            // <img src={iconSoundMute} alt="Icon Sound Mute" />
            <SoundMuteIcon />
          )}
        </button>
      </div>
    </header>
  );
}
