import { useContext } from 'preact/hooks'
import { ConfigContext } from '../ConfigProvider'

export default function Upcoming() {
  const { validPeriod, images, colors, textsByLang } = useContext(ConfigContext)
  const dateStartStyled = new Date(validPeriod?.startDate).toLocaleDateString(
    'es',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )
  const timeStartStyled = new Date(validPeriod?.startDate).toLocaleTimeString(
    'es',
    {
      hour: '2-digit',
      minute: '2-digit',
    }
  )
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
      className="upcoming-advise"
      style={{ backgroundColor: colors?.background, color: colors?.text }}
    >
      <img className="logo" src={images?.es.logoHeader} alt="Imágen Logo" />
      <img
        className="icon-image"
        src={images?.triviaUpcoming}
        alt="Imágen Icono Proximamente"
      />

      <h4 className="title" style={{ color: colors?.text }}>
        Podras jugar{' '}
        <span style={{ color: colors?.correct }}>Proximamente</span>
      </h4>

      <p className="text">
        La trivia estará habilitada del {dateStartStyled} a las{' '}
        {timeStartStyled}
        <span>hs</span> hasta el {dateEndStyled} a las {timeEndStyled}
        <span>hs</span>
      </p>
    </div>
  )
}
