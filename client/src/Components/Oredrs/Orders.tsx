// import { useAppSelector } from '../../redux/redux.hooks'
// import { selectCurrentToken } from '../../redux/slices/auth/authSlice'
// import jwt_decode from "jwt-decode"
// import { IDecoded } from '../../Interfaces/Interfaces'
import { useGetUserOrdersQuery } from '../../features/orders/ordersApiSlice'
import OrderItem from '../OrderItem/OrderItem'
import useTokenDecoder from '../../hooks/useTokenDecoder'

const Orders = () => {
  // const token = useAppSelector(selectCurrentToken) as string
  // const decoded = jwt_decode(token) as IDecoded
  const {userId } = useTokenDecoder()   
  // const { data:orders, isLoading, isSuccess, } = useGetUserOrdersQuery(decoded.UserInfo.userId)
  const { data:orders, isLoading, isSuccess, } = useGetUserOrdersQuery(userId)

  return (
    <section className='px-3'>
      <h1 className='my-4 text-2xl'>Orders</h1>
      {isLoading && <p>LOADING...</p>}
      {isSuccess &&
        <div>
          {orders.map((order)=> <OrderItem order={order} /> )}
        </div>}
    </section>
  )
}

export default Orders