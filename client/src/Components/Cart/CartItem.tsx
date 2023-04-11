import IonIcon from "@reacticons/ionicons"
import { ICartProduct } from "../../Interfaces/Interfaces"
import { useAppDispatch } from "../../redux/redux.hooks"
import { addQuantity, removeFromCart, subtractQuantity } from "../../redux/slices/cart/cartSlice"

interface ICartItem{
  pro:ICartProduct
}

const CartItem = ({pro}: ICartItem ) => {

  const dispatch = useAppDispatch()

  return (
    <article  className='flex px-2 py-5 border-b'>
      <img src={pro.image} alt={pro.name} className="pr-1 w-[70px] max-h-24 rounded-3xl" />
      <div className='flex flex-1 flex-col px-1'>
        <div>{pro.name}</div>
        <div>{'stock:'} {pro.stock}</div>
        <div className='flex mt-auto'>
          <button
            // disabled={disabled && true}
            className={`w-8 h-8 border border-black/10 rounded ${pro.cartQuantity === 1 ? "cursor-authT-allowed bg-gray-300/80 hover:bg-gray-400/90 active:bg-gray-500" : "cursor-pointer bg-rose-300/60  hover:bg-rose-400/60 hover:text-white active:bg-rose-100/30 active:text-black"}`}
            onClick={() => dispatch(subtractQuantity(pro))}
          >
            -
          </button>
          <span className='w-8 h-8 text-center'>
            {pro.cartQuantity}
          </span>
          <button
            // disabled={disabled && true}
            className={`w-8 h-8 border border-black/10 rounded ${pro.cartQuantity === pro.stock ? "cursor-authT-allowed bg-gray-300/80 hover:bg-gray-400/90 active:bg-gray-500" : "cursor-pointer bg-rose-300/60  hover:bg-rose-400/60 hover:text-white active:bg-rose-100/30 active:text-black"}`}
            onClick={() => dispatch(addQuantity(pro))}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex pr-1 flex-col justify-between items-end">
        <button
          className='flex p-1 items-center rounded-full shadow-md bg-slate-50 hover:bg-red-400/70'
          onClick={() => dispatch(removeFromCart(pro))}
        >
          <IonIcon name="close-outline"></IonIcon>
        </button>
        <div>{(pro.price * pro.cartQuantity).toFixed(2)} €</div>
      </div>
    </article>
  )
}

export default CartItem