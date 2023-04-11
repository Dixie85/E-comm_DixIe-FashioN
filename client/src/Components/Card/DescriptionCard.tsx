import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/redux.hooks';
import { addTocart, selectCurrentCart } from '../../redux/slices/cart/cartSlice';
// import Button from '../Button/Button';
import ButtonSizes from '../Button/ButtonSizes';

const DescriptionCard = () => {
  const { id } = useParams()
  const products = useAppSelector(({ products }) => products.products);
  const displayProduct = products.find(pro => pro._id === Number(id))
  const { cart } = useAppSelector(selectCurrentCart)
  const [inCart, setInCArt] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    setInCArt(cart.some(pro => pro._id === displayProduct!._id))
  }, [cart])

  const addToCartFailSafe = () => {
    if (!inCart) {
      return dispatch(addTocart({ ...displayProduct!, cartQuantity: 1 }))
    }
    return
  }

  return (
    <section className='flex flex-col justify-center min-h-screen font-[josefin] max-w-[1220px] m-auto'>

      <button className='mr-3 sm:mr-9 sm:mt-4 self-end' onClick={() => navigate(-1)}>{'<'} Go back</button>

      <div className='sm:p-8 '>
        <div className='grid  p-2.5  md:p-7 md:shadow-xl md:border md:border-gray-100/50 md:rounded-xl md:bg-gray-100/60 lg:grid-cols-2'>
          <figure className='flex justify-center'>
            <img src={displayProduct?.image} alt={displayProduct?.category} className='max-w-full rounded-sm lg:max-h-[100vh]' />
          </figure>
          <div className=' mt-5 md: lg:mt-0 lg:py-10 lg:px-5'>
            <h2 className='text-xl'>{displayProduct?.brand}</h2>
            <h2 className=' mb-1 text-2xl font-medium text-danger'>{displayProduct?.name}</h2>
            <div className='text-lg'><i>{displayProduct?.price} €</i></div>
            <p className='my-10'>{displayProduct?.description}</p>
            <span className='mb-2 block'>Avalible sizes</span>
            <div className='mb-8 flex '>
              {displayProduct?.size.map(siz => <ButtonSizes key={siz} size={siz} />)}
            </div>
            {/* <Button text='  ADD TO CART' /> */}
            <button
              disabled={inCart}
              className={`bg-red-200 text-black/50 px-6 py-2 rounded-full transform duration-300 hover:bg-danger hover:text-white font-[josefin] ${inCart ? 'cursor-not-allowed bg-gray-300/80 hover:bg-gray-400/90 active:bg-gray-500' : 'bg-white'}`}
              onClick={addToCartFailSafe}
            > {inCart ? 'IN BAG' : 'ADD TO BAG'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DescriptionCard