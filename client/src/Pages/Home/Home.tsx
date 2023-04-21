import Card from '../../Components/Card/Card'
import { useGetProductsQuery } from '../../features/products/productsApiSlice'

const Home = () => {
  const { data:products } = useGetProductsQuery('')
  const sales = products!.filter(pro => pro.sale).slice(1,5);
  return (
    <section>
      <article className="relative h-screen bg-Hero bg-cover
      font-[Josefin] md:bg-top bg-center -z-50">
        {/* <h2 className="text-white text-2xl font-medium " >Discover the new you</h2>
        <h1 className="md:text-5xl text-3xl text-white font-semibold py-5" ><span className='text-red-500'>DixIe</span> FashioN</h1> */}
        
        <h1 className='absolute top-56 right-10 lg:right-48 text-center' >
        <span className="text-white text-2xl font-medium " >discover the new you</span>
          <div className="md:text-6xl text-3xl text-white font-semibold my-3">
            <span className='text-red-500'>DixIe</span> FashioN
          </div> 
        </h1>
      </article>
      <article>
        <div className='hidden sm:grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-4'>{sales.map(s => <Card key={s._id} product={s}/> )}</div>
      </article>

    </section>
  )
}

export default Home