import React from 'react'
import LoginBtn from '../../features/auth/LoginBtn'
import LogoutBtn from '../../features/auth/LogoutBtn'
import RegisterBtn from '../../features/auth/RegisterBtn'
import { useAppSelector } from '../../redux/redux.hooks'
import { selectCurrentToken } from '../../redux/slices/auth/authSlice'
import UserProfileBtn from '../UserProfileBtn/UserProfileBtn'

const UserDropMenu = () => {
  const authToken = useAppSelector(selectCurrentToken)

  return (
    <ul className='absolute top-16 hidden group-hover:block bg-white/20'>
      <li className='pt-2 mb-0.5  hover:bg-green-100/80 bg-white/80'>
        <UserProfileBtn />
      </li>
      <li className='pt-2 mb-0.5  hover:bg-blue-100/80 bg-white/80'>
        <RegisterBtn />
      </li>
      <li className='pt-2 mb-0.5  hover:bg-rose-100/80 bg-white/80'>
        {!authToken ? <LoginBtn /> : <LogoutBtn />}
      </li>
    </ul>
  )
}

export default UserDropMenu