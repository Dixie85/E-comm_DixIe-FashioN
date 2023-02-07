import IonIcon from '@reacticons/ionicons'
import React from 'react'
import Button from '../Button/Button'

const Cart = () => {
  return (
    <section className='absolute hidden lg:block -top-4 right-[-400px] h-screen w-96  group-hover:right-1 duration-500 bg-white shadow-xl border-l border-gray-50'>
      <div className='flex justify-between'>
        <h3>Cart...</h3>
      </div>
      <div>
        <div>
          <div>Pr pic</div>
          <div>name</div>
          <div>quntity</div>
          <div>price</div>
        </div>
      </div>
      <div>
        <Button text={'Checkout'}/>
        <span>Total:{'300'}€</span>
      </div>
    </section>
  )
}

export default Cart