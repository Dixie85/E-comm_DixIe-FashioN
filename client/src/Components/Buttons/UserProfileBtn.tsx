import IonIcon from '@reacticons/ionicons'
import { useAppDispatch } from '../../redux/redux.hooks'
import { useNavigate } from 'react-router-dom'

const UserProfileBtn = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <div
    className="flex flex-col items-center px-3"
    onClick={() => navigate('/profile')}
    title="User"
>
    <IonIcon name="person" />
    <span className='text-sm'>user</span>
</div>
  )
}

export default UserProfileBtn