import IonIcon from '@reacticons/ionicons'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from './authApiSlice'

const LogoutBtn = () => {

    const navigate = useNavigate()

    const [sendLogout, {
        // isLoading,
        isSuccess,
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
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