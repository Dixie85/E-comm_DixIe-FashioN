import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import IonIcon from "@reacticons/ionicons"
import { useAppDispatch } from "../../redux/redux.hooks"
import { isRegisterOpen } from "../../redux/slices/auth/registerSlice"
import Spiner from "../../Assets/Spiners/Spiner"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/

const NewUserForm = () => {

  const [addNewUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewUserMutation()
  //@ts-ignore
  console.log(error?.data.message);

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    if (isSuccess) {
      setUsername('')
      setPassword('')
      setEmail('')
      dispatch(isRegisterOpen(false))
    }
  }, [dispatch, isSuccess, navigate])

  const onUsernameChanged = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)
  const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)


  const canSave = [validUsername, validPassword, validEmail].every(Boolean) && !isLoading

  const onSaveUserClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (canSave) {
      await addNewUser({ username, password, email })
    }
  }

  //@ts-ignore
  const errorDataMessage = error?.data.message

  return (

    <section className="fixed flex h-screen w-screen bg-black/70 z-50">
      <button
        className='absolute top-10 right-10 flex p-1 text-6xl text-white items-center rounded-full shadow-md bg-slate-800/25 border border-rose-50/70 hover:bg-slate-50/25 active:text-black active:bg-slate-50/80'
        onClick={() => { dispatch(isRegisterOpen(false)) }}
      >
        <IonIcon name="close-outline"></IonIcon>
      </button>

      <div className='flex flex-col justify-center items-center px-8 min-w-[320px] m-auto bg-blue-100 rounded-3xl shadow-xl'>
        <header className='mt-4'>
          <h1 className='text-2xl'>Sign up</h1>
        </header>
        <main className=" mt-4 h-full">
          <form className="flex flex-col text-gray-600/90" onSubmit={onSaveUserClicked}>
            <label htmlFor="username">Username: </label>
            <input
              className="rounded-md pl-1 shadow-sm outline-none"
              type="text"
              id="username"
              name="username"
              autoComplete="off"
              value={username}
              onChange={onUsernameChanged}
              required
            />
            <span className="mb-3 text-xs">[3-20 letters]</span>

            <label htmlFor="password">Password:</label>
            <input
              className="rounded-md pl-1 shadow-sm outline-none"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={onPasswordChanged}
              required
            />
            <span className="mb-3 text-xs">[4-12 chars incl. !@#$%]</span>

            <label htmlFor="email">Email:</label>
            <input
              className="rounded-md pl-1 shadow-sm outline-none"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={onEmailChanged}
            />
            <span className="mb-3 text-xs">[name@email.com]</span>

            <button
              title="Sign up"
              disabled={!canSave}
              className={`mt-4 text-black/80 bg-white  rounded-xl  shadow ${!canSave ? 'cursor-not-allowed bg-white/60' : ''}`}
            >Sign up
            </button>

          </form>
        </main>

        <footer className='flex items-center min-h-[2rem]'>
          {isLoading && <p><Spiner /></p>}
          {isError && <p className='text-red-500'>{`${errorDataMessage}`}</p>}
        </footer>

      </div>
    </section>

  )
}
export default NewUserForm