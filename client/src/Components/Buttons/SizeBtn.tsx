import { useAppDispatch } from "../../redux/redux.hooks"
import { addQuantity, subtractQuantity } from "../../redux/slices/cart/cartSlice"

interface ISizeBtn {
  sizeName: string,
  sizeQuan: number
  _id: string,
  add?: boolean,
  subtract?: boolean,
  isCart?: boolean
}

const SizeBtn = ({ sizeName, sizeQuan, _id, add, subtract, isCart }: ISizeBtn) => {

  const dispatch = useAppDispatch()

  return (
    <>
      {add &&
        <div className="group">
          <div className="group-hover:hidden transition duration-300">
            <button
              className={` flex  ${isCart ? 'text-sm min-w-[2rem] min-h-[2rem] mr-0.5' : 'text-lg min-w-[2.5rem] min-h-[2.5rem] mr-2' }  font-[josefin] justify-center items-center  text-red-300 border border-red-300 rounded-full transform duration-[400ms] hover:bg-red-200 hover:text-neutral-900/60 hover:border-none `}
              onClick={() => dispatch(addQuantity({ selectedSize: sizeName, _id }))
              }
            > {sizeName.toUpperCase()}
            </button>
          </div>
          <div className="hidden group-hover:block transition duration-300">
            <button
              className={` flex ${isCart ? 'text-sm min-w-[2rem] min-h-[2rem] mr-0.5' : 'text-lg min-w-[2.5rem] min-h-[2.5rem] mr-2' }  font-[josefin] justify-center items-center  text-red-300 border border-red-300 rounded-full transform duration-[400ms] hover:bg-red-200 hover:text-neutral-900/60 hover:border-none `}
              onClick={() => dispatch(addQuantity({ selectedSize: sizeName, _id }))
              }
            > {sizeQuan}
            </button>
          </div>
        </div>}
      {subtract &&
        <div className="group">
          <div className="group-hover:hidden transition duration-300">
            <button
              className={` flex ${isCart ? 'text-sm min-w-[2rem] min-h-[2rem] mr-0.5' : 'text-lg min-w-[2.5rem] min-h-[2.5rem] mr-2' }  font-[josefin] justify-center items-center  text-teal-400 border border-blue-300 rounded-full transform duration-[400ms] hover:bg-blue-200 hover:text-neutral-900/60 hover:border-none`}
              onClick={() => dispatch(subtractQuantity({ selectedSize: sizeName, _id }))
              }
            > {sizeName.toUpperCase()}
            </button>
          </div>
          <div className="hidden group-hover:block transition duration-300">
            <button
              className={` flex ${isCart ? 'text-sm min-w-[2rem] min-h-[2rem] mr-0.5' : 'text-lg min-w-[2.5rem] min-h-[2.5rem] mr-2' }  font-[josefin] justify-center items-center  text-teal-400 border border-blue-300 rounded-full transform duration-[400ms] hover:bg-blue-200 hover:text-neutral-900/60 hover:border-none`}
              onClick={() => dispatch(subtractQuantity({ selectedSize: sizeName, _id }))
              }
            > {sizeQuan}
            </button>
          </div>
        </div>}
    </>
  )
}

export default SizeBtn

