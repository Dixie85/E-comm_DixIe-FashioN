import { useEffect } from 'react';
import HeroSpiner from '../../Assets/Spiners/HeroSpiner';
import Card from '../../Components/Card/Card'
import { IProduct } from '../../Interfaces/Interfaces';
import { selectAllProducts } from '../../features/products/productsApiSlice';
import { useAppSelector } from '../../redux/redux.hooks';

const Home = () => {
  const products = useAppSelector(selectAllProducts) as IProduct[]
  
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [])
  
  if (products.length < 1) return <HeroSpiner />

  const sales = products.filter(pro => pro.sale).slice(1, 5)

  return (
    <section className='max-w-[1440px] m-auto'>
      <article className="relative h-screen bg-Hero bg-cover
      font-[Josefin] md:bg-top bg-center">
        <h1 className='absolute top-56 right-10 lg:right-48 text-center' >
          <span className="text-white text-2xl font-medium " >discover the new you</span>
          <div className="md:text-6xl text-3xl text-white font-semibold my-3">
            <span className='text-red-500'>DixIe</span> FashioN
          </div>
        </h1>
      </article>
      <article>
        <div className='hidden sm:grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-4'>{sales.map(s => <Card key={s._id} product={s} />)}</div>
      </article>

    </section>
  )
}

export default Home