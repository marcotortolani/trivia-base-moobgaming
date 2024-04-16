import { useContext } from 'preact/hooks'
import useSound from 'use-sound'
import { ConfigContext } from '../../ConfigProvider'

import LogoHeader from './LogoHeader'
import { HomeIcon, SoundActiveIcon, SoundMuteIcon } from '../../utils/svgIcons'

export default function Header() {
  const { soundOn, setSoundOn, colors, sounds } = useContext(ConfigContext)
  const [mutePop] = useSound(sounds?.muteButton)

  function handleSound() {
    const contextAudio = new AudioContext()
    contextAudio.resume()
    mutePop()
    setSoundOn(!soundOn)
  }
  return (
    <header className="header">
      <div className="home-icon">
        <a href="" target="_self">
          <HomeIcon colorStroke={colors?.primary} />
        </a>
      </div>

      <LogoHeader />

      <div className="sound-controls ">
        <button className="mute-control" aria="switch" onClick={handleSound}>
          {soundOn ? (
            <SoundActiveIcon colorStroke={colors?.primary} />
          ) : (
            <SoundMuteIcon colorStroke={colors?.primary} />
          )}
        </button>
      </div>
    </header>
  )
}
