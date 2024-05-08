import { useState } from 'preact/hooks'
import { createUser } from "../services/createUser"

export default function UserRegister({ setUserConfig }) {
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    const dataInputs = {
      username,
      msisdn: phone,
      password,
    }

    // fetch to createUser
    createUser(dataInputs).then((res) => {
      if (res.userCreated) {
        const updateUserConfig = {
          id: res.userID,
          username,
          msisdn: phone,
          password,
        }
        setUserConfig(updateUserConfig)
      }
    })
  }

  return (
    <div className="user-register">
      <h2>Registro de usuario:</h2>
      <form className="signin-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="username">Nombre:</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="phone">Teléfono:</label>
          <input
            type="phone"
            id="phone"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <input className="submit" type="submit" value="Enviar" />
      </form>
    </div>
  )
}
