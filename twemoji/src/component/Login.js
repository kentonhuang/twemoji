import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'

const Login = ({toggle}) => {

  const {dispatch} = useContext(AuthContext)

  const url = 'http://localhost:3005/users/login'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(undefined)

  useEffect(() => {
    return () => {
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await axios.post(url, {
        email,
        password
      })
      console.log(res.data)
      const payload = {
        token: res.data.token,
        user: res.data.user.username,
        email: res.data.user.email,
      }
      await dispatch({
        type: 'LOGIN',
        payload
      })
      return 
    } catch (e) {
      setError(e)
    }
    
    setEmail('')
    setPassword('')
    return

  }

  const emailChange = (event) => setEmail(event.target.value)
  const passChange = (event) => setPassword(event.target.value)

  return (
    <div className="login">
      {error ? (
        <span>Login Failed</span>
      ) : undefined}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder='Email'value={email} onChange={emailChange}/>
        <input type="password" placeholder='Password'value={password} onChange={passChange} />
        <button type="submit">Login</button>
      </form>
      <span onClick={toggle}>Sign up</span>
    </div>
  )
}

export default Login;
