import IonIcon from "@reacticons/ionicons"
import { ICartProduct } from "../../Interfaces/Interfaces"
import { useAppDispatch } from "../../redux/redux.hooks"
import { removeFromCart } from "../../redux/slices/cart/cartSlice"
import SizeQuantitySelector from "../SizeQuantitySelector/SizeQuantitySelector"

interface ICartItem {
  pro: ICartProduct,
  isCart?: boolean
}

const CartItem = ({ pro, isCart }: ICartItem) => {

  const dispatch = useAppDispatch()

  const sumCartQuantity = Object.values(pro.cartQuantity)
    .reduce((res, quan): number => {
      return res += quan
    }, 0)

  return (
    <article className='flex flex-col px-2 py-5 border-b'>
      <div className='flex flex-1 flex-col px-1 justify-between'>
        <div className="flex justify-between">
          <img src={pro.image} alt={pro.name} className="pr-1 w-[70px] max-h-24 rounded-3xl" />
          <div className="flex">
            {!isCart &&
              <div className="pr-2 mr-2 border-r line-clamp-6">
                <p className="leading-none text-sm text-gray-500/90"> Sizes in cart:</p>
                {Object.entries(pro.cartQuantity).map(size => size[1] > 0 && <p key={size[0]} className='m-0 leading-none'>{`${size[0].toUpperCase()}: ${size[1]}`}</p>)}
                {sumCartQuantity === 0 && <span className="inline-flex text-sm text-red-500">choose size <IonIcon name='warning-outline' className=" self-center" /></span>}
              </div>}
            <div className="flex pr-1 flex-col justify-between items-end">
              <button
                className='flex p-1 items-center rounded-full shadow-md bg-slate-50 hover:bg-red-400/70'
                onClick={() => dispatch(removeFromCart(pro))}
              >
                <IonIcon name="close-outline"></IonIcon>
              </button>
              <div className="text-base text-right">{(pro.price * sumCartQuantity).toFixed(2)} €</div>
            </div>
          </div>
        </div>
      </div>
      <p>{pro.name}</p>
      <SizeQuantitySelector sizes={pro.cartQuantity} id={pro._id} isCart={isCart} />
    </article>
  )
}

export default CartItem