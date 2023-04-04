import IonIcon from '@reacticons/ionicons'
import { useAppDispatch } from '../../redux/redux.hooks'
import { isLoginOpen } from '../../redux/slices/auth/loginSlice'

const LoginBtn = () => {

    const dispatch = useAppDispatch()

    return (
            <div
                className="flex flex-col items-center px-3"
                onClick={() => dispatch(isLoginOpen(true))}
                title="Sign in"
            >
                <IonIcon name="log-in-outline" />
                <span className='text-sm'>sign in</span>
            </div>
    )
}
export default LoginBtn