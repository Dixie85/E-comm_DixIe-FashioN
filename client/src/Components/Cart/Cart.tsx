import IonIcon from '@reacticons/ionicons'
// import { HiOutlineShoppingBag } from 'react-icons/hi';
// import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/redux.hooks'
import { addQuantity, removeFromCart, subtractQuantity } from '../../redux/slices/cart/cartSlice'
// import Button from '../Button/Button'

const Cart = () => {
  const { cart } = useAppSelector(state => state.cart)
  const dispatch = useAppDispatch()

  const total = () => cart.reduce((tot, pro) => tot += pro.price * pro.cartQuantity, 0).toFixed(2)

  return (
    <section className='absolute hidden p-2.5 md:block -top-4 right-[-400px] h-screen w-96  group-hover:right-1 duration-500 bg-rose-50 shadow-2xl border-l border-gray-50'>
    {/* <section className='absolute  p-2.5 md:block -top-4 right-1 h-screen w-96  group-hover:right-1 duration-500 bg-rose-50 shadow-2xl border-l border-gray-50'> */}
      <div className='flex flex-col h-full text-xl'>

        <div className='flex flex-col justify-between border-b'>
          <span className='flex py-5 text-base text-center uppercase tracking-widest justify-center items-center'>
            <h3 className='mr-2'>Items in your bag</h3>
            <IonIcon name="bag-handle" className='text-xl' />
          </span>
          {+total() > 70 && <span className='text-base text-center p-0.5 mb-3 -mt-2 text-danger '>YAY! YOU HAVE QUALIFIED FOR <span className='font-semibold'>FREE SHIPPING</span> WHITIN THE COUNTRY</span>}
        </div>

        <div className='pt-1'></div>

        <div className='flex flex-col overflow-y-auto'>
          {cart.map((pro) =>
            <div key={pro._id} className='flex px-2 py-5 border-b'>
              <img src={pro.image} alt={pro.name} className="pr-1 w-[70px] max-h-24 rounded-3xl" />
              <div className='flex flex-1 flex-col px-1'>
                <div>{pro.name}</div>
                <div>{'size:'} {pro.stock}</div>
                <div className='flex mt-auto'>
                  <button
                    // disabled={disabled && true}
                    className={`w-8 h-8 border border-black/10 rounded ${pro.cartQuantity === 1 ? "cursor-not-allowed bg-gray-300/80 hover:bg-gray-400/90 active:bg-gray-500" : "cursor-pointer bg-rose-300/60  hover:bg-rose-400/60 hover:text-white active:bg-rose-100/30 active:text-black"}`}
                    onClick={() => dispatch(subtractQuantity(pro))}
                  >
                    -
                  </button>
                  <span className='w-8 h-8 text-center'>
                    {pro.cartQuantity}
                  </span>
                  <button
                    // disabled={disabled && true}
                    className={`w-8 h-8 border border-black/10 rounded ${pro.cartQuantity === pro.stock ? "cursor-not-allowed bg-gray-300/80 hover:bg-gray-400/90 active:bg-gray-500" : "cursor-pointer bg-rose-300/60  hover:bg-rose-400/60 hover:text-white active:bg-rose-100/30 active:text-black"}`}
                    onClick={() => dispatch(addQuantity(pro))}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex pr-1 flex-col justify-between items-end">
                <div
                  className='flex p-1 items-center rounded-full shadow-md bg-slate-50 hover:bg-red-400/70'
                  onClick={() => dispatch(removeFromCart(pro))}
                >
                  <IonIcon name="close-outline"></IonIcon>
                </div>
                <div>{(pro.price * pro.cartQuantity).toFixed(2)} €</div>
              </div>
            </div>
          )}
        </div>

        <div className='flex flex-col pb-1 border-t mt-auto '>
          <div className='flex p-1.5 justify-between'>
            <span className=''>Total:</span>
            <span className=''>{total()} €</span>
          </div>
          <div className='flex p-1.5 justify-between'>
            <span className=''>Shipping:</span>
            <span className=''>{+total() > 70 ? "Free" : 5.99} €</span>
          </div>
          <button
            disabled={cart.length < 1}
            className={`mt-1 py-2  text-black/50 border-black/10 rounded-full transform duration-300  hover:text-white ${cart.length < 1 ? "cursor-not-allowed bg-gray-300/80 hover:bg-gray-400/90 active:bg-gray-500" : 'bg-red-200 hover:bg-danger/90 active:hover:bg-danger/30 active:text-black/50'}`}
            onClick={() => { }}
          >
            {'Checkout'}
          </button>
        </div>

      </div>
    </section>
  )
}

export default Cart