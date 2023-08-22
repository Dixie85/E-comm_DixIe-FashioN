import IonIcon from '@reacticons/ionicons'
import { useAppDispatch, useAppSelector } from '../../redux/redux.hooks'
import { useNavigate } from 'react-router-dom'
import { selectCurrentToken } from '../../redux/slices/auth/authSlice'
import { isLoginOpen } from '../../redux/slices/auth/loginSlice'

const UserProfileBtn = () => {

  const token = useAppSelector(selectCurrentToken)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogIn = () => {
    if (!token) {
      dispatch(isLoginOpen(true))
    } else {
      navigate('/profile')
    }
  }

  return (
    <div
      className="flex flex-col items-center px-3"
      onClick={handleLogIn}
      title="User"
    >
      <IonIcon name="person" />
      <span className='text-sm'>user</span>
    </div>
  )
}

export default UserProfileBtn