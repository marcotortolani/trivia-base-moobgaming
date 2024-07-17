import { useContext } from 'preact/hooks'
import { ConfigContext } from '../ConfigProvider'

export default function Ended() {
  const { validPeriod, images, colors, textsByLang } = useContext(ConfigContext)

  const dateEndStyled = new Date(validPeriod?.endDate).toLocaleDateString(
    'es',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )
  const timeEndStyled = new Date(validPeriod?.endDate).toLocaleTimeString(
    'es',
    {
      hour: '2-digit',
      minute: '2-digit',
    }
  )

  return (
    <div
      className="ended-advise"
      style={{ backgroundColor: colors?.background, color: colors?.text }}
    >
      <img className="logo" src={images?.es.logoHeader} alt="Imágen Logo" />
      <img
        className="icon-image"
        src={images?.triviaEnded}
        alt="Imágen Icono Proximamente"
      />
      <h4 className="title" style={{ color: colors?.text }}>
        La trivia ha <span style={{ color: colors?.wrong }}>Finalizado</span>
      </h4>

      <p className="text">
        El día {dateEndStyled} a las {timeEndStyled}
        <span>hs</span>
      </p>
    </div>
  )
}
