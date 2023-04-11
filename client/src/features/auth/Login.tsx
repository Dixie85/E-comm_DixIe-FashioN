import { useRef, useState, useEffect } from 'react'
import { setCredentials } from '../../redux/slices/auth/authSlice'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import IonIcon from '@reacticons/ionicons'
import { useAppDispatch } from '../../redux/redux.hooks'
import { isLoginOpen } from '../../redux/slices/auth/loginSlice'
import { Link } from 'react-router-dom'

const Login = () => {
  const userRef = useRef<HTMLInputElement>(null)
  const errRef = useRef<HTMLInputElement>(null)
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
  }, [username, password])


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password }).unwrap()
      console.log({ accessToken });

      dispatch(setCredentials({ accessToken }))
      setUsername('')
      setPassword('')
      dispatch(isLoginOpen(false))
    } catch (err: any) {
      if (!err.status) {
        setErrMsg('No Server Response');
      } else if (err.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.status === 401) {
        setErrMsg('Unauthorized');
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
  }
  

  return (
    <section className="fixed flex h-screen w-screen bg-black/70 z-50">
      <button
        className='absolute top-10 right-10 flex p-1 text-6xl text-white items-center rounded-full shadow-md bg-slate-800/25 border border-rose-50/70 hover:bg-slate-50/25 active:text-black active:bg-slate-50/80'
        onClick={() => {dispatch(isLoginOpen(false))}}
      >
        <IonIcon name="close-outline"></IonIcon>
      </button>
      <div className='flex flex-col justify-center items-center px-8 min-w-[320px] m-auto bg-rose-100 rounded-3xl shadow-xl'>
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
            <span onClick={onForgotPassword} className='mb-3'>forgot password</span>

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

            <button className="mt-4 text-black/80 bg-white  rounded-xl  shadow">Sign In</button>
          </form>
        </main>

        <footer className='flex items-center min-h-[2rem]'>
          {isLoading && <p>processing...</p>}
          {errMsg && <p ref={errRef} className='text-red-500' aria-live="assertive">{errMsg}</p>}          
        </footer>
      </div>
    </section>
  )
}
export default Login