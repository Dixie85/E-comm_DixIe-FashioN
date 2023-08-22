import { useEffect } from 'react'
import { store } from '../../app/store'
import { productApiSlice } from '../../features/products/productsApiSlice'
import { Outlet } from 'react-router-dom'

const Prefetch = () => {
  useEffect(() => {
    const products = store.dispatch(productApiSlice.endpoints.getProducts.initiate(''))

    return () => {
      products.unsubscribe()
    }
  }, [])

  return <Outlet />
}

export default Prefetch