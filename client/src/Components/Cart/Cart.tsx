import IonIcon from '@reacticons/ionicons'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/redux.hooks'
import { selectCurrentToken } from '../../redux/slices/auth/authSlice'
import { isLoginOpen } from '../../redux/slices/auth/loginSlice'
import { selectCurrentCart } from '../../redux/slices/cart/cartSlice'
import CartItem from './CartItem'

const Cart = () => {
  const { cart, shipping, total } = useAppSelector(selectCurrentCart)
  const token = useAppSelector(selectCurrentToken)
  const [cartEmpty, setCartEmpty] = useState(false)
  const authToken = !!token
  const isDisebled = (cart.length > 0 && authToken)
  console.log(cart);

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleCheckoutBth = () => {
    if(!authToken) dispatch(isLoginOpen(true))
    if(cart.length < 1) setCartEmpty(true)  
    if(isDisebled) navigate('/checkout')
  }

  useEffect(()=>{
    if(cartEmpty) setCartEmpty(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[cart])

  return (
    <section className='absolute hidden p-2.5 md:block -top-0 right-[-400px] h-screen w-96  group-hover:right-0 duration-500 bg-rose-50 shadow-2xl border-l border-gray-50'>
      {/* <section className='absolute  p-2.5 md:block -top-0 right-0 h-screen w-96  group-hover:right-1 duration-500 bg-rose-50 shadow-2xl border-l border-gray-50'> */}
      <div className='flex flex-col h-full text-xl'>

        <div className='flex flex-col justify-between border-b'>
          <span className='flex py-5 text-base text-center uppercase tracking-widest justify-center items-center'>
            <h3 className='mr-2'>Items in your bag</h3>
            <IonIcon name="bag-handle" className='text-xl' />
          </span>
          {total > 70 && <span className='text-base text-center p-0.5 mb-3 -mt-2 text-danger '>YAY! YOU HAVE QUALIFIED FOR <span className='font-semibold'>FREE SHIPPING</span> WHITIN THE COUNTRY</span>}
        </div>

        <div className='pt-1'></div>

        <div className='flex flex-col overflow-y-auto'>
          {cart.length < 1 && <span className='text-base text-center p-0.5 mt-3 text-black/70 '>Cart is empty</span>}
          {cartEmpty && <span className='text-base text-center p-0.5 mt-2 text-danger '>Your shopping bag is still empty</span>}
          {cart.map((pro) =>
            <CartItem key={pro._id} pro={pro}/>
          )}
        </div>

        <div className='flex flex-col pb-1 border-t mt-auto '>
          <div className='flex p-1.5 justify-between'>
            <span className=''>Total:</span>
            <span className=''>{total} €</span>
          </div>
          <div className='flex p-1.5 justify-between'>
            <span className=''>Shipping:</span>
            <span className=''>{shipping} €</span>
          </div>
          <button
            title={`${authToken ? `Checkout` : 'Login to unlock'}`}
            className={`flex justify-center items-center mt-1 py-2 text-black/50 border-black/10 rounded-full transform duration-300  hover:text-white ${!isDisebled ? "cursor-not-allowed bg-gray-300/80 hover:bg-gray-400/90 active:bg-gray-500" : 'bg-red-200 hover:bg-danger/90 active:hover:bg-danger/30 active:text-black/50'}`}
            onClick={handleCheckoutBth}
          >
            <span className='mr-1'>{`Checkout`}</span>
            {authToken ? <IonIcon name="lock-open"></IonIcon> : <IonIcon name="lock-closed"></IonIcon>}
          </button>
        </div>

      </div>
    </section>
  )
}

export default Cart