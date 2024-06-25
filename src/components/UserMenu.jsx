import { useContext, useState } from 'preact/hooks'
import { ConfigContext } from '../ConfigProvider'

export default function UserMenu({ showMenu, onClose }) {
  const {
    points,
    dataStored,
    userData,
    validPeriod,
    config,
    colors,
    images,
    imagesByLang,
    categories,
  } = useContext(ConfigContext)
  console.log(dataStored)
  console.log(userData)
  console.log(colors)

  const userInitials = getUserInitials(userData.userName)

  function getUserInitials(userName) {
    let userInitials
    if (userName.split(' ').length >= 2) {
      userInitials =
        userName.split(' ')[0].charAt(0) + userName.split(' ')[1].charAt(0)
    } else {
      userInitials = userName.charAt(0)
    }

    return userInitials
  }

  return (
    <div
      className={`user-menu-container ${
        showMenu ? 'show-user-menu' : 'hide-user-menu'
      }`}
    >
      <div className="side-menu " style={{ backgroundColor: colors?.primary }}>
        <div className="header" style={{ borderColor: colors?.text }}>
          <h4 style={{ color: colors?.text }}>Menu de usuario</h4>
          <img src={imagesByLang?.logoHeader} alt="Logo Product" />
          <button
            className="button-close"
            onClick={onClose}
            style={{ backgroundColor: colors?.background, color: colors?.text }}
          >
            X
          </button>
        </div>

        <div className="main">
          <div className="user-profile">
            <div className="user-data">
              <div
                className="user-initials"
                style={{
                  backgroundColor: colors?.disable,
                  color: colors?.text,
                }}
              >
                {userInitials}
              </div>
              <span className="user-name">{userData?.userName}</span>
            </div>
            <div className="user-points-container">
              <span>Puntos</span>
              <div
                className="user-points"
                style={{
                  backgroundColor: colors?.text,
                  color: colors?.primary,
                }}
              >
                {points}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
