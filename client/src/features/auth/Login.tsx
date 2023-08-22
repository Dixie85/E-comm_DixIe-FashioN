import { useRef, useState, useEffect } from 'react'
import { setCredentials } from '../../redux/slices/auth/authSlice'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import IonIcon from '@reacticons/ionicons'
import { useAppDispatch } from '../../redux/redux.hooks'
import { isLoginOpen } from '../../redux/slices/auth/loginSlice'
import { isRegisterOpen } from '../../redux/slices/auth/registerSlice'
import Spiner from '../../Assets/Spiners/Spiner'
import { isForgotPasswordOpen } from '../../redux/slices/auth/forgotPasswordSlice'

const Login = () => {
  const userRef = useRef<HTMLInputElement>(null)
  const errRef = useRef<HTMLInputElement>(null)
  const [signUpShowBtn, setSignUpShowBtn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [persist, setPersist] = usePersist()

  const dispatch = useAppDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    //@ts-ignore
    userRef.current!.focus()
  }, [])

  useEffect(() => {
    setErrMsg('');
    setSignUpShowBtn(false)
  }, [username, password])


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password }).unwrap()

      dispatch(setCredentials({ accessToken }))
      setUsername('')
      setPassword('')
      dispatch(isLoginOpen(false))
    } catch (err: any) {
      if (!err.status) {
        setErrMsg('No Server Response');
      } else if (err.status === 400) {
        setErrMsg(err.data?.message);
      } else if (err.status === 401) {
        if (err.data?.signUp) {
          setSignUpShowBtn(() => err.data?.signUp)
        }
        setErrMsg(err.data?.message);
      } else {
        setErrMsg(err.data?.message);
      }
      //@ts-ignore
      errRef.current!.focus();
    }
  }

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)
  const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  const handleToggle = () => setPersist((prev: any) => !prev)
  const onForgotPassword = () => {
    dispatch(isLoginOpen(false))
    dispatch(isForgotPasswordOpen(true))
  }
  const onSignUp = () => {
    dispatch(isLoginOpen(false))
    dispatch(isRegisterOpen(true))
  }

  return (
    <section className="fixed flex h-screen w-screen bg-black/70 z-50">
      <button
        className='absolute top-10 right-10 flex p-1 text-6xl text-white items-center rounded-full shadow-md bg-slate-800/25 border border-rose-50/70 hover:bg-slate-50/25 active:text-black active:bg-slate-50/80'
        onClick={() => { dispatch(isLoginOpen(false)) }}
      >
        <IonIcon name="close-outline"></IonIcon>
      </button>
      <div className='flex flex-col justify-center items-center px-8 w-[320px] m-auto bg-rose-100 rounded-3xl shadow-xl'>
        <header className='mt-4'>
          <h1 className='text-2xl'>Sign In</h1>
        </header>

        <main className=" mt-4 h-full">
          <form className="flex flex-col text-gray-600/90" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              className="rounded-md mb-2 pl-1 shadow-sm outline-none"
              type="text"
              id="username"
              ref={userRef}
              value={username}
              onChange={handleUserInput}
              autoComplete="off"
              required
            />

            <label htmlFor="password ">Password:</label>
            <input
              className="rounded-md  pl-1 shadow-sm outline-none"
              type="password"
              id="password"
              onChange={handlePwdInput}
              value={password}
              required
            />
            <span onClick={onForgotPassword} className='mb-3 text-left hover:text-red-400 cursor-pointer'>forgot password?</span>

            <div className='flex'>
              <input
                type="checkbox"
                className="pl-2"
                id="persist"
                onChange={handleToggle}
                checked={persist}
              />
              <label htmlFor="persist" className="ml-1">stay signed in</label>
            </div>

            <button className="mt-4 text-black/80 bg-white rounded-xl shadow hover:bg-blue-200">Sign In</button>
          </form>
        </main>

        <footer className='flex items-center min-h-[2rem]'>
          {isLoading && <p className='py-2'><Spiner /></p>}
          {errMsg &&
            <div className='flex flex-col'>
              <p ref={errRef} className='py-2 text-red-500' aria-live="assertive">{errMsg}</p>
              {signUpShowBtn &&
                <button
                  className="mb-4 text-black/80 bg-white  rounded-xl  shadow"
                  onClick={onSignUp}
                >Sign up
                </button>}
            </div>}
        </footer>
      </div>
    </section>
  )
}
export default Login