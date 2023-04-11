import IonIcon from "@reacticons/ionicons"
import CartItem from "../../Components/Cart/CartItem"
import { useAppSelector } from "../../redux/redux.hooks"
import { selectCurrentCart } from "../../redux/slices/cart/cartSlice"

const Checkout = () => {

  const { cart, shipping, total } = useAppSelector(selectCurrentCart)

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
              <span className=''>{total < 70 ? total + Number(shipping) : total} €</span>
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
            <form className="flex flex-col px-2.5 text-gray-600/90" onSubmit={(e =>{})}>

            <label htmlFor="firstName" className="mt-1">First name: </label>
              <input
                className="px-1.5 border outline-none"
                type="text"
                id="firstName"
                name="firstName"
                autoComplete="off"
                // value={firstName}
                onChange={(e =>{})}
                required
              />

            <label htmlFor="lastName" className="mt-1">Last name: </label>
              <input
                className="px-1.5 border outline-none"
                type="text"
                id="lastName"
                name="lastName"
                autoComplete="off"
                // value={lastName}
                onChange={(e =>{})}
                required
              />

            <label htmlFor="addresss" className="mt-1">Addresss: </label>
              <input
                className="px-1.5 border outline-none"
                type="text"
                id="addresss"
                name="addresss"
                autoComplete="off"
                // value={addresss}
                onChange={(e =>{})}
                required
              />
            </form>
          </section>

        </aside>
      </section>
    </section>
  )
}

export default Checkout