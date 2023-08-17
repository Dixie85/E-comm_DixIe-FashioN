import { useRef, useState, useEffect } from 'react'
import { useAppDispatch } from '../../redux/redux.hooks'
import { isLoginOpen } from '../../redux/slices/auth/loginSlice'
import { isForgotPasswordOpen } from '../../redux/slices/auth/forgotPasswordSlice'
import IonIcon from '@reacticons/ionicons'
import Spiner from '../../Assets/Spiners/Spiner'
import { useRequirePasswordChangeLinkMutation } from '../users/usersApiSlice'
import useInfoMessage from '../../hooks/useInfoMessage'

const ForgotPassword = () => {
  const userRef = useRef<HTMLInputElement>(null)
  const errRef = useRef<HTMLInputElement>(null)

  const [username, setUsername] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [infoMessage] = useInfoMessage()

  const dispatch = useAppDispatch()

  const [requirePasswordChangeLink, { isLoading }] = useRequirePasswordChangeLinkMutation()

  useEffect(() => {
    //@ts-ignore
    userRef.current!.focus()
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [username])


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const {message} = await requirePasswordChangeLink({ username }).unwrap()
      infoMessage(message, false)
      setUsername('')
      dispatch(isForgotPasswordOpen(false))
    } catch (err: any) {
      if (!err.status) {
        setErrMsg('No Server Response');
      } else if (err.status === 400) {
        setErrMsg(err.data?.message);
      } else if (err.status === 401) {
        setErrMsg(err.data?.message);
      } else {
        setErrMsg(err.data?.message);
      }
      //@ts-ignore
      errRef.current!.focus();
    }
  }

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)
  const onBackToLogin = () => {
    dispatch(isForgotPasswordOpen(false))
    dispatch(isLoginOpen(true))
  }

  return (
    <section className="fixed flex h-screen w-screen bg-black/70 z-50">
      <button
        className='absolute top-10 right-10 flex p-1 text-6xl text-white items-center rounded-full shadow-md bg-slate-800/25 border border-rose-50/70 hover:bg-slate-50/25 active:text-black active:bg-slate-50/80'
        onClick={() => { dispatch(isForgotPasswordOpen(false)) }}
      >
        <IonIcon name="close-outline"></IonIcon>
      </button>
      <div className='flex flex-col justify-center items-center pb-3 px-8 w-[320px] m-auto bg-rose-100 rounded-3xl shadow-xl'>
        <header className='mt-4'>
          <h1 className='text-2xl'>Forgot your password?</h1>
        </header>

        <main className=" mt-4 h-full">
          <form className="flex flex-col text-gray-600/90" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              className="rounded-md pl-1 shadow-sm outline-none"
              type="text"
              id="username"
              ref={userRef}
              value={username}
              onChange={handleUserInput}
              autoComplete="off"
              required
            />

            <button className="mt-4 text-black/80 bg-white rounded-xl shadow hover:bg-blue-200">Reset password</button>

          </form>
        </main>

        <footer className='flex flex-col items-center min-h-[2rem]'>
          <button onClick={onBackToLogin} className='mt-3 text-sm text-gray-600/90 hover:text-blue-400'>Back to Sign in</button>
          {isLoading && <p className='py-2'><Spiner /></p>}
          {errMsg &&
            <div className='flex flex-col'>
              <p ref={errRef} className='py-2 text-red-500' aria-live="assertive">{errMsg}</p>
            </div>}
        </footer>
      </div>
    </section>
  )
}
export default ForgotPassword