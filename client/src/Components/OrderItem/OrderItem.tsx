import { IOrder } from "../../Interfaces/Interfaces"
import { format, parseISO } from 'date-fns'
import { useCancelOrderMutation } from "../../features/orders/ordersApiSlice"

interface IOrderItem {
  order: IOrder
}

const OrderItem = ({ order }: IOrderItem) => {

  const [cancelOrder] = useCancelOrderMutation()

  const handleCancelOrder = async () => {
    await cancelOrder({ _id: order._id })
  }

  return (
    <article className='flex flex-col p-3 mb-3 border lg:flex-row '>
      <div className='flex flex-1 flex-col md:flex-row items-center md:justify-around lg:justify-start'>
        <div className='px-4 py-2 border-b text-center md:pl-0 md:py-0 md:border-b-0 md:border-r md:text-left '>
          <p className="text-gray-500/90">Order Number:</p>
          <span>{order.orderNumber}</span>
        </div>
        <div className='px-4 py-2 border-b text-center md:py-0 md:border-b-0 md:border-r md:text-left '>
          <p className="text-gray-500/90">Order Date:</p>
          <span>{format(parseISO(order.createdAt!), "dd MMMM yyyy")}</span>
        </div>
        <div className='px-4 py-2 border-b text-center md:py-0 md:border-b-0 md:border-r md:text-left '>
          <p className="text-gray-500/90">Total:</p>
          <span>{order.sum}</span>
        </div>
        <div className='px-4 py-2 border-b text-center md:py-0 md:border-b-0 md:text-left capitalize'>
          <p className="text-gray-500/90">Status:</p>
          <span
            className={`
            ${order.status === 'pending' && 'text-orange-500'}
            ${order.status === 'canceled' && 'text-red-500'}
            ${order.status === 'shipped' && 'text-green-500'}`}
          >{order.status}
          </span>
        </div>
      </div>
      <div className='flex flex-col justify-center mt-3 lg:mt-0'>
        <button className='py-1 px-3 shadow bg-rose-100 capitalize'>view order</button>
        {order.status === 'pending' && <button className='text-red-500' onClick={handleCancelOrder}>cancel order</button>}
      </div>
    </article>
  )
}

export default OrderItem