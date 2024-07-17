import { useContext, useState } from 'preact/hooks'
import useSound from 'use-sound'
import { ConfigContext } from '../../ConfigProvider'

import LogoHeader from './LogoHeader'
import {
  MenuIcon,
  SoundActiveIcon,
  SoundMuteIcon,
} from '../../utils/svgIcons'
import UserMenu from '../UserMenu'

export default function Header() {
  const { soundOn, setSoundOn, colors, sounds } = useContext(ConfigContext)
  const [mutePop] = useSound(sounds?.muteButton)
  const [showMenu, setShowMenu] = useState(false)

  function handleSound() {
    const contextAudio = new AudioContext()
    contextAudio.resume()
    mutePop()
    setSoundOn(!soundOn)
  }
  return (
    <header className="header">
      <div className="menu-icon">
        <button onClick={() => setShowMenu(true)}>
          <MenuIcon colorStroke={colors?.primary} />
        </button>
      </div>

      <UserMenu showMenu={showMenu} onClose={() => setShowMenu(false)} />

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
