import IonIcon from '@reacticons/ionicons'
import { useAppDispatch } from '../../redux/redux.hooks'

const UserProfileBtn = () => {

  const dispatch = useAppDispatch()

  return (
    <div
    className="flex flex-col items-center px-3"
    onClick={() => {}}
    title="User"
>
    <IonIcon name="person" />
    <span className='text-sm'>user</span>
</div>
  )
}

export default UserProfileBtn