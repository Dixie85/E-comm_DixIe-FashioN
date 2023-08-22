import { useEffect } from 'react'
import { useAppDispatch } from '../../redux/redux.hooks'
import { logOut } from '../../redux/slices/auth/authSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import StarRating from '../../Components/StarRating/StarRating'

const ThankYou = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (state?.logingOut) dispatch(logOut(''))
  }, [])

  return (
    <main className='max-w-[1440px] min-h-screen m-auto overflow-hidden font-[jossefin]'>
      <section className='flex '>
        <section className='relative  m-auto w-80 h-60 mt-10'>
          <article className='absolute w-full h-full bg-rose-300/30 -z-50 rotate-6 rounded'></article>
          <article className='absolute top-1 -left-3 w-full h-full bg-white shadow-lg rounded'>
            <div className='flex flex-col h-2/3 items-center px-3 pt-3'>
              <figure className="self-start w-3/6">
                <img
                  src="https://www.freepnglogos.com/uploads/thank-you-png/happy-national-thank-you-day-inventionland-15.png"
                  alt="TypeScript"
                  className=""
                />
              </figure>
              <h3 className=' text-2xl'>{`${state?.userName ? state?.userName : 'John Doe'}!`}</h3>
              <p className='my-3 uppercase text-black/70 '>you are now logged out</p>

            </div>
            <div className='flex flex-col items-center h-1/3 border-t border-dashed bg-gray-100'>
              <p className='my-2 text-black/70 text-sm'> Please tell us, how would you rate this website?</p>
              <div className='flex text-xl'>
                <StarRating starCount={5} />
              </div>
            </div>
          </article>
        </section>
      </section>

      <section className='flex flex-col items-center mt-8 md:mt-12'>
        <p>Visit and enjoy some of our other websites</p>
        <section className='flex flex-col items-center justify-center mt-2 md:flex-row md:flex-wrap'>

          {Array(3).fill(0).map((a, index) =>
            <article key={index} className='flex m-3 w-80 h-60 bg-white shadow-xl rounded'>
              <p className='m-auto'>coming soon</p>
            </article>
          )}
        </section>
        <section className='flex'>
          <button className='my-7 py-2 px-3 m-auto' onClick={() => navigate('/')}>
            {`< Go back to `} {<b><span className="text-red-400" >Dixie</span> Fashion</b>}
          </button>
        </section>
      </section>
    </main>
  )
}

export default ThankYou