import IonIcon from '@reacticons/ionicons'
import { useAppDispatch } from '../../redux/redux.hooks'
import { isRegisterOpen } from '../../redux/slices/auth/registerSlice'

const RegisterBtn = () => {

    const dispatch = useAppDispatch()

    return (
            <div
                className="flex flex-col items-center px-3"
                onClick={() => dispatch(isRegisterOpen(true))}
                title="Sign up"
            >
                <IonIcon name="person-add-outline" />
                <span className='text-sm'>sign up</span>
            </div>
    )
}
export default RegisterBtn