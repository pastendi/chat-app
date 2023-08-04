import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../services/user'

const data = {
  name: '',
  username: '',
  password: '',
  cpassword: '',
}
const Register = () => {
  const [values, setValues] = useState(data)
  const navigate = useNavigate()
  const [registerMutation, registerInfo] = useRegisterMutation()
  const handleChange = ({ currentTarget: input }) => {
    setValues({ ...values, [input.name]: input.value })
  }
  const register = async (e) => {
    e.preventDefault()
    try {
      await registerMutation(values)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <form
        onSubmit={register}
        className='w-[500px] flex flex-col bg-slate-200 rounded-xl p-6 space-y-4'
      >
        <h1 className='text-center text-4xl font-bold my-4'>Register</h1>
        <input
          type='text'
          name='name'
          value={values.name}
          onChange={handleChange}
          placeholder='name'
          className='rounded-md h-10 px-4 py-2 w-full outline-none focus:outline-1 focus:outline-sky-400'
        />
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
        <input
          type='password'
          name='cpassword'
          value={values.cpassword}
          onChange={handleChange}
          placeholder='confirm password'
          className='rounded-md h-10 px-4 py-2 w-full outline-none focus:outline-1 focus:outline-sky-400'
        />
        <button
          type='submit'
          className='bg-emerald-400 text-white font-bold text-xl rounded-md py-2'
        >
          Register
        </button>
        <p className='text-center'>
          Already have account.{' '}
          <span
            className='underline cursor-pointer text-sky-600 font-bold'
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  )
}

export default Register
