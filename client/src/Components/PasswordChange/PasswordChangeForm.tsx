import { useState, useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useCancelPasswordChangeMutation, usePasswordChangeMutation } from "../../features/users/usersApiSlice"
import Spiner from "../../Assets/Spiners/Spiner"
import useInfoMessage from "../../hooks/useInfoMessage"

const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const PasswordChangeForm = () => {

  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState(false)
  const [msg, setMsg] = useState('')
  const [infoMessage] = useInfoMessage()
  const { id, token } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [passwordChange, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = usePasswordChangeMutation()

  const [cancelPasswordChange, {
    isLoading: isCancelPasswordLoading,
    isSuccess: isCancelPasswordSuccess,
  }] = useCancelPasswordChangeMutation()

  //@ts-ignore
  console.log(error?.data.message);

  console.log({ password, validPassword });

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    if (isSuccess && msg.length > 0) {
      setPassword('')
      console.log(msg, "loging MSG");
      infoMessage(msg, false)
      navigate("/", { replace: true, state: { from: location } })
    }
  }, [infoMessage, isSuccess, location, msg, navigate])

  const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  const onPasswordConfirmChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    password === e.target.value ? setConfirmPassword(true) : setConfirmPassword(false)

  }

  useEffect(() => {
    if (isCancelPasswordSuccess) {
      navigate('/')
    }
  }, [isCancelPasswordSuccess, navigate])

  const canSave = [validPassword, confirmPassword].every(Boolean) && !isLoading

  const handleSaveChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (canSave) {
      const data = await passwordChange({ id, token, password })
      //@ts-ignore
      setMsg(() => data?.data?.message)

    }
  }

  const handleCancelChangePassword = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    cancelPasswordChange({ token })
  }

  //@ts-ignore
  const errorDataMessage = error?.data.message

  return (
    <section className='max-w-[1440px] m-auto font-[jossefin]'>
      <article className="relative flex h-screen bg-Hero bg-cover font-[Josefin] md:bg-top bg-center">

        <section className="fixed flex h-screen w-screen bg-black/70 z-50">

          <div className='flex flex-col justify-center items-center px-8 min-w-[320px] m-auto bg-blue-100 rounded-3xl shadow-xl'>
            <header className='mt-4'>
              <h1 className='text-2xl'>Sign up</h1>
            </header>
            <main className=" mt-4 h-full">
              <form className="flex flex-col text-gray-600/90" onSubmit={handleSaveChangePassword}>

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

                <label htmlFor="password">Confirm password:</label>
                <input
                  className="rounded-md pl-1 shadow-sm outline-none"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={onPasswordConfirmChanged}
                  required
                />

                <button
                  title="Save"
                  disabled={!canSave}
                  className={`mt-4 text-black/80 bg-white  rounded-xl  shadow ${!canSave ? 'cursor-not-allowed bg-white/60' : ''}`}
                >Save
                </button>

              </form>
            </main>

            <footer className=' w-full min-h-[2rem]'>
              <div className="flex flex-col items-center justify-center">
                <button
                  title="Cancel"
                  className={`mt-4 mb-4 w-[170.5px] text-black/80 bg-white  rounded-xl shadow hover:bg-red-400 hover:text-white`}
                  onClick={handleCancelChangePassword}
                >Cancel
                </button>
                {isLoading && <p><Spiner /></p>}
                {isCancelPasswordLoading && <p><Spiner /></p>}
                {isError && <p className='text-red-500'>{`${errorDataMessage}`}</p>}
              </div>
            </footer>

          </div>
        </section>

      </article>
    </section>
  )
}

export default PasswordChangeForm