import IonIcon from '@reacticons/ionicons'
import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const UserProfile = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  useEffect(() => navigate('/profile/orders'), [])

  return (
    <section className='min-h-screen font-[josefin] max-w-[1220px] m-auto'>
        <h2 className='mt-4 ml-4 text-3xl'>My profile</h2>
      <section className='flex py-5 px-8'>
        <aside className='border w-1/3 min-h-screen'>
          <div className='my-2 mx-3'>
            <h2 className='py-2.5 text-2xl'>Welcome, <span>{'John Doe'}</span></h2>
            <div className={`flex py-4 px-4 border-t items-center cursor-pointer ${pathname === '/profile/orders' && 'bg-rose-100'}`}
              onClick={() => navigate('/profile/orders')}
            >
              <IonIcon name="file-tray-full" />
              <p className='ml-1'> Orders</p>
              <span className='ml-auto'>{'>'}</span>
            </div>

            <div className={`flex py-4 px-4  border-t items-center cursor-pointer ${pathname === '/profile/userinfo' && 'bg-rose-100'}`}
              onClick={() => navigate('/profile/userinfo')}
            >
              <IonIcon name="person-outline" />
              <p className='ml-1'> Personal data</p>
              <span className='ml-auto'>{'>'}</span>
            </div>

          </div>
        </aside>
        <article className='border flex-1 ml-2'>
          <div>
            <Outlet />
          </div>
        </article>
      </section>
    </section>
  )
}

export default UserProfile