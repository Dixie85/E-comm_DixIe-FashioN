import eye from '../../Assets/Images/eye-fill.svg'
import { IProduct } from '../../Interfaces/Interfaces'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/redux.hooks'
import { addTocart, selectCurrentCart } from '../../redux/slices/cart/cartSlice'
import { useEffect, useState } from 'react'

interface ICard {
  product: IProduct
}

const Card = ({product}:ICard) => {
  const { cart } = useAppSelector(selectCurrentCart)
  const [inCart, setInCArt] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(()=>{
    setInCArt(cart.some(pro => pro._id === product._id ))
  },[cart])

  const addToCartFailSafe = () => {
    if (!inCart) {
      return dispatch(addTocart({...product, cartQuantity:1}))
    }
    return
  }

  return (
    <figure className=" flex font-[josefin]">
      <div className="relative cursor-pointer shadow-lg group overflow-hidden">
        <img src={product.image} className=" sm:h-full duration-700 " alt={product.name}/>
        <button 
          disabled={inCart}
          className={`absolute px-5 py-2  font-semibold rounded hover:bg-red-200/90 hover:text-white active:bg-rose-400/90
           left-1/4 bottom-[-65px] group-hover:bottom-14 duration-700 ${inCart ? 'cursor-not-allowed bg-gray-300/80 hover:bg-gray-400/90 active:bg-gray-500': 'bg-white/80'}`}
          onClick={addToCartFailSafe}
         >{inCart ? 'IN BAG' : 'ADD TO BAG'}</button>
        <img src={eye} className="absolute group-hover:right-2 delay-100 w-11 p-3  hover:bg-red-200/90 duration-500 right-[-60px]
       top-5 bg-white/80 rounded-full" alt='eye icon' onClick={() => navigate(`/product/${product._id}`)}/>
      {product.sale && <span className='absolute top-12 left-0 md:top-6 py-2 px-3 text-2xl  md:text-lg rounded bg-red-600 text-white'>sale</span>}
      </div>
    </figure>
  )
}

export default Card