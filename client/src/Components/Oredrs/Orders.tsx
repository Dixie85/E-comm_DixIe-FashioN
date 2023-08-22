import { useGetUserOrdersQuery } from '../../features/orders/ordersApiSlice'
import OrderItem from '../OrderItem/OrderItem'
import useTokenDecoder from '../../hooks/useTokenDecoder'
import Spiner from '../../Assets/Spiners/Spiner'

const Orders = () => {
  const { userId } = useTokenDecoder()
  const { data: orders, isLoading, isSuccess, } = useGetUserOrdersQuery(userId)

  return (
    <section className='px-3'>
      <h1 className='my-4 text-2xl'>Orders</h1>
      {isLoading &&
        <section className="flex">
          <div className="mx-auto">
            <Spiner />
          </div>
        </section>}
      {isSuccess &&
        <div>
          {orders.map((order) => <OrderItem key={order._id} order={order} />)}
        </div>}
    </section>
  )
}

export default Orders