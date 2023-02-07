import eye from '../../Assets/Images/eye-fill.svg'
import { IProduct } from '../../Interfaces/Interfaces'
import { useNavigate } from 'react-router-dom'

interface ICard {
  product: IProduct
}

const Card = ({product}:ICard) => {
  const navigate = useNavigate()

  return (
    <figure className=" flex font-[josefin]">
      <div className="relative cursor-pointer shadow-lg group overflow-hidden">
        <img src={product.image} className=" sm:h-full duration-700 " alt={product.name}/>
        <button className="absolute px-5 py-2 bg-white font-semibold rounded  hover:bg-red-200
         left-1/4 bottom-[-65px] group-hover:bottom-14 duration-700">ADD TO CART</button>
        <img src={eye} className="absolute group-hover:right-2 delay-100 w-11 p-3  hover:bg-red-200 duration-500 right-[-60px]
       top-5 bg-white rounded-full" alt='eye icon' onClick={() => navigate(`/product/${product._id}`)}/>
      {product.sale && <span className='absolute top-12 left-0 md:top-6 py-2 px-3 text-2xl  md:text-lg rounded bg-red-600 text-white'>sale</span>}
      </div>
    </figure>
  )
}

export default Card