import IonIcon from '@reacticons/ionicons'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import useTokenDecoder from '../../hooks/useTokenDecoder'

const UserProfile = () => {
  const { userName } = useTokenDecoder() 
  const navigate = useNavigate()
  const { pathname } = useLocation()
  useEffect(() => navigate('/profile/orders'), [])

  return (
    <section className='min-h-screen font-[josefin] max-w-[1220px] m-auto'>
        <h2 className='mt-4 ml-4 text-xl md:text-3xl'>My profile</h2>
      <section className='flex flex-col md:flex-row py-5 px-4 md:px-8'>
        <aside className='border md:w-1/3 md:min-h-screen mb-2 md:mb-0'>
          <div className='my-2 mx-3'>
            <h2 className='py-2.5 text-lg md:text-2xl'>Welcome, <span>{userName}</span></h2>
            <div className={`flex py-4 px-4 border-t items-center cursor-pointer ${pathname === '/profile/orders' && 'bg-rose-100'}`}
              onClick={() => navigate('/profile/orders')}
            >
              <span className='hidden sm:block'><IonIcon name="file-tray-full" /></span>
              <p className='ml-1'> Orders</p>
              <span className='ml-auto'>{'>'}</span>
            </div>

            <div className={`flex py-4 px-4 border-t items-center cursor-pointer ${pathname === '/profile/userinfo' && 'bg-rose-100'}`}
              onClick={() => navigate('/profile/userinfo')}
            >
              <span className='hidden sm:block'><IonIcon name="person-outline" /></span>
              <p className='ml-1'> Personal data</p>
              <span className='ml-auto'>{'>'}</span>
            </div>

          </div>
        </aside>
        <article className='border flex-1 md:ml-2'>
          <div>
            <Outlet />
          </div>
        </article>
      </section>
    </section>
  )
}

export default UserProfile