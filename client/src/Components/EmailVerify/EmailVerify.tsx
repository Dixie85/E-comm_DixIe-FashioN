import { useEffect, useRef, useState } from 'react'
import { useEmailVerifyMutation } from '../../features/auth/authApiSlice'
import HeroSpiner from '../../Assets/Spiners/HeroSpiner'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import useInfoMessage from '../../hooks/useInfoMessage'

const EmailVerify = () => {
  const [calledOnce, setCalledOnce] = useState(false)
  const [infoMessage] = useInfoMessage()
  const location = useLocation()
  const { id, token } = useParams()
  const effectRan = useRef(false)

  const [emailVerify, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useEmailVerifyMutation()

  useEffect(()=>{
    if(isError){
      //@ts-ignore
      infoMessage(error.data?.message, true)
      return
    }
  },[error, infoMessage, isError])

  useEffect(()=>{
    if(isSuccess){
      infoMessage('Your account was successfully verified ', false)
      return
    }
  },[infoMessage, isSuccess])
  
  //@ts-ignore
  useEffect(() => {

    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {

    const executingEmailVerify = async () => {
      try {
        if(!calledOnce) await emailVerify({ id, token })
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
      {isSuccess && <Navigate to="/" state={{ from: location }} replace />}
      {isError && <Navigate to="/" state={{ from: location }} replace />}
    </>
  )
}

export default EmailVerify