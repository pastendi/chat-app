import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../services/user'
const data = {
  username: '',
  password: '',
}
const Login = () => {
  const [values, setValues] = useState(data)
  const navigate = useNavigate()
  const [loginMutation, loginInfo] = useLoginMutation()
  const handleChange = ({ currentTarget: input }) => {
    setValues({ ...values, [input.name]: input.value })
  }
  const login = async (e) => {
    e.preventDefault()
    try {
      await loginMutation(values)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <form
        onSubmit={login}
        className='w-[500px] flex flex-col bg-slate-200 rounded-xl p-6 space-y-4'
      >
        <h1 className='text-center text-4xl font-bold my-4'>Login</h1>
        <input
          type='text'
          name='username'
          value={values.username}
          onChange={handleChange}
          placeholder='username'
          className='rounded-md h-10 px-4 py-2 w-full outline-none focus:outline-1 focus:outline-sky-400'
        />
        <input
          type='password'
          name='password'
          value={values.password}
          onChange={handleChange}
          placeholder='password'
          className='rounded-md h-10 px-4 py-2 w-full outline-none focus:outline-1 focus:outline-sky-400'
        />
        <button
          type='submit'
          className='bg-sky-400 text-white font-bold text-xl rounded-md py-2'
        >
          Login
        </button>
        <p className='text-center'>
          New here?{' '}
          <span
            className='underline cursor-pointer text-emerald-600 font-bold'
            onClick={() => navigate('/')}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login
