import React, {useState, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'

const Register = ({toggle}) => {

  const {dispatch} = useContext(AuthContext)

  const url = 'http://localhost:3005/users/'

  const emailChange = (event) => setEmail(event.target.value)
  const passChange = (event) => setPassword(event.target.value)
  const usernameChange = (event) => setUsername(event.target.value)
  const displayChange = (event) => setDisplay(event.target.value)

  const [error, setError] = useState(undefined) 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [displayName, setDisplay] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(url, {
        displayName,
        username,
        email,
        password
      })

      console.log(res.data)
      
      await dispatch({
        type: 'LOGIN',
        payload: {
          token: res.data.token,
          user: res.data.user.username,
          email: res.data.user.email
        }
      })
      
    } catch(e) {
      console.log(e.response)
    }

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Display Name" value={displayName} onChange={displayChange} />
        <input type="text" placeholder="Username" value={username} onChange={usernameChange} />
        <input type="email" placeholder='Email'value={email} onChange={emailChange}/>
        <input type="password" placeholder='Password'value={password} onChange={passChange} />
        <button type="submit">Sign Up</button>
      </form>
      <span onClick={toggle}>Log In</span>
    </div>
  )
}

export default Register;
