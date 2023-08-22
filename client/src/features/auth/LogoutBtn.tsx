import IonIcon from '@reacticons/ionicons'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from './authApiSlice'
import useTokenDecoder from '../../hooks/useTokenDecoder'

const LogoutBtn = () => {

    const { userName } = useTokenDecoder()
    const navigate = useNavigate()

    const [sendLogout, {
        isSuccess,
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/thankyou', { replace: true, state: { logingOut: true, userName } })
    }, [isSuccess, navigate])

    return (
        <div
            className="flex flex-col items-center px-3"
            title="Sign out"
            onClick={sendLogout}
        >
            <IonIcon name="log-out-outline" />
            <span className='text-sm'>sign out</span>
        </div>
    )

}
export default LogoutBtn