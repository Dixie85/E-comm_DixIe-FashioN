import { useEffect, useState } from 'react'
import { useAppSelector } from '../redux/redux.hooks'
import { selectCurrentToken } from '../redux/slices/auth/authSlice'
import jwt_decode from "jwt-decode"
import { IDecoded } from '../Interfaces/Interfaces'

const useTokenDecoder = () => {
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [userRole, setUserRole] = useState('')
  const token = useAppSelector(selectCurrentToken) as string
  const decoded = jwt_decode(token) as IDecoded

  useEffect(()=>{
    setUserId(decoded.UserInfo.userId)
    setUserName(decoded.UserInfo.username)
    setUserRole(decoded.UserInfo.roles)
  },[])

  return {userId, userName, userRole}
}

export default useTokenDecoder