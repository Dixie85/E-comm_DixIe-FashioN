import IonIcon from "@reacticons/ionicons"
import CartItem from "../../Components/Cart/CartItem"
import { useAppDispatch, useAppSelector } from "../../redux/redux.hooks"
import { resetCart, selectCurrentCart } from "../../redux/slices/cart/cartSlice"
import { useState } from "react"
import { selectCurrentToken } from "../../redux/slices/auth/authSlice"
import jwt_decode from "jwt-decode";
import { IDecoded } from "../../Interfaces/Interfaces"
import { useAddNewOrderMutation } from "../../features/orders/ordersApiSlice"
import { isCheckoutMessageOpen } from "../../redux/slices/checkout/checkoutMessageSlice"
import { useNavigate } from "react-router-dom"

const inputInitialState = {
  firstName: '',
  lastName: '',
  addresss: '',
  zipcode: '',
  city: '',
}

const Checkout = () => {

  const token = useAppSelector(selectCurrentToken) as string
  const { cart, shipping, total } = useAppSelector(selectCurrentCart)
  const [inputData, setInputData] = useState(inputInitialState)
  const totalWithOrNotShipping = total < 70 ? (total + Number(shipping)).toFixed(2) : total
  const decoded = jwt_decode(token) as IDecoded
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const cartEmpty = cart.length < 1

  const [addNewOrder] = useAddNewOrderMutation()

  const orderSubmitData = {
    fullName: `${inputData.firstName} ${inputData.lastName} `,
    deliveryAddress: `${inputData.addresss} ${inputData.zipcode} ${inputData.city}`,
    sum: totalWithOrNotShipping,
    userId: decoded.UserInfo.userId,
    shipping,
    cart,
    error: false // testing 
  }

  const allHaveSizes =
    cart.some(pro => Object.values(pro.cartQuantity)
      .reduce((res, siz) => {
        return res += siz
      }, 0) === 0)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(prev => { return { ...prev, [e.target.name]: e.target.value } })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      if (cartEmpty) {
        dispatch(isCheckoutMessageOpen({ isOpen: true, message: 'Cart is empty!', isError: true }))
        setTimeout(() => dispatch(isCheckoutMessageOpen({ isOpen: false, message: '', isError: false })), 5000)
        return
      }
      if (allHaveSizes) {
        dispatch(isCheckoutMessageOpen({ isOpen: true, message: 'Some of the products in you bag are mising sizes!', isError: true }))
        setTimeout(() => dispatch(isCheckoutMessageOpen({ isOpen: false, message: '', isError: false })), 5000)
        return
      }
      const { message } = await addNewOrder(orderSubmitData).unwrap()
      dispatch(isCheckoutMessageOpen({ isOpen: true, message, isError: false }))
      setTimeout(() => dispatch(isCheckoutMessageOpen({ isOpen: false, message: '', isError: false })), 5000)
      dispatch(resetCart())
      setInputData(inputInitialState)
      navigate('/')
    } catch (error) {
      //@ts-ignore
      console.log(error!.data.message);
      //@ts-ignore
      dispatch(isCheckoutMessageOpen({ isOpen: true, message: error!.data.message, isError: true }))
      setTimeout(() => dispatch(isCheckoutMessageOpen({ isOpen: false, message: '', isError: false })), 5000)
    }
  }

  return (
    <section className='p-4 min-h-screen font-[josefin] max-w-[1220px] m-auto'>

      <section className='flex p-3  shadow'>

        <article className=' flex-1 p-2'>
          {cart.map((pro) =>
            <CartItem key={pro._id} pro={pro} />
          )}
        </article>

        <aside className='w-1/3 py-3 pl-3 border-l border-black'>

          <section className="border shadow mb-4">
            <h2 className="uppercase tracking-widest py-1 pl-2 bg-rose-50" >summary</h2>

            <div className='flex py-1.5 px-2 justify-between'>
              <span className=''>Items:</span>
              <span className=''>{total} €</span>
            </div>

            <div className='flex py-1.5 px-2 justify-between'>
              <span className=''>Shipping:</span>
              <span className=''>{shipping} €</span>
            </div>

            <div className='flex py-1.5 px-2 justify-between'>
              <span className='uppercase'>Total:</span>
              <span className=''>{totalWithOrNotShipping} €</span>
            </div>
          </section>

          <section className="border shadow  mb-4">
            <h2 className="uppercase tracking-widest py-1 pl-2 bg-rose-50" >select payment method</h2>

            <div className='flex py-1.5 px-2 justify-between border-b'>
              <span className='flex items-center'><IonIcon name="card" className='text-xl pr-2' />Card</span>
              <span className='pr-2'>{'>'}</span>
            </div>

            <div className='flex py-1.5 px-2 justify-between border-b'>
              <span className='flex items-center'><IonIcon name="logo-paypal" className='text-xl pr-2' />PayPal</span>
              <span className='pr-2'>{'>'}</span>
            </div>
          </section>

          <section className="border shadow">
            <h2 className="uppercase tracking-widest py-1 pl-2 bg-rose-50" >credentials & shepping detailes</h2>
            <form className="flex flex-col px-2.5 pb-3 text-gray-600/90" onSubmit={(e => handleSubmit(e))}>

              <label htmlFor="firstName" className="mt-1">First name: </label>
              <input
                className="px-1.5 border outline-none"
                type="text"
                id="firstName"
                name="firstName"
                value={inputData.firstName}
                onChange={(e => handleInput(e))}
                required
              />

              <label htmlFor="lastName" className="mt-1">Last name: </label>
              <input
                className="px-1.5 border outline-none"
                type="text"
                id="lastName"
                name="lastName"
                value={inputData.lastName}
                onChange={(e => handleInput(e))}
                required
              />

              <label htmlFor="addresss" className="mt-1">Addresss: </label>
              <input
                className="px-1.5 border outline-none"
                type="text"
                id="addresss"
                name="addresss"
                value={inputData.addresss}
                onChange={(e => handleInput(e))}
                required
              />

              <label htmlFor="zipcode" className="mt-1">Zipcode: </label>
              <input
                className="px-1.5 border outline-none"
                type="text"
                id="zipcode"
                name="zipcode"
                value={inputData.zipcode}
                onChange={(e => handleInput(e))}
                required
              />

              <label htmlFor="city" className="mt-1">City: </label>
              <input
                className="px-1.5 border outline-none"
                type="text"
                id="city"
                name="city"
                value={inputData.city}
                onChange={(e => handleInput(e))}
                required
              />

              <button className={`px-1.5 mt-3.5 border uppercase  ${cartEmpty ? `bg-gray-50 text-gray-300 hover:bg-gray-100 cursor-not-allowed` : `bg-rose-50 hover:bg-rose-100 active:bg-rose-200 active:text-white`}`}>order</button>
            </form>
          </section>

        </aside>
      </section>
    </section>
  )
}

export default Checkout