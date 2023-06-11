import { useEffect, useRef, useState } from 'react'
import HeroSpiner from '../../Assets/Spiners/HeroSpiner'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { useVerifyPasswordResetLinkMutation } from '../../features/users/usersApiSlice'
import PasswordChangeForm from './PasswordChangeForm'
import useInfoMessage from '../../hooks/useInfoMessage'

const PasswordChange = () => {
  const [calledOnce, setCalledOnce] = useState(false)
  const [infoMessage] = useInfoMessage()
  const location = useLocation()
  const { id, token } = useParams()
  const effectRan = useRef(false)

  const [verifyPasswordResetLink, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useVerifyPasswordResetLinkMutation()
  console.log(error, 'error');


  useEffect(() => {
    if (isError) {
      //@ts-ignore
      infoMessage(error.data?.message, true)
      return
    }
  }, [error, infoMessage, isError])

  //@ts-ignore
  useEffect(() => {

    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {

      const executingEmailVerify = async () => {
        try {
          if (!calledOnce) await verifyPasswordResetLink({ id, token })
          setCalledOnce(true)
        } catch (error) {
          console.log(error);
        }
      }
      executingEmailVerify()
    }

    return () => effectRan.current = true
  }, [])

  return (
    <>
      {isLoading && <HeroSpiner />}
      {isSuccess && <PasswordChangeForm />}
      {isError && <Navigate to="/" state={{ from: location }} replace />}
    </>
  )
}

export default PasswordChange